import React from 'react';
import './module.sidenav.css';
import logo from '../../assets/Logo-Website-Black.png';
import SmallLogo from '../../assets/crescent-small-logo.png';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { ContainerOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons';

const SideNavbar = ({ isOpen, handleNavItemChange, activeNavItem }) => {
  const items = [
    { key: 'dashboard', icon: <ContainerOutlined />, label: 'Dashboard', link: '/' },
    {
      key: 'add users',
      label: 'Insured Person',
      icon: <MailOutlined />,
      children: [
        { key: 'insuranceForm', label: 'Insurance Form', link: '/insuranceForm' },
        { key: 'insuredPersons', label: 'Insured Persons', link: '/insuredPersons' },
      ],
    },
    {key: 'logout', icon: <LogoutOutlined />, label: 'Log Out', link: '#'}
  ];

  return (
    <div style={{ position: 'fixed'}}>
      <a href='#'>
        {isOpen ? <img className='logo' src={logo} alt='logo' width={180} /> : <img className='' src={SmallLogo} alt='logo' height={45} />}
      </a>
        <div>
          <div style={{ flex: 1, position: 'relative' }}>
            <Menu
              defaultOpenKeys={['insuranceForm']}
              mode="inline"
              theme="#003478"
              style={{color: '#fff'}}
              className='menu-items'
              inlineCollapsed={!isOpen}
              items={items}
              selectedKeys={[activeNavItem]}
              onClick={(e) => {
                const { key } = e;
                handleNavItemChange(key);
              }}
              renderMenuItem={({ label, icon, link }) => (
                <Menu.Item key={link} icon={icon}>
                  <Link to={link}>{label}</Link>
                </Menu.Item>
              )}
              renderSubMenu={({ label, icon, children }, items, index) => (
                <Menu.SubMenu key={label} icon={icon} title={label} style={index === items.length -1 ? {position: 'relative', bottom: '20px'} : null}>
                  {children.map(({ key, label, link }) => (
                    <Menu.Item key={link}>
                      <Link to={link}>{label}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              )}
            />
          </div>
        </div>
    </div>
  );
};

export default SideNavbar;
