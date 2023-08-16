import React from "react";

class Cardblock extends React.Component{

    formatarDataParaExibicao = (data) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'America/Sao_Paulo' };
        return new Date(data).toLocaleString('pt-BR', options);
    }

    render(){
        return(
            <div className="card text-white bg-primary mb-1" style={{ maxWidth: "12.1rem", marginBottom: "0.3rem" }}>
                <div className="card-header text-center">
                    <h5 className="header-title">{this.props.nome}</h5>
                </div>
                <div className="card-body">
                    <div className="card-text1">{this.props.tipoVaga}</div>
                    <div className="card-text3">Início em: {this.formatarDataParaExibicao(this.props.dataInicio)}</div>
                    <div className="card-text4">{this.props.qtdVagas} Vagas</div>
                </div>
                <div className="card-footer" style={{ display: 'flex', gap: '1rem' }}>
                    {this.props.children}
                </div>
            </div>
        )    
    }
}

export default Cardblock