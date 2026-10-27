const router=require("express").Router();
const Project=require("../models/Project"), Task=require("../models/Task"), Change=require("../models/Change"), Cost=require("../models/Cost"), Defect=require("../models/Defect"), Risk=require("../models/Risk"), Requirement=require("../models/Requirement");
router.get("/:projectId",async(req,res)=>{
 const id=req.params.projectId;
 const [p,t,costs,changes,defects,risks,requirements]=await Promise.all([
  Project.findById(id),Task.find({projectId:id}),Cost.find({projectId:id}),Change.find({projectId:id}),Defect.find({projectId:id}),Risk.find({projectId:id}),Requirement.find({projectId:id})
 ]);
 const PV=costs.reduce((s,x)=>s+x.plannedValue,0), EV=costs.reduce((s,x)=>s+x.earnedValue,0), AC=costs.reduce((s,x)=>s+x.actualCost,0);
 const CPI=AC?EV/AC:0, SPI=PV?EV/PV:0;
 const delayed=t.filter(x=>new Date(x.endDate)<new Date() && x.percentComplete<100);
 const overruns=costs.filter(x=>x.actualCost>x.plannedValue);
 res.json({project:p,requirements,stats:{PV,EV,AC,CPI,SPI,totalTasks:t.length,completedTasks:t.filter(x=>x.percentComplete===100).length,delayedTasks:delayed.length,pendingChanges:changes.filter(x=>x.status==="Pending").length,criticalDefects:defects.filter(x=>x.severity==="Critical"&&x.status!=="Closed").length,openDefects:defects.filter(x=>x.status!=="Closed").length,budgetOverrun:AC>=(p?.approvedBudget||Infinity),costOverruns:overruns.length,riskCount:risks.length},tasks:t,changes,defects,risks});
});
module.exports=router;