import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const FormCadastro = () => {
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        email: '',
        email2: '',
        password: '',
        password2: ''
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
        if (!formData.name) tempErrors.name = 'Nome é obrigatório';
        if (!formData.email) tempErrors.email = 'Email é obrigatório';
        if (!formData.email2) tempErrors.email2 = 'Email de confirmação é obrigatório';
        if (formData.email !== formData.email2) tempErrors.email2 = 'Emails não são iguais';
        if (!formData.password) tempErrors.password = 'Senha é obrigatória';
        if (!formData.password2) tempErrors.password2 = 'Senha de confirmação é obrigatória';
        if (formData.password !== formData.password2) tempErrors.password2 = 'Senhas não são iguais';
        if (!formData.cpf) tempErrors.cpf = 'CPF é obrigatório';
        else if (!/^\d{11}$/.test(formData.cpf)) tempErrors.cpf = 'CPF tem que ter 11 dígitos';
        return tempErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const tempErrors = validate();
        if (Object.keys(tempErrors).length === 0) {
            console.log('Form data submitted:', formData);
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
            <TextField
                label="Nome"
                name="nome"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                sx={{ marginBottom: 2, borderRadius: '16px' }}
                InputProps={{
                    style: { borderRadius: '16px' }
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
                sx={{ marginBottom: 2, borderRadius: '16px' }}
                InputProps={{
                    style: { borderRadius: '16px' }
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
                sx={{ marginBottom: 2, borderRadius: '16px' }}
                InputProps={{
                    style: { borderRadius: '16px' }
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
                sx={{ marginBottom: 2, borderRadius: '16px' }}
                InputProps={{
                    style: { borderRadius: '16px' }
                }}
            />
            <TextField
                label="Senha"
                name="senha"
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
            <TextField
                label="Confirme sua senha"
                name="senha2"
                type="password"
                value={formData.password2}
                onChange={handleChange}
                error={!!errors.password2}
                helperText={errors.password2}
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

export default FormCadastro;
