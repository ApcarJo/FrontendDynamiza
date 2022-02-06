import React from 'react';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.jsx'


const Header = (props) => {

    let navigate = useNavigate();

    const logOut = () => {
        props.dispatch({ type: LOGOUT });
        navigate("/")
    }

    return (
        <div className="header">
            <div className="headerUser">
                <Button path="/login" destination="LOGIN" />
                <Button path="/register" destination="REGISTER" />
                <div className="linkLogout" onClick={() => logOut()}>LOGOUT</div>
            </div>
        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(Header);