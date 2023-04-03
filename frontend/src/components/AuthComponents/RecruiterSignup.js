import { Link, useNavigate } from 'react-router-dom';
import {
    Label,
    Input,
    Button,
    Form,
    FormGroup,
    Container,
    Row,
    Col,
    UncontrolledAlert,
} from 'reactstrap';
import fetchRequest, { getCsrfToken } from "../../requests";
import { useState } from 'react';
import UserForm from './UserForm';


export const RecruiterSignup = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    function handleSubmit(event, path, formData) {
        event.preventDefault();
        let data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }
        data.append('csrfmiddlewaretoken', getCsrfToken());
        fetchRequest(`/${path}`, 'post', data)
            .then(response => {
                if (response.status === 201) {
                    navigate('/');
                }
            })
            .catch(error => {
                document.getElementById('submission-alert').innerHTML = error.response.statusText;
                document.getElementById('submission-alert').classList.remove('d-none');
            });
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <Container className='my-4'>
            <Row>
                <Col>
                    <h2 className="text-center">Signup</h2>
                    <UncontrolledAlert id='submission-alert' color="danger" className='d-none'></UncontrolledAlert>
                    <Form id='signUpForm' onSubmit={(e) => { handleSubmit(e, "api/recruiters/", formData) }}>
                        <UserForm handleChange={handleChange} />
                        <Container>
                            <FormGroup className='my-2'>
                                <Label for="description">
                                    Company Name
                                </Label>
                                <Input
                                    id="company"
                                    name="company"
                                    type="text"
                                    bsSize='sm'
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">
                                    Current Role
                                </Label>
                                <Input
                                    id="position"
                                    name="position"
                                    placeholder="Current Position"
                                    type="text"
                                    bsSize='sm'
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <Button size='sm' className='float-end' color="primary">Signup</Button>
                        </Container>
                    </Form>
                    <p className="text-center">
                        Alredy Have An Account? <Link to="/login">Login</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};


export default RecruiterSignup;