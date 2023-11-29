const mongoose = require('mongoose');

const premiumBioSchema = new mongoose.Schema({
    B_ID: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    isPremium: { type: Boolean,default:false },
    time : { type: Date, default: Date.now }

});

const PremiumBio = mongoose.model('PremiumBio', premiumBioSchema);

module.exports = PremiumBio;