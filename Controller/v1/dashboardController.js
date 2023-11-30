
// get dashboard data

const Biodata = require("../../Models/v1/bioDataModel");
const ContactRequest = require("../../Models/v1/contactRequesModel");
const PremiumBio = require("../../Models/v1/premiumBioModel");

const getDashboardData = async (req, res) => {
    try {
        const totalBio = await Biodata.countDocuments({});
        const totalPremiumBio = await PremiumBio.countDocuments({});
        const totalPayment = await ContactRequest.countDocuments({});

        const totalMale = await Biodata.countDocuments({
            gender:'male'
        })
        const totalFemale = await Biodata.countDocuments({
            gender:'female'
        })

        const data = {
            totalBio,
            totalPremiumBio,
            totalPayment:totalPayment*599,
            totalMale,
            totalFemale
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    getDashboardData
}