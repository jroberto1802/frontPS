import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import EntrevistaService from '../app/services/EntrevistaService'; 
import CandidatoService from '../app/services/CandidatoService';
import { mensagemErro, mensagemSucesso } from '../components/toastr'
import StarRatingComponent from 'react-star-rating-component';


export default class IniciarEntrevistaModal extends React.Component{

    constructor(props){
        super(props);
        this.CandidatoService = new CandidatoService();
        this.EntrevistaService = new EntrevistaService();
        this.state = {
            processo: this.props.processo,
            diccao: null,
            postura: null,
            girias: null,
            pontualidade: null
        };
    }

    componentDidMount() {
 
    }
 
    fecharModal = () => {
        this.props.onClose(); 
    }
 
    render(){
        const { onClose, showModal} = this.props;

        return (
            <Modal show={showModal} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Entrevistar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Nome do Candidato</h3>
                <h5>20 anos, Curso Superior - Faculdade - 6º Periodo</h5>
                <h5>Cidade-UF - CEP: 58108357 - 14 km da Softcom PDV</h5>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <div className='jumbotron'>
                            <div>
                                <h5>Postura do candidato:</h5>
                                <StarRatingComponent
                                className="star-rating"
                                name="postura"
                                value={this.state.postura}
                                onStarClick={value => this.setState({ postura: value })}
                                />
                            </div>
                            <br/>
                            <div>
                                <h5>Dicção do candidato:</h5>
                                <StarRatingComponent
                                className="star-rating"
                                name="diccao"
                                value={this.state.diccao}
                                onStarClick={value => this.setState({ diccao: value })}
                                />
                            </div>
                            <br/>
                            <div>
                                <h5>Pontualidade do candidato:</h5>
                                <StarRatingComponent
                                className="star-rating"
                                name="pontualidade"
                                value={this.state.pontualidade}
                                onStarClick={value => this.setState({ pontualidade: value })}
                                />
                            </div>
                            <br/>
                            <div>
                                <h5>Girias do candidato:</h5>
                                <StarRatingComponent
                                className="star-rating"
                                name="girias"
                                value={this.state.girias}
                                onStarClick={value => this.setState({ girias: value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <Form>
                                        
                        </Form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                Fechar
                </Button>
                
                <Button variant="primary">
                Salvar
                </Button>

            </Modal.Footer>
            </Modal>
        )
    };
}