import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../requests';
import Intro from './Intro';


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
            <>
                {user && user.is_recruiter ? <RecruiterSections /> : <Dashboard user={user} />}
            </>
        );
    }
    return (
        <Intro />
    );
}


const Dashboard = (props) => {
    return (
       <div className='dashboard-div'>
        <h1>My Dashboard</h1>
        <p>
            This is the dashboard of {props.user.username}
        </p>
       </div>
    );
}

export default Home;