import React from 'react';

const StatusLED = ({ status }) => {
  const statusMappings = {
    REPROVADO: { color: 'danger', text: 'Reprovado' },
    DESISTIU: { color: 'warning', text: 'Desistiu' },
    APROVADO: { color: 'success', text: 'Aprovado' },
    EM_PROCESSO: { color: 'primary', text: 'Em processo' },
    EM_ANALISE: { color: 'primary', text: 'Em análise' },
    FORM_OK: { color: 'warning', text: 'Entrevistar' },
    FORM_PENDENTE: { color: 'secondary', text: 'Aguardando' },

  };

  const badgeStyle = {
    padding: '5px 10px',
    borderRadius: '5px',
    display: 'inline-block',
    color: 'white',
    width: '90px',
    textAlign: 'center',
  };

  const statusInfo = statusMappings[status] || {};
  const statusColorClass = statusInfo.color || '';

  return (
    <span className={`badge rounded-pill bg-${statusColorClass}`} style={{ ...badgeStyle, backgroundColor: statusColorClass }}>
      {statusInfo.text || 'Desconhecido'}
    </span>
  );
};

export default StatusLED;
