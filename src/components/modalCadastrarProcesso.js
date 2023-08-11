import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import CadastroProcessoService from '../app/services/cadastroProcessoService';
import { mensagemErro } from '../components/toastr'
import { mensagemSucesso } from '../components/toastr'

export default class CadastroProcessoModal extends React.Component{

    state = {
        nome: '',
        qtdVagas: '',
        tipoVaga: '',
        turnoVaga: '',
        pdv: null
    };

    constructor(){
        super();
        this.service = new CadastroProcessoService();
    }

    cadastrar = () => {

        if (!this.state.nome) {
            mensagemErro('O campo Nome está nulo!');
            return;
        }
        
        if (!this.state.qtdVagas) {
            mensagemErro('O campo Vagas está nulo!');
            return;
        }

        if (!this.state.tipoVaga) {
            mensagemErro('O campo Tipo da Vaga está nulo!');
            return;
        }

        if (!this.state.turnoVaga) {
            mensagemErro('O campo Turno da Vaga está nulo!');
            return;
        }

        this.service.cadastrar({
            nome: this.state.nome,
            qtdVagas: this.state.qtdVagas,
            tipoVaga: this.state.tipoVaga,
            turnoVaga: this.state.turnoVaga,
            pdv: this.state.pdv

        }).then( response => {
                this.setState({nome: '', qtdVagas: '', tipoVaga: '', turnoVaga: '', pdv: ''});
                mensagemSucesso('Cadastro realizado com sucesso!')
            }).catch( erro => {
                this.setState({mensagemErro: erro.response})
                mensagemErro(erro.response)
            })
    }

    render(){
        const { onClose, showModal } = this.props;

        return (
            <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Novo Processo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                <FormGroup label="Nome: *" htmlFor="inputNome">
                    <input type="text"
                            id="inputNome"
                            className="form-control"
                            name="nome"
                            onChange={(e) => this.setState({nome: e.target.value})} />
                </FormGroup>


                <Form.Group controlId="qtdVagas">
                    <Form.Label>Vagas</Form.Label>
                    <Form.Control
                    type="number"
                    placeholder="Digite a quandidade de Vagas"
                    onChange={(e) => this.setState({qtdVagas: e.target.value})}
                    />
                </Form.Group>

                <Form.Group controlId="tipoVaga">
                    <Form.Label>Tipo da Vaga</Form.Label>
                    <Form.Control
                    as="select"
                    onChange={(e) => this.setState({tipoVaga: e.target.value})}
                    >
                    <option value="">Selecione...</option>
                    <option value="ESTAGIO">Estágio</option>
                    <option value="EFETIVO">Efetivo</option>
                    <option value="JOVEM_APRENDIZ">Jovem Aprendiz</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="turnoVaga">
                    <Form.Label>Turno da Vaga</Form.Label>
                    <Form.Control
                    as="select"
                    onChange={(e) => this.setState({turnoVaga: e.target.value})}
                    >
                    <option value="">Selecione...</option>
                    <option value="MANHA">Manhã</option>
                    <option value="TARDE">Tarde</option>
                    <option value="MANHA_TARDE">Manhã & Tarde</option>
                    </Form.Control>
                </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                Fechar
                </Button>
                <Button variant="primary" onClick={this.cadastrar}>
                Cadastrar
                </Button>
            </Modal.Footer>
            </Modal>
        )
    };
}