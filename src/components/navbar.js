import React from "react";

import NavBarItem from "./navbaritem";

function NavBar(){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                
            <a href="#/home" className="navbar-brand">
                <i className="fas fa-house fa-xl"></i>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavBarItem href="#/cadastro-pdv" label="PDVs" />
                        <NavBarItem href="#/cadastro-questionario" label="Questionários" />    
                        <NavBarItem href="#/cadastro-mensagens" label="Mensagens" />   
                        <NavBarItem href="#/form-inscricao-candidato" label="Form de Inscricao" />                         
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default NavBar