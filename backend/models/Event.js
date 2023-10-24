const mongoose = require("mongoose")
// const { User } = require("./User")


const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    time: {
        type: Date,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    image: String,
    price: {
        type: Number,
        require: true
    },
    tags: [String],
    creator: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
})

module.exports.Event = mongoose.model("Event", eventSchema);