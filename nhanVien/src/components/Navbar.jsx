import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';


const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token-nhanVien');
        localStorage.removeItem('nhanVienId');
        navigate('/');
    }

    return (
        <div className="flex justify-between items-center px-4 sm:px-8 py-3 border-b bg-white h-[90px] ">
            <div className="flex items-center gap-2 text-xs">
                <img className="sm:w-40 cursor-pointer" src={assets.logo_bat_dong_san} alt="Logo" />
                <p className="text-gray-900 text-sm px-3 mb-8 rounded-full border-2">Nhân Viên</p>
            </div>

            {
                localStorage.getItem('token-nhanVien') &&
                <button onClick={logout} className="bg-primary text-white text-sm px-10 py-2 rounded-full"  >
                    Logout
                </button>
            }

            {
                !localStorage.getItem('token-nhanVien') &&
                <button onClick={() => navigate('/')} className="bg-primary text-white text-sm px-10 py-2 rounded-full"  >
                    Login
                </button>
            }



        </div>
    );
};

export default Navbar;
