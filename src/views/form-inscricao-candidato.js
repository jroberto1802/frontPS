import React from 'react';
import { withRouter } from 'react-router-dom'
import EntrevistaService from '../app/services/EntrevistaService';
import CandidatoService from '../app/services/CandidatoService';
import { mensagemErro, mensagemSucesso } from '../components/toastr'

class FormInscricaoCandidato extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.EntrevistaService = new EntrevistaService();
        this.CandidatoService = new CandidatoService();
        this.state = {
            entrevistaSelecionada: null,
            candidatoSelecionado: null,
            entrevista: null,
            candidato: null,
            nomeCompleto: '',
            idade: '',
            cep: '',
            fone: '',
            logradouro: '',
            cidade: '',
            email: '',
            uf: '',
            curso: '',
            faculdade: '',
            periodoAtual: '',
            turnoFaculdade: '',
            sttCandidato: '',
            distancia: ''
        }
    }

    async carregarDados(candidato, entrevista) {
        try {
            const candidatoResponse = await this.CandidatoService.buscarId(candidato);
            const entrevistaResponse = await this.EntrevistaService.buscarId(entrevista);
            this.setState({
                candidato: candidatoResponse.data,
                entrevista: entrevistaResponse.data,
                fone: candidatoResponse.data.fone,
                nomeCompleto: candidatoResponse.data.nomeCompleto    
            });
            
        } catch (error) {
            console.error('Erro ao buscar dados', error);
            this.props.history.push('/error')
        }
    }

    componentDidMount() {
        const { entrevistaSelecionada, candidatoSelecionado } = this.props.match.params
        console.log(entrevistaSelecionada, candidatoSelecionado)
        if (entrevistaSelecionada && candidatoSelecionado) {
            this.setState({ entrevistaSelecionada, candidatoSelecionado });
            this.carregarDados(candidatoSelecionado, entrevistaSelecionada);
        }
    }


    enviarDadosCandidato = async (id) => {
            
        const candidato = {
            nomeCompleto: this.state.nomeCompleto,
            fone: this.state.fone,
            email: this.state.email,
            idade: this.state.idade,
            curso: this.state.curso,
            faculdade: this.state.faculdade,
            logradouro: this.state.logradouro,
            periodoAtual: this.state.periodoAtual,
            cidade: this.state.cidade,
            uf: this.state.uf,
            cep: this.state.cep,
            turnoFaculdade: this.state.turnoFaculdade,
            sttCandidato: 'FORM_OK',
            distancia: ''
        };

        
    
        try {
            const response = await this.CandidatoService.alterar(id, candidato);
            mensagemSucesso("Dados Enviados!"); 

            await this.calcularDistancia(this.state.entrevista.id);
        } catch (erro) {
            this.setState({ mensagemErro: erro.response });
            mensagemErro(erro.response);
            return null;
        }
    };

    async calcularDistancia(id)  {
        try {
            const response = await this.EntrevistaService.distancia(id);
            const distanciaArredondada = parseFloat(response.data).toFixed(1);
            const candidatodistancia = {
                distancia: distanciaArredondada
            }
            const resp = this.CandidatoService.alterarDistancia(this.state.candidato.id, candidatodistancia)   
        } catch (erro) {
            this.setState({ mensagemErro: erro.response });
            mensagemErro(`Não foi possível calcular a distância: ${erro.response}`);
            return null;
        }    
    }


    render() {
        const { entrevista, candidato } = this.state;

        return ( 
            <div style={{ backgroundColor: '#ececec' }}>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@700&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@500;700&display=swap');
                </style>
                <section className="topo relativo" />

                <h1 className="titulo_interna" style={{ marginTop: '60px'}}>SEJA BEM VINDO!</h1>
                <h1 className="titulo_interna" style={{ marginBottom: '40px', color: '#f2d31d'}}> {candidato ? candidato.nomeCompleto : ''}</h1>

                <h3 className="descricao_interna">
                    A Softcom está em constante expansão e regularmente fazemos processos seletivos, tanto para preenchimento de vagas como para incorporamento de ideias inovadoras.<br />
                    O seu currículo foi selecionado para participar do processo seletivo para a vaga de {entrevista ? entrevista.processo.funcao : ''} ({entrevista ? entrevista.processo.tipoVaga : ''}) em nossa filial de {entrevista ? entrevista.processo.pdv.nome : ''}<br />
                    Gostariamos de te conhecer um pouco mais, para isso preencha os dados a seguir, esses dados são necessários para uma possível entrevista. Boa Sorte!
                </h3>
                
                <h2 className="titulo_interna" >PREENCHA SEUS DADOS</h2>
                <div className='container' style={{ padding: '30px 60px 120px 60px'}}>
                    <form>
                        <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className='col-md-6'>
                                <div className="row">
                                    <div className='col-md-9'>
                                        <span className="wpcf7-form-span">
                                            <input
                                                type="text"
                                                name="nomeCompleto"
                                                size="50"
                                                className="wpcf7-form"
                                                aria-required="true"
                                                aria-invalid="false"
                                                value={candidato ? candidato.nomeCompleto : ''}
                                                readOnly
                                            />
                                        </span>
                                    </div>
                                    <div className='col-md-3'>
                                        <span className="wpcf7-form-span">
                                            <input
                                                type="number"
                                                name="idade"
                                                size="40"
                                                className="wpcf7-form"
                                                aria-required="true"
                                                aria-invalid="false"
                                                placeholder="Idade"
                                                onChange={e => this.setState({idade: e.target.value})}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <span className="wpcf7-form-span">
                                            <input
                                                type="email"
                                                name="email"
                                                size="40"
                                                className="wpcf7-form"
                                                aria-required="true"
                                                aria-invalid="false"
                                                placeholder="E-mail para contato"
                                                onChange={e => this.setState({email: e.target.value})}
                                            />
                                        </span>
                                        <br />
                                    </div>
                                    <div className="col-md-6">
                                        <span className="wpcf7-form-span">
                                            <input
                                                type="tel"
                                                name="fone"
                                                size="40"
                                                className="wpcf7-form"
                                                aria-required="true"
                                                aria-invalid="false"
                                                value={candidato ? candidato.fone : ''}
                                                onChange={e => this.setState({fone: e.target.value})}
                                            />
                                        </span>
                                        <br />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <span className="wpcf7-form-span">
                                            <input
                                                type="text"
                                                name="cep"
                                                size="40"
                                                className="wpcf7-form"
                                                aria-required="true"
                                                aria-invalid="false"
                                                placeholder="CEP *"
                                                onChange={e => this.setState({cep: e.target.value})}
                                            />
                                        </span>
                                        <br />
                                    </div>
                                    <div className="col-md-8">
                                        <span className="wpcf7-form-span">
                                            <input
                                                type="text"
                                                name="logradouro"
                                                size="40"
                                                className="wpcf7-form"
                                                aria-required="true"
                                                aria-invalid="false"
                                                placeholder="Logradouro"
                                                onChange={e => this.setState({logradouro: e.target.value})}
                                            />
                                        </span>
                                        <br />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8">
                                        <span className="wpcf7-form-span">
                                            <input
                                                type="text"
                                                name="cidade"
                                                size="40"
                                                className="wpcf7-form"
                                                aria-required="true"
                                                aria-invalid="false"
                                                placeholder="Cidade"
                                                onChange={e => this.setState({cidade: e.target.value})}
                                            />
                                        </span>
                                        <br />
                                    </div>
                                    <div className="col-md-4">
                                        <span className="wpcf7-form-span">
                                            <select id="uf-select" 
                                                    className="wpcf7-form" 
                                                    name="uf" 
                                                    value={this.state.uf??''} 
                                                    onChange={(e) => this.setState({uf: e.target.value})}>
                                                <option value="" disabled>UF</option>
                                                <option value="AC">Acre</option>
                                                <option value="AL">Alagoas</option>
                                                <option value="AP">Amapá</option>
                                                <option value="AM">Amazonas</option>
                                                <option value="BA">Bahia</option>
                                                <option value="CE">Ceará</option>
                                                <option value="DF">Distrito Federal</option>
                                                <option value="ES">Espírito Santo</option>
                                                <option value="GO">Goiás</option>
                                                <option value="MA">Maranhão</option>
                                                <option value="MT">Mato Grosso</option>
                                                <option value="MS">Mato Grosso do Sul</option>
                                                <option value="MG">Minas Gerais</option>
                                                <option value="PA">Pará</option>
                                                <option value="PB">Paraíba</option>
                                                <option value="PR">Paraná</option>
                                                <option value="PE">Pernambuco</option>
                                                <option value="PI">Piauí</option>
                                                <option value="RJ">Rio de Janeiro</option>
                                                <option value="RN">Rio Grande do Norte</option>
                                                <option value="RS">Rio Grande do Sul</option>
                                                <option value="RO">Rondônia</option>
                                                <option value="RR">Roraima</option>
                                                <option value="SC">Santa Catarina</option>
                                                <option value="SP">São Paulo</option>
                                                <option value="SE">Sergipe</option>
                                                <option value="TO">Tocantins</option>
                                            </select>
                                        </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <span className="wpcf7-form-span">
                                            <input
                                                type="text"
                                                name="curso"
                                                size="40"
                                                className="wpcf7-form"
                                                aria-required="true"
                                                aria-invalid="false"
                                                placeholder="Curso"
                                                onChange={e => this.setState({curso: e.target.value})}
                                            />
                                        </span>
                                    </div>
                                    <div className="col-md-6">
                                        <span className="wpcf7-form-span">
                                            <select id="turnoFaculdade-select" className="wpcf7-form" name="turnoFaculdade" value={this.state.turnoFaculdade??''}  onChange={(e) => this.setState({turnoFaculdade: e.target.value})}>
                                                <option value="" disabled>Turno</option>
                                                <option value="MANHA">Manhã</option>
                                                <option value="TARDE">Tarde</option>
                                                <option value="NOITE">Noite</option>
                                                <option value="INTEGRAL">Integral</option>
                                            </select>
                                        </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-7">
                                        <span className="wpcf7-form-span">
                                            <input
                                                type="text"
                                                name="faculdade"
                                                size="40"
                                                className="wpcf7-form"
                                                aria-required="true"
                                                aria-invalid="false"
                                                placeholder="Faculdade"
                                                onChange={e => this.setState({faculdade: e.target.value})}
                                            />
                                        </span>
                                    </div>
                                    <div className="col-md-5">
                                        <span className="wpcf7-form-span">
                                            <select className="wpcf7-form" name="periodoAtual" value={this.state.periodoAtual??''} onChange={(e) => this.setState({periodoAtual: e.target.value})}>
                                                <option value="" disabled>Período Atual</option>
                                                <option value="Concluído">Concluído</option>
                                                <option value="1º Período">1º Período</option>
                                                <option value="2º Período">2º Período</option>
                                                <option value="3º Período">3º Período</option>
                                                <option value="4º Período">4º Período</option>
                                                <option value="5º Período">5º Período</option>
                                                <option value="6º Período">6º Período</option>
                                                <option value="7º Período">7º Período</option>
                                                <option value="8º Período">8º Período</option>
                                                <option value="9º Período">9º Período</option>
                                                <option value="10º Período">10º Período</option>
                                                <option value="Desblocado">Desblocado</option>
                                            </select>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6' >
                                <span className="wpcf7-form-span">
                                    <textarea
                                        name="your-message"
                                        cols="40"
                                        rows="10"
                                        className="wpcf7-form-textarea"
                                        aria-invalid="false"
                                        placeholder="Conta pra gente porque você quer trabalhar na Softcom"
                                    ></textarea>
                                </span>
                                <br />
                                <a className="wpcf7-form-button"
                                    role="button"
                                    onClick={() => this.enviarDadosCandidato(this.state.candidatoSelecionado)}>
                                Enviar Formulário
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
                <footer id="page-footer">
                    <section>
                        <div className="row">
                            <div className="col-md-6">
                                <div style={{ textAlign: 'center' }}>
                                    <img width="270" height="56" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/Group-51-Copy-1-1.png" />
                                </div>
                                <br/>
                                <div  style={{ textAlign: 'center' }} >
                                    <br/>
                                    <a className="us_custom_9f461eaf" href="https://softcomtecnologia.com.br/apresentacao/" target="_blank">SOBRE A SOFTCOM</a>
                                    <br/>
                                    <br/>
                                    <a className="us_custom_9f461eaf" href="https://softcomtecnologia.com.br/universidade-softcom/" target="_blank">UNIVERSIDADE SOFTCOM</a>
                                    <br/>
                                    <br/>  
                                    <a className="us_custom_9f461eaf" href="https://softcomtecnologia.com.br/trabalhe-conosco/" target="_blank">TRABALHE CONOSCO</a>                                                          
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                </div>
                            <div className="col-md-6">
                                <br/>
                                <br/>
                                <div style={{ textAlign: 'center', marginLeft: '-30px'}}>
                                    <div style={{ fontSize: '24', color: 'yellow', letterSpacing: '1.2' }}>
                                        <h4><strong>FALE CONOSCO</strong></h4>
                                    </div>
                                    <div className="fontebranca">
                                        <p>0800 003 3600</p>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div style={{ textAlign: 'center' }}>
                                    <p><a href="https://www.facebook.com/softcom.tecnologia/" target="_blank" rel="noopener noreferrer">
                                            <img className="img" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/Group-42-1-1.svg" alt="" />
                                        </a>
                                        <a href="https://www.instagram.com/softcomtecnologia/" target="_blank" rel="noopener noreferrer">
                                            <img className="img" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/Group-53-1-1.svg" alt="" style={{ marginLeft: '2em' }} />
                                        </a>
                                        <a href="https://www.youtube.com/channel/UCsbyaPZbzePD8qOVJRN2NoA/videos" target="_blank" rel="noopener noreferrer">
                                            <img className="img" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/Group-55-1-1.svg" alt="" style={{ marginLeft: '2em' }} />
                                        </a>
                                        <a href="https://www.linkedin.com/company/softcomtecnologia/" target="_blank" rel="noopener noreferrer">
                                            <img width="55" height="47" className="img" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/08/linkedin-32.svg" alt="" style={{ marginLeft: '2em', marginTop: '8px' }}/>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="fonteamarela">
                                <p style={{ marginLeft: '120px' }}>RECONHECIMENTO</p>
                            </div>
                        </div>


                    </section>
                    
                    <section className="row" style={{ textAlign: 'center', marginTop: '80px' }}>
                        <div className="col-md-2" style={{ marginLeft: '2em' }}>
                            <img width="148" height="56" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/mpe-brasil-2.png" className="attachment-large size-large" alt="" loading="lazy" />
                        </div> 
                        <div className="col-md-2" style={{ marginLeft: '4em' }}>
                            <img width="125" height="46" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/iso-9001-2.png" className="attachment-large size-large" alt="" loading="lazy" />
                        </div>
                        <div className="col-md-2" style={{ marginLeft: '3em' }}>
                            <img width="133" height="45" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/ppq-1.png" className="attachment-large size-large" alt="" loading="lazy" />
                        </div>
                        <div className="col-md-2" style={{ marginLeft: '3em' }}>
                                <img width="102" height="70" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/mps-br-2.png" className="attachment-large size-large" alt="" loading="lazy" />
                        </div>
                        <div className="col-md-2" style={{ marginLeft: '1em' }}>
                            <img width="69" height="69" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/gptw_logo-1-1.png" className="attachment-large size-large" alt="" loading="lazy" />
                        </div>
                    </section>
                </footer>
            </div>
        );
    }
}

export default withRouter(FormInscricaoCandidato);

