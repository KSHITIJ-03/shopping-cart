const express = require('express')
const router = express.Router()
const customerController = require('./../controllers/customerController')

router.route('/signup').post(customerController.signup)
router.route('/login').post(customerController.login)
router.route('/orders').get(customerController.protect, customerController.order)

module.exports = router