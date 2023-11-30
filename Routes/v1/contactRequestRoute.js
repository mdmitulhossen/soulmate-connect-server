const { createContactRequest, getAllContactRequest, updateContactRequest, getOneContactRequest, deleteContactRequest } = require('../../Controller/v1/contactRequestController')

const router = require('express').Router()


router.post('/create',createContactRequest)
router.get('/',getAllContactRequest)
router.get('/:id',getOneContactRequest)
router.put('/update',updateContactRequest)
router.delete('/delete',deleteContactRequest)


module.exports = router