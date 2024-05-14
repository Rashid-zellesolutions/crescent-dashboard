import React, {useState} from 'react'
import './module.dashboard.css'
import Header from '../components/header/Header'
import InsuranceForm from '../components/insured persons form/InsuranceForm';
// import InsuredPrsons from '../components/insured person list/InsuredPersons';
import Home from '../components/home/Home';

import { FormProvider } from '../contextApi/formContext';
import InsuredPrsons from '../components/insured person list/InsuredPersons';
import { FormContext } from 'antd/es/form/context';
import UplaodImage from '../components/uplaod-image/UplaodImage';

const Dashboard = ({activeNavItem}) => {
  
    const renderContent = () => {
        switch(activeNavItem){
            case 'home':
                return <Home />;
            case 'uploadImage':
                return <UplaodImage />;
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