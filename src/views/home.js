import React from "react";
import { withRouter } from 'react-router-dom'
import CadastroProcessoModal from "../views/modalCadastrarProcesso";
import ProcessosFinalizadosModal from "../views/modalProcessosFinalizados";
import Cardblock from "../components/cardblock";
import CadastroProcessoService from "../app/services/cadastroProcessoService";
import { mensagemSucesso } from '../components/toastr'
import processosFinalizadosTable from "./processosFinalizadosTable";


class Home extends React.Component{

    state = {
        saldo: 0,
        modalCadastroProcesso: false,
        modalProcessosFinalizados: false,
        processos: []
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
            dataFinal: novaData.toISOString().slice(0, 19)+'Z'
        };
    
        try {
            await this.cadastroProcessoService.alterar(id, data);
            this.listarProcessos(); // Atualize a lista de processos após a alteração
            mensagemSucesso(`Processo Seletivo ${id} finalizado com sucesso!`)
        } catch (error) {
            console.error("Erro na requisição PUT:", error);
        }
    }

    render(){
        return(
            <div class="container">
                <div className="jumbotron" >
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Esse é seu sistema de Processos Seletivos.</p>
                    <p className="lead">Processos em aberto:</p>
                    <div className="container">
                        <div className="row custom-column">
                            {this.state.processos.map((processo, index) => (
                                <div className="col-md-3 mb-3" key={index}>
                                    <Cardblock
                                        nome={processo.nome}
                                        tipoVaga={processo.tipoVaga}
                                        dataInicio={processo.dataInicio}
                                        qtdVagas={processo.qtdVagas}>

                                        <div style={{ display: "flex", gap: '1rem' }}>
                                            <button onClick={() => this.atualizarDataFinal(processo.id)} type="button" className="btn btn-danger btn-sm">Finalizar</button>
                                            <button onClick={this.cancelar} type="button" className="btn btn-success btn-sm">Detalhar</button>
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
                            <i className="fa fa-users"></i>  
                            Novo Processo
                        </a>
                        <a className="btn btn-danger btn-lg mr-1" 
                            role="button" onClick={this.abrirProcessosFinalizadosModal}>
                            <i className="fa fa-users"></i>  
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
