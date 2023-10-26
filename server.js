const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const router = require('./routes');


const app = express();
app.use(express.json());
app.use(router)

app.listen(8080, () => console.log('server listening on post 8080'))