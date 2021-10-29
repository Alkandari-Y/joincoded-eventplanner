const express = require('express')
const router = express.Router()
const {
    getEventsList,
    getEventById,
    addEventItem,
    updateEventItem,
    deleteEventItem,
    getFullyBooked,
    getByName
} = require('./controllers')

router.get("/eventName/:eventName", getByName)

router.get("/fully-booked", getFullyBooked)

router.delete("/:eventId?", deleteEventItem)

router.put("/:eventId", updateEventItem )

router.get("/:eventId", getEventById)

router.get("/", getEventsList)

router.post("/", addEventItem)





module.exports = router 