const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
require('dotenv').config('.env');

const app = express();

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DataBase is connected Successfully!!');
  })
  .catch(() => {
    console.error('Error getting from DataBase');
  });

const port = process.env.PORT || 1997;

app.use(express.json());
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Port is running on ${port}...`);
});
