const createError = require("http-errors");
const mongoose = require("mongoose");
const { Event } = require("../models/Event")


// get all events
exports.getEvents = async (req, res, next) => {
    try {
        const events = await Event.find({})
        res.send(events)
         
    } catch (error) {
        console.log(error)
        res.send("a server error has occurred")
        return next(createError(500, 'a server error has occured')) 
    }
}

// add an event
exports.addEvent = async (req, res, next) => {
    const data = req.body
    
    try {
        const newEvent = new Event({data})
        await newEvent.save();
        res.send('event added')
    } catch (error) {
        res.send("a server error has occurred")
        return next(createError(500, 'a server error has occured'))
    }
}