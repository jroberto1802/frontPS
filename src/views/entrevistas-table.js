import React from 'react';

export default props => {

    const rows = props.listaEntrevista.map(listaEntrevista => {
        return(
            <tr key={listaEntrevista.id}>
                <td>{listaEntrevista.candidato}</td>
                <td>{listaEntrevista.data}</td>
                <td>{listaEntrevista.obs}</td>
                <td>
                    <button type="button" className="btn btn-success">Enviar Mensagem</button>
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