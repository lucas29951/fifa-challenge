const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { sequelizeFemale, sequelizeMale } = require('./config/database');
const femalePlayerRoutes = require('./routes/femalePlayerRoutes');
const malePlayerRoutes = require('./routes/malePlayerRoutes');
const filterPlayerRoutes = require('./routes/filterPlayerRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FIFA Challenge API',
      version: '1.0.0',
      description: 'Documentacion de la API de FIFA Challenge',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/players/male', malePlayerRoutes);
app.use('/api/players/female', femalePlayerRoutes);
app.use('/api/players/filter', filterPlayerRoutes);
app.use('/api/auth', authRoutes);

sequelizeMale.authenticate()
  .then(() => console.log('## Connected to the database of male players ##'))
  .catch(error => console.error('Connection error for male players:', error));

sequelizeFemale.authenticate()
   .then(() => console.log('## Connected to the database of female players ##'))
   .catch(error => console.error('Connection error for female players:', error));

sequelizeMale.sync();
sequelizeFemale.sync();

app.listen(process.env.PORT, () => {
    console.log(`## SERVER RUNNING ON PORT ${process.env.PORT} ##`);
    console.log('Documentation available on http://localhost:3000/api-docs');
});