import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import '../App.css';

export default function Usertable() {
    const [userInfo, setUserInfo] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3000/users')
            .then(res => setUserInfo(res.data))
            .catch(error => console.log(error))
    })

    return (
        <div>
            <h2>All Users</h2>
            <h3>Users and their age</h3>
            <Table striped bordered hover className='usertable-container'>
                <thead>
                    <tr>
                    <th>Username</th>
                    <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {userInfo.map((data, idx) => (
                        <tr key={idx}>
                        <td>{data.username}</td>
                        <td>{data.age}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}