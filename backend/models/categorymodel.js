const mongoose=require('mongoose');

const categorymodel=mongoose.model("category",new mongoose.Schema({
    categoryname:{type:String,required:true},
    catpic:{type:String,required:true}
}));
module.exports=categorymodel