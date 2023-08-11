import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import CadastroProcessoService from '../app/services/cadastroProcessoService';
import CadastroPDVService from '../app/services/cadastroPDVservice';
import { mensagemErro } from '../components/toastr'
import { mensagemSucesso } from '../components/toastr'

export default class CadastroProcessoModal extends React.Component{

    constructor(){
        super();
        const dataAtual = new Date();
        dataAtual.setHours(dataAtual.getHours() - 3);
        this.cadastroProcessoService = new CadastroProcessoService();
        this.state = {
            dataInicio: dataAtual.toISOString().slice(0, 19)+'Z',
            nome: '',
            qtdVagas: '',
            tipoVaga: '',
            turnoVaga: '',
            pdvList: [],
            pdv: ''
        };
        this.CadastroPDVService = new CadastroPDVService();
    }

    formatarDataParaExibicao = (data) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' };
        return new Date(data).toLocaleString('pt-BR', options);
    }

    componentDidMount() {
        // Faça uma requisição para sua API para obter a lista de PDVs
        this.CadastroPDVService.listar().then(response => {
            this.setState({ pdvList: response.data });
          })
          .catch(error => {
            console.error('Erro ao buscar a lista de PDVs:', error);
          });
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

        this.cadastroProcessoService.cadastrar({
            dataInicio: this.state.dataInicio,
            nome: this.state.nome,
            qtdVagas: this.state.qtdVagas,
            tipoVaga: this.state.tipoVaga,
            turnoVaga: this.state.turnoVaga,
            pdv: null

        }).then( response => {
                this.setState({dataInicio: '', nome: '', qtdVagas: '', tipoVaga: '', turnoVaga: '', pdv: ''});
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

                <Form.Group controlId="inputDataInicio" htmlFor="inputDataInicio">
                    <Form.Label>Data de início</Form.Label>
                    <Form.Control
                        type="text"
                        name="dataInicio"
                        placeholder={this.state.dataInicio}
                        value={this.formatarDataParaExibicao(Date(this.state.dataInicio))}
                        readOnly
                    />
                </Form.Group>

                <Form.Group controlId="inputNome" htmlFor="inputNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                    type="text"
                    name="nome"
                    placeholder="Digite o nome do processo"
                    onChange={(e) => this.setState({nome: e.target.value})}
                    />
                </Form.Group>

                <Form.Group controlId="inputQtdVagas" htmlFor="inputQtdVagas">
                    <Form.Label>Vagas</Form.Label>
                    <Form.Control
                    type="number"
                    name="qtdVagas"
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

                <Form.Group controlId="inputPdv" htmlFor="inputPdv">
                    <Form.Label>PDV</Form.Label>
                    <Form.Control
                    as="select"
                    onChange={(e) => this.setState({ pdv: e.target.value })}
                    >
                    <option value="">Selecione...</option>
                    {this.state.pdvList.map(pdv => (
                        <option key={pdv.id} value={pdv.id}>
                        {pdv.nome}
                        </option>
                    ))}
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