import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './pages/LoginForm';
import CuocHen from './pages/CuocHen';
import ProfileNV from './pages/ProfileNV';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow bg-gray-100 p-6">
          <Routes>

            <Route path="/" element={<LoginForm />} />
            <Route path="/cuoc-hen" element={<CuocHen />} />
            <Route path="/profile-nhan-vien" element={<ProfileNV />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
