import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token-nguoiDung');
        localStorage.removeItem('nguoiDungId');
        navigate('/login');
    }



    return (
        <div className="flex items-center justify-between text-sm">

            <div className="flex items-center justify-between w-full p-2">

                <img onClick={() => navigate('/logo')} className="w-44 cursor-pointer pl-10 mx-20" src={assets.logo_bat_dong_san} alt="" />

                <div className="flex space-x-20">
                    <div className="group relative">
                        <p onClick={() => navigate('/')} className="text-blue-500 font-bold text-lg cursor-pointer pb-2">Dự Án</p>
                    </div>
                    <div className="group relative">
                        <p onClick={() => navigate('/tin-tuc')} className="text-blue-500 font-bold text-lg cursor-pointer pb-2">Tin Tức</p>
                    </div>

                    <p onClick={() => navigate('/employee')} className="text-blue-500 font-bold text-lg">Chuyên Viên Môi Giới</p>
                    <p onClick={() => navigate('/about')} className="text-blue-500 font-bold text-lg">Về Chúng Tôi</p>
                </div>

                <div className="group relative">
                    <img className="w-14 cursor-pointer rounded-full border-2 mx-20" src={assets.upload_area} alt="" />

                    <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg rounded-lg z-10 w-40">
                        <ul className="w-full text-sm text-gray-600">
                            {localStorage.getItem('token-nguoiDung') &&
                                <li onClick={() => navigate('/profile')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded">
                                    Tài khoản của tôi
                                </li>
                            }
                            {localStorage.getItem('token-nguoiDung') &&
                                <li onClick={() => navigate('/my-appointment')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded">
                                    Lịch hẹn của tôi
                                </li>
                            }
                            {localStorage.getItem('token-nguoiDung') &&
                                <li onClick={logout} className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded">
                                    Đăng xuất
                                </li>
                            }
                            {!localStorage.getItem('token-nguoiDung') &&
                                <li onClick={() => navigate('/login')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded">
                                    Đăng nhập
                                </li>
                            }
                        </ul>
                    </div>
                </div>

            </div>
        </div>


    )
}

export default Navbar