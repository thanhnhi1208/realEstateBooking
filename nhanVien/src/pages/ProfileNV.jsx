import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
const ProfileNV = () => {
    const { id } = useParams();
    const ref = useRef(null);

    // State để lưu trữ thông tin nhân viên
    const [profile, setProfile] = useState({
        nhanVienId: "",
        taiKhoan: "",
        matKhau: "",
        hoVaTen: "",
        hinhAnh: "",
    });

    const [hinhAnh, setHinhAnh] = useState('');

    const navigate = useNavigate();

    // State để lưu trạng thái chỉnh sửa
    const [isEditing, setIsEditing] = useState(false);

    // Xử lý thay đổi thông tin input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Lấy tệp đầu tiên trong danh sách (nếu có)
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Tạo URL tạm thời
            setHinhAnh(imageUrl); // Cập nhật state với URL của hình ảnh
        }
    };

    // Chuyển đổi trạng thái chỉnh sửa
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const chinhSuaProfile = async () => {
        let tenHinhAnh = null;
        const luuHinhAnh = async () => {
            if (hinhAnh && !ref.current.files[0]) {
                console.log('k doi');
            } else {
                const formData = new FormData();
                formData.append("hinhAnh", ref.current.files[0]);
                await axios.post('http://localhost:8080/nhanVien/themAnh', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem("token-nhanVien")}`,
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
            }
        }

        await luuHinhAnh();

        const nv = {
            nhanVienId: profile.nhanVienId,
            taiKhoan: profile.taiKhoan,
            matKhau: profile.matKhau,
            hoVaTen: profile.hoVaTen,
            hinhAnh: tenHinhAnh
        }

        console.log(nv)

        await axios.put('http://localhost:8080/nhanVien', nv, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-nhanVien')}`
            }
        }).then(response => {
            alert('Chỉnh sửa thành công');
            localStorage.removeItem('token-nhanVien');
            localStorage.removeItem('nhanVienId');
            navigate('/');
        })
            .catch(error => {
                if (error.response.status === 403) {
                    localStorage.removeItem('token-nhanVien');
                    localStorage.removeItem('nhanVienId');
                    navigate('/');
                } else {
                    console.log("Lỗi khác: ", error.response.data);
                }
            })
    }



    useEffect(() => {
        axios.get('http://localhost:8080/nhanVien/timNhanVienById?nhanVienId=' + localStorage.getItem('nhanVienId'), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-nhanVien')}`
            }
        }).then(response => {
            setProfile(response.data);
            if (response.data) {
                setHinhAnh(`http://localhost:8080/nhanVien/images/${response.data.hinhAnh}`);
            }
        })
            .catch(error => {
                if (error.response.status === 403) {
                    localStorage.removeItem('token-nhanVien');
                    localStorage.removeItem('nhanVienId');
                    navigate('/');
                } else {
                    console.log("Lỗi khác: ", error.response.data);
                }
            })
    }, [])

    // Hiển thị giao diện
    return (
        <div className="bg-white p-8 rounded-md shadow-md w-full mx-auto mt-10">
            <h1 className="text-xl font-bold mb-5">Thông Tin Nhân Viên</h1>
            <div className="space-y-4">
                <div>
                    <label className="block font-medium">Hình ảnh:</label>
                    {isEditing ? (
                        <div>
                            <img className="w-[220px] h-[200px]" src={hinhAnh} alt="" />
                            <input type="file" name="file" onChange={handleFileChange} className="border px-4 py-2 rounded-md w-full" ref={ref} />
                        </div>

                    ) : (
                        profile.hinhAnh &&
                        <img className="w-[220px] h-[200px]" src={`http://localhost:8080/nhanVien/images/${profile.hinhAnh}`} alt="" />
                    )}
                </div>
                <div>
                    <label className="block font-medium">Họ Tên:</label>
                    {isEditing ? (
                        <input type="text" name="hoVaTen" value={profile.hoVaTen} onChange={handleChange} className="border px-4 py-2 rounded-md w-full" />
                    ) : (
                        <p className="text-gray-700">{profile.hoVaTen}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Tài khoản:</label>
                    {isEditing ? (
                        <input type="email" name="taiKhoan" value={profile.taiKhoan} onChange={handleChange} className="border px-4 py-2 rounded-md w-full" />
                    ) : (
                        <p className="text-gray-700">{profile.taiKhoan}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Mật khẩu:</label>
                    {isEditing ? (
                        <input type="password" name="matKhau" value={profile.matKhau} onChange={handleChange} className="border px-4 py-2 rounded-md w-full" />
                    ) : (
                        <p className="text-gray-700">''</p>
                    )}
                </div>

                <div>
                    {!isEditing &&
                        <div>
                            <label className="block font-medium">Chức vụ:</label>
                            <p className="text-gray-700">Nhân viên môi giới</p>
                        </div>
                    }
                </div>
            </div>

            {/* Nút chỉnh sửa và lưu */}
            {isEditing &&
                <div className="mt-5 flex justify-between">
                    <button onClick={chinhSuaProfile} className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600" >
                        Lưu
                    </button>

                    <button onClick={toggleEditing} className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">
                        Hủy
                    </button>
                </div>
            }

            {!isEditing &&
                <div className="mt-5 flex justify-between">
                    <button onClick={toggleEditing} className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600" >
                        Chỉnh sửa
                    </button>
                </div>
            }
        </div >
    );
};

export default ProfileNV;
