import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/atualizar-senha', { token, senha: password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
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