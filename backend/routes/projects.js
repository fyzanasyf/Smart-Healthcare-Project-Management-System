const router=require("express").Router(); const Project=require("../models/Project");
router.get("/",async(req,res)=>res.json(await Project.find().sort({createdAt:-1})));
router.get("/:id",async(req,res)=>res.json(await Project.findById(req.params.id)));
router.post("/",async(req,res)=>res.status(201).json(await Project.create(req.body)));
router.put("/:id",async(req,res)=>res.json(await Project.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})));
router.delete("/:id",async(req,res)=>{await Project.findByIdAndDelete(req.params.id);res.json({message:"Deleted"});});
module.exports=router;