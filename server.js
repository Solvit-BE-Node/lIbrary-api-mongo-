const express = require("express");
require("dotenv").config();


const { connectToDb } = require("./utils/db");
const errorHandler = require('./middlewares/error')
const logger = require('./middlewares/logging')
const bookRouter = require('./routes/books')
const responseDuration = require('./middlewares/responseDuration')

const app = express();


app.use(express.json())
app.use(logger)


app.use(responseDuration)
app.use('/api/v1/books', bookRouter)

app.use(errorHandler);

connectToDb();

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
