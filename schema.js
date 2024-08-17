const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    book:Joi.object({
        bookid: Joi.string().required(),
        title: Joi.string().required(),
        subtitle: Joi.string().required(),
        author: Joi.string().required(),
        price:Joi.number().required(),
        image:Joi.string().allow("",null),
        edition:Joi.number().required(),
        language: Joi.string().required(),
        quantity:Joi.number().required(),
        branch:Joi.string().required(),
        description:Joi.string().required(),
        subject:Joi.string().required(),     
    }).required(),
})

module.exports.studentSchema = Joi.object({
    student:Joi.object({
    firstName:Joi.string().required(),
    lastName: Joi.string().required(),
    registration: Joi.string().required(),
    rollNo:Joi.string().required(),
    branch:Joi.string().required(),
    semester:Joi.string().required(),
    session:Joi.string().required(),
    image:Joi.string().allow("",null),
    collegeName:Joi.string().required(),
    about: Joi.string().required(),
    }).required(),
})