const express = require('express');
const router = express.Router();
const {addInsuredPerson, getAllInsuredPersons, getSingleInsuredPerson, deleteInsuredPerson, updateInsuredPerson, addDependant, getPersonByName} = require('../controller/insuredPersonsController');

router.post("/addInsuredPerson", addInsuredPerson);
router.get("/getAllInsuredPersons", getAllInsuredPersons);
router.get("/getSingleInsuredPerson/:personId", getSingleInsuredPerson);
router.delete("/deleteInsuredPerson/:personId", deleteInsuredPerson);
router.put("/updateInsuredPerson/:personId", updateInsuredPerson);
router.post("/addDependant", addDependant);
router.get("/getPersonByName:/name", getPersonByName);

module.exports = router;