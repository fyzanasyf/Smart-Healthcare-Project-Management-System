const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: {type:String, required:true},
  objective: {type:String, required:true},
  stakeholders: [String],
  scopeIn: [String],
  scopeOut: [String],
  approvedBudget: {type:Number, required:true, min:0},
  deadline: {type:Date, required:true},
  status: {type:String, enum:["Initiation","Planning","Execution","Monitoring","Closed"], default:"Planning"},
  milestones: [{name:String, date:Date, status:String}],
  responsibilities: [{role:String, person:String}],
  closureNotes: String
}, {timestamps:true});
module.exports = mongoose.model("Project", schema);