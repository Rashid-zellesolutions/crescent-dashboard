import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InsuranceForm from './components/insured persons form/InsuranceForm';
import InsuredPersons from './components/insured person list/InsuredPersons';
import Layout from './pages/Layout';
// import Breadcrumbs from './components/breadcrums/Breadcrumbs';

const App = () => {
  // const [isNavOpen, setIsNavOpen] = useState(true);

  // const toggleNav = () => {
  //   setIsNavOpen(!isNavOpen);
  // };
  // const breadcrumbs = [
  //   {label: 'Dashboard', link: '/'},
  //   {label: 'Insurance Form', link: '/insuranceForm'},
  //   {label: 'Insured People', link: '/insuredPersons'}
  // ]
  return (
    // <Dashboard />
    <BrowserRouter>
    
    <Layout>
    
      <Routes>
      
        {/* <Route path='/' element={<Layout />}> */}
          <Route exact path='/' element={<Dashboard />} />
          <Route path='/insuranceForm' element={<InsuranceForm />}/>
          <Route path='/insuredPersons' element={<InsuredPersons />} />
        {/* </Route> */}
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
