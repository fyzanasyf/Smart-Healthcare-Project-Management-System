const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  projectId:{type:mongoose.Schema.Types.ObjectId,ref:"Project",required:true},
  title:{type:String,required:true}, module:String,
  severity:{type:String,enum:["Low","Medium","High","Critical"],default:"Medium"},
  assignedTo:String,
  status:{type:String,enum:["Open","In Progress","Resolved","Closed"],default:"Open"},
  description:String, resolution:String
},{timestamps:true});
module.exports=mongoose.model("Defect",schema);