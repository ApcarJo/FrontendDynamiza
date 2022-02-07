
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const ListRecords = (props) => {

    const deleteRecord = async (id) => {

        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWZmODZjODZmYTI2YzBjZDhkMjViNzMiLCJjcmVhdGVkQXQiOiIyMDIyLTAyLTA3VDAyOjEzOjEzLjM2NFoiLCJpYXQiOjE2NDQxOTk5OTN9.44gQcyjUJNC4333sPAx3kwrCtqaQMEIhnzNRPPz1Xl8";

        let body = {
            order_id: id,
            user_id: props.credentials.user._id
        };

        try {
            await axios.delete(`https://dynamizaticbackend.herokuapp.com/record`, { data: body, headers: { 'authorization': 'Bearer ' + token } });
        } catch (e) {
            console.log(e);
        }
    }

    return (
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
                <button className="actionButton modify">Modify</button>
                <button className="actionButton delete" onClick={() => deleteRecord(props.data._id)}>Remove</button>
            </div>
        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(ListRecords);