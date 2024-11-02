const mongoose=require('mongoose');
const adminmodel=mongoose.model("admin",mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
}))
module.exports=adminmodel