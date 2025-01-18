import { useState } from "react";
import axios from "axios";

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        taiKhoan: "",
        matKhau: "",
        hoVaTen: "",
        hinhAnh: ''
    });

    const [hinhAnh, setHinhAnh] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Lấy tệp đầu tiên trong danh sách (nếu có)
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Tạo URL tạm thời
            setHinhAnh(imageUrl); // Cập nhật state với URL của hình ảnh
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hinhAnh) {
            alert("Vui lòng chọn một tệp trước!");
            return;
        }

        let tenHinhAnh = null;

        const files = e.target.file.files;
        const formData = new FormData();
        formData.append("hinhAnh", files[0]);
        await axios.post('http://localhost:8080/nhanVien/themAnh', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem("token-admin")}`,
            },
        }).then(response => {
            tenHinhAnh = response.data;
        })
            .catch(error => {
                if (error.response.status === 403) {
                    localStorage.removeItem('token-admin');
                    navigate('/login');
                } else {
                    console.log("Lỗi khác: ", error.response.data);
                }
            })

        const nhanVien = {
            taiKhoan: employee.taiKhoan,
            matKhau: employee.matKhau,
            hoVaTen: employee.hoVaTen,
            hinhAnh: tenHinhAnh
        }

        await axios.post('http://localhost:8080/nhanVien', nhanVien, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-admin')}`
            }
        }).then(response => {
            alert('Thêm thành công');
            window.location.reload();
        })
            .catch(error => {
                if (error.response.status === 403) {
                    localStorage.removeItem('token-admin');
                    navigate('/login');
                } else {
                    console.log("Lỗi khác: ", error.response.data);
                }
            })
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    Thêm Nhân Viên
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Hình ảnh */}
                    <div className="flex flex-col items-center">
                        <img src={hinhAnh} alt="Avatar" className="w-24 h-24 rounded-full border-2 border-blue-500 mb-4" />
                        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
                            Tải hình ảnh
                            <input onChange={handleFileChange} type="file" name="file" className="hidden" required />
                        </label>


                    </div>

                    {/* Họ và Tên */}
                    <div>
                        <label htmlFor="hoVaTen" className="block text-sm font-medium text-gray-700" >
                            Họ và Tên
                        </label>
                        <input type="text" id="hoVaTen" name="hoVaTen" value={employee.fullName} onChange={handleChange} placeholder="Nhập họ và tên" className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="taiKhoan" className="block text-sm font-medium text-gray-700" >
                            Email
                        </label>
                        <input type="email" id="taiKhoan" name="taiKhoan" value={employee.email} onChange={handleChange} placeholder="Nhập email" className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                    </div>

                    {/* Mật khẩu */}
                    <div>
                        <label htmlFor="matKhau" className="block text-sm font-medium text-gray-700" >
                            Mật khẩu
                        </label>
                        <input type="password" id="matKhau" name="matKhau" value={employee.password} onChange={handleChange} placeholder="Nhập mật khẩu" className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                    </div>

                    {/* Nút Submit */}
                    <div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300" >
                            Thêm Nhân Viên
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
