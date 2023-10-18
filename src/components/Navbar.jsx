import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './../assets/logo192.png';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const CustomNavbar = () => {

  const userContext=useContext(UserContext)

  const doLogout=()=>{
      //we can remove setIsLogin and setUserData method bcz of doLogout method 
      // userContext.setIsLogin(false)
      // userContext.setUserData(null)
      userContext.logout()
  }

  return (

    <Navbar collapseOnSelect expand="lg" bg='success' variant="dark" className='sticky-top'>{/**className="btn btn-primary", variant='primary' */}
      <Container>
        <Navbar.Brand as={NavLink} to='/'>{/**href="/" */}
        {/* <a><img src='/assets/logo192.png' alt='brand_logo' width='25' height='25' /></a> */}
        <img as={NavLink} to='/' src={logo} alt='brand_logo' width={25} height={25} />
          Shubham HardWare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/services" >Trending(service)</Nav.Link>
            <Nav.Link as={NavLink} to='/about'>About</Nav.Link>
            <NavDropdown title="Product Categories" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">MS Railing</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Casting
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Stainless Steel</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                More
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to='/contact'>Contact Us</Nav.Link>
            <Nav.Link as={NavLink} to='/cart'>Cart(40)</Nav.Link>{/**href="/cart" */}
          </Nav>
          
          {/* ternary operator */}
          {
            (userContext.isLogin)?(
              <>
              <Nav>
              {userContext.isAdminUser && (
                <>
                  <Nav.Link as={NavLink} to='/admin/home'>AdminDashboard</Nav.Link>
                </>
              )}
              
                <Nav.Link eventKey={2} as={NavLink} to='/users/profile'>{userContext.userData?.user?.email}</Nav.Link>
                <Nav.Link eventKey={2} as={NavLink} to='/users/orders'>Orders</Nav.Link>
                <Nav.Link onClick={doLogout}>
                  Logout
                </Nav.Link>
              </Nav>
              </>
            ):(
              <>
              <Nav>
                <Nav.Link as={NavLink} to='/login'>Login</Nav.Link>
                <Nav.Link as={NavLink} to='/signup'>
                  Signup
                </Nav.Link>
              </Nav>
              </>
            )
          }
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

    // <div>
    //     <ul>
    //         <li><a href="/">Home</a></li>
    //     </ul>
    //     <ul>
    //         <li><a href="/about">About</a></li>
    //     </ul>
    //     <ul>
    //         <li><a href="/services">Services</a></li>
    //     </ul>
    //     <ul>
    //         <li><a href="/cart">Cart</a></li>
    //     </ul>
    //     <ul>
    //         <li><a href="/store">Store</a></li>
    //     </ul>
    //     <ul>
    //         <li><a href="/users/profile">Profile</a></li>
    //     </ul>
    // </div>
  )
}

export default CustomNavbar;