const express = require("express");
const router = express.Router();
const { addEvent, getEvents } = require("../controllers/events")

router.get("/", getEvents)
router.post("/add", addEvent)



module.exports = router