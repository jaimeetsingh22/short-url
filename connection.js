const mongoose = require('mongoose');

const connectToMongodb =async (url) => {
   return mongoose.connect(url);
};

module.exports= connectToMongodb;