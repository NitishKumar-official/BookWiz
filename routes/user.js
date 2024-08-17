const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password, confirmPassword,role,adminId } = req.body;
      if (password != confirmPassword) {
        req.flash("error", "password do not match");
        res.redirect("/signup");
      }
      if(role=="admin"){
        // res.locals.role = role;
        if(adminId!=process.env.ADMIN_ID)
        {
          req.flash("error", "Enter correct AdminId");
          res.redirect("/signup");
        }

      }
      const newUser = new User({ username, email,role });
      const registerUser = await User.register(newUser, password);
      // console.log(registerUser.role);
      req.login(registerUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to Mylabi");
        res.redirect("/books");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  })
);

router.get("/signin", (req, res) => {
  res.render("users/signin.ejs");
});

router.post(
  "/signin",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/signin",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("error", "welcome back to Mylabi");
    let redirectUrl = res.locals.redirectUrl || "/books";
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out");
    res.redirect("/books");
  });
});

module.exports = router;
