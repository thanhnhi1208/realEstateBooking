import { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const [profile, setProfile] = useState({
        nguoiDungId: '',
        taiKhoan: '',
        matKhau: '',
        hoVaTen: '',
        soDienThoai: '',
        diaChi: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/nguoiDung?nguoiDungId=' + localStorage.getItem('nguoiDungId'), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-nguoiDung')}`
            }
        }).then(response => {
            setProfile(response.data);
            console.log(response.data);
        })
            .catch(error => {
                if (error.response.status === 403) {
                    localStorage.removeItem('token-nguoiDung');
                    localStorage.removeItem('nguoiDungId');
                    navigate('/login');
                } else {
                    console.log("Lỗi khác: ", error.response.data);
                }
            })
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put('http://localhost:8080/nguoiDung', profile, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-nguoiDung')}`
            }
        }).then(response => {
            if (response.data && response.data != '') {
                alert('Thay đổi profile thành công');
            } else {
                alert('Thay đổi profile thất bại');
            }
            window.location.reload();
        })
            .catch(error => {
                if (error.response.status === 403) {
                    localStorage.removeItem('token-nguoiDung');
                    localStorage.removeItem('nguoiDungId');
                    navigate('/login');
                } else {
                    console.log("Lỗi khác: ", error.response.data);
                }
            })
    };


    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
                Cập nhật thông tin cá nhân
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar */}
                {/* <div className="flex flex-col items-center">
                    <img src={profile.hinhAnh} alt="Avatar" className="w-24 h-24 rounded-full border-2 border-blue-500 mb-4" />
                    <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
                        Thay đổi hình ảnh
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    </label>
                </div> */}

                {/* Họ tên */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Họ Tên</label>
                    <input
                        type="text"
                        name="hoVaTen"
                        value={profile.hoVaTen}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="taiKhoan"
                        value={profile.taiKhoan}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" readOnly
                    />
                </div>

                {/* Số điện thoại */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Số Điện Thoại
                    </label>
                    <input
                        type="text"
                        name="soDienThoai"
                        value={profile.soDienThoai}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Địa chỉ */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Địa Chỉ</label>
                    <textarea
                        name="diaChi"
                        value={profile.diaChi}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Nút lưu */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Lưu Thông Tin
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
