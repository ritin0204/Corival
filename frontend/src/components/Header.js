import {
  Navbar,
  NavbarBrand
} from 'reactstrap';

function Header(args) {

  return (
    <div>
      <Navbar {...args} color="dark" container="md" dark>
        <NavbarBrand href="/" className="brand-text" color='white'>Corival</NavbarBrand>
      </Navbar>
    </div>
  );
  
}

export default Header;