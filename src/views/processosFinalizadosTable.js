import React from "react";
import { mensagemSucesso } from '../components/toastr'
import CadastroProcessoService from '../app/services/cadastroProcessoService';

const ProcessosFinalizadosTable = (props) => {
    const cadastroProcessoService = new CadastroProcessoService();

    const atualizarDataFinal = async (id) => {
        const data = {
            dataFinal: ''
        };
    
        try {
            await cadastroProcessoService.alterar(id, data);
            mensagemSucesso(`Processo Seletivo ${id} reaberto com sucesso!`)
        } catch (error) {
            console.error("Erro na requisição PUT:", error);
        }
        props.onCloseModal();
    }

    const rows = props.processosFinalizados.map( processosFinalizados => (
        <tr key={processosFinalizados.id}>
            <td>{processosFinalizados.nome}</td>
            <td>{processosFinalizados.dataInicio}</td>
            <td>{processosFinalizados.qtdVagas}</td>
            <td>{processosFinalizados.tipoVaga}</td>
            <td>{processosFinalizados.turnoVaga}</td>
            <td>{processosFinalizados.pdv.nome}</td>
            <td>{processosFinalizados.dataFinal}</td>
            <td>
                <button onClick={() => atualizarDataFinal(processosFinalizados.id)} type="button" className="btn btn-warning">Reabrir</button>
            </td>
        </tr>
    ));

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

export default ProcessosFinalizadosTable;
