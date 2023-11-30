
const PremiumBio = require("../../Models/v1/premiumBioModel");

// create 

const createPremiumBioData = async (req, res) => {
    try {
        const { B_ID, name, email, isPremium } = req.body || {};
        const existingbBio = await PremiumBio.findOne({ email: email });
        if (existingbBio) {
            return res.status(201).json(existingbBio);
        } else {
            const newBioCreate = new PremiumBio({
                B_ID,
                name,
                email,
                isPremium: isPremium || false
            });
            const saveBioData = await newBioCreate.save();
            return res.status(201).json(saveBioData);
        }

    } catch (error) {
        return res.status(500).json(error);
    }
}

// get all premium biodata

const getAllPremiumBioData = async (req, res) => {
    try {
        const allPremiumBioData = await PremiumBio.find({});
        return res.status(200).json(allPremiumBioData);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// get premium biodata by email

const getPremiumBioDataByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        if (email) {
            const getPremiumBioData = await PremiumBio.findOne({ email: email });
            return res.status(200).json(getPremiumBioData);
        }else{
            return res.status(400).json({error:"email is required"})
        }

    } catch (error) {
        return res.status(500).json(error);
    }

}

// delete premium biodata

const deletePremiumBioData = async (req, res) => {
    try {
        const { id } = req.params;
        const deletePremiumBio = await PremiumBio.findByIdAndDelete(id);
        return res.status(200).json(deletePremiumBio);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// update premium biodata

const updatePremiumBioData = async (req, res) => {
    try {
        const { B_ID, name, email, isPremium } = req.body || {};
        const updatePremiumBio = await PremiumBio.findOneAndUpdate({ email: email }, { B_ID, name, email, isPremium }, { new: true });
        return res.status(200).json(updatePremiumBio);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    createPremiumBioData,
    getAllPremiumBioData,
    deletePremiumBioData,
    updatePremiumBioData,
    getPremiumBioDataByEmail
}