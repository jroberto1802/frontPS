import React from "react";
import Card from "../components/card";
import { withRouter } from 'react-router-dom'
import CadastroProcessoService from "../app/services/cadastroProcessoService";
import FormGroup from "../components/form-group";
import EntrevistaService from "../app/services/EntrevistaService";
import MensagemService from "../app/services/MensagemService";
import EntrevistasTable from "./entrevistas-table";
import LancarEntrevistaModal from "./modalLancarEntrevista";

class DetalharProcessos extends React.Component {
    constructor() {
        super();
        this.CadastroProcessoService = new CadastroProcessoService();
        this.EntrevistaService = new EntrevistaService();
        this.MensagemService = new MensagemService();
        this.state = {
            idProcessoSelecionado: null,
            processo: null,
            listaEntrevistas:[],
            modalLancarEntrevista: false,
            listaMensagens: []
        }
    }



    abrirLancarEntrevistaModal = () => {
        this.setState({ modalLancarEntrevista: true });
    }

    fecharLancarEntrevistaModal = () => {
        this.setState({ modalLancarEntrevista: false }, () => {
            const { idProcessoSelecionado } = this.state;
            this.buscarEntrevistaPorProcessoId(idProcessoSelecionado);
        });
    }

    formatarDataParaExibicao = (data) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' };
        return new Date(data).toLocaleString('pt-BR', options);
    }

    buscarMensagens() {
        this.MensagemService.listar().then(response => {
            this.setState({ listaMensagens: response.data });
          })
          .catch(error => {
            console.error('Erro ao buscar a lista de Mensagens:', error);
          });
    }

    componentDidMount() {
        const { idProcessoSelecionado } = this.props.match.params;
        if (idProcessoSelecionado) {
            this.setState({ idProcessoSelecionado });
        }
        this.buscarPorId(idProcessoSelecionado);
        this.buscarEntrevistaPorProcessoId(idProcessoSelecionado);
        this.setState({listaMensagens: this.buscarMensagens()})
    }

    buscarPorId = (id) => {
        try {
            this.CadastroProcessoService.buscarId(id).then(response => {
                this.setState({ processo: response.data });
            });
        } catch (error) {
            console.error('Erro ao buscar Processo por Id:', error);
        }    
    }

    buscarEntrevistaPorProcessoId = (id) => {
        try {
            this.EntrevistaService.buscarByProcesso(id).then(response => {
                this.setState({ listaEntrevistas: response.data });
            });
        } catch (error) {
            console.error('Erro ao buscar Processo por Id:', error);
        }    
    }

    render() {
        const { processo, listaEntrevistas, listaMensagens } = this.state;

        return (
            <div className="row">
                <div className="col-lg-12">
                    {processo ? (
                        <Card title={processo.nome}>
                            <div className="row">
                                <div className="col-lg-12" >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormGroup label="Data de Início" htmlFor="inputDataInicio">
                                                <input
                                                    type="text"
                                                    id="inputDataInicio"
                                                    className="form-control"
                                                    name="dataInicio"
                                                    value={this.formatarDataParaExibicao(processo.dataInicio)}
                                                    readOnly
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                                <FormGroup label="Tipo da Vaga" htmlFor="inputTipoVaga">
                                                    <input
                                                        type="text"
                                                        id="inputTipoVaga"
                                                        className="form-control"
                                                        name="tipoVaga"
                                                        value={`${processo.tipoVaga}`}
                                                        readOnly
                                                    />
                                                </FormGroup>
                                        </div>
                                        <div className="col-md-4">
                                            <FormGroup label="Turno da Vaga" htmlFor="inputTurnoVaga">
                                                <input
                                                    type="text"
                                                    id="inputTurnoVaga"
                                                    className="form-control"
                                                    name="turnoVaga"
                                                    value={`${processo.turnoVaga}`}
                                                    readOnly
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-4">
                                            <FormGroup label="Vagas" htmlFor="inputQtdVagas">
                                                <input
                                                    type="text"
                                                    id="inputQtdVagas"
                                                    className="form-control"
                                                    name="qtdVagas"
                                                    value={`${processo.qtdVagas}`}
                                                    readOnly
                                                />
                                            </FormGroup>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </Card>
                        
                    ) : (
                        <p>Carregando...</p>
                    )}
                </div>

                <div className="row mt-3">
                    <div className="col-md-12 text-right">
                        <div className="bs-component">
                            <button className="btn btn-warning btn-lg" onClick={this.abrirLancarEntrevistaModal}>
                                <div className="text-center"><i className="fa-solid fa-plus-circle"></i> <span className="hidden-xs">&nbsp;&nbsp;Entrevista</span> </div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <EntrevistasTable listaEntrevista={listaEntrevistas} listaMensagens={listaMensagens} processo={processo} />
                        </div>
                    </div>      
                </div>    
                {this.state.modalLancarEntrevista && (
                            <LancarEntrevistaModal
                                showModal={true}
                                onClose={this.fecharLancarEntrevistaModal}
                                processo={processo}
                            />
                )}
            </div>
        )
    }
}

export default withRouter(DetalharProcessos);
