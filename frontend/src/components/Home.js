import { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Button,
    CardText,
    Container
} from 'reactstrap';
import { Link, useNavigate} from 'react-router-dom';
import fetchRequest, { getCurrentUser, setCurrentUser } from '../requests';


const Home = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        let response = getCurrentUser();
        response.then((data) => {
            setUser(data);
        });
    }, []);
    if (user) {
        return (
            <Container className='home'>
                <Sections user={user} />
            </Container>
        );
    }
    return (
        <Container className='home'>
            <Intro />
        </Container>
    );
}


const Sections = (props) => {
    const navigate = useNavigate();
    const logOut = () => {
        fetchRequest('/logout', 'post')
        .then(response => {
            setCurrentUser(null);
            navigate('/');
        })
        .catch(error => {
            console.log(error);
        });
    }


    return (
        <div>
            <Card className="my-4 mx-8" color="secondary" outline>
                <Button size='sm' color="secondary" className="float-right my-2 mx-2" style={{width:100}} onClick={logOut}>Logout</Button>
                <CardBody className='card-text'>
                    <CardTitle tag="h1" className='text-success'>Welcome {props.user.username}!</CardTitle>
                    <CardText>
                        {props.user.bio}
                    </CardText>
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
                            <Link to={'/compete'}>
                                <Button size="sm" color="primary">Compete</Button>
                            </Link>
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
                            <Link to={'/practice'}>
                                <Button size="sm" color="primary">Practice</Button>
                            </Link>
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
                            <Link to={'/challenge'}>
                                <Button size="sm" color="primary">Challenge</Button>
                            </Link>
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
                            <Link to={'/learn'}>
                                <Button size="sm" color="primary">Learn</Button>
                            </Link>
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