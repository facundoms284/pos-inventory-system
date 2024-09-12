const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

// Swagger Definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de inventario POS',
    version: '1.0.0',
    description: 'API de sistema de inventario POS',
  },
  servers: [
    {
      url: 'http://localhost:3000', // url base de la api
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Routes to document
};

const swaggerSpec = swaggerJSDoc(options);

// Define associations between models
const defineAssociationsDB = require('./db/associations.js');
defineAssociationsDB();

// Routes import
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const productosRoutes = require('./routes/productos');
const ventasRoutes = require('./routes/ventas');
const usuariosRoutes = require('./routes/usuarios');

app.use(cors());
app.use(express.json());

// Routes

// Route for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes without protection
app.use('/api/v1/register', registerRoutes);
app.use('/api/v1/login', loginRoutes);

// Routes with protection (only authenticated users)
app.use('/api/v1/productos', productosRoutes);
app.use('/api/v1/ventas', ventasRoutes);
app.use('/api/v1/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
  res.send('Hello world from express. All good. POS Inventory API');
});

app.listen(port, () => {
  console.log(`El servidor express se está ejecutando en el puerto ${port}`);
});
