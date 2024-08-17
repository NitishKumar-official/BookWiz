const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isAdminLoggedIn} = require("../middleware.js")


router.get("/:id/profile",isAdminLoggedIn,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let admin =  await User.findById(id);
    res.render("admin/profile.ejs",{admin});
}));

module.exports = router;