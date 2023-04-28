import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card, CardBody,
    Row,
    Col,
    CardText
} from "reactstrap";


const CountDown = (props) => {
    const targetTime = new Date(props.time);
    const [currentTime, setCurrentTime] = useState(new Date());
    const goTo = props.redirectLink;
    const navigate = useNavigate();

    if (targetTime <= currentTime) {
        console.log("setting redirect true");
        navigate(`/${goTo}`);
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    return (
        <Card className="w-50 shadow bg-white rounded" outline>
            <CardBody>
                <Row>
                    <CardText tag="strong" className="text-center">Start In</CardText>
                    <Col>
                        <CardText tag="h1" className="my-2">
                            {Math.floor((targetTime - currentTime) / 1000 / 60 / 60 / 24)}
                        </CardText>
                        <CardText tag="h5" className="my-2">
                            Days
                        </CardText>
                    </Col>
                    <Col>
                        <CardText tag="h1" className="my-2">
                            {Math.floor((targetTime - currentTime) / 1000 / 60 / 60) % 24}
                        </CardText>
                        <CardText tag="h5" className="my-2">
                            Hours
                        </CardText>
                    </Col>
                    <Col>
                        <CardText tag="h1" className="my-2">
                            {Math.floor((targetTime - currentTime) / 1000 / 60) % 60}
                        </CardText>
                        <CardText tag="h5" className="my-2">
                            Minutes
                        </CardText>
                    </Col>
                    <Col>
                        <CardText tag="h1" className="my-2">
                            {Math.floor((targetTime - currentTime) / 1000) % 60}
                        </CardText>
                        <CardText tag="h5" className="my-2">
                            Seconds
                        </CardText>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );

};


export default CountDown;