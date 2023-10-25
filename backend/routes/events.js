const express = require("express");
const router = express.Router();
const { addEvent, getEvents, getEventsByUser, deleteEventById, updateEventById } = require("../controllers/events")


router.get("/", getEvents)
router.post("/add", addEvent)
router.get("/user/:id", getEventsByUser) // get events by user - currently by id, but would be good to do it by username
router.delete("/delete/:id", deleteEventById)
router.put("/update/:id", updateEventById)


module.exports = router