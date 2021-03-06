const Event = require('../../db/models/Event')


const getEventsList = async (req, res, next) => {
    const dateKey = req.body.startDate
    try {
        if (!dateKey) {
            const allEvents = await Event.find().select(
                ['_id', 'name', 'startDate']).sort('startDate').sort('name')
            return res.json(allEvents)
        } else if (dateKey){
            const allEventsAfter = await Event.find(
                { startDate: { $gte: req.body.startDate } }
            ).select(['_id', 'name', 'startDate']).sort('startDate').sort('name')
            if (allEventsAfter.length === 0) {
                next({
                    status: 404,
                    message: "Events after requested date Not Found!"
                })
            } else {
                return res.json(allEventsAfter)
            }
        }
    } catch (err) {
        next(err)
    }
}

const getEventById = async (req, res, next) => {
    const { eventId } = req.params;
    try {
        const foundEvent = await Event.findById(eventId)
        if (foundEvent) {
            res.status(200).json(foundEvent)
        } else {
            next({
                status: 404,
                message: "Event Not Found!"
            })
        }
    } catch (err) {
        next(err)
    }
}

const addEventItem = async(req, res, next) => {
    try {
        const newEvent = await Event.create(req.body)
        return res.status(201).json(newEvent)
    } catch (err) {
        next(err)
    }
}


const updateEventItem = async (req, res, next) => {
    const { eventId } = req.params;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            {
                _id: eventId
            },
            req.body,
            {
                new: true,
                runValidators: true
            })
        if (updatedEvent) {
            return res.json(updatedEvent)
        } else {
            next({
                status: 404,
                message: "Event Not Found!"
            })
        }
    } catch (err) {
        next(err)
    }
}


const deleteEventItem = async (req, res, next) => {
    const { eventId } = req.params;
    try {
        if (!eventId) {
            await Event.deleteMany({
                _id: {
                    $in: req.body
                }
            })
            return res.status(204).end()
        } else if (eventId) {
            await Event.findByIdAndDelete({_id: eventId})
            return res.status(204).end()
        } else {
            next({
                status: 404,
                message: "Event Not Found!"
            })
        }
    } catch (err) {
        next(err)
    }
}

const getFullyBooked = async (req, res, next) => {
    try {
        const booked = await Event.find({ $expr: { $eq: ["$numOfSeats", "$bookedSeats"] } })
        if (booked) {
            return res.status(200).json(booked)
        } else {
            next({
                status: 404,
                message: "No Booked Events Found!"
            })
        }
    } catch (err) {
        next(err)
    }
}

const getByName = async (req, res, next) => {
    try {
        const { eventName } = req.params;
        const foundNames = await Event.find({ name: eventName });
        if (foundNames.length === 0) {
            next({
                status: 404,
                message: "Could Not Find Events By That Name!"
            })
        } else {
            return res.status(200).json(foundNames);
        }
	} catch (err) {
		next(err);
	}
}

const getPagination = async (req, res, next) => {
    try {
        const page = parseInt(req.params.page)
        const limit = parseInt(req.params.limit)
        
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
    
        const results = {}
    
        const numOfDocs = await Event.countDocuments()
    
        if (endIndex < numOfDocs) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        results.events = await Event.find().limit(limit).skip(startIndex)
        if (results.events.length >= 1) {
            res.status(200).json(results)
        } else {
            next({
                status: 404,
                message: "Error in the page number and limit!"
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getEventsList,
    getEventById,
    addEventItem,
    updateEventItem,
    deleteEventItem,
    getFullyBooked,
    getByName,
    getPagination
}