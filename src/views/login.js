import React from "react";
import Card from "../components/card";

class Login extends React.Component {

    render(){
        return(
            <div className="conteinerr">
                <section className="background-login "> 
                <div className="col-md-5" style={{position: 'sticky', left: '700px'}}>
                    <div className="card md-4">
                        <input
                            type="text"
                            name="login"
                            size="50"
                            className="wpcf7-form"
                            aria-required="true"
                            aria-invalid="false"
                            placeholder="Usuário"
                        />

                        <input
                            type="password"
                            name="login"
                            size="50"
                            className="wpcf7-form"
                            aria-required="true"
                            aria-invalid="false"
                            placeholder="Senha"
                        />
                    </div>
                </div>
                </section>
            </div>
        )
    }

}

export default Login