const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    discount: {
        type: Number,
        required: true
    },
    color: {
        type: String,
    },
    category:{
        type:String
    },
    style:{
        type:String
    },
    image:{
        type:[String]
    }
})
module.exports = mongoose.model('Product', productSchema)

