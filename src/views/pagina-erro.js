import React from "react";
import { withRouter } from 'react-router-dom'

class PaginaErro extends React.Component{

    render(){
        return(
            <div className="topoerro"></div>
        )
    }
}

export default withRouter( PaginaErro )