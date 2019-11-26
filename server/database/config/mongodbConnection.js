const mongoose = require('mongoose');

const mongodbConnection = () => mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-k05rz.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true });

module.exports = mongodbConnection;
