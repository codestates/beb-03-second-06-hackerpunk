const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const password = process.env.ATLAS_PASSWORD;
const database_name = 'project2';
const url = `mongodb+srv://mango7loco:${password}@cluster0.svhee.mongodb.net/${database_name}?retryWrites=true&w=majority`

const connection_params = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const DBinit = () => {
  mongoose.connect(url, connection_params)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(`Error connecting to the database : \n${err}`);
  })
};

module.exports = {
  DBinit
}