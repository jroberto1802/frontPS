import React from "react";
import { withRouter } from 'react-router-dom'
import CadastroProcessoModal from "../views/modalCadastrarProcesso";
import Cardblock from "../components/cardblock";
import CadastroProcessoService from "../app/services/cadastroProcessoService";


class Home extends React.Component{

    state = {
        saldo: 0,
        modalAberto: false,
        processos: []
    }

    constructor(){
        super();
        this.cadastroProcessoService = new CadastroProcessoService();
    }

    abrirModal = () => {
        this.setState({ modalAberto: true });
    }

    fecharModal = () => {
        this.setState({ modalAberto: false });
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

    render(){
        return(
            <div class="container">
                <div className="jumbotron" >
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Esse é seu sistema de Processos Seletivos.</p>
                    <p className="lead">Processos em aberto:</p>
                    <div className="container">
                        <div className="row" >
                            {this.state.processos.map((processo, index) => (
                                <div className="col-md-3 mb-1" key={index} style={{ marginBottom: '0.5rem' }}>
                                    <Cardblock
                                        nomeProcesso={processo.nomeProcesso}
                                        tipoVaga={processo.tipoVaga}
                                        dataInicio={`Inicio em: ${processo.dataInicio}`}
                                        qtdVagas={processo.qtdVagas}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className="my-4" />
                    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                        <div style={{ display: 'flex', gap: '1rem' }}>
                        <a className="btn btn-primary btn-lg " 
                            role="button" onClick={this.abrirModal}>
                            <i className="fa fa-users"></i>  
                            Novo Processo
                        </a>
                        <a className="btn btn-danger btn-lg mr-1" 
                            href="https://bootswatch.com/flatly/#" 
                            role="button" onClick={this.abrirModal}>
                            <i className="fa fa-users"></i>  
                            Processos Finalizados
                        </a>
                        </div>
                        {this.state.modalAberto && (
                            <CadastroProcessoModal
                                showModal={true}
                                onClose={this.fecharModal}
                            />
                        )}
                    </p>
                </div>               
            </div>
        )
    }
}

export default withRouter( Home )
