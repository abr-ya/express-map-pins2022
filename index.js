const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const homeRoute = require("./routes/home");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

dotenv.config();

const app = express();
app.use(express.json());

const mongo_url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.bxtlkqg.mongodb.net/?retryWrites=true&w=majority`;
const mongo_opt = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(mongo_url, mongo_opt)   
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(`MongoDB connection error: ${err}`));

app.use("/", homeRoute);
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
