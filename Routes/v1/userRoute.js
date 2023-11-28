const { createUser, getAllUsers, getUserByQuery, updateUserByEmail, deleteUserByEmail } = require('../../Controller/v1/userControllers')

const router = require('express').Router()


router.post('/create',createUser)
router.get('/',getAllUsers)
router.get('/user',getUserByQuery)
router.put('/user',updateUserByEmail)
router.delete('/user',deleteUserByEmail)


module.exports = router