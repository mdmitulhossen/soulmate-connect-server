const { createBioDataOrUpdate, getAllBiodata } = require('../../Controller/v1/bioDataController')

const router = require('express').Router()


router.put('/createOrUpdate',createBioDataOrUpdate)
router.get('/',getAllBiodata)
// router.get('/',getAllUsers)
// router.get('/user',getUserByQuery)
// router.put('/user',updateUserByEmail)
// router.delete('/user',deleteUserByEmail)


module.exports = router