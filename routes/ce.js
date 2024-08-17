const express = require("express");
const router = express.Router();

//---------------------------------------------------CIVIL ENGINEERING------------------------------------------------------------

router.get("/", (req,res)=>{
    res.render("branch/civil/index.ejs"); 
});


module.exports= router;