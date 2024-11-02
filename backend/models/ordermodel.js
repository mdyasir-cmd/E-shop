const mongoose=require('mongoose');
const ordermodel=mongoose.model("productorder",mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    orderdate:{type:String,required:true},
    amount:{type:String,required:true},
    mobile:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    zip:{type:String,required:true},
    status:{type:String,required:true},
}))
module.exports=ordermodel