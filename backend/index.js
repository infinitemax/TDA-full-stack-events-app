const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const cors = require("cors");
const createError = require("http-errors");
const eventRoutes = require("./routes/events");

const Event = require("./models/Event");
const User = require("./models/User");

const port = 3001;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(console.log(`connected to the database at mongodb`))
    .catch(error => console.log(error))

app.use(
  cors({
    origin: "http://localhost:3000", // this will need to change when app is deployed to vercel.
  })
);

// BCRYPT: when doing log in stuff, try to implement bcrypt: https://medium.com/@manishsundriyal/a-quick-way-for-hashing-passwords-using-bcrypt-with-nodejs-8464f9785b67

// POPULATE: when it comes time to work out how to show all the events that a single user has created, go back to the "populate" docs.

app.use(express.json({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());

app.use("/events", eventRoutes);

app.get("/", (req, res, next) => {
    console.log("request received to home route")
    res.send(`<h2>This is the main page</h2>`)
})



app.listen(port, () => {
  console.log(`Events app listening on port ${port}`);
});
