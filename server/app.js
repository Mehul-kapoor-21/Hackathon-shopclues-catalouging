require('express-async-errors')
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { errorHandler } = require('./middlewares/error');
require('dotenv').config()
require('./db')
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");


const app = express();
app.use(express.json())
app.use(cors());
app.use(morgan('dev'))
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use(errorHandler)


app.listen(8000, () => {
  console.log("the port is listening on port 8000");
});
