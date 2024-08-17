const express = require("express");
const router = express.Router();
const ListBook = require("../models/Book_listing.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");




 //------------------------------------- ELECTRICAL BRANCH INDEX ROUTE------------------------------------------------------

 router.get("/", (req,res)=>{
    res.render("branch/electrical/index.ejs"); 
});

// Basic Electrical Engineering

router.get("/bee",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/bee.ejs", {allBooks});    
}));

// Electrical Circuit Analysis

router.get("/eca",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/eca.ejs", {allBooks});    
}));

// Analog Electronics

router.get("/ae",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/ae.ejs", {allBooks});    
}));

// Electrical Machine

router.get("/em",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/em.ejs", {allBooks});    
}));

// Electromagnatic Fields

router.get("/ef",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/ef.ejs", {allBooks});    
}));

// Engineering Mechanics-1

router.get("/em1",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/em1.ejs", {allBooks});    
}));

// Engineering Mechanics-2

router.get("/em2",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/em2.ejs", {allBooks});    
}));

// Digital Electronics

router.get("/de",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/de.ejs", {allBooks});    
}));

// Electrical and Electronic Measurement

router.get("/eem",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/eem.ejs", {allBooks});    
}));

// Signals and System

router.get("/ss",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/ss.ejs", {allBooks});    
}));

// Power System-1

router.get("/ps1",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/ps1.ejs", {allBooks});    
}));

// Power System-2

router.get("/ps2",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/ps2.ejs", {allBooks});    
}));

// Control System

router.get("/cs",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/cs.ejs", {allBooks});    
}));

// Microprocessors

router.get("/microp",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/microp.ejs", {allBooks});    
}));

//Power Electronics

router.get("/pe",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/pe.ejs", {allBooks});    
}));

// Power System Protection

router.get("/psp",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/electrical/psp.ejs", {allBooks});    
}));

module.exports= router;



