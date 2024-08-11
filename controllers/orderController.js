const Customer = require('./../models/customerModel')
const Order = require('./../models/orderModel')
const Product = require('./../models/productModel')
const appError = require('./errorController')

const mongoose = require('mongoose')

async function createOrder (req, res, next) {
    try {
        const order = await Order.create()
    } catch(err) {
        next(err)
    }
}