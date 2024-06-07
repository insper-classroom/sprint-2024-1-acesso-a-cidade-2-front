import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FormCadastro = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        email: '',
        email2: '',
        senha: '',
        senha2: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.nome) tempErrors.name = 'Nome é obrigatório';
        if (!formData.email) tempErrors.email = 'Email é obrigatório';
        if (!formData.email2) tempErrors.email2 = 'Email de confirmação é obrigatório';
        if (formData.email !== formData.email2) tempErrors.email2 = 'Emails não são iguais';
        if (!formData.senha) tempErrors.senha = 'Senha é obrigatória';
        if (!formData.senha2) tempErrors.senha2 = 'Senha de confirmação é obrigatória';
        if (formData.senha !== formData.senha2) tempErrors.senha2 = 'Senhas não são iguais';
        if (!formData.cpf) tempErrors.cpf = 'CPF é obrigatório';
        else if (!/^\d{11}$/.test(formData.cpf)) tempErrors.cpf = 'CPF tem que ter 11 dígitos';
        return tempErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tempErrors = validate();
        if (Object.keys(tempErrors).length === 0) {
            try {
                const response = await fetch('http://127.0.0.1:5000/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const errorData = await response.json(); // Captura a mensagem de erro do backend
                    setError(errorData.message || 'Erro ao enviar os dados');
                }

                const data = await response.json();
                console.log('Form data submitted successfully:', data);
                navigate('/login');
            } catch (error) {
                console.error('Erro ao enviar os dados:', error);
            }
        } else {
            setErrors(tempErrors);
        }
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                padding: 3,
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '300px' },
                '& .MuiButton-root': { m: 1 },
            }}
            onSubmit={handleSubmit}
        >
            <Typography variant="h4" gutterBottom>
                Cadastro
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="Nome"
                name="nome"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                sx={{ marginBottom: 2}}
                InputProps={{
                    style: { borderRadius: '30px', textAlign: 'center'}
                }}
            />
            <TextField
                label="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                error={!!errors.cpf}
                helperText={errors.cpf}
                variant="outlined"
                sx={{ marginBottom: 2}}
                InputProps={{
                    style: { borderRadius: '30px' }
                }}
            />
            <TextField
                label="E-mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
                sx={{ marginBottom: 2}}
                InputProps={{
                    style: { borderRadius: '30px' }
                }}
            />
            <TextField
                label="Confirme seu e-mail"
                name="email2"
                type="email"
                value={formData.email2}
                onChange={handleChange}
                error={!!errors.email2}
                helperText={errors.email2}
                variant="outlined"
                sx={{ marginBottom: 2}}
                InputProps={{
                    style: { borderRadius: '30px' }
                }}
            />
            <TextField
                label="Senha"
                name="senha"
                type="password"
                value={formData.senha}
                onChange={handleChange}
                error={!!errors.senha}
                helperText={errors.senha}
                variant="outlined"
                sx={{ marginBottom: 2}}
                InputProps={{
                    style: { borderRadius: '30px' }
                }}
            />
            <TextField
                label="Confirme sua senha"
                name="senha2"
                type="password"
                value={formData.senha2}
                onChange={handleChange}
                error={!!errors.senha2}
                helperText={errors.senha2}
                variant="outlined"
                sx={{ marginBottom: 2}}
                InputProps={{
                    style: { borderRadius: '30px' }
                }}
            />
            <Button variant="contained" color="primary" type="submit">
                Enviar
            </Button>
        </Box>
    );
};

export default FormCadastro;
