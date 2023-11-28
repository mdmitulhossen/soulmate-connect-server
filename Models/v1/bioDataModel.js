const mongoose = require('mongoose');

const biodataSchema = new mongoose.Schema({
    B_ID: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String }, // You might want to store the image URL
    fatherName: { type: String },
    motherName: { type: String },
    gender: { type: String },
    dob: { type: Date },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    height: { type: String },
    weight: { type: String },
    occupation: { type: String },
    race: { type: String },
    presentDivision: { type: String },
    parmanentDivision: { type: String },
    partnerAge: { type: Number },
    partnerHeight: { type: String },
    partnerWeight: { type: String }, 
    premium: { type: Boolean,default:false },
    married: { type: Boolean,default:false },
    time: { type: Date, default: Date.now },
});

const Biodata = mongoose.model('BioData', biodataSchema);

module.exports = Biodata;
