
// create

const ContactRequest = require("../../Models/v1/contactRequesModel");


const createContactRequest = async (req, res) => {
    const { name, email, B_ID, tx_ID } = req.body;
    try {
        const exist = await ContactRequest.findOne({ email: email, B_ID: B_ID });
        if (exist) {
            return res.status(400).json({ message: "Already Requested" });
        }
        const newContactRequest = new ContactRequest({
            name,
            email,
            B_ID,
            tx_ID,
            isApproved: false
        });
        const contactRequest = await newContactRequest.save();
        res.status(201).json({ contactRequest });
    } catch (err) {
        res.status(400).json({ err });
    }
}

// update

const updateContactRequest = async (req, res) => {
    const { name, email, B_ID, isApproved } = req.body;
    try {
        const newContactRequest = await ContactRequest.findOneAndUpdate({ email: email, B_ID: B_ID }, {
            name,
            email,
            B_ID,
            isApproved: true
        }, { new: true })
        res.status(201).json({ newContactRequest })

    } catch (error) {
        res.status(400).json({ error });
    }
}
// delete
const deleteContactRequest = async (req, res) => {
    try {
        const { email, B_ID } = req.body;
        const contactRequest = await ContactRequest.findOneAndDelete({ B_ID: B_ID, email: email });
        res.status(200).json({ contactRequest });

    } catch (error) {
        res.status(400).json({ error });

    }
}

// get all

const getAllContactRequest = async (req, res) => {
    try {
        const queryEmail = req.query.email;
        if (queryEmail) {
            const contactRequest = await ContactRequest.aggregate([
                { $match: { email: queryEmail } },
                {
                    $lookup: {
                        localField: "B_ID",
                        from: "biodatas",
                        foreignField: "B_ID",
                        as: "biodata"
                    }
                },
                {
                    $project: {
                        B_ID: 1,
                        isApproved: 1,
                        biodata: {
                            name: '$biodata.name',
                            email: '$biodata.email',
                            phone: '$biodata.phone',
                        }
                    }
                }


            ]);
            return res.status(200).json({ contactRequest });
        }
        const contactRequest = await ContactRequest.find({});
        res.status(200).json({ contactRequest });
    } catch (err) {
        res.status(400).json({ err });

    }
}

// get one

const getOneContactRequest = async (req, res) => {
    try {
        const contactRequest = await ContactRequest.findOne({ B_ID: req.params.id });
        res.status(200).json({ contactRequest });

    } catch (error) {
        res.status(400).json({ error });
    }
}


module.exports = {
    createContactRequest,
    updateContactRequest,
    getAllContactRequest,
    getOneContactRequest,
    deleteContactRequest
}