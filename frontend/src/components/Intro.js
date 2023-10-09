const static_img_url = "../../static/frontend/img";
import {Link} from 'react-router-dom';

const Intro = () => {
    return (
        <div className="landiing-page">
            <section className="hero-div">
                <div className="hero-details">
                    <h1>
                        Practice Smarter, Compete Stronger!
                    </h1>
                    <p>
                        Prepare for your dream job with our quiz and contest platform. Get discovered by top recruiters or hire top candidates based on their scores.
                    </p>
                    <Link to={"/about"}>
                        <button>
                            Learn More
                        </button>
                    </Link>
                </div>
                <div className="hero-img-div">
                    <img src={static_img_url+"/image-hero-desktop.png"} alt=""></img>
                </div>
            </section >

            <section className="features-div">
                <div className="features-heading">
                    <h2>Features</h2>
                    <p>
                        We make sure all of our features are designed to be loved by every aspiring and existing student and tech enthusiast.
                    </p>
                </div>
                <div className="features-cards">
                    <div className="card">
                        <div className="card-img">
                            <img src={static_img_url+"/study.svg"} alt="Learn Icon"></img>
                        </div>
                        <div className="card-details">
                            <h3>Learn</h3>
                            <p>
                                Learn from a wide variety of topics and get your doubts cleared by our community.
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-img">
                            <img src={static_img_url+"/practice.png"} alt="Learn Icon"></img>
                        </div>
                        <div className="card-details">
                            <h3>Practice</h3>
                            <p>
                                Practice from a wide variety of questions and get your doubts cleared by our community.
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-img">
                            <img src={static_img_url+"/competition.png" }alt="Learn Icon"></img>
                        </div>
                        <div className="card-details">
                            <h3>Compete</h3>
                            <p>
                                Compete with your peers and get your doubts cleared by our community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="register-now">
                <div className="register-now-details">
                    <h2>Register Now</h2>
                    <p>
                    </p>
                    <Link to={"/register"}>
                        <button>
                            Register Now
                        </button>
                    </Link>
                </div>
                <div className="register-now-img">
                    <img src={static_img_url+"/register-no.png"} alt=""></img>
                </div>
            </section>
        </div>
    );
}


export default Intro;