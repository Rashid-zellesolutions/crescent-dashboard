import React, { useEffect, useState } from 'react';
import './module.insuredPersons.css'
import { Space, Table, Dropdown, Button, Collapse,
  DatePicker,
  Select,} from 'antd';
import axios from 'axios';
import {DownOutlined,  DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons'
import Link from 'antd/es/typography/Link';
const { RangePicker } = DatePicker;



const InsuredPrsons = () => {
  const [data, setData] = useState([])
  const deletePerson = async (personId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteInsuredPerson/${personId}`);
      console.log("Person deleted successfully");
      alert("Person deleted successfully")
      // Optionally, you can update the table data after deletion
      fetchData();
    } catch (error) {
      console.log("Error Deleting Person:", error);
    }
  };

  const viewData = () => {}

  const updatePerson = () => {}
  
  const fetchData = async() => {
    try {
      
      const response = await axios.get("http://localhost:5000/api/v1/getAllInsuredPersons")
      // console.log(response.data.getPersons)
      setData(response.data.getPersons);

    } catch (error) {
      console.log("Error Getig Data")
    }
  }
  const items = [
    {
      label: <Button onClick={viewData} className='action-button-list'>
      <span><EyeOutlined /></span>
      View
      </Button>,
      key: '0',
    },
    {
      label: <Button onClick={deletePerson} className='action-button-list'>
      <span><DeleteOutlined /></span>
      Delete</Button>,
      key: '1',
    },
    {
      label: <Button onClick={updatePerson} className='action-button-list'>
      <span><EditOutlined /></span>
      Edit</Button>,
      key: '2',
    }
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'insuredID',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Health Code',
      dataIndex: 'healthCode',
    },
    {
      title: 'Plan Code',
      dataIndex: 'planCode',
    },
    {
      title: 'CNIC',
      dataIndex: 'cnicNumber',
      
    },
    {
      title: 'Relations',
      dataIndex: 'relation',
      
    },
    {
      title: 'Age',
      dataIndex: 'age',
      
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      
    },
    {
      title: 'Date Of Birth',
      dataIndex: 'dateOfBirth',
      
    },
    {
      title: 'Document No',
      dataIndex: 'documentNo',
      
    },
    {
      title: 'Issue Date',
      dataIndex: 'issueDate',
      
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <Dropdown menu={{ items }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Button shape="circle" icon={<DownOutlined />} />
            </Space>
          </a>
        </Dropdown>
        // <Dropdown
        //   overlay={
        //     <Space direction="vertical">
        //       <Button onClick={() => alert("View clicked")} icon={<EyeOutlined />} />
        //       <Button onClick={() => deletePerson(record._id)} icon={<DeleteOutlined />} />
        //       <Button onClick={() => alert("Edit clicked")} icon={<EditOutlined />} />
        //     </Space>
        //   }
        //   trigger={['click']}
        // >
        //   <a onClick={(e) => e.preventDefault()}>
        //     <Space direction='vertical'>
        //       <Button shape="circle" icon={<DownOutlined />} />
        //     </Space>
        //   </a>
        // </Dropdown>
      ),
      
    },
  ];

  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  
  const options = [];
  
  for (let i = 1; i <= 4; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };


  

    useEffect(() => {
      fetchData()
    }, []);
  return(
      <div className='main-list-div'>
          <Collapse
            size="small"
            items={[
              {
                key: '1',
                label: 'Filters',
                children: (
                  <div className="collspse-div">
                    <RangePicker
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={(value, dateString) => {
                        console.log('Selected Time: ', value);
                        console.log('Formatted Selected Time: ', dateString);
                      }}
                      onOk={onOk}
                    />
                    <DatePicker />
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Tags Mode"
                      onChange={handleChange}
                      options={options}
                    />
                  </div>
                ),
              },
            ]}
          />
        <Table columns={columns} dataSource={data} />
      </div>
    )
};
export default InsuredPrsons;