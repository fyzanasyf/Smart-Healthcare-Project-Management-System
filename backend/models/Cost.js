const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  projectId:{type:mongoose.Schema.Types.ObjectId,ref:"Project",required:true},
  taskId:{type:mongoose.Schema.Types.ObjectId,ref:"Task"},
  plannedValue:{type:Number,min:0,default:0},
  earnedValue:{type:Number,min:0,default:0},
  actualCost:{type:Number,min:0,default:0},
  period:String
},{timestamps:true});
module.exports=mongoose.model("Cost",schema);