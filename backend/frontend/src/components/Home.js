import fetchRequest from '../requests';
import { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Button,
    CardText,
    Container,
    CardLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';


const Home = () => {
    const [username, setUsername] = useState("");
    useEffect(() => {
        fetchRequest('/')
            .then((response) => {
                setUsername((response.data === {} ? "" : response.data.username));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <Container className='home'>
            {(username ? <Sections username={username}/> : <Intro />)}
        </Container>
    );
}


const Sections = (args) => {
    return (
        <div>
            <Card className="my-4 mx-8" color="secondary" outline>
                <CardBody className='card-text'>
                    <CardTitle tag="h1" className='text-success'>Welcome {args.username}!</CardTitle>
                </CardBody>
            </Card>
            <Row>
                <Col sm="6">
                    <Card className="my-2" color="primary" outline>
                        <CardBody>
                            <CardTitle tag="h5">Compete</CardTitle>
                            <CardText>
                                Compete with your friends to see who can get the most points.
                            </CardText>
                            <CardLink href='/compete'>
                                <Button size="sm" color="primary">Compete</Button>
                            </CardLink>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card className="my-2" color="primary" outline>
                        <CardBody>
                            <CardTitle tag="h5">Practice</CardTitle>
                            <CardText>
                                Practice your skills with our practice mode.
                            </CardText>
                            <CardLink href='/practice'>
                                <Button size="sm" color="primary">Practice</Button>
                            </CardLink>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <Card className="my-2" color="primary" outline>
                        <CardBody>
                            <CardTitle tag="h5">Challenge</CardTitle>
                            <CardText>
                                Challenge your friends to a game of chess.
                            </CardText>
                            <CardLink href='/challenge'>
                                <Button size="sm" color="primary">Challenge</Button>
                            </CardLink>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card className="my-2" color="primary" outline>
                        <CardBody>
                            <CardTitle tag="h5">Learn</CardTitle>
                            <CardText>
                                Learn concepts and techniques with our tutorial.
                            </CardText>
                            <CardLink href='/learn'>
                                <Button size="sm" color="primary">Learn</Button>
                            </CardLink>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}


const Intro = () => {
    return (
        <Card className="my-4 mx-8" color="secondary" outline>
            <CardBody className='card-text'>
                <CardTitle tag="h1" className='text-success'>Welcome to Corival!</CardTitle>
                <CardText>
                    Looking for a fun and engaging way to practice your aptitude skills and challenge your friends? You've come to the right place!
                </CardText>
                <CardText>
                    Our competitions and challenges cover a wide range of topics, from math and logic puzzles to language and comprehension exercises. Each challenge is carefully designed to test your skills and push you to your limits, while also being fun and engaging.
                </CardText>
                <CardText>
                    At Corival, we offer a variety of competitions and challenges designed to help you improve your aptitude skills and have fun at the same time. Whether you're a student preparing for an exam, a job seeker looking to impress potential employers, or just someone who enjoys a good challenge, we've got something for you.
                </CardText>
                <CardText>
                    But that's not all - we also offer the ability to challenge your friends and see how you stack up against them. Simply invite them to join you on Corival, choose a challenge, and see who comes out on top. It's a great way to stay motivated and keep improving your skills.
                </CardText>
                <CardText>
                    So what are you waiting for? <Link to={'/register'}>Register</Link> for Corival today and start practicing your aptitude skills in a fun and challenging way. We can't wait to see what you can do!
                    <br></br>Alredy have an account? <Link to={'/login'}>Login Here</Link>.
                </CardText>
            </CardBody>
        </Card>
    );
}
export default Home;