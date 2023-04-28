import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    CardBody,
    CardTitle,
    UncontrolledAlert,
}
from 'reactstrap';
import { useState } from 'react';
import { fetchRequest, getCurrentUser } from '../../requests';


const CreateContest = ({ setContestId, setRedirect}) => {
    const [currentUser, setCurrentUser] = useState(getCurrentUser());
    const [formData, setFormData] = useState({
        title : "",
        description : "",
        category: "All",
        difficulty: 1,
        start_time: ""
    });

    const checkForm = () => {
        if (formData.title === "" || formData.description === "" || formData.start_time === "" ) {
            return false;
        }
        return true;
    }

    function handleSubmit(event, path, formData) {
        event.preventDefault();
        if( checkForm() === false) {
            document.getElementById('submission-alert').innerHTML = "Please fill all the fields";
            document.getElementById('submission-alert').classList.remove('d-none');
            return;
        }
        document.getElementById('submission-alert').classList.add('d-none');
        document.getElementById('submit-btn').disabled = true;
        let data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }
        fetchRequest(`/${path}`, 'post', data)
        .then(response => {
            if (response.status === 201) {
                setRedirect(true);
                setContestId(response.data.id);
            }
        })
        .catch(error => {
            document.getElementById('submission-alert').innerHTML = error.response.data.detail;
            document.getElementById('submission-alert').classList.remove('d-none');
        });
        document.getElementById('submit-btn').disabled = false;
    }

    
    const handleChange = (event) => {
        setFormData((formData) => ({
            ...formData,
            [event.target.name]: event.target.value,
        }));
    };


    if (currentUser === null || currentUser.is_recruiter === false) {
        return (
            <></>
        );
    }

    return (
        <Card color="success" outline>
            <CardBody>
                <CardTitle><strong>Create Contest</strong></CardTitle>
                <UncontrolledAlert id='submission-alert' color="danger" className='p-2 d-none'></UncontrolledAlert>
                <Form onSubmit={(e) => { handleSubmit(e, "api/contests/", formData) }}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input bsSize="sm" className="mb-3" type="text" name="title" id="title" placeholder="Title" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input bsSize="sm" className="mb-3" type="textarea" name="description" id="description" placeholder="Description" onChange={handleChange} />
                    </FormGroup>
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
                    <FormGroup>
                        <Label for="start_time">Start Time</Label>
                        <Input bsSize="sm" className="mb-3" type="datetime-local" name="start_time" id="start_time" placeholder="Start Time" onChange={handleChange} />
                    </FormGroup>
                    <Button size='sm' id="submit-btn" className="float-end" color="success">Create</Button>
                </Form>
            </CardBody>
        </Card >
    );
};

export default CreateContest;
