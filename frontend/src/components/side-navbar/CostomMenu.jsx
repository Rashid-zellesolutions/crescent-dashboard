import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const renderMenuItem = (menuItem) => {
  if (menuItem.link) { // Check if link property exists
    return (
      <Menu.Item key={menuItem.key} icon={menuItem.icon}>
        <Link to={menuItem.link}>{menuItem.label}</Link>
      </Menu.Item>
    );
  } else {
    return (
      <Menu.Item key={menuItem.key} icon={menuItem.icon}>
        {menuItem.label}
      </Menu.Item>
    );
  }
};

const renderSubMenu = (subMenu) => (
  <Menu.SubMenu key={subMenu.key} icon={subMenu.icon} title={subMenu.label}>
    {subMenu.children.map((item) => renderMenuItem(item))}
  </Menu.SubMenu>
);

const CostomMenu = ({ items }) => (
  <Menu mode="inline" theme="light" defaultOpenKeys={['sub1']}>
    {items.map((item) =>
      item.children ? renderSubMenu(item) : renderMenuItem(item)
    )}
  </Menu>
);

export default CostomMenu;