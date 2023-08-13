import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import CadastroProcessoService from '../app/services/cadastroProcessoService';
import { mensagemErro } from '../components/toastr'
import { mensagemSucesso } from '../components/toastr'

export default class ProcessosFinalizadosModal extends React.Component{

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
            processos: [],
            pdv: '',
            pdvNome: ''
        };
    }

    

    componentDidMount() {
        this.cadastroProcessoService.listarProcessosFechados().then(response => {
            this.setState({ processos: response.data });
          })
          .catch(error => {
            console.error('Erro ao buscar a lista de PDVs:', error);
          });
    }
    
    render(){
        const { onClose, showModal } = this.props;

        return (
            <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Processos Finalizados</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {this.state.processos.map(pdv => (
                            <option key={pdv.id} value={pdv.id}>
                            {pdv.nome}
                            </option>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                Fechar
                </Button>
            </Modal.Footer>
            </Modal>
        )
    };
}