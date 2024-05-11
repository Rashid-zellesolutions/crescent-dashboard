import React, {useState} from 'react'
import './module.dashboard.css'
import Header from '../components/header/Header'
import InsuranceForm from '../components/insured persons form/InsuranceForm';
// import InsuredPrsons from '../components/insured person list/InsuredPersons';

import { FormProvider } from '../contextApi/formContext';
import InsuredPrsons from '../components/insured person list/InsuredPersons';
import { FormContext } from 'antd/es/form/context';

const Dashboard = ({activeNavItem}) => {
  
    const renderContent = () => {
        switch(activeNavItem){
            case 'insuranceForm':
                return (
                    <FormProvider>
                        <InsuranceForm />
                    </FormProvider>
                );
            case 'insuredPersons':
                return <InsuredPrsons />;
            default:
                return null;
        }
    }

  return (
    <div className="main" style={{ display: 'flex', flexDirection: 'column'}}>
      <Header />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard