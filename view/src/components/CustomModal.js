import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Text, Button, VStack, HStack, Input } from 'native-base';
import { MODAL_STRINGS } from '../utils/constants';


const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
};

const modalVariants = {
    hidden: { y: '-100vh', opacity: 0 },
    visible: {
        y: '0',
        opacity: 1,
        transition: { type: 'spring', stiffness: 120 },
    },
    exit: {
        y: '100vh',
        opacity: 0,
    },
};

const CustomModal = ({ isOpen, onClose, onConfirm, actionType, onShare, onSave }) => {
    const [email, setEmail] = useState('');
    const [searchTitle, setSearchTitle] = useState('');

    const handleConfirm = () => {
        if (actionType === 'delete') {
            onConfirm();
        } else if (actionType === 'share') {
            onShare(email);
        } else if (actionType === 'save') {
            onSave(searchTitle);
        }
    };

    return (
        <AnimatePresence mode='wait'>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="backdrop"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 998,
                        }}
                        onClick={onClose} // Close modal when clicking on the backdrop
                    />

                    {/* Modal */}
                    <motion.div
                        className="modal"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            width: '500px',
                            position: 'fixed',
                            top: '50%',
                            left: '37%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
                            zIndex: 999,
                        }}
                    >
                        <VStack space={4}>
                            {actionType === 'delete' && (
                                <>
                                    <Text fontSize="lg" bold>
                                        {MODAL_STRINGS['DELETE_TITLE']}
                                    </Text>
                                    <Text>{MODAL_STRINGS['DELETE_MESSAGE']}</Text>
                                </>
                            )}

                            {actionType === 'share' && (
                                <>
                                    <Text fontSize="lg" bold>
                                        {MODAL_STRINGS['Share saved search']}
                                    </Text>
                                    <Text>{MODAL_STRINGS['SHARE_MESSAGE']}</Text>
                                    <Input
                                        placeholder={MODAL_STRINGS['SHARE_PLACEHOLDER']}
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </>
                            )}

                            {actionType === 'save' && (
                                <>
                                    <Text fontSize="lg" bold>
                                        {MODAL_STRINGS['SAVE_TITLE']}
                                    </Text>
                                    <Text>{MODAL_STRINGS['SAVE_MESSAGE']}</Text>
                                    <Input
                                        placeholder={MODAL_STRINGS['SAVE_PLACEHOLDER']}
                                        value={searchTitle}
                                        onChangeText={setSearchTitle}
                                        mb={4}
                                    />
                                </>
                            )}

                            <HStack space={2} justifyContent="flex-end">
                                <Button variant="ghost" onPress={onClose}>
                                    {MODAL_STRINGS['CANCEL_BUTTON']}
                                </Button>
                                <Button colorScheme="blue" onPress={handleConfirm}>
                                    {actionType === 'delete'
                                        ? MODAL_STRINGS['CONFIRM_DELETE_BUTTON']
                                        : actionType === 'share'
                                            ? MODAL_STRINGS['CONFIRM_SHARE_BUTTON']
                                            : MODAL_STRINGS['CONFIRM_SAVE_BUTTON']}
                                </Button>
                            </HStack>
                        </VStack>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CustomModal;
