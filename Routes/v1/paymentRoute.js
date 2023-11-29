const { createpaymentIntent } = require('../../Controller/v1/paymentController')

const router = require('express').Router()


router.post('/create-payment-intent',createpaymentIntent)


module.exports = router