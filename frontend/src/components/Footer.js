const static_img_url = "../../static/frontend/img";

export default function Footer() {
    return (
        <footer>
            <div className="logo">
                <img src={static_img_url+"/logo.svg"} alt="logo"></img>
            </div>
            <div className="company-link">
                <h6>Company</h6>
                <ul>
                    <li>About Us</li>
                    <li>Careers</li>
                    <li>Open Positions</li>
                    <li>Team</li>
                </ul>
            </div>
            <div className="company-link">
                <h6>Social Links</h6>
                <ul>
                    <li>Linkedin</li>
                    <li>Instagram</li>
                    <li>Githhub</li>
                    <li>Discord</li>
                </ul>
            </div>
            <div className="company-link">
                <h6>Help</h6>
                <ul>
                    <li>Contact</li>
                    <li>Get Support</li>
                    <li>Terms and Services</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <p>@2023 -- All Rights Reserved</p>
        </footer>
    );
}