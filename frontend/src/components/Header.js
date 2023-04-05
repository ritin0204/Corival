import {
    Navbar,
    NavbarBrand
} from 'reactstrap';
import { Link } from 'react-router-dom';

function Header(args) {

    return (
        <div>
            <Navbar {...args} color="dark" container="md" dark>
                <NavbarBrand tag={Link} to="/" className="brand-text" color='white'>Corival</NavbarBrand>
            </Navbar>
        </div>
    );

}

export default Header;