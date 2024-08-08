import React, { useState, useEffect } from 'react';

const HomeScreenMock = () => {
    const [automobiles, setAutomobiles] = useState([]);
    const [filteredAutomobiles, setFilteredAutomobiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [fuelFilter, setFuelFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [bodyStyleFilter, setBodyStyleFilter] = useState('');

    useEffect(() => {
        const mockData = [
            { id: 1, make: 'Toyota', year: 2020, price: 20000, car_body: 'Sedan', fuel_type: 'Gas' },
            { id: 2, make: 'Honda', year: 2019, price: 15000, car_body: 'Hatchback', fuel_type: 'Diesel' },
        ];
        setAutomobiles(mockData);
        setFilteredAutomobiles(mockData);
    }, []);

    useEffect(() => {
        let filtered = automobiles.filter((auto) => {
            const fuel = auto.fuel_type ? auto.fuel_type.toLowerCase() : '';
            const bodyStyle = auto.car_body ? auto.car_body.toLowerCase() : '';
            const matchesFuel = fuelFilter ? fuel === fuelFilter.toLowerCase() : true;
            const matchesBodyStyle = bodyStyleFilter ? bodyStyle === bodyStyleFilter.toLowerCase() : true;
            const matchesPrice = auto.price >= priceRange[0] && auto.price <= priceRange[1];
            const matchesSearchQuery = searchQuery ? auto.make.toLowerCase().includes(searchQuery.toLowerCase()) : true;

            return matchesFuel && matchesBodyStyle && matchesPrice && matchesSearchQuery;
        });

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

    return (
        <div>
            <h1>Cars List</h1>
            <input
                placeholder="Search for model"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <label htmlFor="fuel-filter">Filter for fuel</label>
            <select id="fuel-filter" onChange={(e) => setFuelFilter(e.target.value)} value={fuelFilter}>
                <option value="">All</option>
                <option value="Gas">Gas</option>
                <option value="Diesel">Diesel</option>
            </select>
            <label htmlFor="body-style-filter">Filter for style car body</label>
            <select id="body-style-filter" onChange={(e) => setBodyStyleFilter(e.target.value)} value={bodyStyleFilter}>
                <option value="">All</option>
                <option value="Sedan">Sedan</option>
                <option value="Convertible">Convertible</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Hardtop">Hardtop</option>
                <option value="Station Wagon">Station Wagon</option>
            </select>
            <label htmlFor="sort-by">Sort by</label>
            <select id="sort-by" onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                <option value="">Sort by</option>
                <option value="priceLowToHigh">Price: Lower</option>
                <option value="priceHighToLow">Price: Higher</option>
                <option value="yearNewest">Year: Newest</option>
                <option value="yearOldest">Year: Oldest</option>
            </select>
            <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            />
            <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            />
            <p>{`$${priceRange[0]} - $${priceRange[1]}`}</p>
            <button onClick={clearFilters}>Clean Filter</button>
            <div>
                {filteredAutomobiles.map((auto) => (
                    <div key={auto.id}>
                        <h2>{auto.make}</h2>
                        <p>Years: {auto.year}</p>
                        <p>Price: ${auto.price}</p>
                        <p>Car body: {auto.car_body}</p>
                        <p>Fuel Type: {auto.fuel_type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreenMock;
