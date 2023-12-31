import React from "react";
import { withRouter } from 'react-router-dom'
import CadastroProcessoModal from "../views/modalCadastrarProcesso";
import ProcessosFinalizadosModal from "../views/modalProcessosFinalizados";
import Cardblock from "../components/cardblock";
import CadastroProcessoService from "../app/services/cadastroProcessoService";
import { mensagemSucesso } from '../components/toastr'



class Home extends React.Component{

    state = {
        saldo: 0,
        modalCadastroProcesso: false,
        modalProcessosFinalizados: false,
        processos: [],
        idProcessoSelecionado: null
    }

    constructor(){
        super();
        this.cadastroProcessoService = new CadastroProcessoService();
    }

    abrirCadastroProcessoModal = () => {
        this.setState({ modalCadastroProcesso: true });
    }

    fecharCadastroProcessoModal = () => {
        this.setState({ modalCadastroProcesso: false });
        this.listarProcessos();
    }

    abrirProcessosFinalizadosModal = () => {
        this.setState({ modalProcessosFinalizados: true });
    }

    fecharProcessosFinalizadosModal = () => {
        this.setState({ modalProcessosFinalizados: false });
        this.listarProcessos();
    }

    listarProcessos() {
        this.cadastroProcessoService.listar().then(response => {
                this.setState({ processos: response.data });
            })
            .catch(error => {
                console.error('Erro ao obter os dados da API:', error);
            });
    }

    componentDidMount() {
        this.listarProcessos();
    }

    

    atualizarDataFinal = async (id) => {
        const novaData = new Date()
        novaData.setHours(novaData.getHours() - 3);

        const data = {
            dataFinal: novaData
        };
    
        try {
            await this.cadastroProcessoService.alterar(id, data);
            this.listarProcessos(); 
            mensagemSucesso(`Processo Seletivo ${id} finalizado com sucesso!`)
        } catch (error) {
            console.error("Erro na requisição PUT:", error);
        }
    }

    render(){
        return(
            <div className="container" style={{ marginTop: "110px"}}>
                <div className="jumbotron" >
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Esse é seu sistema de Processos Seletivos.</p>
                    <p className="lead">Processos em aberto:</p>
                    <div className="container">
                        <div className="row">
                            {this.state.processos.map((processo, index) => (
                                <div className="col-md-2" key={index}>
                                    <Cardblock
                                        nome={processo.nome}
                                        tipoVaga={processo.tipoVaga}
                                        dataInicio={processo.dataInicio}
                                        qtdVagas={processo.qtdVagas}>
                                            
                                        <div style={{ display: "flex", justifyContent: "space-between"}}>
                                            <button onClick={() => this.atualizarDataFinal(processo.id)} type="button" className="btn btn-danger custom-btn-sm">Finalizar</button>
                                            <button onClick={() => {
                                                        this.setState({ idProcessoSelecionado: processo.id });
                                                        this.props.history.push(`/detalhar-processos/${processo.id}`);
                                                        }}
                                                    type="button" 
                                                    className="btn btn-success custom-btn-sm">Detalhar</button>
                                        </div>
                                    </Cardblock>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className="my-4" />
                    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a className="btn btn-primary btn-lg " 
                                role="button" onClick={this.abrirCadastroProcessoModal}>
                                <i className="fa fa-users" style={{ marginRight: '0.5em' }}></i>  
                                Novo Processo
                            </a>
                            <a className="btn btn-danger btn-lg mr-1" 
                                role="button" onClick={this.abrirProcessosFinalizadosModal}>
                                <i className="fas fa-archive" style={{ marginRight: '0.5em' }}></i>  
                                Processos Finalizados
                            </a>
                        </div>
                        {this.state.modalCadastroProcesso && (
                            <CadastroProcessoModal
                                showModal={true}
                                onClose={this.fecharCadastroProcessoModal}
                            />
                        )}
                        {this.state.modalProcessosFinalizados && (
                            <ProcessosFinalizadosModal
                                showModal={true}
                                onClose={this.fecharProcessosFinalizadosModal}
                            />
                        )}
                    </p>
                </div>               
            </div>
        )
    }
}

export default withRouter( Home )
