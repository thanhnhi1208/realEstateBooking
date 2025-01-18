import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useEffect, useState } from "react";
import axios from "axios";

const BDS = () => {
    const [bdsList, setBdsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/bds/findBDSKhongAnFalse?loaiBDS_id=' + 0, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-admin')}`
            }
        })
            .then(response => {
                setBdsList(response.data);
            })
            .catch(error => {
                if (error.response.status === 403) {
                    localStorage.removeItem('token-admin');
                    navigate('/login');
                } else {
                    console.log("Lỗi khác: ", error.response.data);
                }
            })


    }, []);


    const an = (id) => {
        axios.put('http://localhost:8080/bds/anHoacMoBDS/' + id, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-admin')}`
            }
        }).then(response => {
            const updatedAppointmentList = bdsList.map(bds => {
                if (bds.bdsId === id) {
                    return { ...bds, an: !bds.an };
                }

                return bds;
            });
            setBdsList(updatedAppointmentList);
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

    const formatDateTime = (dateTime) => {
        const inputDatetime = new Date(dateTime);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDatetime = inputDatetime.toLocaleDateString('en-GB', options);  // Định dạng ngày/tháng/năm
        return formattedDatetime;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Quản Lý Bất Động Sản</h1>

            <div className="mb-4">
                <button onClick={() => navigate('/them-bds')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    + Thêm Bất Động Sản
                </button>
            </div>
            {/* Bảng thông tin BDS */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-4 py-2 border">#</th>
                            <th className="px-4 py-2 border">Hình Ảnh</th>
                            <th className="px-4 py-2 border">Tên Bất Động Sản</th>
                            <th className="px-4 py-2 border">Mô Tả</th>
                            <th className="px-4 py-2 border">Ngày Đăng</th>
                            <th className="px-4 py-2 border">Giá Tiền</th>
                            <th className="px-4 py-2 border">Địa Chỉ</th>
                            <th className="px-4 py-2 border">Loại BĐS</th>
                            <th className="px-4 py-2 border">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bdsList && bdsList.map((bds, index) => (
                            <tr key={bds.bdsId} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border text-center">{index + 1}</td>
                                <td className="px-4 py-2 border">
                                    <img src={`http://localhost:8080/bds/images/${bds.hinhAnh}`} alt={bds.tenBDS} className="w-16 h-16 object-cover rounded" />
                                </td>
                                <td className="px-4 py-2 border">{bds.tenBDS}</td>
                                <td className="px-4 py-2 border">{bds.moTa}</td>
                                <td className="px-4 py-2 border text-center">{formatDateTime(bds.ngayDang)}</td>
                                <td className="px-4 py-2 border text-right">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                        .format(bds.giaTien)
                                        .replace('₫', '')} triệu/tháng
                                </td>
                                <td className="px-4 py-2 border">{bds.diaChi}</td>
                                <td className="px-4 py-2 border text-center">{bds.loaiBDS.tenLoaiBDS}</td>
                                <td className="px-4 py-2 border text-center">
                                    {/* Nút sửa */}
                                    <button onClick={() => navigate(`/chinh-sua-bds/${bds.bdsId}`)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" >
                                        Sửa
                                    </button>
                                    {/* Nút xóa */}
                                    <button onClick={() => an(bds.bdsId)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700">
                                        {bds.an == true &&
                                            'Mở ẩn'
                                        }

                                        {!bds.an &&
                                            'Ẩn'
                                        }
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BDS;
