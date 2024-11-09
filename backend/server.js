const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelizeFemale, sequelizeMale } = require('./config/database');
const femalePlayerRoutes = require('./routes/femalePlayerRoutes');
const malePlayerRoutes = require('./routes/malePlayerRoutes');
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/api/players/male', malePlayerRoutes);
app.use('/api/players/female', femalePlayerRoutes);

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
});