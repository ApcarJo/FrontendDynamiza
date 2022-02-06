
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';

const Record = (props) => {

    let navigate = useNavigate();

    const [records, setRecords] = useState({});

    const updateRecordss = (e) => {
        setRecords({ ...records, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getRecords(1, 10);
    }, []);

    useEffect(() => {
    });


    const getRecords = async (page, limit, res) => {
        try {
            let body = {
                page: page,
                limit: limit,
                user_id: props.credentials.user?._id
            }
            let res = await axios.get(`https://dynamizaticbackend.herokuapp.com/records`, body);
            console.log(res);

            props.dispatch({ type: LOGIN, payload: res.data });

            setTimeout(() => {
                navigate('/record');
            }, 250);

        } catch (e) {
            console.log(e);
        };
    }


    return (
        <div className="vistaLogin">
            Hola soy vista Records
        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(Record);