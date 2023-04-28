import QuizResult from "../quiz/QuizResult";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchRequest from "../../requests";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";


const ContestResult = () => {
  const { id, user } = useParams();
  const [contestResult, setContestResult] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequest(`/api/contest-leaderboard/${id}/user/${user}/`)
      .then((response) => {
        setContestResult(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/404")
      });
    return () => {
        setContestResult({});
        setIsLoading(true);
    }
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
        <h2>Contest Result</h2>
        <Card className="my-2"color="primary" outline>
            <CardBody>
                <CardTitle tag="h5">Contest: {contestResult.contest}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">User: {contestResult.user}</CardSubtitle>
                <CardText>Score: {contestResult.score}</CardText>
                <CardText>Time Taken: {contestResult.time_taken}</CardText>
            </CardBody>
        </Card>
        <QuizResult results={contestResult["results"]} />
    </div>
  );
}

export default ContestResult;