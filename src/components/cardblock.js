import React from "react";

class Cardblock extends React.Component{

    render(){
        return(
            <div className="card text-white bg-primary mb-1" style={{ maxWidth: "12rem", marginBottom: "0.3rem" }}>
                <div className="card-header">
                    <h4 className="header-title">{this.props.nomeProcesso}</h4>
                </div>
                <div className="card-body">
                    <h6 className="card-text1">{this.props.tipoVaga}</h6>
                    <p className="card-text2">{this.props.dataInicio}</p>
                    <div className="card-text3">{this.props.qtdVagas} Vagas</div>
                </div>
                <div className="card-footer" style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-danger btn-sm">Finalizar</button>
                    <button className="btn btn-success btn-sm">Detalhar</button>
                </div>
            </div>
        )    
    }
}

export default Cardblock