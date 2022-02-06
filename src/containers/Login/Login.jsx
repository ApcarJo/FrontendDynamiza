
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Link from '../../components/Link/Link'
import axios from 'axios';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';

const Login = (props) => {

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [msgError, setMensajeError] = useState({ eEmail: '', ePassword: '', eValidate: '' });

    const updateCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (props.credentials.user?._id) {
            navigate('/record');
        }
    }, []);

    useEffect(() => {
    });

    const checkError = async (arg) => {

        switch (arg) {

            case 'email':

                if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email)) {
                    setMensajeError({ ...msgError, eEmail: "Please, enter your email" });
                } else {
                    setMensajeError({ ...msgError, eEmail: "" });
                }
                break;

            case 'password':

                if (credentials.password.length < 1) {
                    setMensajeError({ ...msgError, ePassword: "Please, enter your password" });
                } else {
                    setMensajeError({ ...msgError, ePassword: "" });
                }
                break;

            default:
                break;
        }
    }

    const logeame = async () => {
        try {
            let body = {
                email: credentials.email,
                password: credentials.password
            }
            let res = await axios.post(`https://dynamizaticbackend.herokuapp.com/login`, body);

            props.dispatch({ type: LOGIN, payload: res.data });

            setTimeout(() => {
                navigate('/record');
            }, 250);

        } catch {
            setMensajeError({ ...msgError, eValidate: 'Wrong email or password' });
        }
    }

    return (
        <div className="vistaLogin">
            <div className="actionCard center column">
                <span className="priceQuantity">LOGIN</span>
                <input className="loginBox" name="email" type="text" onChange={updateCredentials} onBlur={() => checkError("mail")} placeholder="email" required />
                <div className="errorsText">{msgError.eEmail}</div>

                <input className="loginBox" name="password" type="password" onChange={updateCredentials} onBlur={() => checkError("password")} placeholder="password" required />
                <div className="errorsText">{msgError.ePassword}</div>
                <br></br>
                <div className="actionButtons df row">
                    <div className="sendButton center" onClick={() => logeame()}>Sign in</div>
                    <div className="sendButton" onClick={() => navigate(`/register`)}>Register now!</div>
                </div>
                <div>{msgError.eValidate}</div>
            </div>
        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(Login);