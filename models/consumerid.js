const mongoose = require('mongoose')

var consumerIdSchema = new mongoose.Schema({
    email:String,
    id:String
})

module.exports = mongoose.model('ConsumerId',consumerIdSchema)