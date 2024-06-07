import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FormToken = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        token: ''
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
        if (!formData.email) tempErrors.email = 'Email é obrigatório';
        if (!formData.token) tempErrors.token = 'Token é obrigatória';
        return tempErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tempErrors = validate();
        if (Object.keys(tempErrors).length === 0) {
            try {
                const response = await fetch('http://127.0.0.1:5000/atualizar-senha', {
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
                navigate('/');
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
                label="E-mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
                sx={{ marginBottom: 2, borderRadius: '16px' }}
                InputProps={{
                    style: { borderRadius: '16px' }
                }}
            />
            <TextField
                label="Token"
                name="token"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
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

export default FormToken;