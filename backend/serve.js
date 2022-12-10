const express =require('express');
const path =require('path');
const cors =require('cors');
const bodyParser =require('body-parser');
const Assignemnt =require('./Routes/Assignment');
const User =require('./Routes/User');
const fileUpload =require('express-fileupload');
const mongoose =require('mongoose');
const mongodb =require('mongodb');
const app =express();
const port =process.env.PORT||5000;
app.use(bodyParser.json());
app.use(cors());
//const dotenv =require('dotenv');
//dotenv.config();
mongoose.set('strictQuery', false);

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use('/assignemnt',Assignemnt);
app.use('/user',User);

//file upload initializer
app.use(fileUpload());

//assignment file upload
app.post('/upload',(req,res)=>{
    if(req.files==null){
        res.json({
            status:422,
            messgae:"file not send"
        });
    }else{
        const file =req.files.file;
        file.mv('${__dirname}/client/public/upload/${file.name}',err=>{
            if(err){
                res.json({
                    status:500,
                    messgae:"some error has occur",
                    error:err
                });
            }else{
                res.json({
                    status:20,
                    messgae:"upload successful"
                });
            }
        });

    }
});

const corsOption={
    origin:'*',
    optionsSuccessStatus:200
};

app.use(cors(corsOption));

const mongoURL ='mongodb://0.0.0.0:27017/Student';

mongoose.connect(mongoURL)
        .then(()=>{
            console.log('MongoDB is connected');
        }).catch(err=>{
            console.log(err);
        });

app.listen(port ,()=>{
    console.log('Server is running '+port);
})