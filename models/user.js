const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type: String,
        required:true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required:true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);