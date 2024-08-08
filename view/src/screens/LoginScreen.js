import React from 'react';
import { NativeBaseProvider } from 'native-base';
import AuthForm from '../components/AuthForm';

const LoginScreen = () => {
    return (
        <NativeBaseProvider>
            <AuthForm />
        </NativeBaseProvider>
    );
};

export default LoginScreen;
