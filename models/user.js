const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types //to maake an relation between both models


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: Date,
    bio: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    list: [{
        type: String,
    }]
})

mongoose.model("User", userSchema)
