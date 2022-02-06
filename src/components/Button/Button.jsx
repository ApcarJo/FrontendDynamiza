
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = (props) => {

    let navigate = useNavigate();

    const go = () => {
        navigate(props.path)
    }

    return (
        <div className="button" onClick={() => go()}>
            {props.destination}
        </div>
    )

}

export default Button;