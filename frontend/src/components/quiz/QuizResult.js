import {
  Container,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";


const QuestionResult = ({ result, index }) => {
  const question = result.apptitude;
  const userChoice = result.user_choice;
  const correctChoice = result.answer_position;
  const choices = question.choices.map((choice, index) => {
    const style = {
      borderRadius: "12px",
      backgroundColor: correctChoice === choice.position ? "green" : (userChoice === choice.position ? "red" : "white"),
      fontWeight: "bold",
      fontSize: "16px",
      maxWidth: "700px",
    };
    return (
      <ListGroupItem tag={"label"} key={index} style={style} className="my-2">
        <input type="radio" name="user_choice" value={choice.position} disabled/> {choice.choice}
      </ListGroupItem>
    );
  });
  const questionCheck = () => {
    if (result.answer) {
      return (
        <CardTitle tag={"h5"} className="my-4" style={{ fontWeight: "bold", color: "green" }}>
          Correct Answer
        </CardTitle>
      );
    }
    else {
      return (
        <CardTitle tag={"h5"} className="my-4" style={{ fontWeight: "bold", color: "red" }}>
          Wrong Answer
        </CardTitle>
      );
    }
  }
  return (
    <Card color="success" className="my-2" outline>
      <CardBody>
        <ListGroup>
          <ListGroupItem>
            <strong>Time Taken</strong>: {result.time_taken} seconds
          </ListGroupItem>
          <ListGroupItem>
            <strong>Correct Answer</strong>: {question.choices[correctChoice-1].choice}
          </ListGroupItem>
        </ListGroup>
        <h6 className="my-2" style={{fontWeight: "bolder", color:"blue"}}>Question {index+1}</h6>
        <CardTitle tag={"h5"} className="my-4" style={{ fontWeight: "bold" }}>
          {question.question}
        </CardTitle>
        <ListGroup>
          {choices}
        </ListGroup>
        {questionCheck()}
      </CardBody>
    </Card>
  );
};


const QuizResult = ({ results }) => {
  const questionResults = []
  const correct = results.filter((result) => result.answer).length;
  results.forEach((element, index) => {
    questionResults.push(<QuestionResult result={element} index={index} key={index}/>)
  });
  return (
    <div>
      <h3>Quiz Result</h3>
      <h4>Result: {correct}/{results.length} is correct !</h4>
      <Container>
        {questionResults}
      </Container>
    </div>
  );
}

export default QuizResult;