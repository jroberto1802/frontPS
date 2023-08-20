import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from 'react-router-dom'
import MensagemService from "../app/services/MensagemService";
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroMensagem extends React.Component{

    state = {
        assunto: '',
        corpo: '',
        mensagemErro: null
    }

    constructor() {
        super();
        this.MensagemService = new MensagemService();
    }

    cadastrar = () => {

        if (!this.state.assunto) {
            mensagemErro('O campo assunto está nulo!');
            return;
        }
        
        if (!this.state.corpo) {
            mensagemErro('O campo corpo está nulo!');
            return;
        }

        this.MensagemService.cadastrar({
            assunto: this.state.assunto,
            corpo: this.state.corpo
        }).then( response => {
                mensagemSucesso('Cadastro realizado com sucesso!')
            }).catch( erro => {
                this.setState({mensagemErro: erro.response})
                mensagemErro(erro.response)
            })
    }

    cancelar = () => {
        this.props.history.push('/home')
    }

    render(){
        return(
            <div className="row">
                <div className="col-lg-5" style={{position: 'relative'} }>
                    <div className="bs-component">
                        <Card title="Cadastro de Mensagens">
                            <FormGroup label="Assunto: *" htmlFor="inputAssunto">
                                <input type="text" 
                                        id="inputAssunto" 
                                        className="form-control"
                                        name="assunto"
                                        onChange={e => this.setState({assunto: e.target.value})} 
                                        placeholder="Digite o assunto da mensagem"
                                />
                            </FormGroup>
                            <FormGroup label="" htmlFor="inputCorpo">
                                <textarea
                                    id="inputCorpo"
                                    className="form-control"
                                    name="corpo"
                                    value={this.state.corpo}
                                    onChange={e => this.setState({corpo: e.target.value})}
                                    rows="8"
                                    style={{ marginBottom: '1rem' }}
                                    placeholder="Digite o corpo da mensagem"
                                />
                            </FormGroup>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                                <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter( CadastroMensagem )