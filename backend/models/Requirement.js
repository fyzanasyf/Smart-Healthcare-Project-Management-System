const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  projectId:{type:mongoose.Schema.Types.ObjectId,ref:"Project",required:true},
  title:{type:String,required:true}, description:String,
  priority:{type:String,enum:["Low","Medium","High","Critical"],default:"Medium"},
  status:{type:String,enum:["Proposed","Approved","Rejected"],default:"Proposed"},
  source:String
},{timestamps:true});
module.exports=mongoose.model("Requirement",schema);