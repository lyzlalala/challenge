import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DropdownButton, Table, Dropdown } from 'react-bootstrap';
import '../App.css';

export default function FreqTable() {
    const [itemList, setItemList] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [ageList, setAgeList] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3000/users/allItems')
            .then(res => setItemList(res.data))
            .catch(error => console.log(error))
    })

    useEffect(() => {
        if (selectedItem) {
            axios
                .get(`http://localhost:3000/users/age?item=${selectedItem}`)
                .then(res => setAgeList(res.data))
                .catch(error => console.log(error))
        }
    }, [selectedItem])


    const handleClick = (e) => {
        const { name } = (e && e.target) || '';
        setSelectedItem(name);
    };


    return (
        <div>
            <h3>{`Age Demographic of User with ${selectedItem ? selectedItem : '__'}`}</h3>
            <DropdownButton id="dropdown-basic-button" title="item">
                {itemList.map((item, idx) => (
                    <Dropdown.Item key={idx} name={item} onClick={handleClick}>{item}</Dropdown.Item>
                ))}
            </DropdownButton>
            <Table striped bordered hover className='usertable-container'>
                <thead>
                    <tr>
                    <th>Age</th>
                    <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {ageList.map((data, idx) => (
                        <tr key={idx}>
                        <td>{data.age}</td>
                        <td>{data.count}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}