import { Link } from "react-router-dom";

const QuizSubmission = ({type, typeId}) => {
    return (
        <div>
            <h1>Thank You</h1>
            <Link to={`/${type}/${typeId}/results`}>See Results</Link>
        </div>
    );
};


export default QuizSubmission;
