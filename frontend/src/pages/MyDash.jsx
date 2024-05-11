// Dashboard.js
import React from 'react';
import Header from '../components/header/Header';
import InsuranceForm from '../components/insured persons form/InsuranceForm';
import { FormProvider } from '../contextApi/formContext';
import { Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const MyDash = () => {
  return (
    <>
      <Header />
      <FormProvider>
        <InsuranceForm />
      </FormProvider>
      <Button type='primary' className="toggle-btn">
        {isNavOpen ? <MenuUnfoldOutlined size={15} /> : <MenuFoldOutlined size={15} />}
      </Button>
    </>
  );
};

export default MyDash;
