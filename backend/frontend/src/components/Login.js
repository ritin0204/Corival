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
import fetchRequest, { getCsrfToken } from "../requests";
import { useState } from 'react';


export default function Login() {
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
                if (response.status === 200) {
                    navigate('/');
                }
            })
            .catch(error => {
                document.getElementById('submission-alert').innerHTML = error.response.data.error;
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
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <h2 className="text-center">Login</h2>
                    <UncontrolledAlert id='submission-alert' color="danger" className='p-2 d-none'></UncontrolledAlert>
                    <Form className='my-2' id='login-form' onSubmit={(e) => { handleSubmit(e, "login", formData) }}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input bsSize='sm' type="text" name="username" id="username" placeholder="Username" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input bsSize='sm' type="password" name="password" id="password" placeholder="Password" onChange={handleChange} />
                        </FormGroup>
                        <Button color="primary" >Login</Button>
                    </Form>
                    New to the site? <Link to={'/register'}>Register</Link>
                </Col>
            </Row>
        </Container>
    );
}

export function Signup() {
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
                if (response.status === 200) {
                    navigate('/');
                }
            })
            .catch(error => {
                document.getElementById('submission-alert').innerHTML = error.response.data.error;
                document.getElementById('submission-alert').classList.remove('d-none');
            });
    }

    const handleChange = (event) => {
        console.log(event.target.name, event.target.value);
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <Container className='my-4'>
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <h2 className="text-center">Signup</h2>
                    <UncontrolledAlert id='submission-alert' color="danger" className='d-none' fade="true"></UncontrolledAlert>
                    <Form id='signUpForm' onSubmit={(e) => { handleSubmit(e, "register", formData) }}>
                        <FormGroup>
                            <Label htmlFor="name">First Name</Label>
                            <Input bsSize='sm' type="username" name="username" placeholder="Username" onChange={handleChange} />
                        </FormGroup>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="name">First Name</Label>
                                    <Input bsSize='sm' type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="name">Last Name</Label>
                                    <Input bsSize='sm' type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input bsSize='sm' type="email" name="email" id="email" placeholder="Email" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input bsSize='sm' type="password" name="password" id="password" placeholder="Password" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input bsSize='sm' type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="checkbox" name="purpose" onChange={handleChange} />
                            <label htmlFor='purpose'> Are You Hr?</label>
                        </FormGroup>
                        <Button size='sm' color="primary">Signup</Button>
                    </Form>
                    Alredy Have An Account? <Link to="/login">Login</Link>
                </Col>
            </Row>
        </Container>
    );
}