
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
// get all premium with biodata

const getAllPremiumWithBioData = async (req, res) => {
    try {
        const allPremiumBio = await PremiumBio.find({ isPremium: true });
        const withBiodata = await PremiumBio.aggregate(
            [
                {
                  '$match': {
                    'isPremium': true
                  }
                }, {
                  '$lookup': {
                    'from': 'biodatas', 
                    'localField': 'B_ID', 
                    'foreignField': 'B_ID', 
                    'as': 'bio'
                  }
                }, {
                  '$project': {
                    'name': 1,
                    'email': 1,
                    'B_ID': 1,
                    'bio': {
                      'gender': 1, 
                      'image': 1, 
                      'age': 1, 
                      'occupation': 1, 
                      'parmanentDivision': 1
                    }
                  }
                }, {
                  '$unwind': {
                    'path': '$bio'
                  }
                }
              ]
        )

        return res.status(200).json(withBiodata);
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
        } else {
            return res.status(400).json({ error: "email is required" })
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
    getPremiumBioDataByEmail,
    getAllPremiumWithBioData
}