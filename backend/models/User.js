const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    token: {
        type: String,
        require: true,
    },
    fName: {
        type: String,
        require: true,
    },
    lName: {
        type: String,
        require: true,
    },
    image: String,
});

module.exports.User = mongoose.model("User", userSchema);
