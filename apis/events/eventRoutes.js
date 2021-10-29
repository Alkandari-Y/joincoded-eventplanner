const express = require('express')
const router = express.Router()
const {
    getEventsList,
    getEventById,
    addEventItem,
    updateEventItem,
    deleteEventItem,
    getFullyBooked,
    getByName,
    getPagination
} = require('./controllers')

router.get("/paginate-list/:page&:limit", getPagination)

router.get("/eventName/:eventName", getByName)

router.get("/fully-booked", getFullyBooked)

router.delete("/:eventId?", deleteEventItem)

router.put("/:eventId", updateEventItem )

router.get("/:eventId", getEventById)

router.get("/", getEventsList)

router.post("/", addEventItem)





module.exports = router 