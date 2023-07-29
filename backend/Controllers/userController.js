const asyncHandler = require("express-async-handler");
const User =require("..//Models/userModel");
const generateToken=require("../Config/generateToken");

const registerUser = asyncHandler(async(req,res)=>{


    const {email, name, password, pic} = req.body;

    if (!name || !email || !password){
        res.send(400);
        throw new Error("Please enter all the details.")
    };

    const userExist = await User.findOne({email});

    if (userExist){
        res.status(400);
        throw new Error("User already exist");
    };

    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token:generateToken(user._id)
        })
    }else{
        res.send(400);
        throw new Error ("Failed to create the user");
    }

});



const authUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    if (!email ||!password){
        res.send(400);
        throw new Error("Please enter all the details.")
    };

    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token:generateToken(user._id)
        })
    }else{
        res.send(401);
        throw new Error ("Invalid ID or password");
    }

})

module.exports = {registerUser, authUser};