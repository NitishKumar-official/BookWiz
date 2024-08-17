const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentListing = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    registration: { type: String, required: true },
    rollNo: { type: String, required: true },
    branch: { type: String, required: true },
    semester: { type: String, required: true },
    session: { type: String, required: true },
    image: { url:String, filename:String},
    collegeName: { type: String, required: true },
    about: { type: String, required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ListBook' }],
    bookIssue: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ListBook' }],

    createdBY:{ type: Schema.Types.ObjectId, ref:"User"},
})

const Student = mongoose.model("Student", StudentListing);
module.exports = Student; 