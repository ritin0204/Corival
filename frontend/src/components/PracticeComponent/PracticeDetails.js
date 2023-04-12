import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from "reactstrap";
import fetchRequest from "../../requests";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const PracticeDetails = () => {
    const { id } = useParams();
    const [practice, setPractice] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRequest(`/api/practice/${id}/`, "get")
            .then((response) => {
                setPractice(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                navigate("/404");
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Card color="primary" className='my-2' outline>
            <CardBody>
                <CardTitle>Practice Id: {practice.id}</CardTitle>
                <ListGroup >
                    <ListGroupItem>Category: {practice.category}</ListGroupItem>
                    <ListGroupItem>Difficulty: {practice.difficulty}</ListGroupItem>
                    <ListGroupItem>
                        Questions:
                        <ListGroup>
                            {practice.questions.map((question) => (
                                <ListGroupItem key={question.id}>{question.question}</ListGroupItem>
                            ))}
                        </ListGroup>
                    </ListGroupItem>
                    <ListGroupItem> Start: {practice.start_time}</ListGroupItem>
                    <ListGroupItem> End: {practice.end_time}</ListGroupItem>
                    <ListGroupItem>Score : {practice.score}</ListGroupItem>
                </ListGroup>
            </CardBody>
        </Card>
    );
}

export default PracticeDetails;
