import React from 'react'

import CadastroPDV from '../views/cadastro-pdv'
import Home from '../views/home'
import detalharProcessos from '../views/detalhar-processos'
import { Route, Switch, HashRouter } from 'react-router-dom'
import cadastroQuestionario from '../views/cadastro-questionario'
import cadastroMensagem from '../views/cadastro-mensagem'
import paginaErro from '../views/pagina-erro'
import formInscricaoCandidato from '../views/form-inscricao-candidato'
import NavBar from '../components/navbar'
import Login from '../views/login'

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route path="/form-inscricao-candidato/:candidatoSelecionado/:entrevistaSelecionada" component={formInscricaoCandidato} />
                <Route path="/error" component={paginaErro} />
                <Route path="/login" component={Login} />
                <AdminRoutes/>
            </Switch>
        </HashRouter>
    )
}

const AdminRoutes = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/cadastro-pdv" component={CadastroPDV} />
                <Route path="/cadastro-questionario" component={cadastroQuestionario} />
                <Route path="/detalhar-processos/:idProcessoSelecionado" component={detalharProcessos} />
                <Route path="/cadastro-mensagens" component={cadastroMensagem} />
            </Switch>
        </>
    );
}

export default Rotas