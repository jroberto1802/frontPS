import React from 'react';
import { Form } from 'react-bootstrap';
import Card from "../components/card";
import { withRouter } from 'react-router-dom'
import CadastroProcessoService from "../app/services/cadastroProcessoService";
import FormGroup from "../components/form-group";
import EntrevistaService from "../app/services/EntrevistaService";
import CandidatoService from "../app/services/CandidatoService";
import MensagemService from "../app/services/MensagemService";
import LancarEntrevistaModal from "./modalLancarEntrevista";
import IniciarEntrevistaModal from "./modalIniciarEntrevista";
import StatusLED from "../components/ledstatus";
import { mensagemErro, mensagemSucesso } from '../components/toastr'
import ObservacaoModal from './modalObservacao';

class DetalharProcessos extends React.Component {
    constructor() {
        super();
        this.CadastroProcessoService = new CadastroProcessoService();
        this.EntrevistaService = new EntrevistaService();
        this.MensagemService = new MensagemService();
        this.CandidatoService = new CandidatoService();
        this.state = {
            idProcessoSelecionado: null,
            processo: null,
            listaEntrevistas:[],
            modalLancarEntrevista: false,
            modalIniciarEntrevista: false,
            listaMensagens: [],
            menssagemSelecionada: '',
            candidatoSelecionado: null,
            entrevistaSelecionada: null,
            nomeCompleto: '',
            showDetails: false,
            editar: false,
            observacaoModalAbrir: false,
            observacaoModalConteudo: '',
            clickPosition: { x: 0, y: 0 },
        }
    }

    componentDidMount() {
        const { idProcessoSelecionado } = this.props.match.params;
        if (idProcessoSelecionado) {
            this.setState({ idProcessoSelecionado });
        }
        this.buscarProcessoPorId(idProcessoSelecionado);
        this.buscarEntrevistaPorProcessoId(idProcessoSelecionado);
        this.setState({listaMensagens: this.buscarMensagens()})
    }

    abrirLancarEntrevistaModal = () => {
        this.setState({ modalLancarEntrevista: true });
    }

    abrirEditarEntrevistaModal = (entrevista, candidato) => {
        this.setState({ editar: true });
        this.setState({ candidatoSelecionado: candidato });
        this.setState({ entrevistaSelecionada: entrevista });
        this.setState({ modalLancarEntrevista: true });
    }

    fecharLancarEntrevistaModal = () => {
        this.setState({ modalLancarEntrevista: false }, () => {
            const { idProcessoSelecionado } = this.state;
            this.buscarEntrevistaPorProcessoId(idProcessoSelecionado);
        });
        this.setState({ editar: false });
    }

    abrirIniciarEntrevistaModal = (entrevista, candidato) => {
        this.setState({ candidatoSelecionado: candidato });
        this.setState({ entrevistaSelecionada: entrevista });
        this.setState({ modalIniciarEntrevista: true });
    }

    fecharIniciarEntrevistaModal = () => {
        this.setState({ modalIniciarEntrevista: false }, () => {
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

    buscarProcessoPorId = (id) => {
        try {
            this.CadastroProcessoService.buscarId(id).then(response => {
                this.setState({ processo: response.data });
            });
        } catch (error) {
            console.error('Erro ao buscar Processo por Id:', error);
        }    
    }

    formatarDataParaExibicaoTable = (data) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' };
        const dataFormatada = new Date(data).toLocaleString('pt-BR', options);
        
        const partesData = dataFormatada.split(' ');
        const dataFormatoFinal = `${partesData[0]} às ${partesData[1]}`;
        
        return dataFormatoFinal;
    }

    buscarEntrevistaPorProcessoId = async (id) => {
        try {
            const response = await this.EntrevistaService.buscarByProcesso(id);
            console.log("---------------------------");
            console.log(response.data);
            console.log(this.state.listaMensagens);
            console.log("---------------------------");
            this.setState({ listaEntrevistas: response.data });
        } catch (error) {
            console.error('Erro ao buscar entrevistas por processo:', error);
        }    
    }

    handleMensagemChange = (e, linhaId) => {
        const menssagemAtualizada = { ...this.state.menssagemSelecionada };
        menssagemAtualizada[linhaId] = e.target.value;
        this.setState({menssagemSelecionada: menssagemAtualizada});
    };

    formatarMensagem = (processo, listaEntrevista, mensagem) => {
        if (mensagem.includes('!nome!')) {
            mensagem = mensagem.replace('!nome!', listaEntrevista.candidato.nomeCompleto);
        }
        if (mensagem.includes('!tipoVaga!')) {
            mensagem = mensagem.replace('!tipoVaga!', processo.tipoVaga);
        }
        if (mensagem.includes('!pdv.nome!')) {
            mensagem = mensagem.replace('!pdv.nome!', processo.pdv.nome);
        }
        if (mensagem.includes('!funcao!')) {
            mensagem = mensagem.replace('!funcao!', processo.funcao);
        }
        if (mensagem.includes('!data!')) {
            mensagem = mensagem.replace('!data!', this.formatarDataParaExibicaoTable(listaEntrevista.data));
        }
        return mensagem;
    };
    

    gerarLinkWhatsapp = (processo, listaEntrevista, mensagem) => {
        if (listaEntrevista && listaEntrevista.candidato && listaEntrevista.candidato.fone) {
            const numeroTelefone = listaEntrevista.candidato.fone;
            const linkWhatsapp = `https://web.whatsapp.com/send/?phone=${numeroTelefone}&text=${encodeURIComponent(mensagem)}&type=phone_number&app_absent=0`;
            return this.formatarMensagem(processo, listaEntrevista, linkWhatsapp); 
        }
        return null;
    };

    deletarEntrevistaCandidato = async (entrevistaId, candidatoId) => {
        const confirmarDelete = window.confirm("Tem certeza de que deseja deletar esta entrevista e candidato?");
    
        if (!confirmarDelete) {
            return; 
        }
    
        try {
            await this.EntrevistaService.deletar(entrevistaId);
            mensagemSucesso('Entrevista deletada com sucesso!');
            
            this.buscarEntrevistaPorProcessoId(this.state.idProcessoSelecionado);
        } catch (error) {
            console.error('Não foi possível deletar a entrevista', error);
            mensagemErro(`Não foi possível deletar a entrevista: ${error}`);
        }
    
        try {
            await this.CandidatoService.deletar(candidatoId);
            mensagemSucesso('Candidato deletado com sucesso!');
        } catch (error) {
            console.error('Não foi possível deletar o candidato', error);
            mensagemErro(`Não foi possível deletar o candidato: ${error}`);
        }
    }

    toggleDetails = () => {
        this.setState(prevState => ({
            showDetails: !prevState.showDetails
        }));
    };

    observacaoLimitada = (observacao) => {
        if (observacao.length > 25) {
            return observacao.substring(0, 25) + '...';
        }
        return observacao;
    };

    abrirObservacaoModal = (e, observacao) => {
        if (observacao) {
            const clickPosition = {
                x: e.clientX,
                y: e.clientY,
            };
            this.setState({
                observacaoModalConteudo: observacao,
                observacaoModalAbrir: true,
                clickPosition: clickPosition,
            });
        }
    };
    

    fecharObservacaoModal = () => {
        this.setState({
            observacaoModalAbrir: false,
            observacaoModalConteudo: '',
        });
    };

    rows = () => {
        console.log("--------------------------------");
        console.log(this.state.listaEntrevistas);
        console.log("--------------------------------");

        return this.state.listaEntrevistas.map(listaEntrevista => {
            const menssagemSelecionada = this.state.menssagemSelecionada[listaEntrevista.id];
            const linkWhatsapp = this.gerarLinkWhatsapp(this.state.processo, listaEntrevista, menssagemSelecionada);
    
            return(
                <tr key={listaEntrevista.id}>
                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                        <StatusLED status={listaEntrevista.candidato.sttCandidato} />
                    </td>
                    <td style={{ verticalAlign: 'middle', textAlign: 'left' }}>{listaEntrevista.candidato.nomeCompleto}</td>
                    <td style={{ verticalAlign: 'middle', textAlign: 'left' }}>{this.formatarDataParaExibicaoTable(listaEntrevista.data)}</td>
                    <td
                        onClick={(e) => this.abrirObservacaoModal(e, listaEntrevista.obs)}
                        style={{ cursor: 'pointer' }}
                    >
                        {this.observacaoLimitada(listaEntrevista.obs)}
                    </td>
                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                        <div className="row" style={{ margin: '0px' }}>
                            <div className="col-md-9" style={{ padding: '0px' }}>
                                <Form.Group controlId={`inputMensagem-${listaEntrevista.id}`} htmlFor={`inputMensagem-${listaEntrevista.id}`} className="mb-0">
                                    <Form.Control
                                        as="select"
                                        value={this.state.menssagemSelecionada[listaEntrevista.id] || ""}
                                        onChange={(e) => this.handleMensagemChange(e, listaEntrevista.id)}
                                    >
                                        <option value="">Selecione...</option>
                                        {
                                            (this.state.listaMensagens ?? []).map(mensagem => (
                                                <option key={mensagem.id} value={mensagem.corpo}>
                                                    {mensagem.assunto}
                                                </option>
                                            ))
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </div>
    
                            <div className="col-md-3" style={{ padding: '0px' }} > 
                                {linkWhatsapp ? (
                                    <a className="btn btn-outline-success btn-md" 
                                    role="button" href={linkWhatsapp} 
                                    target="_blank">
                                        <i className="fab fa-whatsapp fa-xl"/>
                                    </a>
                                ) : (
                                    <button disabled>Enviar Mensagem</button>
                                )}
                            </div>
    
                        </div> 
                    </td>
                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                        <a className="btn btn-outline-primary btn-md" 
                            role="button"
                            onClick={() => this.abrirIniciarEntrevistaModal(listaEntrevista.id, listaEntrevista.candidato.id)}>
                            <i className="fa-solid fa-rocket fa-xl" />
                        </a>
                    </td>
                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                        <div className="row" >
                            <div className="col-md-6" style={{ cursor: 'pointer' }}>
                                <a className="btn btn-outline-warning btn-md align-items-center"  onClick={() => {this.abrirEditarEntrevistaModal(listaEntrevista.id, listaEntrevista.candidato.id)}}>
                                    <i className="fa-solid fa-pen-to-square fa-xl" />               
                                </a>
                            </div>
                            <div className="col-md-6" style={{ cursor: 'pointer' }}>
                                <a className="btn btn-outline-danger btn-md align-items-center" onClick={() => {this.deletarEntrevistaCandidato(listaEntrevista.id, listaEntrevista.candidato.id)}}>
                                    <i className="fa-solid fa-trash fa-xl" />
                                </a>
                            </div>
                        </div>
                    </td>
                </tr>
                
            )
        })
    }

    render() {
        const { processo, editar, entrevistaSelecionada, candidatoSelecionado, clickPosition  } = this.state;

        return (
            <div className="row">
                <div className="col-lg-12">
                    {processo ? (
                        <Card title={processo.nome} subtitle={'Processo Seletivo'}>
                            <div className="row">
                                <div className="col-lg-12" >
                                    <div className="row">
                                        <div className="col-md-6">
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
                                        <div className="col-md-6">
                                            <FormGroup label="Função da Vaga" htmlFor="inputFuncao">
                                                <input
                                                    type="text"
                                                    id="inputFuncao"
                                                    className="form-control"
                                                    name="funcao"
                                                    value={processo.funcao}
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
                    <div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'center' }}>Status</th>
                                    <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'left' }}>Candidato</th>
                                    <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'left' }}>Data</th>
                                    <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'left' }}>Observação</th>
                                    <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'left' }}>Mensagem</th>
                                    <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'center' }}>Entrevistar</th>
                                    <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'center' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.rows()}
                            </tbody>
                        </table>
                    </div>
                </div>    
                {this.state.modalLancarEntrevista && (
                    <LancarEntrevistaModal
                        showModal={true}
                        onClose={this.fecharLancarEntrevistaModal}
                        processo={processo}
                        editar={editar}
                        candidatoSelecionado={candidatoSelecionado}
                        entrevistaSelecionada={entrevistaSelecionada}
                    />
                )}
                {this.state.modalIniciarEntrevista && (
                    <IniciarEntrevistaModal
                        showModal={true}
                        onClose={this.fecharIniciarEntrevistaModal}
                        processo={processo}
                        candidatoSelecionado={candidatoSelecionado}
                        entrevistaSelecionada={entrevistaSelecionada}
                    />
                )}
                {this.state.observacaoModalAbrir && (
                    <ObservacaoModal
                        showModal={this.state.observacaoModalAbrir}
                        onClose={this.fecharObservacaoModal}
                        observacaoModalConteudo={this.state.observacaoModalConteudo}
                        clickPosition={this.state.clickPosition}
                    />                        
                )}  
            </div>
        )
    }
}

export default withRouter(DetalharProcessos);
