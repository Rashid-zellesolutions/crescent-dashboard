import React from 'react'
import './module.insuranceForm.css';
import { PiIdentificationCardFill } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { RiHealthBookLine } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsGenderMale } from "react-icons/bs";
import { TbCirclesRelation } from "react-icons/tb";
import { FaRegAddressCard } from "react-icons/fa";
import axios from 'axios';

// import context to manage state
import { useFormContext } from '../../contextApi/formContext';

const InsuranceForm = () => {

  
const {setFormValues,formData, handleChange, setFormData} = useFormContext();

// set error or submit form
const handleSubmit = async (e) => {
  
  e.preventDefault();
  
   try {
    const response = await axios.post("http://localhost:5000/api/v1/addInsuredPerson", {insuredID: formData.idCard, cnicNumber: formData.cnic, gender: formData.gender, age: formData.age, dateOfBirth: formData.dob, planCode: formData.planCode, name: formData.name, issueDate: formData.date, documentNo: formData.documentNo, healthCode: formData.healthCode}, {
      headers: {
        'Content-Type': 'application/json'
    }
    })
    alert("form Sumited")
    console.log(response.data)
    setFormValues(response.data)
   } catch (error) {
    console.error('Error submitting form:', error);
    // Handle error as needed
    alert("Error submitting form. Please try again later.");
   }
}

// set cnic formate
const handleCNICChange = (e) => {
  const input = e.target.value;
  // Remove any non-numeric characters
  const formattedInput = input.replace(/\D/g, '');
  // Add hyphens at appropriate positions
  let formattedCNIC = '';
  if (formattedInput.length <= 5) {
    formattedCNIC = formattedInput;
  } else if (formattedInput.length <= 12) {
    formattedCNIC = formattedInput.slice(0, 5) + '-' + formattedInput.slice(5);
  } else {
    formattedCNIC = formattedInput.slice(0, 5) + '-' + formattedInput.slice(5, 12) + '-' + formattedInput.slice(12, 13);
  }
  setFormData({...formData, cnic: formattedCNIC});
  
};

// set formate of health code
const handleHealthCodeChange = (e) => {
  const input = e.target.value;
  const formattedInput = input.replace(/[^a-zA-Z0-9]/g, '');

  let formattedData = '';
  if (formattedInput.length <= 4) {
      formattedData = formattedInput;
  } else if (formattedInput.length <= 8) {
      formattedData = formattedInput.slice(0, 4) + '-' + formattedInput.slice(4);
  } else if (formattedInput.length <= 12) {
      formattedData = formattedInput.slice(0, 4) + '-' + formattedInput.slice(4, 8) + '-' + formattedInput.slice(8);
  } else if (formattedInput.length <= 16) {
      formattedData = formattedInput.slice(0, 4) + '-' + formattedInput.slice(4, 8) + '-' + formattedInput.slice(8, 12) + '-' + formattedInput.slice(12);
  }

  const uppercaseData = formattedData.toUpperCase();
  setFormData({...formData, healthCode: uppercaseData});
 
};
  
//   Object for iput fields
const formFields = [
    {placeholder: "ID", type: "text", icon: <FaRegAddressCard size={30} />, name: "idCard", val: formData.idCard, onChange: handleChange},
    {placeholder: "Date Of Issue", type: "date", icon: <CiCalendar size={30} />, name: "date", val: formData.date, onChange: handleChange},
    {placeholder: "Health Code SM23-HPAK-0100-0001", type: "text",name: "healthCode", icon: <RiHealthBookLine size={30} />, val: formData.healthCode, maxLen: 19, onChange: handleHealthCodeChange},
    {placeholder: "Name of Person", type: "text", icon: <MdDriveFileRenameOutline size={30} />, name: "name", val: formData.name, onChange: handleChange},
    {placeholder: "Document No. ", type: "text", icon: <IoDocumentTextOutline size={30} />, name: "documentNo",  val: formData.documentNo, onChange: handleChange},
    {placeholder: "Plan Code", type: "select", icon: <BsGenderMale size={30} />, id: "planCode", name: "planCode", val: formData.planCode, onChange: handleChange, options: [
      { value: '', label: 'Select Plan Code' },
      { value: 'HPAK-0100', label: 'Plan A' },
      { value: 'SM23-HPCR-0100', label: 'Plan B' },
      { value: 'SM44-ABCD-0200', label: 'Plan C' },
  ] },
  
  {placeholder: "Date Of birth", type: "date", icon: <CiCalendar size={30} />, name: "dob", val: formData.dob, onChange: handleChange},
    {placeholder: "Age", type: "text", icon: <BsGenderMale size={30} />, name: "age",  val: formData.age, onChange: handleChange},
    {placeholder: "Gender", type: "text", icon: <BsGenderMale size={30} />, name: "gender",  val: formData.gender, onChange: handleChange},
    {placeholder: "Relation", type: "select", icon: <TbCirclesRelation size={30} />, name: "relation", onChange: handleChange , val: formData.relation, options: [
      {value: "", label: "Select Relation"},
      {value: "Self", label: "Self"},
      {value: "Spouse", label: "Spouse"},
      {value: "Son", label: "Son"},
      {value: "Daughter", label: "Daughter"}
    ]},
    {placeholder: "CNIC Number", type: "text", icon: <PiIdentificationCardFill size={30} />, name: "cnic",  val: formData.cnic, maxLen: 15, onChange: handleCNICChange}
]

return (
  <div className='form-box'>
    <div className='title'>Add Person</div>
      <form name='myForm' onSubmit={handleSubmit} className='contant'>
        {formFields.map((items, index) => {
          return <div key={index}>
            <div  className='input-div'>
              <span>{items.icon}</span>
              {items.type === 'select' ? (
                <select required id={items.id} name={items.name}  onChange={items.onChange}>
                {items.options.map((subItem, subIndex) => {
                  return <option key={subIndex} value={subItem.value}>{subItem.label}</option>
                })}
              </select>   
              ) : (
                  <input type={items.type} 
                    placeholder={items.placeholder} 
                    name={items.name}
                    value={formData[items.name] || ''} 
                    maxLength={items.maxLen} 
                    onChange={items.onChange}
                    required 
                  />
                )}    
            </div>
          </div>      
        })}
        <button type="submit">procced</button>
      </form>
    </div>
  )
}

export default InsuranceForm