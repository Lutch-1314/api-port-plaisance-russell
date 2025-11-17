const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API du Port de Plaisance Russell',
      version: '1.0.0',
      description: 'Documentation Swagger de l’API du port de plaisance Russell',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Entrez votre token JWT ici (sans "Bearer ")'
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],

    servers: [
      {
        url: process.env.API_BASE_URL || "http://localhost:3000",
        description: "Serveur API"
      },
    ],
  },
  apis: ['./routes/api/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };