import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button, Container, CardText } from 'reactstrap';
import fetchRequest from '../../requests';
import { useEffect, useState } from 'react';
import { formatTimestamp } from '../../utils';
import ContestLeaderBoards from './ContestLeaderBoards';
import CountDown from '../UtilsComponents/CountDown';


const ContestDetails = () => {
    const { id } = useParams();
    const [contest, setContest] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRequest(`/api/contests/${id}/`)
            .then((response) => {
                setContest(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                navigate('/contests');
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className='my-4' color='secondary'>
            <Card color="primary" className='my-2' outline>
                <CardBody>
                    <CardTitle tag={'h2'}>Title:  {contest.title.substring(0, 1).toUpperCase() + contest.title.substring(1,)}</CardTitle>
                    <CardText tag={"p"} style={{ fontSize: "1.3rem" }}>Description: {contest.description}</CardText>
                    <ListGroup >
                        <ListGroupItem>Category: {contest.category}</ListGroupItem>
                        <ListGroupItem>Difficulty: {contest.difficulty === 1 ? "Easy" : (
                            contest.difficulty === 2 ? "Medium" : "Hard"
                        )}</ListGroupItem>
                        <ListGroupItem> Start: {formatTimestamp(contest.start_time)}</ListGroupItem>
                        <ListGroupItem> End: {formatTimestamp(contest.end_time)}</ListGroupItem>
                    </ListGroup>
                </CardBody>
            </Card>

            {contest.status === "previous" ? (
                <ContestLeaderBoards contestId={id} />
            ) : (
                (contest.status === "ongoing") ? (
                    <Link to={`/contest/${id}/quiz/`}>
                        <Button size='sm' className="my-2 float-end" color="primary">Start Contest</Button>
                    </Link>
                ):(
                    <CountDown time={contest.start_time} redirectLink={`contest/${id}/quiz`}/>
                )
            )}
        </Container>
    );
}


export default ContestDetails;