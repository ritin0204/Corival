import fetchRequest from "../../requests";
import Quiz from "../quiz/Quiz";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ContestQuiz = () => {
    const [quizData, setQuizData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchRequest(`/api/contests/${id}/`, "get")
            .then((response) => {
                setQuizData(response.data);
                if (response.data.status !== "ongoing") {
                    navigate(`/contest/${id}/`)
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
        
        return () => {
            setQuizData({});
            setLoading(true);
        }
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    
    const handleSubmit = (data) => {
        console.log(data)
        fetchRequest("/api/contest-submissions/","post", data)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        }
        );
    };


    return (
        <div>
            <h2 className="my-2">Contest Quiz</h2>
            <Quiz 
                questions={quizData.questions}
                id={quizData.id}
                handleNext={handleSubmit}
                type={"contest"}
            />
        </div>
    );
};

export default ContestQuiz;
