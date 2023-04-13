import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const CountDown = (props) => {
    const time = props.time;
    const goTo = props.redirectLink;
    const [countDown, setCountDown] = useState(time);
    const navigate = useNavigate();
    
    useEffect(() => {
        const interval = setInterval(() => {
        setCountDown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (countDown === 0) {
            navigate("/"+goTo);
        }
    }, [countDown, navigate]);

    return (
        <div>
            <h1>Redirecting in {countDown} seconds</h1>
        </div>
    );
    
};


export default CountDown;