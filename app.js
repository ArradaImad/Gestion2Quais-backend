var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const warehouseRouter = require('./routes/warehouse');

var app = express();


mongoose.connect("mongodb://localhost:27017/Gestion2Quais", {
  useNewUrlParser: true,
  useUnifiedTopology: true  
});
mongoose.connection.once("once", () => {
  console.log("your DB connection is established")
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/warehouses', warehouseRouter);

app.listen(3001);

module.exports = app;
