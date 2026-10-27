const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  projectId:{type:mongoose.Schema.Types.ObjectId,ref:"Project",required:true},
  name:{type:String,required:true}, wbs:String,
  assignee:String, duration:{type:Number,required:true,min:1},
  startDate:{type:Date,required:true}, endDate:{type:Date,required:true},
  predecessor:{type:mongoose.Schema.Types.ObjectId,ref:"Task",default:null},
  dependencyType:{type:String,enum:["FS","SS","FF"],default:"FS"},
  percentComplete:{type:Number,min:0,max:100,default:0},
  plannedCost:{type:Number,min:0,default:0}, actualCost:{type:Number,min:0,default:0},
  milestone:{type:Boolean,default:false}
},{timestamps:true});
module.exports=mongoose.model("Task",schema);