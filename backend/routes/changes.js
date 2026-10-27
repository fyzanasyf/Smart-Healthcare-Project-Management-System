const router=require("express").Router(); const Model=require("../models/Change");
router.get("/",async(req,res)=>res.json(await Model.find().sort({createdAt:-1})));
router.post("/",async(req,res)=>res.status(201).json(await Model.create(req.body)));
router.put("/:id",async(req,res)=>res.json(await Model.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})));
router.delete("/:id",async(req,res)=>{await Model.findByIdAndDelete(req.params.id);res.json({message:"Deleted"});});

router.post("/:id/approve",async(req,res)=>{
 const change=await Model.findById(req.params.id);
 if(!change) return res.status(404).json({message:"Change not found"});
 change.status="Approved"; change.approvedAt=new Date(); await change.save();
 res.json(change);
});
module.exports=router;