const express = require("express");
const router = express.Router();


//---------------------------------------------------MECHANICAL ENGINEERING-------------------------------------------------------

router.get("/", (req,res)=>{
    res.render("branch/mechanical/index.ejs"); 
});


module.exports= router;