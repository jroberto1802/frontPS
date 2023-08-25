import React from 'react';

const StatusLED = ({ status }) => {
  const statusMappings = {
    REPROVADO: { color: 'danger', text: 'Reprovado' },
    APROVADO: { color: 'success', text: 'Aprovado' },
    EM_PROCESSO: { color: 'primary', text: 'Em processo' },
    DESISTIU: { color: 'warning', text: 'Desistiu' },
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
