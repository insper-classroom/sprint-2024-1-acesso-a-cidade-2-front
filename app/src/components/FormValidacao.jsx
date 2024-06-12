import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function TokenValidation() {
  const [message, setMessage] = useState('');
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`https://sprint-2024-1-acesso-a-cidade-2.onrender.com/atualizar-senha?token=${token}`, {
          method: 'GET',
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.mensagem);
        } else {
          setMessage('Error: ' + data.mensagem);
        }
      } catch (error) {
        setMessage('Erro ao tentar validar o token. Por favor, tente novamente mais tarde.');
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