import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddEmployee from './pages/AddEmployee';
import EmployeeList from './pages/EmphoyeeList';
import LoginForm from './pages/LoginForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoaiBDS from './pages/LoaiBDS';
import AddLoaiBDS from './pages/AddLoaiBDS';
import ChinhSuaBDS from './pages/ChinhSuaBDS';
import BDS from './pages/BDS';
import AddBDS from './pages/AddBDS';
import AdminAppointment from './pages/AdminAppointment';
import ChinhSuaLoaiBDS from './pages/ChinhSuaLoaiBDS';

const App = () => {

  return (
    <>
      <div>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<BDS />} />
              <Route path="/nhan-vien-list" element={<EmployeeList />} />
              <Route path="/them-nhan-vien" element={<AddEmployee />} />
              <Route path="/loai-bds" element={<LoaiBDS />} />
              <Route path="/them-loai-bds" element={<AddLoaiBDS />} />
              <Route path="/them-bds" element={<AddBDS />} />
              <Route path="/chinh-sua-bds/:id" element={<ChinhSuaBDS />} />
              <Route path="/lich-hen" element={<AdminAppointment />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/chinhSuaLoaiBDS/:id" element={<ChinhSuaLoaiBDS />} />

            </Routes>
          </div>
        </div>

      </div>
    </>
  );
};

export default App;
