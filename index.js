const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const homeRoute = require("./routes/home");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

dotenv.config();
// const FRONT_LIST = [process.env.FRONT1, process.env.FRONT2, process.env.FRONT3];

const app = express();
// app.use(cors({ origin: FRONT_LIST, credentials: true }));
app.use(cors());
app.use(express.json());

const mongo_url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.bxtlkqg.mongodb.net/?retryWrites=true&w=majority`;
const mongo_opt = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set("strictQuery", false);
mongoose.connect(mongo_url, mongo_opt)   
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(`MongoDB connection error: ${err}`));

app.use("/", homeRoute);
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.listen(8800, () => {
  console.log("Backend server is running on port 8800!");
});
