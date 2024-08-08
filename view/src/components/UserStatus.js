import React from 'react';
import { HStack, Text, Icon } from 'native-base';
import { FaCheckCircle } from 'react-icons/fa';


const UserStatus = ({ userName, isAuthenticated }) => {
    return (
        <HStack space={2} alignItems="center">
            <Text fontSize="lg">
                Welcome, {userName || 'Guest'}
            </Text>
            {isAuthenticated && (
                <Icon
                    as={FaCheckCircle}
                    color="green.500"
                    size="lg"
                />
            )}
        </HStack>
    );
};

export default UserStatus;
