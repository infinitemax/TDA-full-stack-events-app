const createError = require("http-errors");
const mongoose = require("mongoose");
const { Event } = require("../models/Event");
const { contentSecurityPolicy } = require("helmet");

// get all events
exports.getEvents = async (req, res, next) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "a server error has occurred" });
        return next(createError(500, "a server error has occured"));
    }
};

// add an event
exports.addEvent = async (req, res, next) => {
    const data = req.body;

    try {
        const newEvent = new Event(data);
        await newEvent.save();
        res.status(200).json({
            message: "Event created successfully!",
            event: newEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "a server error has occurred" });
        return next(createError(500, "a server error has occured"));
    }
};

// update an event
exports.updateEventById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(id, changes);
        res.status(200).json({
            message: "Event updated successfully",
            newEvent: updatedEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "a server error has occurred" });
        return next(createError(500, "a server error has occured"));
    }
};

// delete an event

exports.deleteEventById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(createError(400, "Bad request"));
        }

        const deletedEvent = await Event.findByIdAndDelete(id);

        res.send({
            message: "event deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "a server error has occurred" });
        return next(createError(500, "a server error has occured"));
    }
};

// get events by user - NOT WORKING!
exports.getEventsByUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        // this isn't working! Might need to try the populate method!
        const eventsByUser = Event.find({ creator: id });
        res.send(eventsByUser);
    } catch (error) {
        console.log(error);
        res.send("a server error has occurred");
        return next(createError(500, "a server error has occured"));
    }
};
