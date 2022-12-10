const express =require('express');
const users =express.Router();
const cors =require('cors');
const jwt =require('jsonwebtoken');
const bcrypt =require('bcrypt');
const User =require('../Models/User');
users.use(cors());

//this is secrete key.you can define your owner secrete key
process.env.SECRET_KET="secret";

//This is user registration Route
users.post('/register',(req,res)=>{
    const today =new Date();
    const userData ={
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        date:today
    }
    
    //check User already register or not
    User.findOne({
        email:req.body.email
    }).then(user=>{
        if(!user){
            bcrypt.hash(req.body.password,10 ,(error,hash)=>{
                userData.password=hash

                User.create(userData)
                    .then(user=>{
                        res.json({
                            status:201,
                            email:user.email,
                            message:'User registrataion successful'
                        });
                    })
                    .catch(err=>{
                        res.json({
                            status:500,
                            message:'Some error has occur',
                            error:err
                        });
                    });
            })
        }else{
            res.json({
                message:'This user already register'
            })
        }
    })
});

//user login
users.post('/login',(req,res)=>{
    User.findOne({
        email:req.body.email
    }).then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const payload ={
                    _id:user._id,
                    first_name:user.first_name,
                    last_name:user.last_name,
                    email:user.email
                }
    
                let token =jwt.sign(payload,process.env.SECRET_KET,{ expiresIn:1440});
                res.json({
                    status:200,
                    message:"Login Successful",
                    token:token
                });
            }else{
                res.json({
                    status:422,
                    message:"Login Not Successful"
                });
            }
        }else{
            res.json({
                status:422,
                message:"User Not Found"
            });
        }
    }).catch(error=>{
        res.json({
            status:500,
            message:"Some error has occure",
            error:error
        });
    })
});

//user profile
users.get('/profile',(req,res)=>{
    const decode =jwt.verify(req.headers['authorization'],process.env.SECRET_KET);

    User.findOne({
        _id:decode._id
    }).then(user=>{
        if(user){
            res.json({
                status:200,
                data:user
            });
        }else{
            res.json({
                status:422,
                message:'unauthorization'
            });
        }
    }).catch(error=>{
        res.json({
            status:500,
            message:'some error has occur',
            error:error
        });
    });
});

module.exports=users;