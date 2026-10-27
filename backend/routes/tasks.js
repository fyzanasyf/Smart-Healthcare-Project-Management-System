const router=require("express").Router(); const Model=require("../models/Task");
router.get("/",async(req,res)=>res.json(await Model.find().sort({createdAt:-1})));
router.post("/",async(req,res)=>res.status(201).json(await Model.create(req.body)));
router.put("/:id",async(req,res)=>res.json(await Model.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})));
router.delete("/:id",async(req,res)=>{await Model.findByIdAndDelete(req.params.id);res.json({message:"Deleted"});});

module.exports=router;