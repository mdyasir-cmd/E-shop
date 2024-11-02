const mongoose=require('mongoose');

const emailmodel=mongoose.model("email",new mongoose.Schema({
    sender:{type:String,required:true},
    receiver:{type:String,required:true},
    message:{type:String,required:true}
}));
module.exports=emailmodel