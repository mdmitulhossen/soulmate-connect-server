const { createPremiumBioData, getAllPremiumBioData, deletePremiumBioData, updatePremiumBioData, getPremiumBioDataByEmail } = require('../../Controller/v1/premiumBioController')

const router = require('express').Router()


router.post('/create',createPremiumBioData)
router.get('/',getAllPremiumBioData)
router.delete('/delete',deletePremiumBioData)
router.put('/update',updatePremiumBioData)
router.get('/getOne',getPremiumBioDataByEmail)
// router.get('/',getAllUsers)
// router.get('/user',getUserByQuery)
// router.put('/user',updateUserByEmail)
// router.delete('/user',deleteUserByEmail)


module.exports = router