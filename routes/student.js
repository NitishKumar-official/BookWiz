const express = require("express");
const router = express.Router();
const Student = require("../models/student.js");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
const {isUserLoggedIn,validateStudent,isAdminLoggedIn} = require("../middleware.js");


router.get("/:id/profile", isUserLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let user = await User.findById(id).populate({
        path: "student",
        populate: [
            {
                path: "cart",
                model: "ListBook"
            },
            {
                path: "bookIssue",
                model: "ListBook"
            }
        ]
    });

    if (!user) {
        req.flash('error', 'User not found');
        return res.redirect('/books');
    }

    res.render("student/profile.ejs", { user });
}));


router.get("/:id/register",isUserLoggedIn,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let user = await User.findById(id);
    console.log(user);
    res.render("student/register.ejs", {user});
}));

router.post("/:id/register",isUserLoggedIn,upload.single("student[image]"),validateStudent, wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let url = req.file.path;
    let filename = req.file.filename;

    let user = await User.findById(id);
    const newStudent = Student(req.body.student);
    newStudent.image= {url, filename};
    newStudent.createdBY = req.user._id;
    user.student = newStudent;

    await newStudent.save();
    await user.save();
    console.log(newStudent)
    req.flash("success","Registered Successfully");
    res.redirect(`/student/${id}/profile`);

}));

router.get("/:id/edit",isUserLoggedIn,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let user = await User.findById(id).populate("student");
    let originalImageUrl = user.student.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");  
    res.render("student/editRegister.ejs", {user,originalImageUrl});
}));

router.put("/:id",isUserLoggedIn, upload.single("student[image]"),validateStudent, wrapAsync(async(req, res)=>{
    let {id} = req.params;
    let user = await User.findById(id).populate("student");
    let stdId = user.student.id;
     user.student = await Student.findByIdAndUpdate(stdId, {...req.body.student});
    req.flash("success"," Book Updated successfully!");
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        user.student.image = {url, filename};
        await user.student.save();
        }
     res.redirect(`/student/${id}/profile`);
}));

router.get("/search",isAdminLoggedIn, (req,res)=>{
    res.render("student/search.ejs");
})

router.post("/searchStudent",isAdminLoggedIn,  async(req, res)=>{
    let {registration} = req.body;
     let student = await Student.findOne({registration})           
     .populate({
        path: "cart",
        model: "ListBook"
    })
    .populate({
        path: "bookIssue",
        model: "ListBook"
    });
    if(!student){
        req.flash("error","student not found");
        res.redirect("/student/search");
    }
  
    res.render("student/searchStudent.ejs" , {student});
})




module.exports= router;