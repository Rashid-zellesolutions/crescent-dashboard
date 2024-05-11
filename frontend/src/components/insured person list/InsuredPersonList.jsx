import React, { useEffect, useState } from 'react'
import './module.insuredPersoneList.css';
import axios from 'axios';

import { FiEye } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import Filters from './Filters';

const InsuredPersonList = () => {

    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/getAllInsuredPersons");
                console.log(response.data.getPersons)
                setUserData(response.data.getPersons);
            } catch (error) {
                console.error('Error geting data:', error);
            }
        };
        fetchData()
    }, []);

    const [openMenuIndex, setOpenMenuIndex] = useState(null)

    const actionIcons = [
        { name: "view", icon: <FiEye size={15} />, link: '#' },
        { name: "edit", icon: <CiEdit size={15} />, link: '#' },
        { name: "delete", icon: <RiDeleteBin7Line size={15} />, link: '#' }
    ]

    const toggleMenu = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index)
    }



    return (
        <div className='list-box'>
            {/* <Filters /> */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr className='table-head' >
                        <th style={{ borderTopLeftRadius: '10px' }}>ID</th>
                        <th>Name</th>
                        <th>Health Code</th>
                        <th>Plan Code</th>
                        <th>CNIC</th>
                        <th>Relation</th>
                        <th>AGE</th>
                        <th>Gender</th>
                        <th> Date Of Birth </th>
                        <th>Decument No</th>
                        <th>Issue Date</th>
                        <th style={{ borderTopRightRadius: '10px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((items, index) => {
                        return <tr key={index} style={{ position: 'relative' }}>
                            <td>{items.insuredID}</td>
                            <td>{items.name}</td>
                            <td>{items.healthCode}</td>
                            <td>{items.planCode}</td>
                            <td>{items.cnicNumber}</td>
                            <td>{items.relation}</td>
                            <td>{items.age}</td>
                            <td>{items.gender}</td>
                            <td>{items.dateOfBirth}</td>
                            <td>{items.documentNo}</td>
                            <td>{items.issueDate}</td>
                            <td>
                                <span className='action-btn' style={{ position: 'relative' }} onClick={() => { toggleMenu(index) }}> <HiOutlineDotsHorizontal size={15} />
                                </span>
                                {openMenuIndex === index && (
                                    <div className='table-dropdown' style={{
                                        position: 'absolute',
                                        top: '80%',
                                        right: 0,
                                        backgroundColor: '#F5F5F5',
                                        border: '1px solid black',
                                        padding: '10px',
                                        zIndex: 1,
                                    }}>
                                        {actionIcons.map((items, i) => {
                                            return <li key={i}>
                                                <a href={items.link}>
                                                    <span> {items.icon} </span> {items.name}
                                                </a>
                                            </li>
                                        })}
                                    </div>
                                )}
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default InsuredPersonList