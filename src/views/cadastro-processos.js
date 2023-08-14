import React from "react";
import Card from "../components/card";
import { withRouter } from 'react-router-dom'
import { mensagemSucesso, mensagemErro } from '../components/toastr'
import CadastroProcessoService from "../app/services/cadastroProcessoService";
import FormGroup from "../components/form-group";


class CadastroProcessos extends React.Component {
    constructor() {
        super();
        this.CadastroProcessoService = new CadastroProcessoService();
    }

    state = {
        idProcessoSelecionado: null,
        processo: null,
        listaEntrevistas: []
    }

    componentDidMount() {
        const { idProcessoSelecionado } = this.props.match.params;
        if (idProcessoSelecionado) {
            this.setState({ idProcessoSelecionado });
        }
        this.buscarPorId(idProcessoSelecionado);
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

    render() {
        const { processo } = this.state;

        return (
            <div className="row">
                <div className="col-lg-6" style={{position: 'relative'} }>
                    {processo ? (
                        <Card title={`Processo: ${processo.nome}`}>
                                <div className="col-md-12">
                                    <FormGroup label="Data de Início: *" htmlFor="inputDataInicio">
                                        <input
                                            type="text"
                                            id="inputDataInicio"
                                            className="form-control"
                                            name="dataInicio"
                                            value={`${processo.dataInicio}`}
                                            readOnly
                                        />
                                    </FormGroup>
                                </div>
                                <div className="row">
                                <div className="col-md-4">
                                        <FormGroup label="Tipo da Vaga:" htmlFor="inputTipoVaga">
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
                                        <FormGroup label="Turno da Vaga: *" htmlFor="inputTurnoVaga">
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
                                        <FormGroup label="Vagas: *" htmlFor="inputQtdVagas">
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
                        </Card>
                    ) : (
                        <p>Carregando...</p>
                    )}
                </div>
                <div>
                                
                </div>       
            </div>
        )
    }
}

export default withRouter(CadastroProcessos);
