import React from 'react';
import { HStack, Text, Icon } from 'native-base';
import { FaCheckCircle } from 'react-icons/fa';
import { USER_STATUS_STRINGS } from '../utils/constants';

const UserStatus = ({ userName, isAuthenticated }) => {
    return (
        <HStack space={2} alignItems="center">
            <Text fontSize="lg">
                {USER_STATUS_STRINGS['WELCOME_USER_STATUS']}, {userName || 'Google User'}
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
