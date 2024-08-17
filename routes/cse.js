const express = require("express");
const router = express.Router();
const ListBook = require("../models/Book_listing.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");



// computer science(ai) route

router.get("/", (req,res)=>{
    res.render("branch/cse/index.ejs"); 
})

// Programing for Problem solving route

router.get("/pps",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Programming for Problem Solving"});
    res.render("branch/cse/pps.ejs", {allBooks});    
}));

//Object Oriented Programing Using C++ route

router.get("/oops",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Object Oriented Programming Using C++"});
    res.render("branch/cse/oops.ejs", {allBooks});    
}));

// Data Structure and Algorithm route

router.get("/dsa",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Data Structure and Algorithm"});
    res.render("branch/cse/dsa.ejs", {allBooks});    
}));

//Computer Organisation and Architecture 

router.get("/coa",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Computer Organisation and Architecture"});
    res.render("branch/cse/coa.ejs", {allBooks});    
}));

//Operating System

router.get("/os",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Operating System"});
    res.render("branch/cse/os.ejs", {allBooks});    
}));

// Design and Analysis of Algorithm

router.get("/daa",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Design and Analysis of Algorithm"});
    res.render("branch/cse/daa.ejs", {allBooks});    
}));

// Digital Electronics

router.get("/de",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Digital Electronics"});
    res.render("branch/cse/de.ejs", {allBooks});    
}));

// Database Management System

router.get("/dbms",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Database Management System"});
    res.render("branch/cse/dbms.ejs", {allBooks});    
}));

//Artificial Intelligence

router.get("/ai",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Artificial Intelligence"});
    res.render("branch/cse/ai.ejs", {allBooks});    
}));

//Software Engineering

router.get("/se",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Software Engineering"});
    res.render("branch/cse/se.ejs", {allBooks});    
}));

//Compiler Design

router.get("/cd",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Compiler Design"});
    res.render("branch/cse/cd.ejs", {allBooks});    
}));

//Computer Networks

router.get("/cn",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Computer Networks"});
    res.render("branch/cse/cn.ejs", {allBooks});    
}));

// Machine Learning

router.get("/ml",wrapAsync(async (req,res)=>{
    let allBooks = await ListBook.find({subject:"Machine Learning"});
    res.render("branch/cse/ml.ejs", {allBooks});    
}));

module.exports= router;