import fetchRequest from "../../requests";
import Quiz from "./Quiz";
import quizData from "./quiz.json"

const PracticeQuiz = () => {
    const handleSubmit = (data) => {
        fetchRequest("POST", "/api/practice-submission/", data)
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
            />
        </div>
    );
};

export default PracticeQuiz;
