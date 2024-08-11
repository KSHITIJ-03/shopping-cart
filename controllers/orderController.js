const Customer = require('./../models/customerModel')
const Order = require('./../models/orderModel')
const Product = require('./../models/productModel')
const appError = require('./errorController')
const Address = require('./../models/addressModel')

const mongoose = require('mongoose')

async function createOrder (req, res, next) {
    try {
        const customer = await Customer.findById(req.user._id).populate('cart.product')

        console.log(customer);

        let price = 0
        for(let i = 0; i < customer.cart.length; i++) {
            price = price + customer.cart[i].price
        }

        console.log(customer.cart[0].product);

        const address = await Address.create(req.body)
        
        const order = await Order.create({
            customerId : req.user._id,
            amount : price,
            orderId : 'test-order',
            items : customer.cart,
            address
        })

        console.log(order._id, address._id);
        
        customer.cart = []
        customer.orders.push(order._id)
        customer.address.push(address._id)

        customer.save({ validateBeforeSave: false })
        
        res.status(201).json({
            status : 'success',
            message : 'order has done',
            order
        })
    } catch(err) {
        next(err)
    }
}

module.exports = {createOrder}