
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import ListRecords from '../../components/ListRecords/ListRecords';
import AddRecord from '../../components/AddRecord/AddRecord';

const Record = (props) => {

    let navigate = useNavigate();

    const [records, setRecords] = useState({});

    const updateRecords = (e) => {
        setRecords({ ...records, [e.target.name]: e.target.value })
    }

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        next: '',
        prev: '',
        count: '',
        res: ''
    });

    useEffect(() => {
        getRecords();
    }, []);

    const colAt = ['Order Id', 'Country', 'Ship Date', 'Company', 'Status', 'Type', 'Actions']

    const getRecords = async () => {
        try {
            let res = await axios.get(`https://dynamizaticbackend.herokuapp.com/record/get?page=${pagination.page}&limit=${pagination.limit}`);
            setRecords({ ...records, listRecords: res.data.results });
            setPagination({...pagination, prev: res.data.previous?.page, next: res.data.next?.page, count: res.data.coun})
            pagination.res = Math.floor(res.data.count / res.data.next?.limit);
        } catch (e) {
            console.log(e);
        };
    }

    const nextPage = (page) => {
        pagination.page = page;
        getRecords();
    }
    return (
        <div className="vistaRecord">
            <div className="tableRecords">
                <AddRecord newDoc={() => getRecords()} />
                <div className="rowBox">
                    {colAt.map((col, index) => (
                        <div key={index} className="dataBox textCap">{col}</div>
                    ))}
                </div>
                {records.listRecords?.map((a, index) => (
                    <div key={index}>
                        <ListRecords data={a} deleteDoc={() => getRecords()} />
                    </div>
                ))}
                <div>
                    {pagination.prev && (<button onClick={()=>nextPage(pagination.prev)}>{pagination.prev}</button>)}
                    {pagination.page && (<button>{pagination.page}</button>)}
                    {pagination.next && (<button onClick={()=>nextPage(pagination.next)}>{pagination.next}</button>)}
                </div>
            </div>
        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(Record);