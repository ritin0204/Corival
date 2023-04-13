import fetchRequest from "../../requests";
import Quiz from "../quiz/Quiz";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PracticeQuiz = () => {
    const [quizData, setQuizData] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        fetchRequest(`/api/practice/${id}/`, "get")
            .then((response) => {
                setQuizData(response.data);
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
        fetchRequest("/api/practice-submission/","post", data)
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
            <h2 className="my-2">Practice Quiz</h2>
            <Quiz 
                questions={quizData.questions}
                id={quizData.id}
                handleNext={handleSubmit}
                type={"practice"}
            />
        </div>
    );
};

export default PracticeQuiz;
