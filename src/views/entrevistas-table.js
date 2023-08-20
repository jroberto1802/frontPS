import React, { useState } from 'react';
import StatusLED from '../components/ledstatus';
import { Form } from 'react-bootstrap';
import { mensagemErro, mensagemSucesso } from '../components/toastr'
import EntrevistaService from '../app/services/EntrevistaService';
import CandidatoService from '../app/services/CandidatoService';

export default props => {
    const entrevistaService = new EntrevistaService();
    const candidatoService = new CandidatoService();
    const [selectedMessages, setSelectedMessages] = useState({});

    const handleMensagemChange = (e, linhaId) => {
        const updatedMessages = { ...selectedMessages };
        updatedMessages[linhaId] = e.target.value;
        setSelectedMessages(updatedMessages);
    };

    const formatarDataParaExibicao = (data) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' };
        const dataFormatada = new Date(data).toLocaleString('pt-BR', options);
        
        const partesData = dataFormatada.split(' ');
        const dataFormatoFinal = `${partesData[0]} às ${partesData[1]}`;
        
        return dataFormatoFinal;
    }

    const formatarMensagem = (processo, listaEntrevista, mensagem) => {
        if (mensagem.includes('!nome!')) {
            mensagem = mensagem.replace('!nome!', listaEntrevista.candidato.nomeCompleto);
        }
        if (mensagem.includes('!tipoVaga!')) {
            mensagem = mensagem.replace('!tipoVaga!', processo.tipoVaga);
        }
        if (mensagem.includes('!pdv.nome!')) {
            mensagem = mensagem.replace('!pdv.nome!', processo.pdv.nome);
        }
        if (mensagem.includes('!data!')) {
            mensagem = mensagem.replace('!data!', formatarDataParaExibicao(listaEntrevista.data));
        }
        return mensagem;
    };
    

    const gerarLinkWhatsapp = (processo, listaEntrevista, mensagem) => {
        if (listaEntrevista && listaEntrevista.candidato && listaEntrevista.candidato.fone) {
            const numeroTelefone = listaEntrevista.candidato.fone;
            const linkWhatsapp = `https://web.whatsapp.com/send/?phone=${numeroTelefone}&text=${encodeURIComponent(mensagem)}&type=phone_number&app_absent=0`;
            return formatarMensagem(processo, listaEntrevista, linkWhatsapp); 
        }
        return null;
    };

    const rows = props.listaEntrevista.map(listaEntrevista => {
        const selectedMessage = selectedMessages[listaEntrevista.id];
        const linkWhatsapp = gerarLinkWhatsapp(props.processo, listaEntrevista, selectedMessage);

        return(
            <tr key={listaEntrevista.id}>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <StatusLED status={listaEntrevista.candidato.sttCandidato} />
                </td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{listaEntrevista.candidato.nomeCompleto}</td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{formatarDataParaExibicao(listaEntrevista.data)}</td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{listaEntrevista.obs}</td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <div className="row" style={{ margin: '0px' }}>
                        <div className="col-md-10" style={{ padding: '0px' }}>
                            <Form.Group controlId={`inputMensagem-${listaEntrevista.id}`} htmlFor={`inputMensagem-${listaEntrevista.id}`} className="mb-0">
                                <Form.Control
                                    as="select"
                                    value={selectedMessages[listaEntrevista.id] || ""}
                                    onChange={(e) => handleMensagemChange(e, listaEntrevista.id)}
                                >
                                    <option value="">Selecione...</option>
                                    {props.listaMensagens.map(mensagem => (
                                        <option key={mensagem.id} value={mensagem.corpo}>
                                            {mensagem.assunto}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="col-md-2" style={{ padding: '0px' }} > 
                            {linkWhatsapp ? (
                                <a className="btn btn-success btn-md" role="button" href={linkWhatsapp} target="_blank">
                                    <i className="fab fa-whatsapp"/>
                                </a>
                            ) : (
                                <button disabled>Enviar Mensagem</button>
                            )}
                        </div>
                    </div>
                </td>
                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <div className="row" style={{ margin: '0px' }}>
                        <div className="col-md-6" style={{ padding: '0px', cursor: 'pointer' }}>
                            <a >
                                <i className="fa-regular fa-pen-to-square fa-xl" style={{color: "#e4b611",}} />               
                            </a>
                        </div>
                        <div className="col-md-6" style={{ padding: '0px', cursor: 'pointer' }}>
                            <a >
                                <i className="fa-solid fa-trash fa-xl" style={{color: "#db0a0a",}} />
                            </a>
                        </div>
                    </div>
                </td>

            </tr>
        )
    })


    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'center' }}>Status</th>
                        <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'center' }}>Candidato</th>
                        <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'center' }}>Data</th>
                        <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'center' }}>Observação</th>
                        <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'center' }}>Mensagem</th>
                        <th scope="col" style={{ verticalAlign: 'middle', textAlign: 'center' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}