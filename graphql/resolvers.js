const Automobile = require('../models/automobileModel');

const resolvers = {
    Query: {
        automobiles: async () => {
            try {
                return await Automobile.findAll();
            } catch (error) {
                throw new Error('Error retrieving automobiles');
            }
        },
        automobile: async (_, { id }) => {
            try {
                const car = await Automobile.findByPk(id);
                if (!car) throw new Error('Car not found');
                return car;
            } catch (error) {
                throw new Error('Error retrieving the car');
            }
        },
    },
    Mutation: {
        createAutomobile: async (_, { fuel, model, year, price, bodyStyle }) => {
            try {
                return await Automobile.create({ fuel, model, year, price, bodyStyle });
            } catch (error) {
                throw new Error('Error creating the car');
            }
        },
        updateAutomobile: async (_, { id, fuel, model, year, price, bodyStyle }) => {
            try {
                const automobile = await Automobile.findByPk(id);
                if (!automobile) throw new Error('Car not found');

                await automobile.update({ fuel, model, year, price, bodyStyle });
                return automobile;
            } catch (error) {
                throw new Error('Error updating the car');
            }
        },
        deleteAutomobile: async (_, { id }) => {
            try {
                const automobile = await Automobile.findByPk(id);
                if (!automobile) throw new Error('Car not found');

                await automobile.destroy();
                return 'Car deleted successfully';
            } catch (error) {
                throw new Error('Error deleting the car');
            }
        },
    },
};

module.exports = resolvers;
