const mongoose=require('mongoose');

const subcategorymodel=mongoose.model("subcategory",new mongoose.Schema({
    categoryid:{type:String,required:true},
    subcategoryname:{type:String,required:true},
    subcategorypic:{type:String,required:true}
}));
module.exports=subcategorymodel