const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  projectId:{type:mongoose.Schema.Types.ObjectId,ref:"Project",required:true},
  title:{type:String,required:true}, justification:{type:String,required:true},
  costImpact:{type:Number,required:true}, scheduleImpact:{type:Number,required:true},
  status:{type:String,enum:["Pending","Approved","Rejected"],default:"Pending"},
  requestedBy:String, approvedAt:Date
},{timestamps:true});
module.exports=mongoose.model("Change",schema);