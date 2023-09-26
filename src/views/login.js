import React from "react";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />

class Login extends React.Component {

    render(){
        return(
            <div className="conteiner">
                <section className="background-login "> 
                    <div className="card-login">
                        <div className="card-body">
                            <div className="text-card-login" style={{marginTop: "30px", color: "#2E384D"}}>Olá, seja bem vindo(a) à sua área de </div>
                            <h2 className="text-card-login" style={{fontWeight: 'bold', color: "#2E384D"}}>Processos Seletivos</h2>
                            <h5 className="text-card-login" style={{textAlign: "left", marginLeft: "75px", marginTop: "54px", color: "gray", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)"}}>
                                Acesse agora
                                <div className="custom-line"></div>
                            </h5>
                            
                            
                            <input
                                type="text"
                                name="login"
                                className="login-input"
                                aria-required="true"
                                aria-invalid="false"
                                placeholder="Usuário"
                            />

                            <input
                                type="password"
                                name="login"
                                className="login-input"
                                aria-required="true"
                                aria-invalid="false"
                                placeholder="Senha"
                            />

                            <button className="custom-login-button">
                                ACESSAR
                                <button className="custom-login-internal-button">
                                    <i className="fa-solid fa-sign-in fa-lg" />
                                </button>
                            </button>
                            
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default Login