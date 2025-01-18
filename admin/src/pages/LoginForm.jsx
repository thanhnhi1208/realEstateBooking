import { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/nguoiDung/admin/dangNhap', {
            taiKhoan: username,
            matKhau: password
        })
            .then(response => {
                const adminId = response.data;
                if (adminId) {
                    axios.post('http://localhost:8080/auth/generateToken', {
                        taiKhoan: username,
                        matKhau: password
                    })
                        .then(response => {
                            localStorage.setItem('token-admin', response.data);
                            navigate('/');
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
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-80 space-y-4"
            >
                <h2 className="text-lg font-bold text-center">Admin Login</h2>
                <div>
                    <label className="block text-sm font-medium">Username</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-full hover:bg-primary-dark"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
