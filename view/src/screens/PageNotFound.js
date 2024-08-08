import React from 'react';
import { Box, Heading, Text, Button } from 'native-base';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            bg="gray.100"
            p={6}
            height="100vh"
            textAlign="center"
        >
            <Heading size="xl" mb={4}>
                404 - Page Not Found
            </Heading>
            <Text fontSize="lg" mb={6}>
                Oops! The page you are looking for does not exist.
            </Text>
            <Button colorScheme="blue" onPress={() => navigate('/home')}>
                Go to Home
            </Button>
        </Box>
    );
};

export default PageNotFound;
