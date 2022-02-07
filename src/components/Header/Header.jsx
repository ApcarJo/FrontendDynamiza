import React from 'react';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button.jsx'


const Header = (props) => {

    let navigate = useNavigate();

    const logOut = () => {
        props.dispatch({ type: LOGOUT });
        navigate("/login")
    }

    return (
        <div className="headerComp">
            {!props.credentials.user?._id && <Button path="/login" destination="LOGIN" />}
            {!props.credentials.user?._id && <Button path="/register" destination="REGISTER" />}
            {props.credentials.user?._id && <div className="linkLogout" onClick={() => logOut()}>LOGOUT</div>}
        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(Header);