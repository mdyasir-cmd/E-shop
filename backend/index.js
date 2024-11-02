const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const categorymodel = require("./models/categorymodel");
const path = require("path");
const subcategorymodel = require("./models/subcategorymodel");
const productmodel = require("./models/productmodel");
const cartmodel = require("./models/cartmodel");
const signupmodel = require("./models/signupmodel");
const adminmodel = require("./models/admin");
const ordermodel = require("./models/ordermodel");
const detailsmodel = require("./models/orderdetailsmodel");
const categoryrouter=require('./routers/categoryrouter');
const subcategoryrouter=require('./routers/subcategoryrouter');
const nodemailer = require('nodemailer')

const bcrypt=require('bcryptjs');

const con = mongoose.connect("mongodb://127.0.0.1:27017/eshopdb");
con.then(() => {
  console.log("Connection Done");
});
con.catch(() => {
  console.log("Connection Failed");
});

const app = express();
app.use(express.json()); // to receive data from front end
app.use(cors());
app.use(express.static("cat_pics"));
app.use(express.static("subcat_pics"));
app.use(express.static("product_pics"));

//category
app.use("/category",categoryrouter);
// for subcategory
app.use("/subcategory",subcategoryrouter);

//products

const mystorage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "product_pics"); // cat_pics is a folder name to store pic
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadproduct = multer({
  storage: mystorage2,
});

app.post("/product", uploadproduct.single("productpic"), async (req, res) => {
  try {
    const re = new productmodel({
      subcategoryid: req.body.subcatid,
      productname: req.body.pname,
      price: req.body.price,
      offerprice: req.body.offerprice,
      description: req.body.description,
      productpic: req.file.filename,
    });
    if (await re.save()) {
      res.json({ msg: "Record Saved" });
    } else {
      res.json({ msg: "Technical Error" });
    }
  } catch (e) {
    res.json({ msg: e.message });
  }
});

app.patch("/product", async (req, res) => {
  const re = await productmodel.find({ subcategoryid: req.body.subcatid });
  res.json(re);
});

app.patch("/sproduct", async (req, res) => {
  if(req.body.pname!=""){
  var regexp=new RegExp(req.body.pname,"i");
  const re = await productmodel.find({productname: regexp});
  res.json(re);
  }
  else{
    res.json([]);
  }
});

app.delete("/product", async (req, res) => {
  const re = await productmodel.findOneAndDelete({
    _id: req.body.productid,
  });
  res.json({ msg: "Record Deleted" });
});

//cart api

app.post("/cart", async (req, res) => {
  const re1 = await cartmodel.find({
    productid: req.body.productid,
    username: req.body.username,
  });
  if (re1.length > 0) {
    var qty = parseInt(re1[0].quantity) + 1 + "";
    var cid = re1[0]._id;
    const re = await cartmodel.findOneAndUpdate(
      { _id: cid },
      { quantity: qty }
    );
  } else {
    const re = new cartmodel({
      productid: req.body.productid,
      productname: req.body.productname,
      price: req.body.price,
      username: req.body.username,
      productpic: req.body.picname,
      quantity: "1",
    });
    await re.save();
  }
  res.json({ msg: "Item Added to Cart" + req.body.username });
});

app.get("/cart/:uid", async (req, res) => {
  const re = await cartmodel.find({ username: req.params.uid });
  res.json(re);
});

app.delete("/cart", async (req, res) => {
  const re = await cartmodel.findOneAndDelete({ _id: req.body.cid });
  res.json({ msg: "Item Deleted" });
});

app.put("/cart", async (req, res) => {
  var qty = "";
  if (req.body.op === "plus") {
    qty = parseInt(req.body.qty) + 1 + "";
  } else {
    qty = parseInt(req.body.qty) - 1 + "";
  }
  if (req.body.op === "minus" && req.body.qty == "1") {
    const re = await cartmodel.findOneAndDelete({ _id: req.body.cid });
    res.json({ msg: "Item Deleted" });
  } else {
    const re = await cartmodel.findOneAndUpdate(
      { _id: req.body.cid },
      { quantity: qty }
    );
    res.json({ msg: "Item Updated" });
  }
});

//singup api

app.post("/signup", async (req, res) => {
  const psw=await bcrypt.hash(req.body.password,12);
  const re = new signupmodel({
    name: req.body.name,
    email: req.body.email,
    password: psw,
  });
  await re.save();
  res.json({ msg: "account created" });
});

app.patch("/signup", async (req, res) => {
  const re = await signupmodel.find({
    email: req.body.email
  });
  if (re.length > 0) {
      if(await bcrypt.compare(req.body.password,re[0].password))
      {
        res.json({ msg: "Valid Login" });
      }
      else{
        res.json({ msg: "Invalid Login" });    
      }
  } else {
    res.json({ msg: "Invalid Login" });
  }
});

app.get("/signup", async (req, res) => {
  const re = await signupmodel.find();
  res.json(re);
});

//for admin login

app.post("/admin", async (req, res) => {
  const re = new adminmodel({
    username: req.body.name,
    password: req.body.password,
  });
  await re.save();
  res.json({ msg: "account created" });
});

app.patch("/admin", async (req, res) => {
  const re = await adminmodel.find({
    username: req.body.name,
    password: req.body.password,
  });
  if (re.length > 0) {
    res.json({ msg: "Valid Login" });
  } else {
    res.json({ msg: "Invalid Login" });
  }
});

//order api

app.post("/order", async (req, res) => {
  var dt = new Date();
  var odt =
    dt.getFullYear() +
    "-" +
    (dt.getMonth() + 1) +
    "-" +
    dt.getDate() +
    " " +
    dt.getHours() +
    ":" +
    dt.getMinutes();
  const re = new ordermodel({
    username: req.body.uname,
    name: req.body.name,
    mobile: req.body.mobile,
    address: req.body.address,
    city: req.body.city,
    zip: req.body.zip,
    state: req.body.state,
    amount: req.body.amount,
    orderdate: odt,
    status: "Pending",
  });
  await re.save();
  const re1 = await cartmodel.find({ username: req.body.uname });
  for (var i = 0; i < re1.length; i++) {
    var re3 = new detailsmodel({
      orderno: re._id,
      productname: re1[i].productname,
      price: re1[i].price,
      productpic: re1[i].productpic,
      quantity: re1[i].quantity,
    });
    await re3.save();
  }
  const re4 = await cartmodel.deleteMany({ username: req.body.uname });
  res.json({ msg: "Order Placed" });
});

app.get("/orderdetails", async (req, res) => {
  const re = await ordermodel.find();
  res.json(re);
});



// app.get("/order", async (req, res) => {
//   const re = await ordermodel.find();
//   res.json(re);
// });



app.patch("/order", async (req, res) => {
  const re = await ordermodel.find({username:req.body.uname});
  res.json(re);
});




app.patch("/orderdetails", async (req, res) => {
  const re = await detailsmodel.find({orderno:req.body.ordno});
  res.json(re);
});

const emailmodel = require("./models/emailmodel");

// email api for practice of nodemailer


app.post("/email", async (req,res)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yasir.ans765@gmail.com',
      pass: 'yasir@786'
    }
  });
  
  var mailOptions = {
    from: 'Yasir.ans765@gmail.com',
    to: req.body.toemail,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
});








app.listen(7000, () => {
  console.log("Server Started");
});
