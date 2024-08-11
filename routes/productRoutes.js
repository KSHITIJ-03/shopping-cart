const {loadProducts, filterCategory, getProduct, getProducts} = require('./../controllers/productController')
const customerController = require('./../controllers/customerController')
const cartRouter = require('./cartRouter')

const express = require('express')
const router = express.Router()

router.use('/:id/cart', cartRouter)

router.route('/').get(getProducts)                  

router.route('/create').post(customerController.protect, customerController.isAdmin, loadProducts)

router.route('/category/:category').get(filterCategory)

router.route('/:id').get(getProduct)


module.exports = router