import React from "react";

class Cardblock extends React.Component{

    formatarDataParaExibicao = (data) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'America/Sao_Paulo' };
        return new Date(data).toLocaleString('pt-BR', options);
    }

    render(){
        return(
            <div className="card text-white bg-primary" style={{ maxWidth: "12rem", margin: "12px 0px" }}>
                <div className="card-header text-center">
                    <h5 className="header-title">{this.props.nome}</h5>
                </div>
                <div className="card-body-size">
                        {this.props.tipoVaga}
                        <br/>
                        Início: {this.formatarDataParaExibicao(this.props.dataInicio)}
                        <br/>
                        {this.props.qtdVagas} Vagas
                </div>
                <div className="card-footer card-footer-size">
                    {this.props.children}
                </div>
            </div>
        )    
    }
}

export default Cardblock