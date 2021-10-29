const mongoose = require("mongoose")

const EventSchema = mongoose.Schema(
    {
       organizer: {
           type: String,
           required: [true, "Please include organizer name!"],
           maxLength: [20, "Organizer name can't exceed 20 characters"]
       },
       name: {
           type: String,
           required: [true, "Should NOT include the word 'event'."]
       },
       email: {
           type: String,
           required: [true, "Email is required"]
       },
       image: {
           type: String,
           required: [true, "Image or logo required"]
       },
       numOfSeats: {
           type: Number,
           required: [true, "This field is required. Please set to at least 5 as a minium to be accepted."],
           min: [5, "Minimum required seats / tickets for an event should be greater than or equal to 5."]
       },
       bookedSeats: {
           type: Number,
           required: [true, "This is a required field and should not be less than 0 or greater than the specified number of seats"],
           default: 0
       },
        startDate: {
            type: Date,
            required: [true, "Start date is required"]
       },
        endDate: {
            type: Date,
            required: [true, "End Date is required"]
       },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Event", EventSchema)

// The model must have the following fields:
// - organizer: shouldn't exceed 20 characters and must be unique
// - name: should not include the word event
// - email: should be a valid email format / can't be empty
// - image: can't be null
// - numOfSeats: can't be less than 5
// - bookedSeats: has a default value of 0 and can't be greater than numOfSeats
// - startDate: should be after today's date
// - endDate: shouldn't be before startDate