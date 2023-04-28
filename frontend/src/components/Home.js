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
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../requests';
import Logout from './AuthComponents/Logout';


const RecruiterSections = () => {
    return (
        <div>
            <Card className="my-2" color="primary" outline>
                <CardBody>
                    <CardTitle tag="h5">Compete</CardTitle>
                    <CardText>
                        Compete with your friends to see who can get the most points.
                    </CardText>
                    <Link to={'/contests'} >
                        <Button size="sm" color="primary">Compete</Button>
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
}

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
                <Card className="my-4 mx-8" color="secondary" outline>
                    <CardBody className='card-text'>
                        <CardTitle tag="h1" className='text-success'>Welcome {user.username}!</CardTitle>
                        <CardText>
                            {user.description}
                        </CardText>
                        <Link to={'/profile'} state={user}>
                            <Button size="sm" color="primary">View Profile</Button>
                        </Link>
                        <Logout className="float-right my-2 mx-2" />
                    </CardBody>
                </Card>
                {user.is_recruiter ? <RecruiterSections user={user} /> : <Sections user={user} />}
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
    return (
        <div>
            <Card className="my-2" color="primary" outline>
                <CardBody>
                    <CardTitle tag="h5">Compete</CardTitle>
                    <CardText>
                        Compete with your friends to see who can get the most points.
                    </CardText>
                    <Link to={'/contests'}>
                        <Button size="sm" color="primary">Compete</Button>
                    </Link>
                </CardBody>
            </Card>
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
        </div>
    );
}


const Intro = () => {
    return (
        <Container>
            <Row>
                <Col sm="6">
                    <Card className="my-2" color="secondary" outline>
                        <CardBody>
                            <CardText>
                                You are here for...
                            </CardText>
                            <CardTitle tag="h5">Prepare</CardTitle>
                            <CardText>
                                Compete with your friends to see who can get the most points.
                            </CardText>
                            <Link to={'/candidates/register'}>
                                <Button size="sm" color="primary">Register Here</Button>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card className="my-2" color="secondary" outline>
                        <CardBody>
                            <CardText>
                                You are here for...
                            </CardText>
                            <CardTitle tag="h5">Hiring</CardTitle>
                            <CardText>
                                Hire the best candidates with our aptitude tests.
                            </CardText>
                            <Link to={'/recruiters/register'}>
                                <Button size="sm" color="primary">Register Here</Button>
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Card className="my-2" color="secondary" outline>
                <CardBody>
                    <CardText className='text-center'>
                        Alredy have an account? <Link to={'/login'}>
                            Login Here
                        </Link>.
                    </CardText>
                </CardBody>
            </Card>
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
                </CardBody>
            </Card>
        </Container>
    );
}
export default Home;