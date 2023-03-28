import { Link } from 'react-router-dom';
import { 
    Label,
    Input,
    Button,
    Form,
    FormGroup,
    Container,
    Row,
    Col
} from 'reactstrap';
import fetchRequest, {getCsrfToken} from "../requests";
import { useState } from 'react';

function handleSubmit(event, path, formData) {
    event.preventDefault();
    let data = new FormData();
    for (let key in formData) {
        data.append(key, formData[key]);
    }
    data.append('csrfmiddlewaretoken', getCsrfToken());
    console.log(data);
    fetchRequest(`/${path}`, 'post', data)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });
}

export default function Login() {
    const [formData, setFormData] = useState({});
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
                    <Form className='my-2' id='login-form'>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input bsSize='sm' type="text" name="username" id="username" placeholder="Username" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input bsSize='sm' type="password" name="password" id="password" placeholder="Password" onChange={handleChange}/>
                        </FormGroup>
                        <Button color="primary" onClick={(e) =>{handleSubmit(e,"login", formData)}}>Login</Button>
                    </Form>
                    New to the site? <Link to={'/register'}>Register</Link>
                </Col>
            </Row>
        </Container>
    );
}

export function Signup() {
    return(
        <Container className='my-4'>
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <h2 className="text-center">Signup</h2>
                    <Form id='signUpForm'>
                        <FormGroup hidden>
                            <Input type="text" name="csrftokenmiddleware" id="name" placeholder="Last Name" />
                        </FormGroup>
                        <Row>
                            <Col>
                            <FormGroup>
                                <Label for="name">First Name</Label>
                                <Input bsSize='sm' type="text" name="firstName" id="name" placeholder="First Name" />
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <Label for="name">Last Name</Label>
                                <Input bsSize='sm' type="text" name="lastName" id="name" placeholder="Last Name" />
                            </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input bsSize='sm' type="email" name="email" id="email" placeholder="Email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input bsSize='sm' type="password" name="password" id="password" placeholder="Password" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input bsSize='sm' type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="checkbox" />
                            <label bsSize='sm' for="purpose" check>Are You Hr?</label>
                        </FormGroup>
                        <Button bsSize='sm' color="primary">Signup</Button>
                    </Form>
                    Alredy Have An Account? <Link to="/login">Login</Link>
                </Col>
            </Row>
        </Container>
    );
}