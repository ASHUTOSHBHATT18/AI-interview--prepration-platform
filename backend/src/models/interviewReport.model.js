const mongoose = require('mongoose');


const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true, 'Please provide a technical question']
    },
    intention:{
        type: String,
        required: [true, 'Please provide the intention behind the question']
    },
    answer:{
        type: String,
        required: [true, 'Please provide an answer to the question']
    }
},{
    _id: false
});

const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true, 'Please provide a behavioral question']
    },
    intention:{
        type: String,
        required: [true, 'Please provide the intention behind the question']
    },
    answer:{
        type: String,
        required: [true, 'Please provide an answer to the question']
    }
},{
    _id: false
});

const skillGapSchema = new mongoose.Schema({
    skill:{
        type: String,
        required: [true, 'Please provide a skill gap']
    },
     severity:{
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: [true, 'Please provide the severity of the skill gap']
    }
},{
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({

    day:{
        type: Number,
        required: [true, 'Please provide the day for the preparation plan']
    },
    focus:{
        type: String,
        required: [true, 'Please provide the focus for the preparation plan']
    },
    tasks:[{
        type: String,
        required: [true, 'Please provide the tasks for the preparation plan']
    }]
},{
        _id: false
})



const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type: String,
        required: [true, 'Please provide a job description']
    },
    resume:{
        type: String
    },
    selfDescription:{
        type: String
    },
    matchScore:{
        type: Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: [ true, "Job title is required" ]
    }

},{
    timestamps: true
})

const interviewReportModel = mongoose.model('InterviewReport', interviewReportSchema);
module.exports = interviewReportModel;