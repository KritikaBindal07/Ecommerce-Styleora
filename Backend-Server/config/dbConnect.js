const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      connectTimeoutMS: 30000,
    });
    console.log("MongoDB connected successfully 😊");
  } catch (err) {
    console.error(err);
  }
};

module.exports = dbConnect;
