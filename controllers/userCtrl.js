const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const doctorModel = require("../models/doctorModel");

const registerController =  async(req, res) =>{
    try {
        // Check whether the user is registered or not, Stops registration if the user is already in the database.
        const existingUser = await userModel.findOne({email: req.body.email});
        if(existingUser) {
          return res.status(200).send({message: 'User Already Exist', success: false});
        }
      
        // Secures the password using salt and hash.
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
      
        // Save the new user - Creates and stores the new user in the database.
        //Data is saved in your MongoDB → in the users collection.
        const newUser = new userModel(req.body);   // This creates a new instance of the Mongoose model userModel. req.body contains the form data sent from the frontend (like name, email, and hashed password).
        await newUser.save(); // saves it to MongoDB
        res.status(201).send({ message: "Register Successfully", success: true });  // sends success message to frontend
      
      } catch (error) { 
        // Sends back a failure message if anything breaks.
        console.log(error);
        res.status(500).send({
          success: false,
          message: `Register Controller ${error.message}`,
        });
      }
      





}


const loginController = async(req, res)=>{

    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
          return res.status(200).send({ message: 'Invalid email or password', success: false });
        }
      
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
          return res.status(200).send({ message: 'Invalid email or password', success: false });
        }
      
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
        res.status(200).send({ message: 'Login Success', success: true, token });
      
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
      }



}

const authController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: { user,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};




// Apply Doctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notifcation = adminUser.notifcation;
    notifcation.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
};