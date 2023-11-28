const Biodata = require("../../Models/v1/bioDataModel");
const { findOneAndUpdate } = require("../../Models/v1/userModel");


// create Biodata
const createBioDataOrUpdate = async (req, res) => {
    try {
        // 'B_ID', 'name', 'email', 'phone', 'image', 'fatherName', 'motherName', 'gender', 'dob', 'age', 'height', 'weight', 'occupation', 'race', 'presentDivision', 'parmanentDivision', 'partnerAge', 'partnerHeight', 'partnerWeight',premium,married,time
        const { name, email, phone, image, fatherName, motherName, gender, dob, age, height, weight, occupation, race, presentDivision, parmanentDivision, partnerAge, partnerHeight, partnerWeight, premium, married } = req.body || {};

        const count = await Biodata.countDocuments({});
        const existingbBio = await Biodata.findOne({ email: email });

        if (existingbBio) {
            const newBioData = {
                B_ID: existingbBio.B_ID,
                name,
                email,
                phone,
                image,
                fatherName,
                motherName,
                gender,
                dob,
                age,
                height,
                weight,
                occupation,
                race,
                presentDivision,
                parmanentDivision,
                partnerAge,
                partnerHeight,
                partnerWeight,
                premium: premium || false,
                married: married || false,
            };
            const updateBiodata = await findOneAndUpdate({ email: email }, newBioData, { new: true });
            return res.status(201).json(updateBiodata);
        } else {
            const newBioCreate =new Biodata({ 
                B_ID: count + 1,
                name,
                email,
                phone,
                image,
                fatherName,
                motherName,
                gender,
                dob,
                age,
                height,
                weight,
                occupation,
                race,
                presentDivision,
                parmanentDivision,
                partnerAge,
                partnerHeight,
                partnerWeight,
                premium: premium || false,
                married: married || false,
            })
            const savedBioData = await newBioCreate.save();
            return res.status(201).json(savedBioData);
        }

    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

// get all Biodata
const getAllBiodata = async (req, res) => {
    try {
        const users = await Biodata.find({});

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    createBioDataOrUpdate,
    getAllBiodata
}