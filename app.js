
// const indexRouter = require('./routes/index.js')
// app.use(indexRouter)

"use strict"
require("dotenv").config();
const express = require('express');
const app = express();
const port = 3000;
const Routes = require('./routes/routes');
const errHandler = require('./middleware/errHandler.js');
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(Routes);
app.use(errHandler);

app.listen(port, _ => console.log("DB connected " + port));
