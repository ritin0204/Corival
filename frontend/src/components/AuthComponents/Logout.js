import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
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
        <Button size='sm' color="secondary" className="float-right my-2 mx-2" style={{ width: 100 }} onClick={logOut}>Logout</Button>
    );
}