const categorymodel=require("../models/categorymodel");
const multer=require('multer');
const express=require('express');
const categoryrouter=express.Router();
const mystorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "cat_pics"); // cat_pics is a folder name to store pic
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const uploadcat = multer({
    storage: mystorage,
  });
  
  categoryrouter.get("/", async (req, res) => {
    const re = await categorymodel.find(); // to get all record
    res.json(re);
  });
  
  categoryrouter.get("/:id", async (req, res) => {
    const re = await categorymodel.find({ _id: req.params.id });
    res.json(re);
  });
  
  categoryrouter.post("/", uploadcat.single("fcatpic"), async (req, res) => {
    try {
      const re = new categorymodel({
        categoryname: req.body.catname,
        catpic: req.file.filename,
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
  
  categoryrouter.put("/", async (req, res) => {
    try {
      const re = await categorymodel.findByIdAndUpdate(
        { _id: req.body.catid },
        { categoryname: req.body.catname }
      );
      res.json({ msg: "Record Updated" });
    } catch (e) {
      res.json({ msg: e.message });
    }
  });
  
  categoryrouter.delete("/", async (req, res) => {
    const re = await categorymodel.findOneAndDelete({ _id: req.body.catid });
    res.json({ msg: "Record Deleted" });
  });

  module.exports=categoryrouter;