import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HomeScreenMock from '../screens/HomeScreenMock';

describe('HomeScreenMock', () => {
    const renderComponent = () => {
        return render(<HomeScreenMock />);
    };

    test('filters cars by fuel type', () => {
        renderComponent();
        fireEvent.change(screen.getByLabelText('Filter for fuel'), { target: { value: 'Gas' } });
        const filteredItems = screen.getAllByText(/Fuel Type: Gas/i);
        expect(filteredItems.length).toBeGreaterThan(0);
    });

    test('filters cars by body style', () => {
        renderComponent();
        fireEvent.change(screen.getByLabelText('Filter for style car body'), { target: { value: 'Sedan' } });
        const filteredItems = screen.getAllByText(/Car body: Sedan/i);
        expect(filteredItems.length).toBeGreaterThan(0);
    });

    test('sorts cars by price', () => {
        renderComponent();
        fireEvent.change(screen.getByLabelText('Sort by'), { target: { value: 'priceLowToHigh' } });
        const sortedItems = screen.getAllByText(/Price: \$/i);
        let isSorted = true;
        for (let i = 0; i < sortedItems.length - 1; i++) {
            const price1 = parseFloat(sortedItems[i].textContent.replace('Price: $', ''));
            const price2 = parseFloat(sortedItems[i + 1].textContent.replace('Price: $', ''));
            if (price1 > price2) {
                isSorted = false;
                break;
            }
        }
        expect(isSorted).toBe(true);
    });

    test('updates price range filter', () => {
        renderComponent();
        const minPriceSlider = screen.getAllByRole('slider')[0];
        const maxPriceSlider = screen.getAllByRole('slider')[1];
        fireEvent.change(minPriceSlider, { target: { value: '10000' } });
        fireEvent.change(maxPriceSlider, { target: { value: '50000' } });
        expect(screen.getByText('$10000 - $50000')).toBeInTheDocument();
    });

    test('clears all filters', () => {
        renderComponent();
        fireEvent.change(screen.getByLabelText('Filter for fuel'), { target: { value: 'Gas' } });
        fireEvent.change(screen.getByLabelText('Filter for style car body'), { target: { value: 'Sedan' } });
        fireEvent.click(screen.getByText('Clean Filter'));
        expect(screen.getByLabelText('Filter for fuel').value).toBe('');
        expect(screen.getByLabelText('Filter for style car body').value).toBe('');
    });

    test('filters cars by search query', () => {
        renderComponent();
        fireEvent.change(screen.getByPlaceholderText('Search for model'), { target: { value: 'Toyota' } });
        const filteredItems = screen.getAllByText(/Toyota/i);
        expect(filteredItems.length).toBeGreaterThan(0);
    });
});
