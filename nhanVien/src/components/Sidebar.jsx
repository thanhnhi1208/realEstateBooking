import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-64 bg-blue-700 text-white h-screen">
            <nav className="flex-grow">
                {localStorage.getItem('token-nhanVien') &&
                    <ul className="flex flex-col py-4">
                        <li
                            onClick={() => navigate("/cuoc-hen")}
                            className="px-6 py-4 hover:bg-blue-300 cursor-pointer flex items-center gap-3"
                        >
                            <span>Lịch Hẹn Với Khách Hàng</span>
                        </li>
                        <li
                            onClick={() => navigate("/profile-nhan-vien")}
                            className="px-6 py-4 hover:bg-blue-300 cursor-pointer flex items-center gap-3"
                        >
                            <span>Tài Khoản Nhân Viên</span>
                        </li>
                    </ul>
                }

            </nav>
        </div>
    );
};



export default Sidebar;
