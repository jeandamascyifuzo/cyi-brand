const mongoose = require('mongoose');
//schama
const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        unique: true
    },
    subtitle:{
        type: String,
        required: true
    },
    content:{ 
         type: String, 
         required: true,
        },
    author:{
        type: String
           },
    blogImage:{
        type: String,
    }
});

module.exports = mongoose.model('Blog', blogSchema);