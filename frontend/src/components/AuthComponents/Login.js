import { Link, useNavigate } from 'react-router-dom';
import fetchRequest, { getCsrfToken } from "../../requests";
import { useState } from 'react';

const static_img_url = "../../static/frontend/img";

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
                window.location = '/';
                navigate('/');
            }
        })
        .catch(error => {
            document.getElementById('submission-alert').innerHTML = error.response.data.error;
            console.log(error);
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
        <div className='login-page'>
            <div className='login-img-div'>
                <img src={static_img_url+"/login.png"} className='login-img' alt="login" />
            </div>
            <div className='login-div'>
            <div id="submission-alert" className='d-none alert alert-danger'>Invalid Username and password</div>
            <h3>Log In</h3>
            <form className='form-div' onSubmit={(e) => { handleSubmit(e, "login", formData) }}>
                <div className='form-group'>
                    <label htmlFor="username">Username/Email</label>
                    <input className='form-control' type="text" name="username" id="username" placeholder="Username or Email" onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input className='form-control' type="password" name="password" id="password" placeholder="Password" onChange={handleChange} />
                </div>
                <button className='btn btn-primary' >Login</button>
            </form>
            <p>New to the site? <Link to={'/register'}>Register</Link></p>
            <p className='or-line'>
                OR
            </p>
            <div className='social-login'>
                <a >
                    <img src={static_img_url+"/icons8-google.svg"}></img>
                    Google</a>
                <a>
                    <img src={static_img_url+"/icons8-facebook.svg"}></img>
                    Facebook
                </a>
            </div>
            </div>
        </div>
    );
}
