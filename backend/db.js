const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || "mongodb://locahost:27017/inotebook";

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => console.log("✅ Connected to MongoDB Atlas"))
        .catch((err) => console.log("❌ MongoDB Error: " + err));
};

module.exports = connectToMongo;