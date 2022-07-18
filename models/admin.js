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
 email: { type: String, required: [true, ''] }, 
 phone: { type: String, required: [true, '']
 }, 
 address: { type: String, required: [true, '']
 }
})
const Admins = model('admin', adminSchema)
module.exports = Admins