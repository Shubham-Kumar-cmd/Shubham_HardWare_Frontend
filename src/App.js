import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages';
import About from './pages/about';
import Store from './pages/store';
import Cart from './pages/cart';
import Services from './pages/services';
import Dashboard from './pages/users/dashboard';
import Profile from './pages/users/profile';
import AboutUser from './pages/users/aboutuser';
import CustomNavbar from './components/Navbar';
import Contact from './pages/contact';
import { ToastContainer, Zoom } from 'react-toastify';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/users/home';
import UserProvider from './context/user.provider';

function App() {
  return (

    <UserProvider>
    {/* setting up routes */}
      <BrowserRouter>
        <ToastContainer position="bottom-center" theme='colored' transition={Zoom} draggable />
        {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        /> */}
        <CustomNavbar />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/store' element={<Store />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Register />}></Route>

          {/* nested routes */}
          <Route path='/users' element={<Dashboard />}>
            <Route path='home' element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='about' element={<AboutUser />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
