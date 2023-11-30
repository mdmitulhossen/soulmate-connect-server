const { createUser, getAllUsers, getUserByQuery, updateUserByEmail, deleteUserByEmail, getfavouriteBioByusers } = require('../../Controller/v1/userControllers')

const router = require('express').Router()


router.post('/create',createUser)
router.get('/',getAllUsers)
router.get('/user',getUserByQuery)
router.put('/user',updateUserByEmail)
router.delete('/user',deleteUserByEmail)
router.get('/favouriteUser',getfavouriteBioByusers)


module.exports = router