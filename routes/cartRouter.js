const express = require('express')
const router = express.Router({mergeParams : true})
const customerController = require('./../controllers/customerController')
const {fillCart, removeFromCart, getCart} = require('./../controllers/shoppingController')

router.route('/').patch(customerController.protect, fillCart)
router.route('/cart').get(customerController.protect, getCart)
router.route('/remove').patch(customerController.protect, removeFromCart)

module.exports = router