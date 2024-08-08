const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Car {
        id: ID!
        fuel: String!
        model: String!
        year: Int
        price: Float
        bodyStyle: String
    }

    type Query {
        automobiles: [Car] // Fixed the name to match resolver
        automobile(id: ID!): Car
    }

    type Mutation {
        createAutomobile(
            fuel: String!, 
            model: String!, 
            year: Int, 
            price: Float, 
            bodyStyle: String
        ): Car
        
        updateAutomobile(
            id: ID!, 
            fuel: String, 
            model: String, 
            year: Int, 
            price: Float, 
            bodyStyle: String
        ): Car
        
        deleteAutomobile(id: ID!): String
    }
`;

module.exports = typeDefs;
