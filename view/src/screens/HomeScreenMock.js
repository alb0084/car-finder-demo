import React, { useState, useEffect } from 'react';
import { MOCK_PAGE_STRINGS } from '../utils/strings';

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
            <h1>{MOCK_PAGE_STRINGS['CARS_LIST_HEADING']}</h1>
            <input
                placeholder={MOCK_PAGE_STRINGS['Search for model']}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <label htmlFor="fuel-filter">{MOCK_PAGE_STRINGS['FILTER_FUEL_LABEL']}</label>
            <select id="fuel-filter" onChange={(e) => setFuelFilter(e.target.value)} value={fuelFilter}>
                <option value="">{MOCK_PAGE_STRINGS['FILTER_FUEL_ALL']}</option>
                <option value="Gas">{MOCK_PAGE_STRINGS['FILTER_FUEL_GAS']}</option>
                <option value="Diesel">{MOCK_PAGE_STRINGS['FILTER_FUEL_DIESEL']}</option>
            </select>
            <label htmlFor="body-style-filter">{MOCK_PAGE_STRINGS['FILTER_BODY_STYLE_LABEL']}</label>
            <select id="body-style-filter" onChange={(e) => setBodyStyleFilter(e.target.value)} value={bodyStyleFilter}>
                <option value="">{MOCK_PAGE_STRINGS['FILTER_BODY_STYLE_ALL']}</option>
                <option value="Sedan">{MOCK_PAGE_STRINGS['FILTER_BODY_STYLE_SEDAN']}</option>
                <option value="Convertible">{MOCK_PAGE_STRINGS['FILTER_BODY_STYLE_CONVERTIBLE']}</option>
                <option value="Hatchback">{MOCK_PAGE_STRINGS['FILTER_BODY_STYLE_HATCHBACK']}</option>
                <option value="Hardtop">{MOCK_PAGE_STRINGS['FILTER_BODY_STYLE_HARDTOP']}</option>
                <option value="Station Wagon">{MOCK_PAGE_STRINGS['FILTER_BODY_STYLE_STATION_WAGON']}</option>
            </select>
            <label htmlFor="sort-by">{MOCK_PAGE_STRINGS['SORT_BY_LABEL']}</label>
            <select id="sort-by" onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                <option value="">{MOCK_PAGE_STRINGS['SORT_BY_LABEL']}</option>
                <option value="priceLowToHigh">{MOCK_PAGE_STRINGS['SORT_PRICE_LOW_TO_HIGH']}</option>
                <option value="priceHighToLow">{MOCK_PAGE_STRINGS['SORT_PRICE_HIGH_TO_LOW']}</option>
                <option value="yearNewest">{MOCK_PAGE_STRINGS['SORT_YEAR_NEWEST']}</option>
                <option value="yearOldest">{MOCK_PAGE_STRINGS['SORT_YEAR_OLDEST']}t</option>
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
            <button onClick={clearFilters}>{MOCK_PAGE_STRINGS['CLEAN_FILTER_BUTTON']}</button>
            <div>
                {filteredAutomobiles.map((auto) => (
                    <div key={auto.id}>
                        <h2>{auto.make}</h2>
                        <p>{MOCK_PAGE_STRINGS['CAR_YEARS_LABEL']}: {auto.year}</p>
                        <p>{MOCK_PAGE_STRINGS['CAR_PRICE_LABEL']}: ${auto.price}</p>
                        <p>{MOCK_PAGE_STRINGS['CAR_BODY_LABEL']}: {auto.car_body}</p>
                        <p>{MOCK_PAGE_STRINGS['CAR_FUEL_LABEL']}: {auto.fuel_type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreenMock;
