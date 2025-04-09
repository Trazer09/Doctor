const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    
 name: {
type: String,
required: [true, 'name is require']    // this message show up as error message in try and catch (err)

},


email: {
type: String,
required: [true, 'email is required'],
unique: true

},

password: {
type: String,
required: [true, 'password is required']

}



});


const userModel = mongoose.model("users", userSchema)   // this tells mongoose to use the users collection in the MongoDb database

module.exports = userModel

