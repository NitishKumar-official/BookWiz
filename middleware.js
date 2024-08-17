const {studentSchema,listingSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");    //particular error milega
        throw new ExpressError(400, errMsg);
    }
    next();
}

module.exports.validateStudent = (req,res,next)=>{
    let {error} = studentSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");    //particular error milega
        throw new ExpressError(400, errMsg);
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


module.exports.isAdminLoggedIn = (req, res, next)=>{
    if(!req.user){
        req.flash("error", "You are not Admin");
            return  res.redirect("/signin");
    }
    if(req.user.role=="admin"){
        if(!req.isAuthenticated()){
            req.session.redirectUrl = req.originalUrl;
            req.flash("error", "You are not Admin");
            return  res.redirect("/signin");
        }
    }
    else{
        req.flash("error", "You are not Admin");
        res.redirect("/signin");
    }
    next();
};

module.exports.isUserLoggedIn = (req, res, next)=>{
    if(!req.user){
        req.flash("error", "You are not loggedIn");
            return  res.redirect("/signin");
    }
    if(req.user.role=="user"){
        if(!req.isAuthenticated()){
            req.session.redirectUrl = req.originalUrl;
            req.flash("error", "You are not loggedIn");
            return  res.redirect("/signin");
        }
    }
    else{
        req.flash("error", "You are not loggedIn");
        res.redirect("/signin");
    }
    next();
};




