import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div>
            <h1>Choose Your Profile</h1>
            <div className="register-page">
            <div className="card">
                <h2>Looking To Hire</h2>
                <p>
                    Unlock a world of talent with our recruiter profile, where you can scout, evaluate, and connect with high-potential candidates through competitive assessments.
                </p>
                <Link to={"/recruiters/register"}>
                    <button>
                        Sign Up as Recruiter
                    </button>
                </Link>
            </div>
            <div className="card">
                <h2>Looking To Compete</h2>
                <p>
                    Prepare for your dream job with our quiz and contest platform. Get discovered by top recruiters or hire top candidates based on their scores.
                </p>
                <Link to={"/candidates/register"}>
                    <button>
                        Sign Up as Candidate
                    </button>
                </Link>
            </div>
        </div>
        </div>
        
    )
}

export default SignUp;