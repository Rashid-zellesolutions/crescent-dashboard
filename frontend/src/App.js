import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InsuranceForm from './components/insured persons form/InsuranceForm';
import InsuredPersons from './components/insured person list/InsuredPersons';
import Layout from './pages/Layout';
import UplaodImage from './components/uplaod-image/UplaodImage';

const App = () => {
  
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        {/* <Route path='/' element={<Layout />}> */}
          <Route exact path='/' element={<Dashboard />} />
          <Route path='/insuranceForm' element={<InsuranceForm />}/>
          <Route path='/insuredPersons' element={<InsuredPersons />} />
          <Route path='/uplaodimage' element={<UplaodImage />} />
        {/* </Route> */}
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
