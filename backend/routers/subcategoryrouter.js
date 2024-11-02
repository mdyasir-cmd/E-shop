const multer=require('multer');
const express=require('express');
const subcategoryrouter=express.Router();
const subcategorymodel=require('../models/subcategorymodel');

const mystorage1 = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "subcat_pics"); // cat_pics is a folder name to store pic
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const uploadsubcat = multer({
    storage: mystorage1,
  });
  
  subcategoryrouter.post("/", uploadsubcat.single("subcatpic"), async (req, res) => {
    try {
      const re = new subcategorymodel({
        categoryid: req.body.catid,
        subcategoryname: req.body.subcatname,
        subcategorypic: req.file.filename,
      });
      if (await re.save()) {
        res.json({ msg: "Record Saved" });
      } else {
        res.jsom({ msg: "Technical Error" });
      }
    } catch (e) {
      res.json({ msg: e.message });
    }
  });
  
  subcategoryrouter.get("/", async (req, res) => {
    const re = await subcategorymodel.find();
    res.json(re);
  });
  
  subcategoryrouter.get("/:id", async (req, res) => {
    const re = await subcategorymodel.find({ _id: req.params.id });
    res.json(re);
  });
  
  subcategoryrouter.patch("/", async (req, res) => {
    const re = await subcategorymodel.find({ categoryid: req.body.catid });
    res.json(re);
  });
  
  subcategoryrouter.delete("/", async (req, res) => {
    const re = await subcategorymodel.findOneAndDelete({
      _id: req.body.subcatid,
    });
    res.json({ msg: "Record Deleted" });
  });
  
  subcategoryrouter.put("/", async (req, res) => {
    const re = await subcategorymodel.findOneAndUpdate(
      { _id: req.body.subcatid },
      { categoryid: req.body.catid, subcategoryname: req.body.subcatname }
    );
    res.json({ msg: "Record Updated" });
  });
  module.exports=subcategoryrouter;