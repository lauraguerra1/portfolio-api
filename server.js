const express = require('express');
const router = require('./routes');
require('dotenv').config()
console.log('postgres pass', process.env.NODE_DB_PASS)

const app = express();
app.use(express.json());
app.use(router)

app.listen(8080, () => console.log('server listening on post 8080'))