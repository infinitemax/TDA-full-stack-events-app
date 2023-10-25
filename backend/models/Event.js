const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: String,
    venue: String,
    price: Number,
    creator: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User"
            }
})



// below is the ultimate schema we're after, but for now I'm going to keep it simpler
// const eventSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         require: true
//     },
//     dateAndTime: {
//         type: Date,
//         require: true
//     },
//     venue: {
//         type: String,
//         require: true
//     },
//     location: {
//         type: String,
//         require: true
//     },
//     image: String,
//     price: {
//         type: Number,
//         require: true
//     },
//     tags: [String],
//     creator: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "User"
//     },
//     dateAdded: {
//         type: Date,
//         default: Date.now
//     }
// })

module.exports.Event = mongoose.model("Event", eventSchema);