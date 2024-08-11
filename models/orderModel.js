const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderId : {
        type : String,
        required : [true]
    },
    customerId : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    status : {
        type : String
    },
    txnId: String,
    items: [
        {   
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true} ,
            unit: { type: Number, require: true} 
        }
    ]
})

module.exports = mongoose.model('Order', orderSchema)