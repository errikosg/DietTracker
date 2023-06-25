const express = require('express');
require('./db/mongoose');
const cors = require('./middleware/cors.js');


const app = express();
app.use(cors);
app.use(express.json());
const baseURL = process.env.BASE_URL || ''

//users
const usersRouter = require('./routers/users');
app.use(`${baseURL}/users`, usersRouter);

//macro-goals
const mgoalsRouter = require('./routers/macroGoals');
app.use(`${baseURL}/macro-goals`, mgoalsRouter);

module.exports = app