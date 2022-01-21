const mongoose = require('mongoose');
const {default: validator} = require('validator');
//schama
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    subject: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        unique: true
    },
    message: {
        type: String,
        required: true,
        trim: true,
        min: 2,
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Contact', contactSchema);