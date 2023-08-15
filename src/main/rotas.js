import React from 'react'

import CadastroPDV from '../views/cadastro-pdv'
import Home from '../views/home'
import detalharProcessos from '../views/detalhar-processos'
import { Route, Switch, HashRouter } from 'react-router-dom'
import cadastroQuestionario from '../views/cadastro-questionario'

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/cadastro-pdv" component={CadastroPDV} />
                <Route path="/cadastro-questionario" component={cadastroQuestionario} />
                <Route path="/detalhar-processos/:idProcessoSelecionado" component={detalharProcessos} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas