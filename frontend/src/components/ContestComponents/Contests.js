import React, { useState, useEffect } from "react";
import fetchRequest from "../../requests";
import { Link } from "react-router-dom";

import {
    Container,
    Card,
    CardBody,
    CardTitle,
    ListGroup,
    ListGroupItem,
    Button,
    Table
} from "reactstrap";
import { formatTimestamp } from "../../utils";


const ContestItem = ({ contest
}) => {
    return (
        <tr>
            <td>{contest.title}</td>
            <td>{formatTimestamp(contest.start_time)}</td>
            <td>{formatTimestamp(contest.end_time)}</td>
            <td>{contest.difficulty=== 1 ? "Easy": (
                contest.difficulty=== 2 ? "Medium": "Hard"
            )}</td>
            <td>
                <Link to={`/contest/${contest.id}`}>
                    <Button size='sm' className="my-2 float-end" color="primary">View</Button>
                </Link>
            </td>
        </tr>
    );
};


const Contests = () => {
    const [upcomingContests, setUpcomingContests] = useState([]);
    const [pastContests, setPastContests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequest("/api/contests/")
            .then((response) => {
                setUpcomingContests(response.data.upcoming);
                setPastContests(response.data.previous);
                setLoading(false);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                console.log(error.response);
            });


        return () => {
            setPastContests([]);
            setUpcomingContests([]);
            setLoading(true);
        }
    }, []);

    return (
        <Container className='my-4' color='secondary' style={{ fontSize: "18px" }}>
            <h2>Contests</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Container className="my-4">
                        <h3>Upcoming Contests</h3>

                        {upcomingContests.length == 0 ? (
                            <Card color="secondary" className='my-4' outline>
                                <CardBody>
                                    <CardTitle>No Upcoming Contests</CardTitle>
                                </CardBody>
                            </Card>
                        ) : (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Contest Name</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Difficulty</th>
                                        <th>View Contest</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingContests.map((contest) => (
                                    <ContestItem key={contest.id} contest={contest} />
                                    ))}
                                </tbody>
                            </Table>
                        )
                        }
                    </Container>

                    <Container className="my-4">
                        <h3>Past Contests</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Contest Name</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Difficulty</th>
                                    <th>View Contest</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastContests.map((contest) => (
                                    <ContestItem key={contest.id} contest={contest} />
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </div>
            )}
        </Container>
    );
};


export default Contests;