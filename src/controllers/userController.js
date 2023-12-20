const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRETKEY =process.env.SECRET_KEY


const signup = async(req,res)=>{

    //existing user
    //hash password
    //user create
    // Token Generate

    const { username ,email , password}= req.body;

    try {
        
        const existingUser = await userModel.findOne({email:email});

    if(existingUser){
        return res.status(400).json({message:"User already existed"});
    }

    const hashpassword = await bcrypt.hash(password,10);
    const result = await userModel.create({
        email:email,
        password:hashpassword,
        username:username
    });

    const token = jwt.sign({email:result.email,id:result._id},SECRETKEY)

    res.status(201).json({user:result,token:token});


    } catch (error) {

        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
    

};

const signin = async(req,res)=>{

    const {email , password}= req.body;

    try {
        
        const existingUser = await userModel.findOne({email:email});

        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }
        const matchPassword = await bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
            return res.status(400).json({message:"invalid password"})
        }

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRETKEY)

        res.status(201).json({user:existingUser,token:token});


    } catch (error) {
        
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }

    
};


module.exports={signin ,signup};