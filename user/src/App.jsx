import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from "./pages/About";
import EmployeeList from "./pages/EmployeeList";
import Profile from "./pages/Profile";
import Appointment from "./pages/Appointment";
import MyAppointment from "./pages/MyAppointment";
import LoginForm from "../../user/src/pages/LoginForm";
import DangKi from "../../user/src/pages/DangKi";
import TinTuc from "./pages/TinTuc";
import TinTuc1 from "./tintuc/TinTuc1";
import Logo from "./pages/Logo";




function App() {


  return (
    <>
      <div>
        <ToastContainer></ToastContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/employee" element={<EmployeeList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointment/:bdsID" element={<Appointment />} />
          <Route path="/my-appointment" element={<MyAppointment />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dangKi" element={<DangKi />} />
          <Route path="/tin-tuc" element={<TinTuc />} />
          <Route path="/tt1" element={<TinTuc1 />} />
          <Route path="/logo" element={<Logo />} />


        </Routes>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
