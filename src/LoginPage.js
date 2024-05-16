import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    // State variables to store username and password input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // State variable to store error message
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Function to handle login button click event
    const handleLogin = async () => {
        try {
            // Make a POST request to the login API endpoint
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password
            });
            // If login successful, log the response data (token) and perform necessary actions
            console.log(response.data); // Assuming backend returns token upon successful login
            // Redirect to dashboard or perform other actions upon successful login
            navigate('/dashboard');
            console.log('Login successful');
            console.log('Redirecting to dashboard...');
        } catch (error) {
            // If login fails, display error message
            setErrorMessage('Invalid username or password');
            console.error('Login failed:', error);
        }
    };

    return (
        <Card style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
            <CardContent>
                <Typography variant="h5" component="h2" style={{ marginBottom: 20 }}>
                    Login
                </Typography>
                {/* Display error message if any */}
                {errorMessage && <Typography color="error" style={{ marginBottom: 10 }}>{errorMessage}</Typography>}
                {/* Username input field */}
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                {/* Password input field */}
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                {/* Login button */}
                <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: 20 }}>
                    Login
                </Button>
            </CardContent>
        </Card>
    );
};

export default LoginPage;
