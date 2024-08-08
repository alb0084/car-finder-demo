const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Automobiles API',
            version: '1.0.0',
            description: 'API cars operation CRUD management ',
            contact: {
                name: 'Il Tuo Nome',
                email: 'youremail@example.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development Server  ',
            },
        ],
    },
    apis: ['./routes/*.js'], //Path to file's sources for Swagger's comments
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
