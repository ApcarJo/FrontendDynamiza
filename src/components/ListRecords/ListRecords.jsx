
import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const ListRecords = (props) => {

    const [record, setRecords] = useState({});
    const [show, setShow] = useState(false);

    const updateRecords = (e) => {
        setRecords({ ...record, [e.target.name]: e.target.value })
    }

    const modifyRecord = async (id) => {
        let token = props.credentials?.token;

        let body = {
            id: id,
            country: record.country,
            type: record.type,
            company_name: record.company_name,
            status: record.status,
            ship_date: record.date,
            user_id: props.credentials.user._id
        };

        try {
            await axios.put(`https://dynamizaticbackend.herokuapp.com/record`, body, {headers: { 'authorization': 'Bearer ' + token } });
            props.deleteDoc();
        } catch (e) {
            console.log(e);
        }

    }

    const deleteRecord = async (id) => {

        let token = props.credentials?.token;

        let body = {
            order_id: id,
            user_id: props.credentials.user._id
        };

        try {
            await axios.delete(`https://dynamizaticbackend.herokuapp.com/record`, { data: body, headers: { 'authorization': 'Bearer ' + token } });
            props.deleteDoc();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <div className="rowBox">
                <div className="dataBox">
                    <span>{props.data._id}</span>
                </div>
                <div className="dataBox">
                    <span>{props.data.country}</span>
                </div>
                <div className="dataBox">
                    <span>{moment(props.data.ship_date).format('L')}</span>
                </div>
                <div className="dataBox">
                    <span>{props.data.company_name}</span>
                </div>
                <div className="dataBox">
                    <span>{props.data.status}</span>
                </div>
                <div className="dataBox">
                    <span>{props.data.type}</span>
                </div>
                <div className="dataBox">
                    <button className="actionButton modify" onClick={() => setShow(!show)}>Modify</button>
                    <button className="actionButton delete" onClick={() => deleteRecord(props.data._id)}>Remove</button>
                </div>
            </div>
            {show && (
                <div className='rowBox1 gap24'>
                    <input className="inputBox" name="country" type="text" onChange={updateRecords} defaultValue={props.data.country} required />
                    <input className="inputBox" name="ship_date" type="date" onChange={updateRecords} defaultValue={props.data.ship_date} required />
                    <input className="inputBox" name="company_name" type="text" onChange={updateRecords} defaultValue={props.data.company_name} required />
                    <input className="inputBox" name="status" type="text" onChange={updateRecords} defaultValue={props.data.status} required />
                    <input className="inputBox" name="type" type="text" onChange={updateRecords} defaultValue={props.data.type} required />

                    <button className="actionButton" onClick={() => modifyRecord(props.data._id)} >
                        <span>Modify</span>
                    </button>
                    <button className="actionButton" onClick={() => setShow(!show)} >
                        <span>Close</span>
                    </button>
                </div>

            )}
        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(ListRecords);