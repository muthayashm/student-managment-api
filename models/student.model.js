//Importing modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Student Schema
const Student = new Schema(
  {
    rollNo: { type: Number, required: true, unique: true },
    name: {  type: String, required: true },
    className: { type: String, required: true },
    subjects: { type : [String], required : true}
  }, 
  {
    timestamps: true
  }
)

//Exporting Student Schema
module.exports = mongoose.model('Student', Student);
