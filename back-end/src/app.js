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

//recipes
const recipesRouter = require('./routers/recipes');
app.use(`${baseURL}/recipes`, recipesRouter);

//consumptions
const consumptionsRouter = require('./routers/consumptions');
app.use(`${baseURL}/consumptions`, consumptionsRouter);

module.exports = app