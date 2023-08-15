import React from 'react';


export default props => {

    const formatarDataParaExibicao = (data) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' };
        return new Date(data).toLocaleString('pt-BR', options);
    }

    const gerarLinkWhatsapp = (listaEntrevista) => {
        if (listaEntrevista && listaEntrevista.candidato && listaEntrevista.candidato.fone) {
            const numeroTelefone = listaEntrevista.candidato.fone;
            const mensagem = 'Boa tarde! Segue o link para participação no treinamento de Análise de Estrutura do Softshop. https://meet.google.com/tev-dctv-sce Favor baixar o material que está em:https://drive.google.com/file/d/1LrZBU0OVRwZHC2CfuFK-LDUaLcGNn4px/view?usp=sharing'; // Substitua pelo texto da sua mensagem
            const linkWhatsapp = `https://web.whatsapp.com/send/?phone=${numeroTelefone}&text=${encodeURIComponent(mensagem)}&type=phone_number&app_absent=0`;
            return linkWhatsapp;
        }
        return null; // Caso os dados não estejam disponíveis
    };

    const rows = props.listaEntrevista.map(listaEntrevista => {
        const linkWhatsapp = gerarLinkWhatsapp(listaEntrevista);
        return(
            <tr key={listaEntrevista.id}>
                <td>{listaEntrevista.candidato.nomeCompleto}</td>
                <td>{formatarDataParaExibicao(listaEntrevista.data)}</td>
                <td>{listaEntrevista.obs}</td>
                <td>
                {linkWhatsapp ? (
                    <a className="btn btn-success btn-md" role="button" href={linkWhatsapp}>
                    <i className="fab fa-whatsapp" style={{ marginRight: '0.5em' }}/> 
                    Mensagem
                    </a>
                ) : (
                    <button disabled>Enviar Mensagem</button>
                )}
                </td>
            </tr>
        )
    })

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Candidato</th>
                        <th scope="col">Data</th>
                        <th scope="col">Observação</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}