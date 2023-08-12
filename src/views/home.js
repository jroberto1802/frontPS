import React from "react";
import { withRouter } from 'react-router-dom'
import CadastroProcessoModal from "../views/modalCadastrarProcesso";


class Home extends React.Component{

    state = {
        saldo: 0,
        modalAberto: false
    }

    abrirModal = () => {
        this.setState({ modalAberto: true });
    }

    fecharModal = () => {
        this.setState({ modalAberto: false });
    }

    render(){
        return(
            <div class="container">
                <div className="jumbotron" >
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Esse é seu sistema de Processos Seletivos.</p>
                    <p className="lead">Processos em aberto:</p>
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
