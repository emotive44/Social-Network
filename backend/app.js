const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user-routes')

const port = 5000;
const app = express();


app.use(bodyParser.json());

app.use('/api/v1/posts/', userRoutes);


mongoose
  .connect(
    'mongodb+srv://marko:9bafGtezejLTF7Lm@socialnetwork-y8epj.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    app.listen(port, () => {
      console.log('server listen on: ' + port);
    })
  })
  .catch(err => {
    console.log(err);
  })