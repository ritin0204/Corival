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
    UncontrolledAlert,
}
    from 'reactstrap';
import { useEffect, useState } from 'react';
import { getCsrfToken, fetchRequest } from '../../requests';
import CountDown from '../UtilsComponents/CountDown';
import { Link } from 'react-router-dom';

const CreatePractice = ({setPracticeId, setRedirect}) => {

    const [formData, setFormData] = useState({
        category: "All",
        difficulty: 1,
    });

    function handleSubmit(event, path, formData) {
        event.preventDefault();
        let data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }
        fetchRequest(`/${path}`, 'post', data)
        .then(response => {
            if (response.status === 201) {
                setRedirect(true);
                setPracticeId(response.data.id);
            }
        })
        .catch(error => {
            document.getElementById('submission-alert').innerHTML = error.response.data.detail;
            document.getElementById('submission-alert').classList.remove('d-none');
        });
    }

    
    const handleChange = (event) => {
        setFormData((formData) => ({
            ...formData,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <Card color="success" outline>
            <CardBody>
                <CardTitle>Create Practice</CardTitle>
                <UncontrolledAlert id='submission-alert' color="danger" className='p-2 d-none'></UncontrolledAlert>
                <Form onSubmit={(e) => { handleSubmit(e, "api/practice/", formData) }}>
                    <FormGroup>
                        <label>Category</label>
                        <Input bsSize="sm" className="mb-3" name="category" type="select"  onChange={handleChange}>
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
                        <Input bsSize="sm" className="mb-3" name='difficulty' onChange={handleChange} type="select">
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
        <Card color="primary" className='my-2' outline>
            <CardBody>
                <CardTitle>Practice Id: {practice.id}</CardTitle>
                <ListGroup >
                    <ListGroupItem>Category: {practice.category}</ListGroupItem>
                    <ListGroupItem>Difficulty: {practice.difficulty}</ListGroupItem>
                </ListGroup>
                <Link to={`/practice/${practice.id}/`}>
                    <Button size='sm' className="my-2 float-end" color="primary">View Details</Button>
                </Link>
            </CardBody>
        </Card>
    );
};

const PracticeList = () => {
    const [practices, setPractices] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchRequest('/api/practice/', 'get')
        .then(response => {
            setPractices(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        });

        return () => {
            setPractices([]);
            setLoading(true);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
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
    const [redirect, setRedirect] = useState(false);
    const [practiceId, setPracticeId] = useState(0);
    console.log(practiceId);
    if (redirect) {
        return <CountDown time={10} redirectLink={`practice/quiz/${practiceId}`}/>
    }
    return (
        <Container className='my-4' color='secondary' style={{fontSize: "18px"}}>
            <Row>
                <Col md="6">
                    <PracticeList />
                </Col>
                <Col md="4">
                    <CreatePractice setRedirect={setRedirect} setPracticeId={setPracticeId}/>
                </Col>
            </Row>
        </Container>
    );
};

export default PracticePage;