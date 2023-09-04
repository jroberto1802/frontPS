import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import EntrevistaService from '../app/services/EntrevistaService'; 
import CandidatoService from '../app/services/CandidatoService';
import { mensagemErro, mensagemSucesso } from '../components/toastr'
import StarRatingComponent from 'react-star-rating-component';
import 'bootswatch/dist/flatly/bootstrap.min.css';


export default class IniciarEntrevistaModal extends React.Component{

    constructor(props){
        super(props);
        this.CandidatoService = new CandidatoService();
        this.EntrevistaService = new EntrevistaService();
        this.state = {
            processo: this.props.processo,
            candidatoEditar: null,
            entrevistaEditar: null,
            nomeCompleto: '',
            idade: '',
            curso: '',
            faculdade: '',
            periodoAtual: '',
            cidade: '',
            uf: '',
            cep: '',
            turnoFaculdade: '',
            distancia: null,
            trabalha: false,
            salario: '',
            cnh: false,
            categoriaCnh: '',
            habilidades: '',
            diccao: null,
            postura: null,
            girias: null,
            pontualidade: null
        };
    }

    componentDidMount() {
        this.carregarDadosEditar();
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
            nomeCompleto: this.state.candidatoEditar.nomeCompleto,
            idade: this.state.candidatoEditar.idade,
            curso: this.state.candidatoEditar.curso,
            faculdade: this.state.candidatoEditar.faculdade,
            periodoAtual: this.state.candidatoEditar.periodoAtual,
            cidade: this.state.candidatoEditar.cidade,
            uf: this.state.candidatoEditar.uf,
            cep: this.state.candidatoEditar.cep,
            distancia: this.state.candidatoEditar.distancia,
            turnoFaculdade: this.state.candidatoEditar.turnoFaculdade
        });
    }

    validar(){
        const msgs = []

        if (!this.state.diccao) {
            msgs.push('Dê uma nota para Dicção do candidato!');
        }
        if (!this.state.girias) {
            msgs.push('Dê uma nota para as Gírias do candidato!');
        }
        if (!this.state.pontualidade) {
            msgs.push('Dê uma nota para Pontualidade do candidato!');
        }
        if (!this.state.postura) {
            msgs.push('Dê uma nota para Postura do candidato!');
        }

        return msgs;
    }

    definirObs = () => {

        let {ocupacao, possuiCnh, possuiHabilidades} = ''

        if (this.state.trabalha){
            ocupacao = `O candidato está trabalhando atualmente: ${this.state.salario} - `
        } else {
            ocupacao = `O candidato NÃO está trabalhando atualmente - `
        }

        if (this.state.cnh){
            possuiCnh = `Possui CNH: ${this.state.categoriaCnh} - `
        } else {
            possuiCnh = `NÃO possui CNH - `
        }

        if (this.state.habilidades){
            possuiHabilidades = `Habilidade(s): ${this.state.habilidades}.`
        } else {
            possuiHabilidades = `Sem habilidades descritas.`
        }

        return ocupacao + possuiCnh + possuiHabilidades;
    }

    editarCandidato = async (id) => {
            
        const candidato = {
            email: this.state.candidatoEditar.email,
            fone: this.state.candidatoEditar.fone,
            nomeCompleto: this.state.candidatoEditar.nomeCompleto,
            idade: this.state.candidatoEditar.idade,
            curso: this.state.candidatoEditar.curso,
            faculdade: this.state.candidatoEditar.faculdade,
            logradouro: this.state.candidatoEditar.logradouro,
            periodoAtual: this.state.candidatoEditar.periodoAtual,
            cidade: this.state.candidatoEditar.cidade,
            uf: this.state.candidatoEditar.uf,
            cep: this.state.candidatoEditar.cep,
            turnoFaculdade: this.state.candidatoEditar.turnoFaculdade,
            sttCandidato: 'EM_ANALISE',
            distancia: this.state.candidatoEditar.distancia
        };
    
        try {
            const response = await this.CandidatoService.alterar(id, candidato);
            return response.data;
        } catch (erro) {
            this.setState({ mensagemErro: erro.response });
            mensagemErro(erro.response);
            return null;
        }
    };

    iniciarEntrevista = async (id) => {
        const msgs = this.validar();

        if(msgs && msgs.length >0){
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            })
            return false;
       }

       const candidatoMontado = await this.editarCandidato(this.props.candidatoSelecionado);

       const entrevista = {
            data: this.state.entrevistaEditar.data,
            obs: `${this.state.entrevistaEditar.obs} ${this.definirObs()}`,
            diccao: this.state.diccao,
            postura: this.state.postura,
            girias: this.state.girias,
            pontualidade: this.state.pontualidade,
            candidato: candidatoMontado
        }

       this.EntrevistaService.alterar(id, entrevista).then( response => {
            mensagemSucesso('Entrevista realizada com sucesso!')
            this.props.onClose();
        }).catch( erro => {
            this.setState({mensagemErro: erro.response})
            mensagemErro(erro.response)
        })

    }
 
    fecharModal = () => {
        this.props.onClose(); 
    }
 
    render(){
        const { onClose, showModal} = this.props;

        return (
            <Modal show={showModal} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Entrevistar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>{this.state.nomeCompleto}</h3>
                    <h5>{this.state.idade} anos, {this.state.curso} - {this.state.turnoFaculdade} - {this.state.faculdade} - {this.state.periodoAtual}</h5>
                <h5>{this.state.cidade}-{this.state.uf} - CEP: {this.state.cep} - {this.state.distancia} km da Softcom {this.props.processo.pdv.nome}</h5>
                <hr />
                <div className="row">
                    <div className="col-md-8">
                        <div className='row'>
                            <h5>O candidato trabalha atualmente?</h5>
                            <div className='row'>
                                <div className='col-md-1 mt-1'>
                                    <div className="form-check form-switch" >
                                        <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="switchInput"
                                        checked={this.state.trabalha}
                                        onChange={() => this.setState({ trabalha: !this.state.trabalha })}
                                        style={{ width: '40px', height: '24px', cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-11'>
                                    {this.state.trabalha && (
                                        <div>
                                            <input type="text" 
                                                className="form-control" 
                                                placeholder="Descreva função e salário" 
                                                onChange={(e) => this.setState({salario: e.target.value})}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className='row'>
                            <h5>O candidato possui CNH?</h5>
                            <div className='row'>
                                <div className='col-md-1 mt-1' >
                                    <div className="form-check form-switch" >
                                        <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="switchInput"
                                        checked={this.state.cnh}
                                        onChange={() => this.setState({ cnh: !this.state.cnh })}
                                        style={{ width: '40px', height: '24px', cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-11'>
                                    {this.state.cnh && (
                                        <div>
                                            <select className="form-control" 
                                                    onChange={(e) => this.setState({categoriaCnh: e.target.value})}>
                                                <option value="">Selecione...</option>
                                                <option value="Categoria 'A'">Categoria 'A'</option>
                                                <option value="Categoria 'B'">Categoria 'B'</option>
                                                <option value="Categorias 'A' e 'B'">Categorias 'A' e 'B'</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className='row'>
                            <h5>Habilidades: </h5>
                            <div className='row'>
                                <div className='mt-1'>                         
                                    <textarea
                                        id="inputHabilidades"
                                        className="form-control"
                                        name="habilidades"
                                        value={this.state.habilidades}
                                        onChange={e => this.setState({habilidades: e.target.value})}
                                        rows="9"
                                        style={{ marginBottom: '1rem' }}
                                        placeholder="Digite as principais habilidades do candidato"
                                    />
                                </div>   
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className='jumbotron'>
                            <div>
                                <h5>Postura do candidato:</h5>
                                <StarRatingComponent
                                className="star-rating"
                                name="postura"
                                value={this.state.postura}
                                onStarClick={value => this.setState({ postura: value })}
                                />
                            </div>
                            <br/>
                            <div>
                                <h5>Dicção do candidato:</h5>
                                <StarRatingComponent
                                className="star-rating"
                                name="diccao"
                                value={this.state.diccao}
                                onStarClick={value => this.setState({ diccao: value })}
                                />
                            </div>
                            <br/>
                            <div>
                                <h5>Pontualidade do candidato:</h5>
                                <StarRatingComponent
                                className="star-rating"
                                name="pontualidade"
                                value={this.state.pontualidade}
                                onStarClick={value => this.setState({ pontualidade: value })}
                                />
                            </div>
                            <br/>
                            <div>
                                <h5>Girias do candidato:</h5>
                                <StarRatingComponent
                                className="star-rating"
                                name="girias"
                                value={this.state.girias}
                                onStarClick={value => this.setState({ girias: value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                Fechar
                </Button>
                
                <Button variant="primary" onClick={() => this.iniciarEntrevista(this.props.entrevistaSelecionada)}>
                Salvar
                </Button>

            </Modal.Footer>
            </Modal>
        )
    };
}