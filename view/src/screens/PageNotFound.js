import React from 'react';
import { Box, Heading, Text, Button } from 'native-base';
import { useNavigate } from 'react-router-dom';
import { PAGE_NOT_FOUND_STRINGS } from '../utils/constants';


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
                {PAGE_NOT_FOUND_STRINGS['HEADING']}
            </Heading>
            <Text fontSize="lg" mb={6}>
                {PAGE_NOT_FOUND_STRINGS['MESSAGE']}
            </Text>
            <Button colorScheme="blue" onPress={() => navigate('/home')}>
                {PAGE_NOT_FOUND_STRINGS['BUTTON_TEXT']}
            </Button>
        </Box>
    );
};

export default PageNotFound;
