const express = require("express");
const router = express.Router();
const ListBook = require("../models/Book_listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isAdminLoggedIn,isUserLoggedIn,validateListing} = require("../middleware.js");
const Student = require("../models/student.js");




//index route

router.get("/", wrapAsync(async (req,res)=>{
    const allBooks = await ListBook.find({});
    res.render("allbook/index.ejs",{allBooks});
}));

//new route

router.get("/new",isAdminLoggedIn,(req,res)=>{
    res.render("allbook/new.ejs");
})

router.post("/", isAdminLoggedIn,validateListing, wrapAsync( async (req,res)=>{
    const newBook = ListBook(req.body.book);
    await newBook.save();
    req.flash("success","New Book Added!");
    res.redirect("/books");

}));

//show route

router.get("/:id", wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const book = await ListBook.findById(id);
    if(!book){
        req.flash("error","Book does not exist!");
    }
    res.render("allbook/show.ejs", {book});
}));

//edit route

router.get("/:id/edit",isAdminLoggedIn, wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const book = await ListBook.findById(id);
    if(!book){
        req.flash("error","Book does not exist!");
    }
    res.render("allbook/edit.ejs",{book})
}));

// update edited page

router.put("/:id",isAdminLoggedIn, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await ListBook.findByIdAndUpdate(id, {...req.body.book});
    req.flash("success"," Book Updated successfully!");
    res.redirect(`/books/${id}`);

}));

//delete route 

router.delete("/:id",isAdminLoggedIn, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await ListBook.findByIdAndDelete(id);
    req.flash("success"," Book Deleted successfully!");
    res.redirect("/books")
}))

// add to cart route

router.post("/:id/cart", isUserLoggedIn, wrapAsync(async(req,res)=>{
    let {id} = req.params;
    book = await ListBook.findById(id);
    if (!book) {
        req.flash('error', 'Book not found');
        return res.redirect(`/student/${req.user.id}/profile`);
    }
    let stdId = req.user.student;
    const student = await Student.findById(stdId);
    student.cart.unshift(book);
    await student.save();
    req.flash("success", "Book added in the cart");
    res.redirect(`/books`)

}));

//remove book route from cart

router.post("/:id/remove",isUserLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const book = await ListBook.findById(id);

    if (!book) {
        req.flash('error', 'Book not found');
        return res.redirect(`/student/${req.user.id}/profile`);
    }

    let stdId = req.user.student;
    const student = await Student.findById(stdId);

    // Find the index of the book in the cart
    const bookIndex = student.cart.findIndex(bookId => bookId.equals(id));

    if (bookIndex !== -1) {
        student.cart.splice(bookIndex, 1); // Remove the book from the cart
        await student.save();
        req.flash('success', 'Book removed from cart');
    } else {
        req.flash('error', 'Book not found in cart');
    }

    res.redirect(`/student/${req.user.id}/profile`);
}));


// Book Issue Route 
router.post("/:id/issue", isAdminLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params; // ID of the book to be issued
    const book = await ListBook.findById(id);
    
    // Find the student who has this book in their cart
    const student = await Student.findOne({ cart: id })
    .populate({
        path: "cart",
        model: "ListBook"
    })
    .populate({
        path: "bookIssue",
        model: "ListBook"
    });

    if(book.status === "Not Avilable"){
        req.flash("error", "Book already issued to someone");
        return res.render('student/searchStudent', { student });
    }

    if (!student) {
        req.flash('error', 'Student with this book in the cart not found');
        return res.redirect('/books');
    }

    if (!book) {
        req.flash('error', 'Book not found');
        return res.redirect('/books');
    }

    // Initialize bookIssue as an array if it is not already
    if (!Array.isArray(student.bookIssue)) {
        student.bookIssue = [];
    }

    // Check if the book is already issued
    const isBookIssued = student.bookIssue.some(issuedBook => issuedBook._id.equals(id));

    if (isBookIssued) {
        req.flash("error", "Book already issued");
        return res.render('student/searchStudent', { student });
    }

    // Issue the book
    const issueDate = Date.now();
    const nextRenewalDate = new Date(issueDate);
    nextRenewalDate.setDate(nextRenewalDate.getDate() + 30); // Set next renewal date 30 days from the issue date

    book.issueDate = issueDate;
    book.nextRenewalDate = nextRenewalDate;
    book.fine = 0;  // Initially, there's no fine

    student.bookIssue.unshift(book);
    book.quantity -= 1;
    book.status = "Not Avilable";

    // Remove the book from the student's cart
    student.cart = student.cart.filter(cartBook => !cartBook._id.equals(id));

    await book.save();  // Save the updated book quantity, status, and dates
    await student.save();  // Save the updated student cart and bookIssue list
    
    req.flash("success", "Book Issued Successfully");
    res.render('student/searchStudent', { student });
}));

//IssuedBook route

router.get("/:id/issuedBook", wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const book = await ListBook.findById(id);
  res.render("allbook/issuedBook.ejs", {book});
}));


//book Return route

router.post("/:id/return", isAdminLoggedIn,  wrapAsync(async(req,res)=>{
    let { id } = req.params;
    const book = await ListBook.findById(id);

    if (!book) {
        req.flash('error', 'Book not found');
        return res.redirect(`/admin/${req.user.id}/profile`);
    }

    const currentDate = new Date();
    const daysLate = Math.ceil((currentDate - book.nextRenewalDate) / (1000 * 60 * 60 * 24)); // Calculate how many days late

    if (daysLate > 0) {
        const fineAmount = daysLate * 5; // ₹5 fine per day
        book.fine += fineAmount;
    }
    
    if(book.fine!=0){
        req.flash('error', `paid your book fine:${book.fine}`);
       return res.render("allbook/issuedBook.ejs", {book});

    }

    const student = await Student.findOne({ bookIssue: id })
    .populate({
        path: "cart",
        model: "ListBook"
    })
    .populate({
        path: "bookIssue",
        model: "ListBook"
    });

    // Find the index of the book in the cart
    const bookIndex = student.bookIssue.findIndex(bookId => bookId.equals(id));

    if (bookIndex !== -1) {
        student.bookIssue.splice(bookIndex, 1); // Remove the book from the cart
        book.quantity= book.quantity+1;
        book.status = "Avilable"
        await student.save();
        await book.save();
        req.flash('success', 'Book returned from Issued Book');
    } else {
        req.flash('error', 'Book not found in Issued Book');
    }

    res.render('student/searchStudent', {student});
    
}))



router.post("/:id/renew",isAdminLoggedIn, wrapAsync(async(req,res)=>{

    let {id} = req.params;
    const book = await ListBook.findById(id);

    if (!book) {
        req.flash('error', 'Book not found');
        return res.redirect(`/admin/${req.user.id}/profile`);
    }


    const currentDate = new Date();
    const daysLate = Math.ceil((currentDate - book.nextRenewalDate) / (1000 * 60 * 60 * 24)); // Calculate how many days late

    if (daysLate > 0) {
        const fineAmount = daysLate * 5; // ₹5 fine per day
        book.fine = fineAmount;
    }
    
    const issueDate = Date.now();
    const nextRenewalDate = new Date(issueDate);
    nextRenewalDate.setDate(nextRenewalDate.getDate() + 30); // Set next renewal date 30 days from the issue date

    book.issueDate = issueDate;
    book.nextRenewalDate = nextRenewalDate;

    await book.save();

    req.flash('success', 'Book renew success');
    res.render("allbook/issuedBook.ejs", {book});
    
}))


module.exports= router;