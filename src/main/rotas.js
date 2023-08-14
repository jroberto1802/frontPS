import React from 'react'

import CadastroPDV from '../views/cadastro-pdv'
import Home from '../views/home'
import cadastroProcessos from '../views/cadastro-processos'
import { Route, Switch, HashRouter } from 'react-router-dom'
import cadastroQuestionario from '../views/cadastro-questionario'

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/cadastro-pdv" component={CadastroPDV} />
                <Route path="/cadastro-questionario" component={cadastroQuestionario} />
                <Route path="/cadastro-processos/:idProcessoSelecionado" component={cadastroProcessos} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas