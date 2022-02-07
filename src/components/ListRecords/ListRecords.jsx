
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ListRecords = (props) => {

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
                <button className="actionButton delete">Remove</button>
            </div>
        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(ListRecords);