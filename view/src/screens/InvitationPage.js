import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Center, Box, Heading, Text, Spinner, Alert, VStack } from 'native-base';
import { INVITATION_PAGE_STRINGS } from '../utils/constants';
const InvitationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [alertMessage, setAlertMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(location.search);
        const params = new URLSearchParams(location.search);
        const searchId = params.get('searchId');

        if (!searchId) {
            setAlertMessage('Missing search ID!');
            setLoading(false);
            return;
        }

        // Simulate authentication check
        const isAuthenticated = false; // Replace with actual authentication logic

        if (!isAuthenticated) {
            // Redirect to Google authentication
            window.location.href = `http://localhost:3030/auth/google?redirectUrl=/search/${searchId}`;
        } else {
            navigate(`/search/${searchId}`);
        }

        setLoading(false); // Set loading to false once redirection logic completes
    }, [navigate, location]);

    return (
        <Center flex={1} bg="gray.100" p={4}>
            <Box bg="white" p={6} rounded="lg" shadow={2} width="90%">
                {alertMessage ? (
                    <Alert w="100%" status="error" mb={4}>
                        <VStack space={2} alignItems="center">
                            <Alert.Icon />
                            <Text>{alertMessage}</Text>
                        </VStack>
                    </Alert>
                ) : loading ? (
                    <Spinner size="lg" />
                ) : (
                    <>
                        <Heading textAlign="center" mb={4}>
                            {INVITATION_PAGE_STRINGS['INVITATION_HEADING']}
                        </Heading>
                        <Text textAlign="center" fontSize="md">
                            {INVITATION_PAGE_STRINGS['REDIRECT_MESSAGE']}

                        </Text>
                    </>
                )}
            </Box>
        </Center>
    );
};

export default InvitationPage;
