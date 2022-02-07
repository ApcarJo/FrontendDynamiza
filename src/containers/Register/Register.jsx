
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    let navigate = useNavigate();

    const [datosUser, setDatosUser] = useState({
        email: '',
        password: '',
        password2: '',
    });

    const [errors, setErrors] = useState({
        eEmail: '',
        ePassword: '',
        ePassword2: '',
    });

    const updateFormulario = (e) => {
        setDatosUser({ ...datosUser, [e.target.name]: e.target.value })
    }

    const applyRegister = async () => {
        let body = {
            email: datosUser.email,
            password: datosUser.password
        }

        if (datosUser.password === datosUser.password2) {
            try {
                await axios.post('https://dynamizaticbackend.herokuapp.com/user', body);
            } catch (e) {
                console.log(e);
            }

            setTimeout(() => {
                navigate(`/login`);
            }, 750);
        }
    }

    const checkError = (arg) => {
        switch (arg) {
            case 'email':
                if (! /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(datosUser.email)) {
                    setErrors({ ...errors, eEmail: 'Introduce un email válido' });
                } else {
                    setErrors({ ...errors, eEmail: '' });
                }

                break;

            case 'password':
                if (! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(datosUser.password)) {
                    setErrors({ ...errors, ePassword: 'At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters' });
                } else {
                    setErrors({ ...errors, ePassword: '' });
                }
                break;

            case 'password2':
                if (datosUser.password !== datosUser.password2) {
                    setErrors({ ...errors, ePassword2: 'Password should be the same' });
                } else {
                    setErrors({ ...errors, ePassword2: '' });
                }
                break;

            default:
                break;
        }
    }

    return (
        <div className="vistaRegister">
            <div className="actionCard center column">
                <span>REGISTER</span>
                <div>
                    <input className="inputBox" name="email" type="text" onChange={updateFormulario} onBlur={() => checkError("email")} placeholder="Email" required />
                    <span className="errorsText">{errors.eEmail}</span>

                    <input className="inputBox" name="password" type="password" onChange={updateFormulario} onBlur={() => checkError("password")} placeholder="Password" required />
                    <span className="errorsText">{errors.ePassword}</span>

                    <input className="inputBox" name="password2" type="password" onChange={updateFormulario} onBlur={() => checkError("password2")} placeholder="Repeat Password" required />
                    <span className="errorsText">{errors.ePassword2}</span>
                </div>

                <div className="sendButton center" onClick={() => applyRegister()}>Register</div>
                <div className="sendButton center" onClick={() => navigate(-1)}>back</div>
            </div>
        </div>
    )
}

export default Register;