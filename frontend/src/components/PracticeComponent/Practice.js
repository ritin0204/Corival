import practices from './practice.json';
import {
    Container,
    Row,
    Col,
    CardDeck,
    Card,
    Button,
    Form,
    Input,
    CardBody,
    CardTitle,
    ListGroup,
    ListGroupItem,
    FormGroup,
}
    from 'reactstrap';


const CreatePractice = () => {
    return (
        <Card color="success" outline>
            <CardBody>
                <CardTitle>Create Practice</CardTitle>
                <Form>
                    <FormGroup>
                        <label>Category</label>
                        <Input bsSize="sm" className="mb-3" type="select">
                            <option value="All">All</option>
                            <option value="Profit and Loss">Profit and Loss</option>
                            <option value="Time and Work">Time and Work</option>
                            <option value="Time and Distance">Time and Distance</option>
                            <option value="Number System">Number System</option>
                            <option value="Average">Average</option>
                            <option value="Percentage">Percentage</option>
                            <option value="Ratio and Proportion">Ratio and Proportion</option>
                            <option value="Mensuration">Mensuration</option>
                            <option value="Simple Interest">Simple Interest</option>
                            <option value="Compound Interest">Compound Interest</option>
                            <option value="Algebra">Algebra</option>
                            <option value="Geometry">Geometry</option>
                            <option value="Trigonometry">Trigonometry</option>
                            <option value="Data Interpretation">Data Interpretation</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <label>Difficulty</label>
                        <Input bsSize="sm" className="mb-3" type="select">
                            <option value="1">Easy</option>
                            <option value="2">Medium</option>
                            <option value="3">Hard</option>
                        </Input>
                    </FormGroup>
                    <Button size='sm' className="float-end" color="success">Create Practice</Button>
                </Form>
            </CardBody>
        </Card >
    );
};


const PracticeItem = ({ practice
}) => {
    return (
        <Card color="primary" outline >
            <CardBody>
                <CardTitle>Practice Id: {practice.id}</CardTitle>
                <ListGroup >
                    <ListGroupItem>Category: {practice.category}</ListGroupItem>
                    <ListGroupItem>Difficulty: {practice.difficulty}</ListGroupItem>
                </ListGroup>
                <Button size='sm' className="my-2 float-end" color="primary">View Details</Button>
            </CardBody>
        </Card>
    );
};

const PracticeList = () => {
    return (
        <CardDeck>
            <h2>Practice List</h2>
            {practices.map((practice) => (
                <PracticeItem practice={practice} key={practice.id} />
            ))
            }
        </CardDeck>
    );
};

const PracticePage = () => {
    return (
        // There will be 6 types of view in practice page
        // 1. All completed Practices List
        // 2. Completed Practice Detail
        // 3. Pre Practice Page
        // 4. Quiz Page
        // 5. Practice submission Page
        // 6. Practice Result Page
        <Container className='my-4' color='secondary' style={{fontSize: "18px"}} outline>
            <Row>
                <Col md="6">
                    <PracticeList />
                </Col>
                <Col md="4">
                    <CreatePractice />
                </Col>
            </Row>
        </Container>
    );
};

export default PracticePage;