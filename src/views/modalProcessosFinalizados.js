import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import CadastroProcessoService from '../app/services/cadastroProcessoService';
import { mensagemErro } from '../components/toastr'
import { mensagemSucesso } from '../components/toastr'
import ProcessosFinalizadosTable from './processosFinalizadosTable';


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

    componentDidMount(){
        this.listarProcessosFinalizados();
    }

  
    listarProcessosFinalizados = () => {
        this.cadastroProcessoService.listarProcessosFechados().then(response => {
            this.setState({ processos: response.data });
          })
          .catch(error => {
            console.error('Erro ao buscar a lista de Processos:', error);
          });
    }

    fecharModal = () => {
        this.props.onClose(); 
    }
    
    render(){
        const { onClose, showModal } = this.props;

        return (
            <Modal show={showModal} onHide={onClose} dialogClassName="custom-modal-xl">
            <Modal.Header closeButton>
                <Modal.Title>Processos Finalizados</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <ProcessosFinalizadosTable processosFinalizados={this.state.processos} onCloseModal={this.fecharModal}/>
                        </div>
                    </div>
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