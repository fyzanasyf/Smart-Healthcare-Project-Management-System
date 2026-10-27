const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  projectId:{type:mongoose.Schema.Types.ObjectId,ref:"Project",required:true},
  title:{type:String,required:true}, likelihood:{type:Number,min:1,max:5,required:true},
  impact:{type:Number,min:1,max:5,required:true}, response:String, owner:String
},{timestamps:true});
schema.virtual("score").get(function(){return this.likelihood*this.impact});
module.exports=mongoose.model("Risk",schema);