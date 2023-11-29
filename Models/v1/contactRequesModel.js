const mongoose = require('mongoose');

const contactRequestSchema = new mongoose.Schema({
    B_ID: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    tx_ID: { type: String, required: true },
    isApproved: { type: Boolean,default:false },
    time : { type: Date, default: Date.now }

});

const ContactRequest = mongoose.model('ContactRequest', contactRequestSchema);

module.exports = ContactRequest;