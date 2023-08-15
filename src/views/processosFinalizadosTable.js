import React from "react";

export default props => {

    const rows = props.processosFinalizados.map( processosFinalizados => {
        return (
            <tr>
                <td>{processosFinalizados.nome}</td>
                <td>{processosFinalizados.dataInicio}</td>
                <td>{processosFinalizados.qtdVagas}</td>
                <td>{processosFinalizados.tipoVaga}</td>
                <td>{processosFinalizados.turnoVaga}</td>
                <td>{processosFinalizados.pdv.nome}</td>
                <td>{processosFinalizados.dataFinal}</td>
                <td>
                    <button type="button" className="btn btn-warning">Reabrir</button>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Data do Processo</th>
                        <th scope="col">Vagas</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Turno</th>
                        <th scope="col">Pdv</th>
                        <th scope="col">Finalizado em</th>
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