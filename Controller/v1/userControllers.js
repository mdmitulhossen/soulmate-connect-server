const User = require("../../Models/v1/userModel");


// create user
const createUser = async (req, res) => {
    try {

        const { name, email, role, favouriteBio } = req.body || {};

        const searchUser = await User.findOne({ email });

        if (searchUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({
            name,
            email,
            premium: false,
            role: role || 'user',
            favouriteBio: favouriteBio || [],
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}


// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get user by query
const getUserByQuery = async (req, res) => {
    try {
        const queryEmail = req.query.email;
        const users = await User.findOne({ email: queryEmail });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// get user by query
const getfavouriteBioByusers = async (req, res) => {
    try {
        const queryEmail = req.query.email;
        // const users = await User.findOne({ email: queryEmail });

        const users = await User.aggregate([
            { $match: { email: queryEmail } },
            {
                $unwind: "$favouriteBio" // Unwind the array to create separate documents for each array element
            },
            {
                $lookup: {
                    from: "biodatas",
                    localField: "favouriteBio",
                    foreignField: "B_ID",
                    as: "matchedBio"
                }
            },
            {
                $unwind: "$matchedBio" // Unwind the result of the lookup
            },
            {
                $group: {
                    _id: "$_id",
                    favouriteBio: { $push: "$favouriteBio" },
                    matchedBio: { $push: "$matchedBio" }
                }
            },
            {
                $project: {
                    _id: 1,
                    favouriteBio: 1,
                    matchedBio: 1
                }
            }


        ])

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// update user by email
const updateUserByEmail = async (req, res) => {
    try {
        const { name, email, role, premium, favouriteBio } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { name, email, role, premium, favouriteBio },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// delete user by email

const deleteUserByEmail = async (req, res) => {
    try {
        const queryEmail = req.query.email;
        const deleteUser = await User.deleteOne({ email: queryEmail });
        res.status(200).json(deleteUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    createUser,
    getAllUsers,
    getUserByQuery,
    updateUserByEmail,
    deleteUserByEmail,
    getfavouriteBioByusers
}