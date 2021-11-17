const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    name : String,
    img : String,
    summary : String
});

module.exports = mongoose.model('Movie', MovieSchema);