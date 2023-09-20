import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from 'react-router-dom'
import CadastroPDVService from "../app/services/cadastroPDVservice";
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroPDV extends React.Component{

    

    constructor() {
        super();
        this.CadastroPDVService = new CadastroPDVService();
        this.state = {
            nome: '',
            cep: '',
            listaPdvs: [],
            mensagemErro: null,
            editar: false,
            pdvSelecionado: null
        }
    }

    componentDidMount() {
        this.buscarPdvs();
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

        this.CadastroPDVService.cadastrar({
            nome: this.state.nome,
            cep: this.state.cep.replace(/[^\w\s]/gi, '')
        }).then( response => {
                mensagemSucesso('Cadastro realizado com sucesso!')
                this.setState({ nome: '', cep: '' });
                this.buscarPdvs()
            }).catch( erro => {
                this.setState({mensagemErro: erro.response})
                mensagemErro(erro.response)
            })

        this.buscarPdvs()
    }

    alterar = async (id) => {

        if (!this.state.nome) {
            mensagemErro('O campo nome está nulo!');
            return;
        }
        
        if (!this.state.cep) {
            mensagemErro('O campo CEP está nulo!');
            return;
        }

        if (typeof this.state.cep === 'string') {
            const pdvMontado = {
                nome: this.state.nome,
                cep: this.state.cep.replace(/[^\w\s]/gi, '')
            }
    
            await this.CadastroPDVService.alterar(id, pdvMontado)
                .then(response => {
                    mensagemSucesso('PDV alterado com sucesso!')
                    this.buscarPdvs()
                    this.setState({ editar: false, nome: '', cep: '' });
                })
                .catch(erro => {
                    this.setState({ mensagemErro: erro.response })
                    mensagemErro(erro.response)
                })
        }
    }

    buscarPdvs = async () => {
        try {
            const response = await this.CadastroPDVService.listar();
            this.setState({ listaPdvs: response.data });
        } catch (error) {
            console.error('Erro ao buscar PDVs:', error);
        }    
    }

    cancelar = () => {
        this.props.history.push('/home')
    }

    deletarPdv = async (id) => {
        const confirmarDelete = window.confirm("Tem certeza de que deseja deletar este PDV?");
    
        if (!confirmarDelete) {
            return; 
        }
    
        try {
            await this.CadastroPDVService.deletar(id);
            mensagemSucesso('PDV deletado com sucesso!');
            this.buscarPdvs();
        } catch (error) {
            console.error('Não foi possível deletar a entrevista', error);
            mensagemErro(`Não foi possível deletar a entrevista: ${error}`);
        }
    
    }

    editarPdv = async (id) => {
        try {
            const response = await this.CadastroPDVService.listarById(id);
            this.setState({ pdvSelecionado: response.data });
        } catch (error) {
            console.error('Erro ao buscar PDVs:', error);
        }
        this.setState({ editar: true, nome: this.state.pdvSelecionado.nome, cep: this.state.pdvSelecionado.cep});
    }

    rows = () => {

        return this.state.listaPdvs.map(listaPdvs => {
    
            return(
                <tr key={listaPdvs.id}>
                    <td style={{ verticalAlign: 'middle', textAlign: 'left' }}>{listaPdvs.id}</td>
                    <td style={{ verticalAlign: 'middle', textAlign: 'left' }}>{listaPdvs.nome}</td>
                    <td style={{ verticalAlign: 'middle', textAlign: 'left' }}>{listaPdvs.cep}</td>
                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                        <div className="row">
                            <div className="col-md-6" style={{ cursor: 'pointer' }}>
                                <button className="btn btn-outline-warning btn-md align-items-center" onClick={() => {this.editarPdv(listaPdvs.id)}}>
                                    <i className="fa-solid fa-pen-to-square fa-xl" />               
                                </button>
                            </div>
                            <div className="col-md-6" style={{ cursor: 'pointer' }}>
                                <button className="btn btn-outline-danger btn-md align-items-center" onClick={() => {this.deletarPdv(listaPdvs.id)}}>
                                    <i className="fa-solid fa-trash fa-xl" />
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        })
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
                                            value={this.state.nome}
                                            onChange={e => this.setState({nome: e.target.value})} />
                                </FormGroup>
                                <FormGroup label="CEP: *" htmlFor="inputCep">
                                    <input type="text" 
                                            id="inputCep" 
                                            className="form-control"
                                            name="cep"
                                            value={this.state.cep}
                                            onChange={e => this.setState({cep: e.target.value})}
                                            style={{ marginBottom: '1rem' }} />
                                </FormGroup>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button onClick={this.state.editar ? () => this.alterar(this.state.pdvSelecionado.id) : this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                                    <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6" style={{ margin: "30px 0px"}}>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'left' }}>Código</th>
                                    <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'left' }}>Nome</th>
                                    <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'left' }}>CEP</th>
                                    <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'center'}}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.rows()}
                            </tbody>
                        </table>
                    </div>
            </div>
        )
    }
}

export default withRouter( CadastroPDV )