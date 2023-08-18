import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import EntrevistaService from '../app/services/EntrevistaService'; 
import CandidatoService from '../app/services/CandidatoService';
import { mensagemErro } from '../components/toastr'
import { mensagemSucesso } from '../components/toastr'
import FormGroup from '../components/form-group';


export default class LancarEntrevistaModal extends React.Component{

    constructor(props){
        super(props);
        const dataAtual = new Date();
        this.CandidatoService = new CandidatoService();
        this.EntrevistaService = new EntrevistaService();
        this.state = {
            processo: this.props.processo,
            data: dataAtual.toISOString().slice(0, 19)+'Z',
            obs: '',
            mensagemErro: '',
            candidatoNome: '',
            candidatoFone: '',
            candidato: null
        };
    }

    formatarDataParaExibicao = (data) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' };
        return new Date(data).toLocaleString('pt-BR', options);
    }


    fecharModal = () => {
        this.props.onClose(); 
    }

    validar(){
        const msgs = []

        if (!this.state.candidatoNome) {
            msgs.push('O candidato é obrigatório!');
        }

        return msgs;
    }


    cadastrarCandidato = async () => {
        const msgs = this.validar();
    
        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                mensagemErro(msg);
            });
            return null;
        }
    
        const candidato = {
            fone: this.state.candidatoFone,
            nomeCompleto: this.state.candidatoNome,
            idade: '',
            logradouro: '',
            cep: '',
            cidade: '',
            uf: '',
            periodoAtual: '',
            turnoFaculdade: 'INDEFINIDO',
            sttCandidato: 'EM_PROCESSO'
        };
    
        try {
            const response = await this.CandidatoService.cadastrar(candidato);
            mensagemSucesso('Candidato cadastrado com sucesso!');
            return response.data;
        } catch (erro) {
            this.setState({ mensagemErro: erro.response });
            mensagemErro(erro.response);
            return null;
        }
    }; 

    cadastrarEntrevista = async () => {

        const msgs = this.validar();
 
        if(msgs && msgs.length >0){
             msgs.forEach((msg, index) => {
                 mensagemErro(msg)
             })
             return false;
        }

        const processoMontado = {
            id: this.state.processo.id,
            tipoVaga: this.state.processo.tipoVaga,
	        turnoVaga: this.state.processo.turnoVaga
        }

        const candidatoMontado = await this.cadastrarCandidato();

        const entrevista = {
            data: this.state.data,
            processo: processoMontado,
            candidato: { 
                id: candidatoMontado.id,
                turnoFaculdade: candidatoMontado.turnoFaculdade,
                sttCandidato: candidatoMontado.sttCandidato
            },
            diccao: '',
            girias: '',
            postura: '',
            pontualidade: '',
            obs: this.state.obs
        }
 
         this.EntrevistaService.cadastrar(entrevista).then( response => {
                 mensagemSucesso('Entrevista lançada com sucesso!')
                 this.props.onClose();
             }).catch( erro => {
                 this.setState({mensagemErro: erro.response})
                 mensagemErro(erro.response)
             })
     }
    
    render(){
        const { onClose, showModal} = this.props;

        return (
            <Modal show={showModal} onHide={onClose} dialogClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Lançar Nova Entrevista</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                    <FormGroup label="Data de início: " htmlFor="inputDataInicio">
                        <input type="text"
                                id="inputDataInicio"
                                className="form-control"
                                name="dataInicio"
                                value={this.formatarDataParaExibicao(Date(this.state.dataInicio))}
                                readOnly/>
                    </FormGroup>

                    <FormGroup label="Nome do Candidato: *" htmlFor="inputNomeCompleto">
                        <input type="text"
                                id="inputNomeCompleto"
                                className="form-control"
                                name="nomeCompleto"
                                placeholder="Digite o nome do candidato"
                                onChange={(e) => this.setState({candidatoNome: e.target.value})}/>
                    </FormGroup>

                    <FormGroup label="Fone do Candidato: *" htmlFor="inputFone">
                        <input type="number"
                                id="inputFone"
                                className="form-control"
                                name="fone"
                                placeholder="Digite o fone do candidato"
                                onChange={(e) => this.setState({candidatoFone: e.target.value})}/>
                    </FormGroup>

                    <FormGroup label="Observação: " htmlFor="inputObs">
                        <input type="text"
                                id="inputObs"
                                className="form-control"
                                name="obs"
                                onChange={(e) => this.setState({obs: e.target.value})}/>
                    </FormGroup>                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                Fechar
                </Button>
                <Button variant="primary" onClick={this.cadastrarEntrevista}>
                Cadastrar
                </Button>
            </Modal.Footer>
            </Modal>
        )
    };
}