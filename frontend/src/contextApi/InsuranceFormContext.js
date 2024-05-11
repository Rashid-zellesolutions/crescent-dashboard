import React, {useState, useContext} from "react";

const InsuranceFormContext = React.createContext();

// costume hook
export const useInsuranceFormContext = () => {
    return useContext(InsuranceFormContext);
};



const InsuranceFormProvider = ({children}) => {
    const [formState, setFormState] = useState({
        idCard: '',
        date: '',
        healthCode: '',
        nameError: '',
        documentNo: '',
        planCode: '',
        dob: '',
        age: '',
        gender: '',
        relation: '',
        cnic: '',
    });

    // Handle functions to update form fields
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
        setFormState({...formState, healthCode: uppercaseData});
       
    };
    console.log(formState.healthCode)

    const handlePlanCodeChange = (e) => {
        const planeDetail = e.target.value;
        setFormState({...formState, planCode: planeDetail});
        
        
    };
    console.log(formState.planCode);

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
        setFormState({...formState, cnic: formattedCNIC});
        
    };
    console.log(formState.cnic)
    

   

    

    // console.log(formState.idCard)

    // Return the context provider with state and methods
    return (
        <InsuranceFormContext.Provider
        value={{
            formState,
            handleCNICChange,
            handleHealthCodeChange,
            handlePlanCodeChange
        }}
        >
            {children}
        </InsuranceFormContext.Provider>
    )
}

export {InsuranceFormProvider, InsuranceFormContext};