import Contests from "./Contests";
import CreateContest from "./CreateContest";
import { Container, Row } from "reactstrap";
import { useState } from "react";
import { getCurrentUser } from "../../requests";
import { useNavigate } from "react-router-dom";


const ContestPage = () => {
    const [redirect, setRedirect] = useState(false);
    const [contestId, setContestId] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    getCurrentUser().then((response) => {
        setUser(response);
    });

    if (redirect) {
        navigate(`/contest/${contestId}`);
    }
    return (
        <div>
            <Container className='my-4' color='secondary' style={{ fontSize: "18px" }}>
                {user && user.is_recruiter ?
                (
                    <Row>
                        <CreateContest setRedirect={setRedirect} setContestId={setContestId} />
                    </Row>
                ):(
                    <div></div>
                ) }
                <Row>
                    <Contests />
                </Row>
            </Container>
        </div>
    );
};


export default ContestPage;
