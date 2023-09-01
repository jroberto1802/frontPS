import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from 'react-router-dom'
import CadastroPDVService from "../app/services/cadastroPDVservice";
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroPDV extends React.Component{

    state = {
        nome: '',
        cep: '',
        mensagemErro: null
    }

    constructor() {
        super();
        this.service = new CadastroPDVService();
    }

    cadastrar = () => {

        if (!this.state.nome) {
            mensagemErro('O campo nome está nulo!');
            return;
        }
        
        if (!this.state.cep) {
            mensagemErro('O campo CEP está nulo!');
            return;
        }

        this.service.cadastrar({
            nome: this.state.nome,
            cep: this.state.cep.replace(/[^\w\s]/gi, '')
        }).then( response => {
                this.setState({ nome: '', cep: '' });
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
            <div className="container" style={{ marginTop: "110px"}}>
                <div className="row">
                    <div className="col-lg-4" style={{position: 'relative'} }>
                        <div className="bs-component">
                            <Card title="Cadastro de PDVs">
                                <FormGroup label="Nome: *" htmlFor="inputNome">
                                    <input type="text" 
                                            id="inputNome" 
                                            className="form-control"
                                            name="nome"
                                            placeholder="Digite o nome do PDV"
                                            onChange={e => this.setState({nome: e.target.value})} />
                                </FormGroup>
                                <FormGroup label="CEP: *" htmlFor="inputCep">
                                    <input type="text" 
                                            id="inputCep" 
                                            className="form-control"
                                            name="cep"
                                            placeholder="Digite o CEP do PDV"
                                            onChange={e => this.setState({cep: e.target.value})}
                                            style={{ marginBottom: '1rem' }} />
                                </FormGroup>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                                    <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter( CadastroPDV )