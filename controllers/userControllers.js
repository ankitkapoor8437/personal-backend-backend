const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Register the user
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");

    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered.");
    }
    // Hashpassword
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    const userCreated = await User.create({ username, email, password:hashPassword });
    if (userCreated) {
        res.status(201).json({
            _id: userCreated.id,
            email: userCreated.email,
            password: userCreated.password
        });
    }
    else {
        res.status(400);
        throw new Error("User Data is Valid!");
    }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All feilds are mandatory.");
    }
    const userVerfied = await User.findOne({ email });
    // Compare
    if (userVerfied && bcrypt.compare(password, userVerfied.password)) {
        const accessToken = jwt.sign({
            userdata: {
                username: userVerfied.username,
                email: userVerfied.email,
                id: userVerfied.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60min" })
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Data not valid.")
    }
});



// Current User 
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.userdata);
});




module.exports = { registerUser, loginUser, currentUser };