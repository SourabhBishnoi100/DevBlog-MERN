import User from "../models/User.js";
import generatedToken from "../utils/generateToken.js";

export const registerUser = async (req, res) =>{
  const {name, email, password} = req.body;

  const userExists = await User.findOne({email});
  if(userExists){
    res.status(400).json({message : "User already exists"});
    throw new Error ("User already exists !");
  }

  const user = await User.create({name, email, password});

  i


}