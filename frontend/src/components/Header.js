import { Link } from 'react-router-dom';
import Logout from './AuthComponents/Logout';
import { useState, useEffect } from 'react';
import { getCurrentUser } from '../requests';

const static_img_url = "../../static/frontend/img";

function Header(args) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        let response = getCurrentUser();
        response.then((data) => {
            setUser(data);
        });
    }, []);

    return (
        <header className="header-div">
            <div className="container">
                <div className="logo">
                    <Link to={"/"}>
                    <img src={static_img_url + "/logo.svg"} alt="logo"></img>
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li class="dropdown"><Link aria-disabled>Features</Link>
                            <ul>
                                <li>
                                    <img src={static_img_url + "/study.svg"} className="img-icon" alt="Learn Icon"></img>
                                    <Link to={"/learn"}>Learn</Link>
                                </li>
                                <li>
                                    <img src={static_img_url+"/practice.png"} className="img-icon" alt="Learn Icon"></img>
                                    <Link to={"/practice"}>Practice</Link>
                                </li>
                                <li>
                                    <img src={static_img_url+"/competition.png"} className="img-icon" alt="Learn Icon"></img>
                                    <Link to={"/contests"}>Compete</Link>
                                </li>
                            </ul>
                            <svg width="10" height="6" xmlns="http://www.w3.org/2000/svg" className="dropdown-close">
                                <path stroke="#686868" fill="none" d="m1 1 4 4 4-4" />
                            </svg>
                            <svg width="10" height="6" xmlns="http://www.w3.org/2000/svg" className="dropdown-open">
                                <path stroke="#686868" fill="none" d="m1 5 4-4 4 4" />
                            </svg>
                        </li>
                        <li class="dropdown"><Link aria-disabled>Company</Link>
                            <ul>
                                <li>
                                    <img src={static_img_url+"/info.png"} className="img-icon" alt="Learn Icon"></img>
                                    <Link to={"/about"}>About</Link></li>
                                <li>
                                    <img src={static_img_url+"/blog.png"} className="img-icon" alt="Learn Icon"></img>
                                    <Link to={"/blogs"}>Blogs</Link></li>
                            </ul>
                            <svg width="10" height="6" xmlns="http://www.w3.org/2000/svg" className="dropdown-close">
                                <path stroke="#686868" fill="none" d="m1 1 4 4 4-4" />
                            </svg>
                            <svg width="10" height="6" xmlns="http://www.w3.org/2000/svg" className="dropdown-open">
                                <path stroke="#686868" fill="none" d="m1 5 4-4 4 4" />
                            </svg>
                        </li>
                    </ul>
                </nav>
                <div className="login-link-div">
                    {
                        user ? (
                            <div className="profile-link">
                                <div className="profile-img-icon">
                                    <p className="profile-img-icon-txt">{user.first_name[0] + user.last_name[0]}</p>
                                    <ul>
                                        <li>
                                            <img src={static_img_url+"/profile.png"} className="img-icon" alt="Learn Icon"></img>
                                            <Link to={"/profile"} state={user}>Profile</Link>
                                        </li>
                                        <li>
                                            <img src={static_img_url+"/logout.png"} className="img-icon" alt="Learn Icon"></img>
                                            <Link to={"/logout"}>
                                                <Logout />
                                            </Link>
                                        </li>
                                    </ul>
                                    <svg width="10" height="6" xmlns="http://www.w3.org/2000/svg" className="dropdown-close">
                                        <path stroke="#686868" fill="none" d="m1 1 4 4 4-4" />
                                    </svg>
                                    <svg width="10" height="6" xmlns="http://www.w3.org/2000/svg" className="dropdown-open">
                                        <path stroke="#686868" fill="none" d="m1 5 4-4 4 4" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div className="login-link">
                                <Link to={"/login"}>Login</Link>
                                <Link to={"/candidates/register"}>Register</Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </header>
    );

}

export default Header;