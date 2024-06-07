import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FormSenha = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
        if (!formData.senha) tempErrors.senha = 'Senha é obrigatória';
        if (!formData.senha2) tempErrors.senha2 = 'Senha de confirmação é obrigatória';
        if (formData.senha !== formData.senha2) tempErrors.senha2 = 'Senhas não são iguais';
        return tempErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tempErrors = validate();
        if (Object.keys(tempErrors).length === 0) {
            try {
                const response = await fetch('https://sprint-2024-1-acesso-a-cidade-2.onrender.com/atualizar-senha', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const errorData = await response.json(); 
                    setError(errorData.message || 'Erro ao enviar os dados');
                    return;
                }

                const data = await response.json();
                console.log('Form data submitted successfully:', data);
                navigate('/');
            } catch (error) {
                console.error('Erro ao enviar os dados:', error);
                setError('Erro ao enviar os dados');
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
                label="Senha"
                name="senha"
                type="password"
                value={formData.senha}
                onChange={handleChange}
                error={!!errors.senha}
                helperText={errors.senha}
                variant="outlined"
                sx={{ marginBottom: 2, borderRadius: '16px' }}
                InputProps={{
                    style: { borderRadius: '16px' }
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
                sx={{ marginBottom: 2, borderRadius: '16px' }}
                InputProps={{
                    style: { borderRadius: '16px' }
                }}
            />
            <Button variant="contained" color="primary" type="submit">
                Enviar
            </Button>
        </Box>
    );
};

export default FormSenha;
