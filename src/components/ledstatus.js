import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle, faExclamationCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const StatusLED = ({ status }) => {
  let icon = null;
  let color = '';

  switch (status) {
    case 'REPROVADO':
      icon = faTimesCircle;
      color = 'red';
      break;
    case 'APROVADO':
      icon = faCheckCircle;
      color = 'green';
      break;
    case 'DESISTIU':
      icon = faExclamationCircle;
      color = '#ffc107';
      break;
    case 'EM_PROCESSO':
      icon = faPlayCircle;
      break;
    default:
      icon = null;
  }

  if (icon) {
    return <FontAwesomeIcon icon={icon} size="lg" style={{ color }} />;
  }

  return null;
};

export default StatusLED;
