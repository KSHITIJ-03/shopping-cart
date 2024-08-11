const mongoose = require('mongoose')
const appError = require('./errorController')

const Product = require('./../models/productModel')

async function getProducts(req, res, next) {
    try {
        const products = await Product.find()
        res.status(200).json({
            status : 'success',
            count : products.length,
            products
        })
    } catch(err) {
        next(err)
    }
}

async function loadProducts(req, res, next) {
    try{
        const products = await Product.insertMany(req.body)
        res.status(201).json({
            status : 'success',
            products
        })
    } catch(err) {
        next(err)
    }
}

async function filterCategory (req, res, next) {
    try {
        const products = await Product.find({type : req.params.category})
        res.status(200).json({
            status : 'success',
            count : products.length,
            products
        })
    } catch (err) {
        next(err)
    }
}

async function getProduct(req, res, next) {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({
            status : 'success',
            product
        })
    } catch(err) {
        next(err)
    }
}



module.exports = {
    loadProducts,
    filterCategory,
    getProduct,
    getProducts
}
