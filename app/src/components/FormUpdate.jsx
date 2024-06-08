import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sprint-2024-1-acesso-a-cidade-2.onrender.com/atualizar-senha', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, senha: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('Erro ao tentar atualizar a senha. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h2>Senha nova</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Senha" 
          required 
        />
        <button type="submit">Atualizar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdatePassword;