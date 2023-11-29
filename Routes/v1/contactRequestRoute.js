const { createContactRequest, getAllContactRequest, updateContactRequest, getOneContactRequest } = require('../../Controller/v1/contactRequestController')

const router = require('express').Router()


router.post('/create',createContactRequest)
router.get('/',getAllContactRequest)
router.get('/:id',getOneContactRequest)
router.put('/update',updateContactRequest)


module.exports = router