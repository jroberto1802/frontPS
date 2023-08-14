import React from "react";
import Card from "../components/card";
import { withRouter } from 'react-router-dom'
import { mensagemSucesso, mensagemErro } from '../components/toastr'
import ProcessosFinalizadosTable from "./processosFinalizadosTable";

class CadastroProcessos extends React.Component{

    state = {
        nome: '',
        cep: '',
        mensagemErro: null
    }

    render(){
        return(
            <div className="row">
                <Card title="Processos Seletivos">
                    <ProcessosFinalizadosTable />

                </Card>
            </div>
        )
    }
}

export default withRouter( CadastroProcessos);