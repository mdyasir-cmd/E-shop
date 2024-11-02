const mongoose=require('mongoose');

const productmodel=mongoose.model("product",new mongoose.Schema({
    subcategoryid:{type:String,required:true},
    productname:{type:String,required:true},
    price:{type:String,required:true},
    offerprice:{type:String,required:true},
    productpic:{type:String,required:true},
    description:{type:String,required:true},
}));
module.exports=productmodel