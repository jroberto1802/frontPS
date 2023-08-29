import React from 'react';
import { Modal } from 'react-bootstrap';


export default class ObservacaoModal extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const { onClose, showModal} = this.props;

        const modalStyles = {
            top: `${this.props.clickPosition.y}px`,
            left: `${this.props.clickPosition.x}px`,
            transform: 'translate(-50%, -50%)', // Centraliza o modal
            maxWidth: '80%', // Define a largura máxima do modal
            maxHeight: '80vh', // Define a altura máxima do modal
            overflowY: 'auto', // Permite rolagem se o conteúdo for muito grande
        };

        return (
            <Modal show={showModal} onHide={onClose} centered backdropClassName="custom-backdrop" style={modalStyles}>
                <Modal.Body className="text-center">
                    {this.props.observacaoModalConteudo}
                </Modal.Body>
            </Modal>
        )
    };
}