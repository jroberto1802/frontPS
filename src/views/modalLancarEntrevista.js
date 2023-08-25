import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import EntrevistaService from '../app/services/EntrevistaService'; 
import CandidatoService from '../app/services/CandidatoService';
import { mensagemErro, mensagemSucesso } from '../components/toastr'
import FormGroup from '../components/form-group';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';


export default class LancarEntrevistaModal extends React.Component{

    constructor(props){
        super(props);
        const dataAtual = new Date();
        this.CandidatoService = new CandidatoService();
        this.EntrevistaService = new EntrevistaService();
        this.state = {
            processo: this.props.processo,
            dataSelecionada: dataAtual,
            obs: '',
            mensagemErro: '',
            candidatoNome: '',
            candidatoFone: '',
            candidato: null,
            candidatoEditar: null,
            entrevistaEditar: null
        };
    }

    componentDidMount() {
        if (this.props.editar) {
            this.carregarDadosEditar();
        }
    }
    
    async carregarDadosEditar() {
        try {
            const candidatoResponse = await this.CandidatoService.buscarId(this.props.candidatoSelecionado);
            const entrevistaResponse = await this.EntrevistaService.buscarId(this.props.entrevistaSelecionada);
    
            this.setState({
                candidatoEditar: candidatoResponse.data,
                entrevistaEditar: entrevistaResponse.data
            }, () => {
                this.inicializarCampos();
            });
        } catch (error) {
            console.error('Erro ao buscar dados para edição:', error);
        }
    }
    
    inicializarCampos() {
        this.setState({
            candidatoNome: this.state.candidatoEditar.nomeCompleto,
            candidatoFone: this.state.candidatoEditar.fone,
            obs: this.state.entrevistaEditar ? this.state.entrevistaEditar.obs : '',
            dataSelecionada: new Date(this.state.entrevistaEditar.data)
        });
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
            sttCandidato: 'FORM_PENDENTE'
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

    editarCandidato = async (id) => {
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
            turnoFaculdade: this.state.candidatoEditar.turnoFaculdade,
            sttCandidato: this.state.candidatoEditar.sttCandidato
        };
    
        try {
            const response = await this.CandidatoService.alterar(id, candidato);
            mensagemSucesso('Candidato alterado com sucesso!');
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
            data: this.state.dataSelecionada,
            processo: processoMontado,
            obs: this.state.obs,
            candidato: { 
                id: candidatoMontado.id,
                turnoFaculdade: candidatoMontado.turnoFaculdade,
                sttCandidato: candidatoMontado.sttCandidato
            },
            diccao: '',
            girias: '',
            postura: '',
            pontualidade: ''
        }
        
        this.EntrevistaService.cadastrar(entrevista).then( response => {
            mensagemSucesso('Entrevista lançada com sucesso!')
            this.props.onClose();
        }).catch( erro => {
            this.setState({mensagemErro: erro.response})
            mensagemErro(erro.response)
        })
    }

    editarEntrevista = async (id) => {
        const msgs = this.validar();

        if(msgs && msgs.length >0){
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            })
            return false;
       }

       const candidatoMontado = await this.editarCandidato(this.state.candidatoEditar.id);

       const entrevista = {
            data: this.state.dataSelecionada,
            obs: this.state.obs,
            candidato: {
                nomeCompleto: candidatoMontado.nomeCompleto,
                fone: candidatoMontado.fone,
                turnoFaculdade: candidatoMontado.turnoFaculdade,
                sttCandidato: candidatoMontado.sttCandidato
            }
        }

       this.EntrevistaService.alterar(id, entrevista).then( response => {
            mensagemSucesso('Entrevista alterada com sucesso!')
            this.props.onClose();
        }).catch( erro => {
            this.setState({mensagemErro: erro.response})
            mensagemErro(erro.response)
        })

    }

    salvarEntrevista = async () => {

        if (this.props.editar === false) {
            this.cadastrarEntrevista()
        }else {
            this.editarEntrevista(this.state.entrevistaEditar.id)
        } 
     }
    
    render(){
        const { onClose, showModal} = this.props;

        return (
            <Modal show={showModal} onHide={onClose} dialogClassName="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Entrevista</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup label="Data de início:  " htmlFor="inputDataInicio">
                        <DatePicker
                            id="inputDataInicio"
                            selected={this.state.dataSelecionada}
                            onChange={(date) => this.setState({ dataSelecionada: date })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="dd/MM/yyyy, HH:mm"
                            timeCaption="Hora"
                            className="form-control"
                            locale={ptBR}
                        />
                    </FormGroup>

                    <FormGroup label="Nome do Candidato: *" htmlFor="inputNomeCompleto">
                        <input type="text"
                                id="inputNomeCompleto"
                                className="form-control"
                                name="nomeCompleto"
                                placeholder="Digite o nome do candidato"
                                value={this.state.candidatoNome}
                                onChange={(e) => this.setState({candidatoNome: e.target.value})}/>
                    </FormGroup>

                    <FormGroup label="Fone do Candidato: *" htmlFor="inputFone">
                        <input type="number"
                                id="inputFone"
                                className="form-control"
                                name="fone"
                                placeholder="Digite o fone do candidato"
                                value={this.state.candidatoFone}
                                onChange={(e) => this.setState({candidatoFone: e.target.value})}/>
                    </FormGroup>

                    <FormGroup label="Observação: " htmlFor="inputObs">
                        <input type="text"
                                id="inputObs"
                                className="form-control"
                                name="obs"
                                placeholder="Digite a observação"
                                value={this.state.obs}
                                onChange={(e) => this.setState({obs: e.target.value})}/>
                    </FormGroup>                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                Fechar
                </Button>
                
                <Button variant="primary" onClick={this.salvarEntrevista}>
                Salvar
                </Button>

            </Modal.Footer>
            </Modal>
        )
    };
}