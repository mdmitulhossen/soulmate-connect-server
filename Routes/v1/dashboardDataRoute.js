const { getDashboardData } = require('../../Controller/v1/dashboardController')



const router = require('express').Router()

router.get('/',getDashboardData)


module.exports = router