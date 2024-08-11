const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderId : {
        type : String,
        required : [true]
    },
    customerId : {
        type : mongoose.Schema.Types.ObjectId, ref : 'Customer',
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
          product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
          unit: { type: Number, require: true, default : 0},
          price : {
            type : Number,
            default : 0
          }
        }
    ],
    address : {
        type : mongoose.Schema.Types.ObjectId, ref : 'Address', required : true
    }
},
{
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
})

module.exports = mongoose.model('Order', orderSchema)