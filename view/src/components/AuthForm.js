// src/components/AuthForm.js

import { useState } from 'react';
import { Button, Center, FormControl, Input, VStack, Heading, Text, Alert } from 'native-base';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import Card from './Card';

const AuthForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3030/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include', // Include session cookies 
            });

            if (response.ok) {
                // const data = await response.json();
                dispatch(loginSuccess(username)); // Save user details in Redux
                navigate('/home');
            } else {
                const data = await response.json();
                setError(data.message || 'Error during login');
            }
        } catch (error) {
            setError('Error during login');
        }
    };

    const handleGoogleLogin = () => window.location.href = 'http://localhost:3030/auth/google';

    return (
        <Center flex={1} px="0">
            <Card>
                <VStack space={4} maxW="300">
                    <Heading size="lg" mb="6" textAlign="center">
                        Car Finder
                    </Heading>
                    {error && <Alert status="error" mb="4">{error}</Alert>}
                    <FormControl isRequired>
                        <FormControl.Label>Username</FormControl.Label>
                        <Input
                            placeholder="Insert username"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                            autoCapitalize="none"
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            placeholder="Insert password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            type="password"
                            autoCapitalize="none"
                        />
                    </FormControl>
                    <Button mt="5" onPress={handleLogin} colorScheme="blue">
                        Sign in
                    </Button>
                    <Text mt="6" textAlign="center" color="gray.500">
                        or sign in with Google
                    </Text>
                    <Button mt="2" onPress={handleGoogleLogin} colorScheme="red">
                        Google Sign in
                    </Button>
                </VStack>
            </Card>
        </Center>
    );
};

export default AuthForm;
