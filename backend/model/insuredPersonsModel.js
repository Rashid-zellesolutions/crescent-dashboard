const mongoose = require('mongoose');

const dependantPersonSchema = new mongoose.Schema({
    relation: {
        type : String,
        required : true
    },
    cnic : {
        type : String,
        required : true
    }
})

const insuredPersons = new mongoose.Schema({
    insuredID : {
        type: String,
        required : true
    },
    healthCode : {
        type : String,
        required : true
    },
    documentNo : {
        type : String,
        required : true
    },
    issueDate : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    planCode : {
        type : String,
        required : true
    },
    dateOfBirth : {
        type : String,
        required : true
    },
    age : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    relation : {
        type : String,
        default: "self"
    },
    cnicNumber : {
        type : String,
        required : true
    },
    headCNIC : {
        type : String
    },
    dependant : [dependantPersonSchema]
});

module.exports = mongoose.model("InsuredPersons", insuredPersons)