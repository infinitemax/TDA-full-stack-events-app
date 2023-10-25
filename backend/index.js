const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const cors = require("cors");
const createError = require("http-errors");
const eventRoutes = require("./routes/events");
const { v4: uuid } = require("uuid");

const Event = require("./models/Event");
const User = require("./models/User");

const port = process.env.PORT || 3001;

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

// /AUTH here

app.post("/auth", async (req, res, next) => {
    console.log("logging in")
    try {
        const user = await User.findOne({username: req.body.username})
        // check user exists
        if (!user) {
            return next(createError(404, "user not found"))
        }

        // check password
        if (req.body.password  !== user.password) {
            return next(createError(401, "wrong password"))
        }

        // if password is corrent, give them a token
        user.token = uuidv4();
        await user.save()
        // send the token back to the front end to be set in local storage
        res.send({
            token: user.token
        })
    
    } catch (error) {
        console.log(error)
        return next(createError(500, "Server error"))
    }
})

// app.use here because it needs to happen each time the page loads
app.use(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const user = await User.findOne({ token: authHeader })
    if (user) {
        next();
    } else {
        return next(createError(401, "Unauthorised"))
    }
})

app.use("/", eventRoutes); // using the main route rather than adding "/events"

// app.get("/", (req, res, next) => {
//     console.log("request received to home route")
//     res.send(`<h2>This is the main page</h2>`)
// })



app.listen(port, () => {
  console.log(`Events app listening on port ${port}`);
});
