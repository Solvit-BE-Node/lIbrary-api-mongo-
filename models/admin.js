<<<<<<< HEAD
const {Schema, model} = require('mongoose')
const adminSchema = new Schema({
     firstname: {
         type: String, 
         required: [true, 'firstname is required'],
        length:20 }, 
 lastname: {
     type: String, 
     required: [true, 'lastname is required'] ,
    length:20},
 email: { 
    type: String,
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please provide a valid email"],
    required: [true, '']
 }, 
 phone: { type: String, required: [true, '']
 }, 
 address: { type: String, required: [true, '']
 }
})
const Admins = model('admin', adminSchema)
module.exports = Admins
=======
const { Schema, model } = require("mongoose");
const AdminSchema = new Schema({
   firstname: {
      type: String, required: [true, ""]
   },
   lastname: {
      type: String, required: [true, ""]
   },
   email: {
      type: String,
      required: [true, ""],
   },
});
const Admins = model("Admin", AdminSchema);
module.exports = Admins;
>>>>>>> a25427f5f726d931ce12b690ee1e3c92b4e049e4
