import { useState } from 'react';
import { Button, Center, FormControl, Input, VStack, Heading, Text, Alert } from 'native-base';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import { login, googleLogin } from '../api';
import { LOGIN_PAGE_STRINGS } from '../utils/constants';
import Card from './Card';

const AuthForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const data = await login(username, password);

            if (data.success) {
                dispatch(loginSuccess(username));
                navigate('/home');
            } else {
                setError(data.message || 'Error during login');
            }
        } catch (error) {
            setError('Error during login');
        }
    };

    const handleGoogleLogin = () => googleLogin();

    return (
        <Center flex={1} px="0">
            <Card>
                <VStack space={4} maxW="300">
                    <Heading size="lg" mb="6" textAlign="center">
                        {LOGIN_PAGE_STRINGS['HEADING']}
                    </Heading>
                    {error && <Alert status="error" mb="4">{LOGIN_PAGE_STRINGS['ERROR_ALERT'](error)}</Alert>}
                    <FormControl isRequired>
                        <FormControl.Label>
                            {LOGIN_PAGE_STRINGS['USERNAME_LABEL']}
                        </FormControl.Label>
                        <Input
                            placeholder={LOGIN_PAGE_STRINGS['USERNAME_PLACEHOLDER']}
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                            autoCapitalize="none"
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>{LOGIN_PAGE_STRINGS['PASSWORD_LABEL']}</FormControl.Label>
                        <Input
                            placeholder={LOGIN_PAGE_STRINGS['PASSWORD_PLACEHOLDER']}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            type="password"
                            autoCapitalize="none"
                        />
                    </FormControl>
                    <Button mt="5" onPress={handleLogin} colorScheme="blue">
                        {LOGIN_PAGE_STRINGS['SIGN_IN_BUTTON']}

                    </Button>
                    <Text mt="6" textAlign="center" color="gray.500">
                        {LOGIN_PAGE_STRINGS['SIGN_IN_WITH_GOOGLE_TEXT']}
                    </Text>
                    <Button mt="2" onPress={handleGoogleLogin} colorScheme="red">
                        {LOGIN_PAGE_STRINGS['GOOGLE_SIGN_IN_BUTTON']}
                    </Button>
                </VStack>
            </Card>
        </Center>
    );
};

export default AuthForm;
