import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from 'react-router-dom'
import axios from "axios";

class CadastroQuestionario extends React.Component{

    state = {
        titulo: '',
        mensagemErro: null
    }

    cadastrar = () => {

        axios.post('http://localhost:8080/questionarios', {
            titulo: this.state.titulo
        }).then( response => {
            alert('Cadastro realizado com sucesso!')
            this.setState({ titulo: ''});
        }).catch( erro => {
            this.setState({mensagemErro: erro.response.data})
        })
    }

    addquestao = () => {
        this.props.history.push('/')
    }

    render(){
        return(
            <div className="row">
                <div className="col-lg-6" style={{position: 'relative'} }>
                    <div className="bs-component">
                        <Card title="Cadastro de Questionários">
                            <FormGroup label="Título: *" htmlFor="imputTitulo">
                                <input type="text" 
                                        id="imputTitulo" 
                                        className="form-control"
                                        name="titulo"
                                        onChange={e => this.setState({titulo: e.target.value})} 
                                        style={{ marginBottom: '1rem' }} />
                            </FormGroup>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Cadastrar</button>
                            <hr className="my-4" />
                            <button onClick={this.addquestao} type="button" className="btn btn-warning">Add Questão</button>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter( CadastroQuestionario )