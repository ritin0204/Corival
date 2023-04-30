import { useNavigate } from "react-router-dom";
import fetchRequest, { setCurrentUser } from "../../requests";

export default function Logout() {
    const navigate = useNavigate();
    const logOut = () => {
        fetchRequest('/logout', 'post')
        .then(response => {
            setCurrentUser(null);
            window.location = '/';
            navigate('/');
        })
        .catch(error => {
            console.log(error);
        });
    }
    return (
        <span onClick={logOut}>Logout</span>
    );
}