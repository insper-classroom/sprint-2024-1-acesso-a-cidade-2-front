import React, { useState } from 'react';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sprint-2024-1-acesso-a-cidade-2.onrender.com/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.mensagem);
      } else {
        setMessage('Error: ' + data.mensagem);
      }
    } catch (error) {
      setMessage('Erro ao tentar redefinir a senha. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h2>Redefinição de Senha</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <button type="submit">Mandar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;