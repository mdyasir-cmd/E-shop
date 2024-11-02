const mongoose=require('mongoose');

const detailsmodel=mongoose.model("orderdetails",new mongoose.Schema({
    orderno:{type:String,required:true},  // save order _id
    productname:{type:String,required:true},
    price:{type:String,required:true},
    quantity:{type:String,required:true},
    productpic:{type:String,required:true},
}));
module.exports=detailsmodel