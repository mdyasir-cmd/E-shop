const mongoose=require('mongoose');

const cartmodel=mongoose.model("cart",new mongoose.Schema({
    productid:{type:String,required:true},
    productname:{type:String,required:true},
    price:{type:String,required:true},
    productpic:{type:String,required:true},
    quantity:{type:String,required:true},
    username:{type:String,required:true},
}));
module.exports=cartmodel