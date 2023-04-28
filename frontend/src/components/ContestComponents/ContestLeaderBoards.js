import { 
    Container,
    Table,
 } from "reactstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchRequest from "../../requests";


const ContestLeaderBoardItem = ({ contestLeaderBoard }) => {
    return (
        <tr>
            <td>{contestLeaderBoard.rank}</td>
            <td>{contestLeaderBoard.user}</td>
            <td>{contestLeaderBoard.score}</td>
            <td>{contestLeaderBoard.time_taken}</td>
            <td>
                <Link to={`/contest/${contestLeaderBoard.contest}/results/${contestLeaderBoard.user}`}>
                    View Submission
                </Link>
            </td>
        </tr>
    );
};



const ContestLeaderBoards = ({contestId}) => {
    const [contestLeaderBoards, setContestLeaderBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const id  = contestId;
    const navigate = useNavigate();

    useEffect(() => {
        fetchRequest(`/api/contest-leaderboard/${id}`)
            .then((response) => {
                setContestLeaderBoards(response.data);
                setLoading(false);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                console.log(error.response);
            });

        return () => {
            setContestLeaderBoards([]);
            setLoading(true);
        }
    }, []);

    return (
        <Container className='my-4' color='secondary' style={{ fontSize: "12px" }}>
            <h2>Leaderboards</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Username</th>
                                <th>Score</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contestLeaderBoards.length == 0 ? (
                                contestLeaderBoards.map((contestLeaderBoard) => (
                                    <ContestLeaderBoardItem key={contestLeaderBoard.id} contestLeaderBoard={contestLeaderBoard} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No Leaderboards</td>
                                </tr>
                                )
                            }
                            {contestLeaderBoards.map((contestLeaderBoard) => (
                                <ContestLeaderBoardItem key={contestLeaderBoard.id} contestLeaderBoard={contestLeaderBoard} />
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
}

export default ContestLeaderBoards;