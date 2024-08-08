import React from 'react';
import { Box } from 'native-base';

const Card = ({ children, ...props }) => {
    return (
        <Box
            mt="10"
            w="100%"
            maxW="290"
            bg="white"
            borderRadius="lg"
            shadow={5}
            p="4"
            {...props}
        >
            {children}
        </Box>
    );
};

export default Card;
