import {
    Label,
    Input,
    FormGroup,
    Container,
    Row,
    Col
} from 'reactstrap';


const UserForm = (props) => {
    const handleChange = props.handleChange;
    return (
        <Container>
            <Row>
                <Col>
                    <FormGroup>
                        <Label htmlFor="name">First Name</Label>
                        <Input bsSize='sm' type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label htmlFor="name">Last Name</Label>
                        <Input bsSize='sm' type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label htmlFor="name">Username</Label>
                <Input bsSize='sm' type="username" name="username" placeholder="Username" onChange={handleChange} />
            </FormGroup>
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
                <Label for="phone">
                    Phone Number
                </Label>
                <Input
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    type="number"
                    bsSize='sm'
                    onChange={handleChange}
                />
            </FormGroup>
        </Container>
    );
}


export default UserForm;