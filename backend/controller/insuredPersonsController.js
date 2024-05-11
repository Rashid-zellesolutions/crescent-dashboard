const InsuredPersons = require('../model/insuredPersonsModel');
const catchAsyncError = require('../midleware/catchAsynError');


exports.addDependant = catchAsyncError(async (req, res) => {
    try {
        const { insuredID, relation, cnic } = req.body;

        // Find the insured person by insuredID
        const insuredPerson = await InsuredPersons.findOne({ insuredID });

        if (!insuredPerson) {
            return res.status(404).json({ message: "Insured person not found" });
        }

        // Check if relation is 'self'
        if (relation === 'self') {
            // If relation is 'self', update the headCNIC field with the provided CNIC
            await InsuredPersons.findOneAndUpdate(
                { insuredID },
                { $set: { headCNIC: cnic } }
            );
            return res.status(200).json({ message: "Head CNIC updated successfully" });
        } else {
            // If relation is not 'self', add the dependant to the dependants array
            const dependant = { relation, cnic };
            insuredPerson.dependants.push(dependant);
            await insuredPerson.save();
            return res.status(200).json({ message: "Dependant added successfully" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


exports.addInsuredPerson = catchAsyncError( async(req, res) => {
    const addPerson = await InsuredPersons.create(req.body);
    res.status(201).json({success: true, addPerson})
} );

exports.getAllInsuredPersons = catchAsyncError( async(req, res) => {
    const getPersons = await InsuredPersons.find();
    res.status(202).json({success: true, getPersons});
})

exports.getSingleInsuredPerson = catchAsyncError(async(req, res) => {
    const {personId} = req.params;
    const getSinglePerson = await InsuredPersons.findOne({insuredID: personId});
    res.status(202).json({success: true, getSinglePerson});
});

exports.getPersonByName = catchAsyncError( async(req, res) => {
    const name = req.params;
    const personWithName = await InsuredPersons.findOne(name);
    res.status(200).json({success: true, personWithName});
})

exports.deleteInsuredPerson = catchAsyncError(async(req, res) => {
    const {personId} = req.params;
    const deletedPerson = await InsuredPersons.findByIdAndDelete({_id: personId});
    res.status(203).json({success: true, deletedPerson});
});

exports.updateInsuredPerson = catchAsyncError(async(req, res) => {
    const {
        personID, 
        healthCode, 
        documentNo, 
        issueDate, 
        name, 
        planCode, 
        dateOfBirth, 
        age, 
        gender, 
        relation, 
        cnicNumber, 
        headCNIC } = req.body;

        const {personId} = req.params;
        const insuredPerson = await InsuredPersons.findById(personId);
        if(!insuredPerson){
            console.log("User Not Found");
            res.status(404).json({success: false, message: "User Not Found"});
        }
        await InsuredPersons.findByIdAndUpdate(personId, req.body);
        res.status(201).json({success: true, insuredPerson});

})