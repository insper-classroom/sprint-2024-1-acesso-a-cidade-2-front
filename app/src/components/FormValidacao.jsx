import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function TokenValidation() {
  const [message, setMessage] = useState('');
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get('https://sprint-2024-1-acesso-a-cidade-2-front.vercel.app/atualizar-senha', { params: { token } });
        setMessage(response.data.mensagem);
      } catch (error) {
        setMessage('Error: ' + error.response.data.mensagem);
      }
    };

    validateToken();
  }, [token]);

  return (
    <div>
      <h2>Validação do Token</h2>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TokenValidation;