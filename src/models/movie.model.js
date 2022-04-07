const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = new Schema({
    Title:{type: String, required: true, unique: true},
    Year:{type: String, required: true},
    Released:{type: String, required: true},
    Genre:{type: String, required: true},
    Actors:{type: String, required: true},
    Plot:{type: String, required: true},
    Ratings:[{type: Object, required: true}]
});

module.exports = mongoose.model('Movie',Movie);