const mongoose = require('mongoose');

const mongodbConnection = () => {
  mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-k05rz.mongodb.net/therapist?retryWrites=true&w=majority`);
};

module.exports = mongodbConnection;
