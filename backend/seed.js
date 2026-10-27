require("dotenv").config();
const mongoose=require("mongoose");
const Project=require("./models/Project"), Requirement=require("./models/Requirement"), Task=require("./models/Task"), Change=require("./models/Change"), Cost=require("./models/Cost"), Defect=require("./models/Defect"), Risk=require("./models/Risk");
const uri=process.env.MONGO_URI||"mongodb://127.0.0.1:27017/smart_healthcare_pms";
(async()=>{
 await mongoose.connect(uri);
 await Promise.all([Project.deleteMany({}),Requirement.deleteMany({}),Task.deleteMany({}),Change.deleteMany({}),Cost.deleteMany({}),Defect.deleteMany({}),Risk.deleteMany({})]);
 const p=await Project.create({name:"Smart Healthcare Project Management System",objective:"Develop and deploy a smart healthcare management platform for five hospitals.",stakeholders:["Hospital Management","Project Manager","Doctors","Patients","QA Team"],scopeIn:["Appointments","Laboratory Reports","Doctor Schedules","Online Consultations","Billing"],scopeOut:["Hardware procurement","Network infrastructure"],approvedBudget:5000000,deadline:new Date("2026-12-01"),status:"Execution",milestones:[{name:"Requirements Baseline",date:new Date("2026-09-15"),status:"Completed"},{name:"MVP",date:new Date("2026-10-20"),status:"In Progress"},{name:"Release",date:new Date("2026-12-01"),status:"Pending"}]});
 await Requirement.insertMany([
  {projectId:p._id,title:"Patient Appointment Management",priority:"Critical",status:"Approved",description:"Book, reschedule and cancel appointments."},
  {projectId:p._id,title:"Laboratory Report Management",priority:"High",status:"Approved",description:"Upload and view laboratory reports."},
  {projectId:p._id,title:"AI Preliminary Diagnosis",priority:"Critical",status:"Proposed",description:"New requirement from hospital management."},
  {projectId:p._id,title:"Mobile Application",priority:"High",status:"Proposed",description:"New mobile client requirement."}
 ]);
 const now=new Date("2026-10-25");
 const t=await Task.insertMany([
  {projectId:p._id,name:"Requirements & Analysis",wbs:"1.1",assignee:"Project Manager",duration:10,startDate:new Date("2026-09-01"),endDate:new Date("2026-09-10"),percentComplete:100,plannedCost:450000,actualCost:430000},
  {projectId:p._id,name:"Backend Development",wbs:"2.1",assignee:"Backend Developers",duration:30,startDate:new Date("2026-09-11"),endDate:new Date("2026-10-10"),percentComplete:90,plannedCost:1200000,actualCost:1250000},
  {projectId:p._id,name:"Frontend Development",wbs:"2.2",assignee:"Frontend Developers",duration:30,startDate:new Date("2026-09-11"),endDate:new Date("2026-10-10"),percentComplete:75,plannedCost:1000000,actualCost:980000},
  {projectId:p._id,name:"Integration & QA",wbs:"3.1",assignee:"QA Engineer",duration:20,startDate:new Date("2026-10-11"),endDate:new Date("2026-10-30"),percentComplete:40,plannedCost:700000,actualCost:620000},
  {projectId:p._id,name:"Deployment",wbs:"4.1",assignee:"Project Manager",duration:10,startDate:new Date("2026-10-31"),endDate:new Date("2026-11-09"),percentComplete:0,plannedCost:350000,actualCost:0}
 ]);
 await Cost.insertMany([
  {projectId:p._id,taskId:t[0]._id,plannedValue:450000,earnedValue:450000,actualCost:430000,period:"Sep"},
  {projectId:p._id,taskId:t[1]._id,plannedValue:1200000,earnedValue:1080000,actualCost:1250000,period:"Oct"},
  {projectId:p._id,taskId:t[2]._id,plannedValue:1000000,earnedValue:750000,actualCost:980000,period:"Oct"},
  {projectId:p._id,taskId:t[3]._id,plannedValue:700000,earnedValue:280000,actualCost:620000,period:"Oct"},
  {projectId:p._id,taskId:t[4]._id,plannedValue:350000,earnedValue:0,actualCost:0,period:"Nov"}
 ]);
 await Change.create({projectId:p._id,title:"AI preliminary diagnosis + mobile application",justification:"Hospital management introduced additional requirements.",costImpact:800000,scheduleImpact:21,status:"Pending",requestedBy:"Hospital Management"});
 await Defect.insertMany([
  {projectId:p._id,title:"Appointment double-booking",module:"Appointment Scheduling",severity:"Critical",assignedTo:"Backend Developer 1",status:"In Progress",description:"Concurrent booking can create duplicate slot."},
  {projectId:p._id,title:"Patient record update failure",module:"Patient Records",severity:"Critical",assignedTo:"Backend Developer 2",status:"Open",description:"Some patient records fail validation during update."},
  {projectId:p._id,title:"Invoice alignment issue",module:"Billing",severity:"Medium",assignedTo:"Frontend Developer 1",status:"Resolved"}
 ]);
 await Risk.insertMany([
  {projectId:p._id,title:"Scope creep from new requirements",likelihood:5,impact:5,response:"Use formal change control; approve only with budget and deadline update.",owner:"Project Manager"},
  {projectId:p._id,title:"Critical appointment defects",likelihood:4,impact:5,response:"Add regression tests, peer review and dedicated QA cycle.",owner:"QA Engineer"},
  {projectId:p._id,title:"Budget overrun",likelihood:4,impact:4,response:"Monitor CPI weekly and require change approval before spending.",owner:"Project Manager"}
 ]);
 console.log("Seed completed. Project:",p._id.toString());
 await mongoose.disconnect();
})();