import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Container,
    Row,
    Col,
    ListGroupItem,
    ListGroup,
    Progress,
}
from 'reactstrap';
import { useNavigate } from "react-router-dom";
import QuizSubmission from "./QuizSubmission";


const Question = (props) => {
    const question = props.question;
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        setSelected(0);

        return () => {
            setSelected(0);
        }
    }, [props.q_num]);

    const handleSelect = (e) => {
        props.setCurrentSelected(parseInt(e.target.value));
        setSelected(parseInt(e.target.value));
    };

    const choices = question.choices.map((choice, index) => {
        const style = {
            borderRadius: "12px",
            backgroundColor: selected === choice.position ? "lightgreen" : "white",
            fontWeight: "bold", 
            fontSize: "16px"
        };
        return (
            <ListGroupItem tag={"label"} key={index} style={style} className="my-2">
                <input type="radio" name="user_choice" value={choice.position} onChange={handleSelect} /> {choice.choice}
            </ListGroupItem>
        );
    });
    console.log(question);
    return (
        <Card>
            <CardBody>
                <h4 className="my-2">Question {props.q_num}</h4>
                <CardTitle tag={"h5"} className="my-4" style={{fontWeight: "bold"}}>
                    {question.question}
                </CardTitle>
                <ListGroup>
                {choices}
                </ListGroup>
            </CardBody>
        </Card>
    );
};


const Quiz = (props) => {
    const questions = props.questions;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [maxTime, setMaxTime] = useState(questions[currentQuestion].difficulty * 60 * 0.75);
    const [currentSelected, setCurrentSelected] = useState(0);
    const [timeTaken, setTimeTaken] = useState(0);

    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        setCurrentSelected(0);
        setTimeTaken(0);
        setMaxTime(questions[currentQuestion].difficulty * 60 * 0.75);
        return () => {
            setCurrentSelected(0);
            setTimeTaken(0);
            setMaxTime(questions[currentQuestion].difficulty * 60 * 0.75);
        }

    }, [currentQuestion]);

    const time = () => {
        setTimeTaken(timeTaken + 1);
    };

    useEffect(() => {
        const timer = setInterval(time, 1000);
        if (timeTaken >= maxTime) {
            handleSubmit();
        }
        return () => clearInterval(timer);
    }, [timeTaken]);


    const handleSubmit = () => {
        const data = {
            "apptitude": questions[currentQuestion].id,
            "user_choice": currentSelected,
            "time_taken": "00:00:" + timeTaken
        }
        data[props.type] = props.id;

        if (currentQuestion + 1 < questions.length) {
            props.handleNext(data);
            setCurrentQuestion(currentQuestion + 1);
        } else {
            props.handleNext(data);
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <QuizSubmission type={props.type} typeId={props.id} />
        );
    }

    return (
        <Container style={{maxWidth: "1024px"}}>
            <p>{currentQuestion+1} out of {questions.length}</p>
            <Row>
                <Progress value={timeTaken} className="my-2" style={{height: "3px"}} max={maxTime} color="danger"/>
                <Col>
                    <Question question={questions[currentQuestion]} q_num={currentQuestion+1} setCurrentSelected={setCurrentSelected}/>
                    <Button color="success" className="my-2 float-end" onClick={handleSubmit}>Submit & Next</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Quiz;