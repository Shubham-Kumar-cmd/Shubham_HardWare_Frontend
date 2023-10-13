import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import About from './pages/About';
import Store from './pages/Store';
import Cart from './pages/Cart';
import Services from './pages/Services';
import Dashboard from './pages/users/Dashboard';
import Profile from './pages/users/Profile';
import AboutUser from './pages/users/AboutUser';
import CustomNavbar from './components/Navbar';
import Contact from './pages/Contact';
import { ToastContainer, Zoom } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/users/Home';
import UserProvider from './context/UserProvider';
import Order from './pages/users/Order';
import AdminDashboard from './pages/admin/Dashboard';
import AdminHome from './pages/admin/Home';
import AboutAdmin from './pages/admin/About';
import AddProduct from './pages/admin/AddProduct';
import AdminProfile from './pages/admin/Profile';
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
            <Route path='orders' element={<Order />} />
          </Route>

          {/* nested routes */}
          <Route path='/admin' element={<AdminDashboard />}>
            <Route path='home' element={<AdminHome />} />
            <Route path='profile' element={<AdminProfile />} />
            <Route path='about' element={<AboutAdmin />} />
            <Route path='products' element={<AddProduct />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
