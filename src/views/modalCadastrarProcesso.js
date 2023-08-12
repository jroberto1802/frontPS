import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import CadastroProcessoService from '../app/services/cadastroProcessoService';
import CadastroPDVService from '../app/services/cadastroPDVservice';
import { mensagemErro } from '../components/toastr'
import { mensagemSucesso } from '../components/toastr'
import FormGroup from '../components/form-group';

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
            pdv: '',
            pdvNome: ''
        };
        this.CadastroPDVService = new CadastroPDVService();
    }

    formatarDataParaExibicao = (data) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' };
        return new Date(data).toLocaleString('pt-BR', options);
    }

    definirNome = (pdvNome, dataInicio) => {
        const mesesEmPortugues = [
            "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
            "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
        ];
    
        const anoInicio = dataInicio.getFullYear();
        const mesInicio = dataInicio.getMonth();
        const mesExtenso = mesesEmPortugues[mesInicio];
        
        return `${pdvNome}-${mesExtenso}${anoInicio}`;
    };

    componentDidMount() {
        this.CadastroPDVService.listar().then(response => {
            this.setState({ pdvList: response.data });
          })
          .catch(error => {
            console.error('Erro ao buscar a lista de PDVs:', error);
          });
      }

    

    validar(){
        const msgs = []

        if (!this.state.nome) {
            msgs.push('O Nome do Processo Seletivo é obrigatório!');
        }
        
        if (!this.state.qtdVagas) {
            msgs.push('Digite a quantidade de vagas disponíveis para o processo!');
        }

        if (!this.state.tipoVaga) {
            msgs.push('Selecione o tipo da vaga!');
        }

        if (!this.state.turnoVaga) {
            msgs.push('Selecione o turno da vaga!');
        }

        if (!this.state.pdv) {
            msgs.push('Selecione o PDV!');
        }

        return msgs;
    }

    cadastrar = () => {

       const msgs = this.validar();

       if(msgs && msgs.length >0){
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            })
            return false;
       }

       const pdvMontado = {
        id: this.state.pdv
       }

        const processo = {
            dataInicio: this.state.dataInicio,
            nome: this.state.nome,
            qtdVagas: this.state.qtdVagas,
            tipoVaga: this.state.tipoVaga,
            turnoVaga: this.state.turnoVaga,
            pdv: pdvMontado
        }

        this.cadastroProcessoService.cadastrar(processo).then( response => {
                mensagemSucesso('Cadastro realizado com sucesso!')
                this.props.onClose();
            }).catch( erro => {
                this.setState({mensagemErro: erro.response})
                mensagemErro(erro.response)
            })
    }

    async carregarNomePDV(id) {
        try {
            const response = await this.CadastroPDVService.listarById(id);
            const nome = response.data.nome;
            this.setState({ pdvNome: nome });
        } catch (error) {
            console.error('Erro ao buscar PDV por Id:', error);
        }
    }

    async componentDidMount() {
        try {
            const pdvListResponse = await this.CadastroPDVService.listar();
            this.setState({ pdvList: pdvListResponse.data });

            if (this.state.pdv) {
                await this.carregarNomePDV(this.state.pdv);
            }
        } catch (error) {
            console.error('Erro ao buscar a lista de PDVs:', error);
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.pdv !== this.state.pdv || prevState.dataInicio !== this.state.dataInicio) {
            if (this.state.pdv) {
                await this.carregarNomePDV(this.state.pdv);
    
                const novoNome = this.definirNome(this.state.pdvNome, new Date(this.state.dataInicio));
                this.setState({ nome: novoNome });
            }
        }
    }

    render(){
        const { onClose, showModal } = this.props;
        const { pdvNome } = this.state;

        return (
            <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Novo Processo Seletivo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup label="Data de início: " htmlFor="inputDataInicio">
                        <input type="text"
                                id="inputDataInicio"
                                className="form-control"
                                name="dataInicio"
                                value={this.formatarDataParaExibicao(Date(this.state.dataInicio))}
                                readOnly/>
                    </FormGroup>

                    <FormGroup label="Nome: *" htmlFor="inputNome">
                        <input type="text"
                                id="inputNome"
                                className="form-control"
                                name="nome"
                                value={this.definirNome(pdvNome, new Date(this.state.dataInicio))}
                                readOnly
                        />
                    </FormGroup>


                    <FormGroup label="Vagas: *" htmlFor="inputQtdVagas">
                        <input type="number"
                                id="inputQtdVagas"
                                className="form-control"
                                name="qtdVagas"
                                placeholder="Digite a quandidade de Vagas"
                                onChange={(e) => this.setState({qtdVagas: e.target.value})}/>
                    </FormGroup>

                    <Form.Group controlId="tipoVaga">
                        <Form.Label>Tipo da Vaga: *</Form.Label>
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
                        <Form.Label>Turno da Vaga: *</Form.Label>
                        <Form.Control
                        as="select"
                        onChange={(e) => this.setState({turnoVaga: e.target.value})}
                        >
                        <option value="">Selecione...</option>
                        <option value="MANHA">Manhã</option>
                        <option value="TARDE">Tarde</option>
                        <option value="MANHA_TARDE">Manhã & Tarde</option>
                        <option value="INTEGRAL">Integral</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="inputPdv" htmlFor="inputPdv">
                        <Form.Label>PDV: *</Form.Label>
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