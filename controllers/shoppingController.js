const Customer = require('./../models/customerModel')
const Product = require('./../models/productModel')
const mongoose = require('mongoose')
const appError = require('./../utils/appError')

async function fillCart (req, res, next) {
    try {
        //console.log(req.params);
        // const customer = await Customer.findByIdAndUpdate(req.user._id, 
        //     {
        //         $push : {
        //             cart : {
        //                 product : req.params.id,
        //                 unit : {
        //                     $sum : 1
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         new : true,
        //         runValidators : true
        //     }
        // )

        const customer = await Customer.findById(req.user._id).select('cart')
        const product = await Product.findById(req.params.id)

        const cartItem = customer.cart.find(item => item.product.toString() === req.params.id)
        if(cartItem) {
            cartItem.unit += 1
            cartItem.price += product.price
        } else {
            customer.cart.push({
                product : req.params.id, unit : 1,
                price : product.price
            })
        }

        await customer.populate('cart.product')

        let price = 0

        for(let i = 0; i < customer.cart.length; i++){
            price = customer.cart[i].product.price * customer.cart[i].unit + price
        }

        await customer.save()
        
        res.status(200).json({
            status : 'success',
            customer,
            price
        })
    } catch(err) {
        next(err)
    }
}

async function removeFromCart(req, res, next) {
    try {

        const customer = await Customer.findById(req.user._id).select('cart')
        const product = await Product.findById(req.params.id)

        const cartItem = customer.cart.find(item => item.product.toString() === req.params.id)
        if(cartItem && cartItem.unit === 1) {
            customer.cart = customer.cart.filter(item => item.product.toString() !== cartItem.product.toString())
        } else if(cartItem) {
            cartItem.unit -= 1
            cartItem.price -= product.price
        } else {
            return next(new appError('cart is empty or do not have this kind of product', 401))
        }
        await customer.populate('cart.product')

        let price = 0

        for(let i = 0; i < customer.cart.length; i++){
            price = customer.cart[i].product.price * customer.cart[i].unit + price
        }

        await customer.save()
        
        res.status(200).json({
            status : 'success',
            customer,
            price
        })
    } catch(err) {
        next(err)
    }
}

async function getCart(req, res, next) {
    try {
        const customer = await Customer.findById(req.user._id).populate('cart.product')
        let price = 0

        for(let i = 0; i < customer.cart.length; i++){
            price = customer.cart[i].product.price * customer.cart[i].unit + price
        }
        res.status(200).json({
            status : 'success',
            message : 'here is your cart',
            price,
            customer
        })
    } catch(err) {
        next(err)
    }
}

module.exports = {fillCart, removeFromCart, getCart}