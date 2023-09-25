import React, { Component } from 'react';

class AcoesCandidato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

  handleOptionChange = (option) => {
    this.setState({ selectedOption: option });

    if (this.props.candidatoStt === 'EM_ANALISE') {
      switch (option) {
        case 'aprovar':
          this.props.aprovarCandidato(this.props.candidatoId);
          break;
        case 'reprovar':
          this.props.reprovarCandidato(this.props.candidatoId);
          break;
        default:
          break;
      }
    }
    switch (option) {
      case 'desistir':
        this.props.candidatoDesistiu(this.props.candidatoId);
        break;
      default:
        break;
    }
  };

  render() {
    const isDisabled = this.props.candidatoStt !== 'EM_ANALISE';

    return (
      <div className="btn-group" role="group" aria-label="Ações do Candidato">
        <input
          type="radio"
          className="btn-check radio-sm"
          name={`btnradio-${this.props.candidatoId}`}
          id={`btnradio1-${this.props.candidatoId}`}
          autoComplete="off"
          checked={this.state.selectedOption === 'aprovar' || this.props.candidatoStt === 'APROVADO'}
          onChange={() => this.handleOptionChange('aprovar')}
          disabled={isDisabled}
        />
        <label className="btn btn-outline-primary" htmlFor={`btnradio1-${this.props.candidatoId}`}>
            <i className="fas fa-check" />
        </label>

        <input
          type="radio"
          className="btn-check radio-sm"
          name={`btnradio-${this.props.candidatoId}`}
          id={`btnradio2-${this.props.candidatoId}`}
          autoComplete="off"
          checked={this.state.selectedOption === 'reprovar' || this.props.candidatoStt === 'REPROVADO'}
          onChange={() => this.handleOptionChange('reprovar')}
          disabled={isDisabled}
        />
        <label className="btn btn-outline-primary" htmlFor={`btnradio2-${this.props.candidatoId}`}>
            <i className="fas fa-times" />
        </label>

        <input
          type="radio"
          className="btn-check radio-sm"
          name={`btnradio-${this.props.candidatoId}`}
          id={`btnradio3-${this.props.candidatoId}`}
          autoComplete="off"
          checked={this.state.selectedOption === 'desistir' || this.props.candidatoStt === 'DESISTIU'}
          onChange={() => this.handleOptionChange('desistir')}
        />
        <label className="btn btn-outline-primary" htmlFor={`btnradio3-${this.props.candidatoId}`}>
            <i className="fas fa-user-slash" />
        </label>
      </div>
    );
  }
}

export default AcoesCandidato;
