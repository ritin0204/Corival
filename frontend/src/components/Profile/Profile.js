import Logout from '../AuthComponents/Logout';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button,
    Container,
    ListGroup,
    ListGroupItem,
    Badge
} from 'reactstrap';
import { formatTimestamp } from '../../utils';
import Error from "../UtilsComponents/Error"


const CandidateProfile = (props) => {
    const user = props.user;
    return (
        <>
            <CardText className='my-2'>
                Scores:
            </CardText>
            <ListGroup>
                <ListGroupItem>
                    Mathematics: {user.mathematics}
                </ListGroupItem>
            </ListGroup>
        </>
    );
};

const RecruiterProfile = (props) => {
    const user = props.user;
    return (
        <>
            <CardText className='my-2'>
                About:
            </CardText>
            <ListGroup>
                <ListGroupItem>
                    Company: {user.company} <Badge color="success" pill> <i className="fa fa-check"></i> </Badge>
                </ListGroupItem>
                <ListGroupItem>
                    Position: {user.position}
                </ListGroupItem>
            </ListGroup>
        </>
    );
};


const Profile = () => {
    const location = useLocation();
    const [user, setUser] = useState(location.state);

    if (user === null) {
        return (
            <Error status_code="401" message="Unauthorized!"/>
        )
    }
    return (
        <Container className='profile'>
            <Card className="my-4 mx-8" color="secondary" outline>
                <CardBody className='card-text'>
                    <CardTitle tag="h1" className='text-success'>Welcome!</CardTitle>
                    <CardTitle tag="h2">{user.first_name + " " + user.last_name}</CardTitle>
                    <ListGroup>
                        <ListGroupItem>
                            email: {user.email}
                        </ListGroupItem>
                        <ListGroupItem>
                            username: {user.username}
                        </ListGroupItem>
                        <ListGroupItem>
                            Mobile: {user.phone}
                        </ListGroupItem>
                        <ListGroupItem>
                            Date Joined: {formatTimestamp(user.date_joined)}
                        </ListGroupItem>
                        <ListGroupItem>
                            Last Seen: {formatTimestamp(user.last_login)}
                        </ListGroupItem>
                    </ListGroup>
                    {user.is_candidate ? <CandidateProfile user={user} /> : <RecruiterProfile user={user}/>}
                    <Button size="sm" color="primary" className="my-2 mx-2">Edit Profile</Button>
                    <Logout />
                </CardBody>
            </Card>
            <Button size="sm" color="danger">Delete Profile</Button>
        </Container>
    );
};


export default Profile;