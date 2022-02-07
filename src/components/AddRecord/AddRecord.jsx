

import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const AddRecord = (props) => {

    const [record, setRecords] = useState({});

    const updateRecords = (e) => {
        setRecords({ ...record, [e.target.name]: e.target.value })
    }

    const newRecord = async () => {

        let body = {
            country: record.country,
            ship_date: moment(record.ship_date).format('L'),
            company_name: record.company_name,
            status: record.status,
            type: record.type,
            user_id: props.credentials.user?._id
        }

        try {
            await axios.post('https://dynamizaticbackend.herokuapp.com/record', body, { headers: { 'authorization': 'Bearer ' + props.credentials?.token } });

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="newRecordBox">
            <div className="rowBox1 gap24">
                <input className="inputBox" name="country" type="text" onChange={updateRecords} placeholder="Country" required />

                <input className="inputBox" name="ship_date" type="date" onChange={updateRecords} placeholder="Ship Date" required />

                <input className="inputBox" name="company_name" type="text" onChange={updateRecords} placeholder="Company" required />
                <input className="inputBox" name="status" type="text" onChange={updateRecords} placeholder="Status" required />
                <input className="inputBox" name="type" type="text" onChange={updateRecords} placeholder="Type" required />
                <button className="actionButton" id="newRecord" onClick={() => newRecord(1)} placeholder="Company">
                    <span>New</span>
                </button>
            </div>
        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(AddRecord);