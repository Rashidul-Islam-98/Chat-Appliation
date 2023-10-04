const User = require("../model/user");
const cloudinary = require("cloudinary").v2;

const getUsers = async(req,res)=>{
    try{
        const users = await User.find();
        return  res.status(200).json({ users });
    }catch(err){
        res.send(err.message);
    }
}

const getUser = async(req,res)=>{
    try{
        const user = await User.findOne({ _id : req.params.userId });
        return  res.status(200).json({ user });
    }catch(err){
        res.send(err.message);
    }
}

const registerUser = async (req,res)=>{
    try{

        const { name, email, avatar } = req.body;
        const user=await User.findOne({email: email});
        if(user) return res.status(400).send("user already exist");
        
        let profile=[];
        if (avatar) {
            const result = await cloudinary.uploader.upload(avatar, {
                folder: 'avatars',
            });

            profile ={
                public_id: result.public_id,
                url: result.url
            }
        }
        const newUser = new User({
            name,
            email,
            avatar: profile
        });
        await newUser.save().then((user)=>{
           return  res.status(200).json({ user });
        }).catch((err)=>{
            res.status(400).send({
                message: "user registration failed",
                err,
            });
        });
    }catch(error){
        res.status(500).send(error.message);
    }
}

const loginUser =  async (req,res)=>{
    try{
        const user=await User.findOne({email: req.body.email});
        if(user){
            return res.status(200).json({ user });
        }else{
            return res.status(400).send("User not found");
        }
    }catch(error){
        res.status(500).send(error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, email, avatar } = req.body;
        let profile = {};

        if (avatar) {
            const result = await cloudinary.uploader.upload(avatar, {
                folder: 'avatars',
            });

            profile ={
                public_id: result.public_id,
                url: result.url
            }
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            name: name,
            email: email,
            avatar: profile
        }
        );

        if (!updatedUser) {
            return res.status(400).send("User not found");
        }

        res.status(200).json({ updatedUser });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = { getUsers, getUser, registerUser,loginUser, updateUser};