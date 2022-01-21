//schama
const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    full: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    
    comment: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 1000
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);
