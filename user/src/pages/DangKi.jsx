import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hoVaTen, setHoVaTen] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/nguoiDung', {
            taiKhoan: username,
            matKhau: password,
            hoVaTen: hoVaTen,
            diaChi: diaChi,
            soDienThoai: soDienThoai
        })
            .then(response => {
                if (response.data != '') {
                    alert('Đăng kí thành công');
                    navigate('/login');
                } else {
                    alert('Tài khoản đã tồn tại! vui lòng sử dụng tài khoản khác');
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-80 space-y-4"
            >
                <h2 className="text-lg font-bold text-center">Đăng kí</h2>
                <div>
                    <label className="block text-sm font-medium">Tài khoản</label>
                    <input
                        type="email"
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Mật khẩu</label>
                    <input type="password" className="w-full border px-3 py-2 rounded focus:outline-none focus:ring" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Họ và tên</label>
                    <input type="text" className="w-full border px-3 py-2 rounded focus:outline-none focus:ring" value={hoVaTen} onChange={(e) => setHoVaTen(e.target.value)} required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Địa chỉ</label>
                    <input type="text" className="w-full border px-3 py-2 rounded focus:outline-none focus:ring" value={diaChi} onChange={(e) => setDiaChi(e.target.value)} required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Số điện thoại</label>
                    <input type="text" className="w-full border px-3 py-2 rounded focus:outline-none focus:ring" value={soDienThoai} onChange={(e) => setSoDienThoai(e.target.value)} required />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-2 rounded-full hover:bg-primary-dark" >
                    Đăng kí
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
