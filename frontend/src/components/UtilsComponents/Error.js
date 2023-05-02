import {Link} from "react-router-dom";
const static_url = document.getElementById("static-url");


const error_bg = "../../static/frontend/img/error-bg.png";
const Error = (error) => {
    console.log(static_url)
    return (
        <div className="error-div">
            <img src={error_bg} className="error-bg" alt="error bg" >
            </img>
            <div className="container">
                <h1>Oops!</h1>
                <p className="error-code">{error.status_code} : {error.message}</p>
                <p className="error-message">
                    Please check the URL in the address bar and try again.
                </p>
                <Link to="/" className="error-button">Go Back
                </Link>
            </div>
        </div>
    );
};

export default Error;