
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import ListRecords from '../../components/ListRecords/ListRecords';
import AddRecord from '../../components/AddRecord/AddRecord';

const Record = (props) => {

    let navigate = useNavigate();

    const [records, setRecords] = useState({});

    const updateRecordss = (e) => {
        setRecords({ ...records, [e.target.name]: e.target.value })
    }

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 65,
    });

    useEffect(() => {
        getRecords();
    }, []);

    useEffect(() => {

    });

    const colAt = ['Order Id', 'Country', 'Ship Date', 'Company', 'Status', 'Type', 'Actions']


    const getRecords = async () => {
        try {
            // let res = await axios.get(`https://dynamizaticbackend.herokuapp.com/record/get?page=${pagination.page}&limit=${pagination.limit}`);
            let res = await axios.get(`http://localhost:3006/record/get?page=${pagination.page}&limit=${pagination.limit}`);
            setRecords({ ...records, listRecords: res.data.results });

        } catch (e) {
            console.log(e);
        };
    }
    return (
        <div className="vistaRecord">
            <div className="tableRecords">
                <AddRecord onChange={()=>getRecords()}/>
                <div className="rowBox">
                    {colAt.map((col, index) => (
                        <div key={index} className="dataBox textCap">{col}</div>
                    ))}
                </div>
                {records.listRecords?.map((a, index) => (
                    <div key={index}>
                        <ListRecords data={a} />
                    </div>))}
            </div>
        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(Record);