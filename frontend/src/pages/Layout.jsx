// Layout.js
import React, {useState} from 'react';
import SideNavbar from '../components/side-navbar/SideNavbar';
import Dashboard from './Dashboard';
import {useHref, useNavigate} from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
  import { Button } from 'antd';
import { FormProvider } from '../contextApi/formContext';
import InsuranceForm from '../components/insured persons form/InsuranceForm';
import InsuredPrsons from '../components/insured person list/InsuredPersons';

const Layout = ({ children, history }) => {
    const navigate = useNavigate()
    const [activeNavItem, setActiveNavItem] = useState('insuredPersons'); 
    const handleNavItemChange = (navItem) => {
        // console.log("Navigation to:", navItem);
        setActiveNavItem(navItem)
        navigate(navItem)
    }

    const [isNavOpen, setIsNavOpen] = useState(true);
    const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
    };

    const href = useHref(activeNavItem)
    console.log(href)
    
  return (
    <>
    <div className="main" style={{ display: 'flex', flexDirection: 'row'}}>
      <div className={`sidenav ${isNavOpen ? 'open' : 'closed'}`}>
            <SideNavbar isOpen={isNavOpen} handleNavItemChange={handleNavItemChange}  />
        </div>
        <div id="mainContent" className="content">
          <Dashboard activeNavItem={activeNavItem} />
        </div>
    </div>
    <Button type='primary'
      style={{
            left:isNavOpen?'210px':'90px'
          }}
     className="toggle-btn" onClick={toggleNav}>
        {isNavOpen ? <MenuUnfoldOutlined size={15} /> : <MenuFoldOutlined size={15} />}
      </Button>
    </>
  );
};

export default Layout;
