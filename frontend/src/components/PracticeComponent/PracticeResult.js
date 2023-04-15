import QuizResult from "../quiz/QuizResult";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchRequest from "../../requests";


const PracticeResult = () => {
  const { id } = useParams();
  const [practiceDetails, setPracticeDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRequest(`/api/practice/${id}/`)
      .then((response) => {
        setPracticeDetails(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

      // return () => {
      //     setPracticeDetails({});
      // }
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
        <h1>Practice {practiceDetails.id} Result</h1>
        <h2>Score : {practiceDetails.score}%</h2>
        <QuizResult results={practiceDetails['results']}/>
    </div>
  );
}

export default PracticeResult;