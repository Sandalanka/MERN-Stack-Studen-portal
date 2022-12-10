const express =require('express');
const assignments =express.Router();
const cors =require('cors');
const Assignment =require('../Models/Assignment');
assignments.use(cors());

//assignment insert
assignments.post('/add',(req,res)=>{
    let assignmentone =new Assignment(req.body);
    assignmentone.save()
                .then(result=>{
                    res.json({
                        status:201,
                        message:"Assignemnt Add Successful",
                        data:result
                    });
                }).catch(error=>{
                    res.json({
                        status:400,
                        message:"Assignemnt Add Not Successful",
                        error:error
                    });
                });
});

//Get All Assignemnt
assignments.get('/getAll',(req,res)=>{
    Assignment.find(function(error,assignment){
        if(error){
            res.json({
                status:400,
                message:"Some Error has Occur"
            });
        }else{
            res.json({
                status:200,
                message:" Successful",
                data:assignment
            });
        }
    });
});

//Assignment delete
assignments.get('/delete/:id',(req,res)=>{
    Assignment.findByIdAndRemove({_id:req.params.id},function(error,assignment){
        if(error){
            res.json({
                status:400,
                message:"Some Error has Occur"
            });
        }else{
            res.json({
                status:200,
                message:"Delete Successful"
            });
        }
    });
});

module.exports=assignments;