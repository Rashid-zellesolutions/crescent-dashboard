import React, { useEffect, useState } from 'react';
import './module.insuredPersons.css'
import { Space, Table, Dropdown, Button, Collapse,
  DatePicker,
  Input, Spin, Menu} from 'antd';
import axios from 'axios';
import {EllipsisOutlined, UserOutlined, DeleteOutlined, EditOutlined, EyeOutlined} from '@ant-design/icons'
import Link from 'antd/es/typography/Link';

const { RangePicker } = DatePicker;

const InsuredPrsons = () => {
  const [data, setData] = useState([])
  const [searchedName, setSearchedName] = useState("");
  const [searchedCNIC, setSearchedCNIC] = useState("")
  const [searchDocument, setSearchDocument] = useState("")
  const [selectedDate, setSelectedDate] = useState([])
  const [loading, setLoading] = useState(true);

  const deletePerson = async (personId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v1/deleteInsuredPerson/${personId}`);
      console.log("Person deleted successfully");
      alert("Person deleted successfully")
      // Optionally, you can update the table data after deletion
      console.log("Person id is", personId)
      fetchData();
    } catch (error) {
      console.log("Error Deleting Person:", error);
    }
  };

  const viewData = () => {}

  const updatePerson = () => {}

  // let timeout;
  // function delayDAta(){
  //   timeout = setTimeout(fetchData, 2000);
  // }
  
  const fetchData = async() => {
    try {
      
      const response = await axios.get("http://localhost:5000/api/v1/getAllInsuredPersons")
      // console.log(response.data.getPersons)
      setData(response.data.getPersons);
    } catch (error) {
      console.log("Error Getig Data")
    }finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  }

  const handleSearchedNAme = (e) => {
    const { value } = e.target;
    setSearchedName(value);
  }
  const handleCNICSearch = (e) => {
    const {value} = e.target;
    setSearchedCNIC(value)
    
  }
  const handleDocumentSearch = (e) => {
    const { value } = e.target;
    setSearchDocument(value)
  }

const handleDateRangeChange = (dates) => {
  setSelectedDate(dates)
}
const handleFilterClear = () => {
  setSearchedName("");
  setSearchedCNIC("");
  setSearchDocument("");
  setSelectedDate([]);
}

  const items = [
    {
      key: '1',
      label: (
        <span className='action-button-list'>
          <span><EyeOutlined /></span>
           View
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span className='action-button-list' onClick={deletePerson}>
          <span><DeleteOutlined /></span> Delete
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <span className='action-button-list'>
          <span><EditOutlined /></span> Edit
        </span>
      ),
    },
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
      // render: (cnic) => formatCNIC(cnic)
      
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
        <Dropdown
          overlay={
            <Menu>
              {/* <Menu.Item onClick={() => viewSinglePerson(record.insuredID)}>
                <span><EyeOutlined /></span> View
              </Menu.Item> */}
              <Menu.Item onClick={() => deletePerson(record.insuredID)}>
                <span><DeleteOutlined /></span> Delete
              </Menu.Item>
              {/* <Menu.Item onClick={() => updatePerson(record.insuredID)}>
                <span><EditOutlined /></span> Edit
              </Menu.Item> */}
            </Menu>
          }
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Button shape="circle" icon={<EllipsisOutlined />} />
            </Space>
          </a>
        </Dropdown>
      ),
      // render: (text, record) => (
      //   <Dropdown menu={{ items }} trigger={['click']}>
      //     <a onClick={(e) => e.preventDefault()}>
      //       <Space>
      //         <Button shape="circle" icon={<EllipsisOutlined />} />
      //       </Space>
      //     </a>
      //   </Dropdown>
      // ),
      
    },
  ];
  
  const options = [];
  
  for (let i = 1; i <= 4; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

    useEffect(() => {
      // delayDAta()
      fetchData()
      
    }, []);

    useEffect(() => {
      if(searchedName === "") {
        fetchData()
      }else {
        const filteredData = data.filter(item => item.name.toLowerCase().includes(searchedName.toLowerCase()));
        setData(filteredData)
      }
    }, [searchedName])

    useEffect(() => {
      if(searchedCNIC === ''){
        fetchData();
      }else{
        const filteredCNIC = data.filter(item => item.cnicNumber && item.cnicNumber.includes(searchedCNIC));
        setData(filteredCNIC)
      }
    }, [searchedCNIC, data]);

    useEffect(() => {
      if(searchDocument === "") {
        fetchData()
      } else {
        const filterDocument = data.filter(item => item.documentNo.toLowerCase().includes(searchDocument.toLowerCase()));
        setData(filterDocument);
      }
    }, [searchDocument, data]);

    useEffect(() => {
      if(selectedDate.length === 2) {
        const [startDate, endDate] = selectedDate;
        const filteredData = data.filter(item => {
          const itemDate = new Date(item.issueDate);
          return itemDate >= startDate && itemDate <=endDate;
        })
        setData(filteredData);
      }
    }, [selectedDate, data]);

    // const formatCNIC = (cnic) => {
     
    // };
  return(
      <div className={`main-list-div ${loading ? 'loading' : ''}`}>
      {loading && (
        <div className='loading-container'>
          <Spin size='large' />
        </div>
      ) }
        <div>
          <Collapse
            size="small"
            style={{marginBottom: '10px'}}
            items={[
              {
                key: '1',
                label: 'Filters',
                children: (
                  <div style={{position: 'relative'}}>
                  <div  className="collspse-div">
                    <Input placeholder="Search By Name" prefix={<UserOutlined />} value={searchedName} onChange={handleSearchedNAme}/>
                    <Input placeholder="Search By CNIC" prefix={<UserOutlined />} value={searchedCNIC} maxLength={15} onChange={handleCNICSearch} />
                    <Input placeholder="Search By Document No" prefix={<UserOutlined />} value={searchDocument} onChange={handleDocumentSearch} />
                    <RangePicker showTime value={selectedDate} onChange={handleDateRangeChange} />
                    {/* <Button style={{right: 0, bottom: 0, position: 'fixed', marginTop: '30px'}} onClick={handleFilterClear}>Clear Filters</Button> */}
                  </div>
                    <Button style={{right: 0, bottom: '0', position: 'absolute'}} onClick={handleFilterClear}>Clear Filters</Button>
                  </div>
                ),
              },
              
            ]}
          />
         </div>
        <Table columns={columns} dataSource={data} />
      
      </div>
    )
};
export default InsuredPrsons;