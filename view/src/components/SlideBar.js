import React, { useState, useEffect } from "react";
import {
    Box,
    VStack,
    Text,
    IconButton,
    Button,
    HStack,
    Tooltip,
    Alert
} from "native-base";
import { FaTimes, FaInfoCircle, FaShare } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CustomModal from '../components/CustomModal';
import { truncateText } from '../utils/helpers'

const SlideBar = ({ isOpen, onClose }) => {
    const [savedSearches, setSavedSearches] = useState([]);
    const [searchToDelete, setSearchToDelete] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const [searchToShare, setSearchToShare] = useState(null);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('')

    useEffect(() => {
        const fetchSavedSearches = async () => {
            if (isOpen) {
                try {
                    const response = await fetch(
                        "http://localhost:3030/api/saved-searches",
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: "include",
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to fetch saved searches");
                    }

                    const data = await response.json();
                    setSavedSearches(data);
                } catch (error) {
                    console.error(
                        "Error during getting the search:",
                        error
                    );
                }
            }
        };

        fetchSavedSearches();
    }, [isOpen]);

    const confirmDeleteSearch = async () => {
        if (searchToDelete === null) return;
        try {
            const response = await fetch(
                `http://localhost:3030/api/saved-searches/${searchToDelete}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error("Error during deletion of saved search");
            }

            setSavedSearches((prevSearches) =>
                prevSearches.filter((search) => search.id !== searchToDelete)
            );
            setModalOpen(false);
        } catch (error) {
            console.error(error.message);
            setModalOpen(false);
        }
    };

    const shareSearch = async (email) => {
        if (searchToShare.id === null) return;
        try {
            const response = await fetch(
                `http://localhost:3030/api/share-search`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        searchId: searchToShare.id,
                        email: email,
                        details: searchToShare
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Error during sharing the saved search");
            }
            setAlert(true);
            setMessageAlert(`The search has been shared with ${email}.`);
            setModalOpen(false);
            setTimeout(() => {
                setAlert(false);
                setMessageAlert("");
            }, 2000);
        } catch (error) {
            console.error(error.message);
            setModalOpen(false);
        }
    };

    const openDeleteConfirmationModal = (searchId) => {
        setSearchToDelete(searchId);
        setModalAction('delete');
        setModalOpen(true);
    };

    const openShareModal = (search) => {
        setSearchToShare(search);
        setModalAction('share');
        setModalOpen(true);
    };

    const closeModal = () => {
        setSearchToDelete(null);
        setSearchToShare(null);
        setModalOpen(false);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3030/logout", {
                method: "GET",
                credentials: "include",
            });
            if (response.ok) {
                window.location.href = "/";
            } else {
                console.error("Error during logout");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="slidebar"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 65, duration: 0.2 }}
                        style={{
                            position: "fixed",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: "250px",
                            backgroundColor: "white",
                            boxShadow: "3px 0 5px rgba(0,0,0,0.2)",
                            zIndex: 999,
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between", // Ensures space-between layout
                        }}
                    >
                        <VStack space={4} justifyContent={"space-between"} height="100%">
                            <Box style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                <HStack justifyContent={"space-between"}>
                                    <Text fontSize="lg" bold alignItems={"center"}>
                                        Saved Searches
                                    </Text>
                                    <IconButton icon={<FaTimes size={16} />} onPress={onClose} />
                                </HStack>
                            </Box>
                            <Box style={{ overflowY: 'auto', flexGrow: 1 }}>
                                {savedSearches.map((search) => (
                                    <Box
                                        key={search.id}
                                        bg="gray.200"
                                        borderRadius="full"
                                        p={2}
                                        alignItems="center"
                                        justifyContent="space-between"
                                        flexDirection="row"
                                        marginTop={"10px"}
                                    >
                                        <HStack>
                                            <Tooltip
                                                label={
                                                    <Box>
                                                        <Text color={"white"}>
                                                            Fuel Filter: {search.fuelFilter || "None"}
                                                        </Text>
                                                        <Text color={"white"}>
                                                            Body Style Filter: {search.bodyStyleFilter || "None"}
                                                        </Text>
                                                        <Text color={"white"}>
                                                            Min Price: ${search.minPrice || "None"}
                                                        </Text>
                                                        <Text color={"white"}>
                                                            Max Price: ${search.maxPrice || "None"}
                                                        </Text>
                                                        <Text color={"white"}>
                                                            Sort Option: {search.sortOption || "None"}
                                                        </Text>
                                                    </Box>
                                                }
                                                openDelay={300}
                                            >
                                                <IconButton icon={<FaInfoCircle size={16} />} />
                                            </Tooltip>
                                            <IconButton
                                                icon={<FaShare size={16} />}
                                                onPress={() => openShareModal(search)}
                                            />
                                        </HStack>
                                        <Tooltip label={search.title}>
                                            <Text>{truncateText(search.title, 16)}</Text>
                                        </Tooltip>
                                        <IconButton
                                            icon={<FaTimes size={16} />}
                                            onPress={() => openDeleteConfirmationModal(search.id)}
                                        />
                                    </Box>
                                ))}
                            </Box>
                            <Box style={{ position: 'sticky', bottom: 0, backgroundColor: 'white', zIndex: 1 }}>
                                <Button onPress={handleLogout} colorScheme="red" size="sm">
                                    Logout
                                </Button>
                            </Box>
                        </VStack>
                    </motion.div>
                )}
            </AnimatePresence>

            <>
                {alert && <Alert status="success" mb="4">{messageAlert}</Alert>}
            </>
            {/* CustomModal made with framer Motion */}
            <>
                <CustomModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={confirmDeleteSearch}
                    actionType={modalAction}
                    onShare={shareSearch}

                />

            </>
        </>
    );
};

export default SlideBar;
