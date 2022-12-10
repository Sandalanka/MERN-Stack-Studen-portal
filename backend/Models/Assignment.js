const { Schema, default: mongoose } = require("mongoose");


const AssignmentSchema =new Schema({
    course:{
        type:String
    },
    assignment_name:{
        type:String
    },
    deadline:{
        type:String
    }
});

module.exports =Assignment =mongoose.model('assignment',AssignmentSchema);