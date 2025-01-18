import { useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();


    return (
        <div className="flex flex-col w-64 bg-blue-700 text-white h-screen">
            <nav className="flex-grow">
                {localStorage.getItem('token-admin') &&
                    <ul className="flex flex-col py-4">
                        <li onClick={() => navigate('/')} className="px-6 py-4 hover:bg-blue-300 cursor-pointer flex items-center gap-3">
                            <a>Dự Án Bất Động Sản</a>
                        </li>
                        <li onClick={() => navigate('/loai-bds')} className="px-6 py-4 hover:bg-blue-300 cursor-pointer flex items-center gap-3">
                            <a>Quản Lí Loại Bất Động Sản</a>
                        </li>
                        <li onClick={() => navigate('/lich-hen')} className="px-6 py-4 hover:bg-blue-300 cursor-pointer flex items-center gap-3">
                            <a>Lịch Hẹn Của Khách Hàng</a>
                        </li>
                        <li onClick={() => navigate('/nhan-vien-list')} className="px-6 py-4 hover:bg-blue-300 cursor-pointer flex items-center gap-3">
                            <a>Danh Sách Nhân Viên</a>
                        </li>
                    </ul >
                }
            </nav >
        </div >
    );
};

export default Sidebar;
