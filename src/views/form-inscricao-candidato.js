import React from 'react';
import { withRouter } from 'react-router-dom'

class FormInscricaoCandidato extends React.Component {

    constructor() {
        super();
    }

    render() {

        return ( 
            <div style={{ backgroundColor: '#ececec' }}>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@700&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@500;700&display=swap');
                </style>
                <section className="topo relativo" />

                <br />
                <h1 className="titulo_interna" style={{ marginTop: '40px'}}>QUEREMOS O SEU TALENTO CONOSCO!</h1>

                <h3 className="descricao_interna">
                    A Softcom está em constante expansão e regularmente fazemos processos seletivos, tanto para preenchimento de vagas como para incorporamento de ideias inovadoras.<br />
                    Se sente pronto para um desafio?<br />
                    Deixe aqui o seu currículo e venha fazer parte de uma das empresas que têm o melhor processo de formação de pessoas, reconhecida pelo GPTW. Boa Sorte!
                </h3>
                
                <h2 class="titulo_interna" >PREENCHA SEUS DADOS</h2>
                <div className='container' style={{ padding: '20px 80px 150px 80px'}}>
                    <form>
                        <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className='col-md-5'>
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
                                                placeholder="Nome completo"
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
                                            />
                                        </span>
                                        <br />
                                    </div>
                                    <div className="col-md-6">
                                        <span className="wpcf7-form-span">
                                            <input
                                                type="text"
                                                name="fone"
                                                size="40"
                                                className="wpcf7-form"
                                                aria-required="true"
                                                aria-invalid="false"
                                                placeholder="Whatsapp para contato"
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
                                            />
                                        </span>
                                        <br />
                                    </div>
                                    <div className="col-md-4">
                                        <span className="wpcf7-form-span">
                                            <select id="uf-select" className="wpcf7-form" name="uf">
                                                <option value="" disabled selected>UF</option>
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
                                    <span className="wpcf7-form-span">
                                        <input
                                            type="text"
                                            name="curso"
                                            size="40"
                                            className="wpcf7-form"
                                            aria-required="true"
                                            aria-invalid="false"
                                            placeholder="Curso"
                                        />
                                    </span>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <span className="wpcf7-form-span">
                                            <input
                                                type="text"
                                                name="faculdade"
                                                size="40"
                                                className="wpcf7-form"
                                                aria-required="true"
                                                aria-invalid="false"
                                                placeholder="Faculdade"
                                            />
                                        </span>
                                    </div>
                                    <div className="col-md-6">
                                        <span className="wpcf7-form-span">
                                            <select className="wpcf7-form" name="cidade" >
                                                <option value="" className='placeholder-option' disabled selected>Período Atual</option>
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
                            <div className='col-md-7' >
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
                                <input
                                    type="submit"
                                    value="Enviar formulário"
                                    className="wpcf7-form-button"
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <footer id="page-footer">
                    <section>
                        <div className="row">
                            <div className="col-md-6">
                                <div>
                                    <img width="270" height="56" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/Group-51-Copy-1-1.png" style={{ marginLeft: '128px' }} />
                                    </div>
                                    <br/>
                                    <div  style={{ marginLeft: '128px' }} >
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
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: 24, color: 'yellow', letterSpacing: 1.2 }}>
                                        <h4><strong>FALE CONOSCO</strong></h4>
                                    </div>
                                    <div className="fontebranca">
                                        <p>0800 003 3600</p>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="ui-slider-handle">
                                    <p><a href="https://www.facebook.com/softcom.tecnologia/" target="_blank" rel="noopener noreferrer">
                                            <img className="img" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/Group-42-1-1.svg" alt="" style={{ marginLeft: '4em' }}/>
                                        </a>
                                        <a href="https://www.instagram.com/softcomtecnologia/" target="_blank" rel="noopener noreferrer">
                                            <img className="img" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/Group-53-1-1.svg" alt="" style={{ marginLeft: '4em' }} />
                                        </a>
                                        <a href="https://www.youtube.com/channel/UCsbyaPZbzePD8qOVJRN2NoA/videos" target="_blank" rel="noopener noreferrer">
                                            <img className="img" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/Group-55-1-1.svg" alt="" style={{ marginLeft: '4em' }} />
                                        </a>
                                        <a href="https://www.youtube.com/channel/UCsbyaPZbzePD8qOVJRN2NoA/videos" target="_blank" rel="noopener noreferrer">
                                            <img className="img" src="https://softcomtecnologia.com.br/wp-content/uploads/2020/03/Group-55-1-1.svg" alt="" style={{ marginLeft: '4em' }}/>
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
                    
                    <section className="row" style={{ marginLeft: '3em' }}>
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
        )
    }
}

export default withRouter(FormInscricaoCandidato);

