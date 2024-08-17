const mongoose = require("mongoose");
const initdata = require("./data.js");
const ListBook = require("../models/Book_listing.js");

const MONGO_url = "mongodb://127.0.0.1:27017/Gecmunger";

main()
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_url);
}

const initDB = async () => {
    await ListBook.deleteMany({});
    await ListBook.insertMany(initdata.data);
    console.log("data was initialized");
  };
  
  initDB();
