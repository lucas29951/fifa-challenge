const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`## SERVER RUNNING ON PORT ${process.env.PORT} ##`);
});