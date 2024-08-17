const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookListing = new Schema({
    bookid: String,
    title:String,
    subtitle: String,
    author: String,
    price:Number,
    image:String,
    edition:Number,    
    language:String,
    quantity: Number,
    branch:String,
    description:String,
    subject:String,
    status: {
        type: String,
        enum: ['Avilable', 'Not Avilable'],
        default: 'Avilable',
    },
    issueDate:{
        type: Date,
    },
    nextRenewalDate:{
        type:Date,
    },
    fine:{
        type:Number,
    },
})

const ListBook = mongoose.model("ListBook", BookListing);
module.exports = ListBook; 
