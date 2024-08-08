import React, { useState, useEffect } from 'react';
import {
    Box, FlatList, Text, VStack, Heading, Spinner, Center, Button, HStack, ScrollView, Input, Select, Slider, IconButton, Alert
} from 'native-base';
import SlideBar from '../components/SlideBar';
import { FaTag } from 'react-icons/fa';
import CustomModal from '../components/CustomModal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/slices/authSlice';
import UserStatus from '../components/UserStatus';
import HighlightText from '../components/HighlightText';
import { fetchAutomobiles, saveSearch, deleteSearch } from '../api';



const HomeScreen = () => {
    const { user, isAuthenticated } = useSelector(selectAuth); // Select auth state from Redux
    const navigate = useNavigate();
    const [automobiles, setAutomobiles] = useState([]);
    const [filteredAutomobiles, setFilteredAutomobiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [fuelFilter, setFuelFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100000]); // Example price range
    const [bodyStyleFilter, setBodyStyleFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [savedSearches, setSavedSearches] = useState(['']);
    const [isSlideBarOpen, setSlideBarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const itemsPerPage = 10; // Number of items per page

    useEffect(() => {
        const getAutomobiles = async () => {
            try {
                const data = await fetchAutomobiles(page, itemsPerPage);
                if (data.automobiles) {
                    setAutomobiles(data.automobiles);
                    setTotalPages(data.totalPages);
                    setFilteredAutomobiles(data.automobiles);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error during getting cars:', error);
                setLoading(false);
                navigate('/login');
            }
        };

        getAutomobiles();
    }, [page, navigate]);

    useEffect(() => {
        if (!automobiles) return; // Ensure automobiles is not undefined

        // Car Filter based on the filter search
        let filtered = automobiles.filter((auto, index) => {
            const fuel = auto.fuel_type ? auto.fuel_type.toLowerCase() : '';
            const bodyStyle = auto.car_body ? auto.car_body.toLowerCase() : '';

            // Match Criteria 
            const matchesFuel = fuelFilter ? fuel === fuelFilter.toLowerCase() : true;
            const matchesBodyStyle = bodyStyleFilter ? bodyStyle === bodyStyleFilter.toLowerCase() : true;
            const matchesPrice = auto.price >= priceRange[0] && auto.price <= priceRange[1];

            // Return filter result
            return matchesFuel && matchesBodyStyle && matchesPrice;
        });




        // Sort by Car based on option selection 
        if (sortOption === 'priceLowToHigh') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'priceHighToLow') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'yearNewest') {
            filtered.sort((a, b) => b.year - a.year);
        } else if (sortOption === 'yearOldest') {
            filtered.sort((a, b) => a.year - b.year);
        }

        setFilteredAutomobiles(filtered);
    }, [searchQuery, sortOption, fuelFilter, priceRange, bodyStyleFilter, automobiles]);

    const clearFilters = () => {
        setSearchQuery('');
        setSortOption('');
        setFuelFilter('');
        setPriceRange([0, 100000]);
        setBodyStyleFilter('');
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveSearch = async (searchTitle) => {
        if (searchTitle.trim()) {
            try {
                const searchDetails = {
                    title: searchTitle,
                    fuelFilter,
                    bodyStyleFilter,
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1],
                    sortOption,
                };
                await saveSearch(searchDetails);
                closeModal();
            } catch (error) {
                console.error('Error while saving the search:', error);
            }
        } else {
            setAlertMessage('Please enter a title for the search');
            setTimeout(() => {
                setAlertMessage('');
            }, 2000);
        }
    };

    const handleDeleteSearch = async (id) => {
        try {
            await deleteSearch(id);
            setSavedSearches(savedSearches.filter((search) => search.id !== id));
        } catch (error) {
            console.error('Error while deleting the search:', error);
        }
    };


    if (loading) {
        return (
            <Center flex={1}>
                <Spinner size="lg" />
            </Center>
        );
    }


    return (
        <Box nativeID='homeScreen_container' height={'100%'} backgroundColor={'green.500'}>
            <HStack justifyContent={'space-between'} height={'50px'} style={{ backgroundColor: 'trasparent' }} zIndex={500} marginRight={10}>
                <IconButton
                    width={20}
                    icon={<FaTag size={28} />}
                    onPress={() => setSlideBarOpen(true)}
                />
                <UserStatus userName={user} isAuthenticated={isAuthenticated} />
            </HStack>
            {alertMessage ? (
                <Alert w="100%" status="error" mb={4}>
                    <VStack space={2} alignItems="center">
                        <Alert.Icon />
                        <Text>{alertMessage}</Text>
                    </VStack>
                </Alert>
            ) : null}
            <>
                <SlideBar
                    isOpen={isSlideBarOpen}
                    onClose={() => setSlideBarOpen(false)}
                    savedSearches={savedSearches}
                    onDelete={handleDeleteSearch}
                />
                <Center flex={1} bg="gray.100" height={'100%'} >
                    <Box width="100%" maxWidth="700px" height={'100%'} bg="white" borderRadius="md" shadow={1} overflow="hidden">
                        <VStack space={4} p={6}>
                            <HStack justifyContent={"center"} mb={4}>
                                <Heading size="lg">Cars List</Heading>
                            </HStack>
                            {/* Search Bar */}
                            <Input
                                placeholder="Search for model"
                                value={searchQuery}
                                onChangeText={(text) => setSearchQuery(text)}
                                mb={4}
                            />
                            {/* Filter and Sort Options */}
                            <HStack space={2} mb={4}>
                                <Select
                                    placeholder="Filter for fuel"
                                    selectedValue={fuelFilter}
                                    onValueChange={(value) => setFuelFilter(value)}
                                    flex={1}
                                >
                                    <Select.Item label="All" value="" />
                                    <Select.Item label="Gas" value="Gas" />
                                    <Select.Item label="Diesel" value="Diesel" />
                                </Select>
                                <Select
                                    placeholder="Filter for style car body"
                                    selectedValue={bodyStyleFilter}
                                    onValueChange={(value) => setBodyStyleFilter(value)}
                                    flex={1}
                                >
                                    <Select.Item label="All" value="" />
                                    <Select.Item label="Sedan" value="Sedan" />
                                    <Select.Item label="Convertible" value="Convertible" />
                                    <Select.Item label="Hatchback" value="Hatchback" />
                                    <Select.Item label="Hardtop" value="Hardtop" />
                                    <Select.Item label="Station Wagon" value="Station Wagon" />
                                </Select>
                                <Select
                                    placeholder="Sort by"
                                    selectedValue={sortOption}
                                    onValueChange={(value) => setSortOption(value)}
                                    flex={1}
                                >
                                    <Select.Item label="Price: Lower" value="priceLowToHigh" />
                                    <Select.Item label="Price: Higher" value="priceHighToLow" />
                                    <Select.Item label="Year: Newest" value="yearNewest" />
                                    <Select.Item label="Year: Oldest" value="yearOldest" />
                                </Select>
                            </HStack>
                            {/* Price Range Filter */}
                            <HStack space={2} mb={4} alignItems="center">
                                <Text>Price</Text>
                                <VStack flex={1} space={2}>
                                    {/* Slider for minimum price */}
                                    <Slider
                                        minValue={0}
                                        maxValue={100000}
                                        step={1000}
                                        value={priceRange[0]}
                                        onChangeEnd={(val) => {
                                            setPriceRange([val, priceRange[1]]);
                                        }}
                                        flex={1}
                                    >
                                        <Slider.Track>
                                            <Slider.FilledTrack />
                                        </Slider.Track>
                                        <Slider.Thumb />
                                    </Slider>
                                    {/* Slider Max price*/}
                                    <Slider
                                        minValue={0}
                                        maxValue={100000}
                                        step={1000}
                                        value={priceRange[1]}
                                        onChangeEnd={(val) => {
                                            setPriceRange([priceRange[0], val]);
                                        }}
                                        flex={1}
                                    >
                                        <Slider.Track>
                                            <Slider.FilledTrack />
                                        </Slider.Track>
                                        <Slider.Thumb />
                                    </Slider>
                                </VStack>
                                <Text ml={2}>
                                    ${priceRange[0] !== undefined ? priceRange[0] : 0} - ${priceRange[1] !== undefined ? priceRange[1] : 100000}
                                </Text>
                            </HStack>
                            {/*Controlls button operations*/}
                            <HStack justifyContent="space-between" alignItems="center" mb={4}>
                                <Button onPress={clearFilters} colorScheme="blue" size="sm" >
                                    Clean Filter
                                </Button>
                                <Button onPress={openModal} colorScheme="blue" size="sm">
                                    Save Search
                                </Button>
                            </HStack>
                            {/* Cars List */}
                            <Box maxHeight="400px" overflow="hidden" borderColor="gray.200" borderWidth={1} borderRadius="md">
                                <ScrollView>
                                    <FlatList
                                        data={filteredAutomobiles}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={({ item }) => (
                                            <Box borderBottomWidth="1" borderColor="gray.200" py="2" px="2">
                                                <Text bold fontSize="md">
                                                    {<HighlightText text={item.make} query={searchQuery} />}
                                                </Text>
                                                <Text color="gray.500">Years: {item.year}</Text>
                                                <Text color="gray.500">Price: ${item.price}</Text>
                                                <Text color="gray.500">Car body: {item.car_body}</Text>
                                                <Text color="gray.500">Fuel Type: {item.fuel_type}</Text>
                                            </Box>
                                        )}
                                    />
                                </ScrollView>
                            </Box>
                            {/* Footer Page Number */}
                            <HStack justifyContent="space-between" alignItems="center" mt={4}>
                                <Button onPress={() => setPage(Math.max(page - 1, 1))} isDisabled={page === 1}>
                                    Previous Page
                                </Button>
                                <Text>
                                    Page {page} of {totalPages}
                                </Text>
                                <Button onPress={() => setPage(Math.min(page + 1, totalPages))} isDisabled={page === totalPages}>
                                    Next Page
                                </Button>
                            </HStack>
                        </VStack>
                        {/* Modal to save search preset */}
                        <CustomModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onSave={handleSaveSearch} // 
                            actionType="save" // Can be "delete", "share", or "save"
                        />
                    </Box>
                </Center>
            </>
        </Box>
    );
};

export default HomeScreen;
