import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {

        e.preventDefault();
        axios.post('http://localhost:8080/nguoiDung/nhanVien/dangNhap', {
            taiKhoan: username,
            matKhau: password
        })
            .then(response => {
                const nhanVienId = response.data;
                if (nhanVienId) {
                    axios.post('http://localhost:8080/auth/generateToken', {
                        taiKhoan: username,
                        matKhau: password
                    })
                        .then(response => {
                            localStorage.setItem('token-nhanVien', response.data);
                            localStorage.setItem('nhanVienId', nhanVienId);
                            navigate('/cuoc-hen');
                        }).catch(error => {
                            console.log(error);
                        })
                } else {
                    alert('Sai tài khoản hoặc mật khẩu');
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
            <div className="bg-white p-8 rounded-md shadow-md w-96 relative -translate-y-20">

                <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            placeholder="Nhập tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md" required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md" required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
