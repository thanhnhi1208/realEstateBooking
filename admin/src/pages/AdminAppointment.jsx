import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";

const AdminAppointment = () => {
    const [appointmentList, setAppointmentList] = useState([]);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [listNhanVienCoSan, setListNhanVienCoSan] = useState([]);
    const [lichHenModal, setLichHenModal] = useState('');
    const [nhanVienModal, setNhanVienModal] = useState('');

    const clientRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/lichHen/findAllLichHen', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-admin')}`
            }
        })
            .then(response => {
                setAppointmentList(response.data);
            })
            .catch(error => {
                if (error.response.status === 403) {
                    localStorage.removeItem('token-admin');
                    navigate('/login');
                } else {
                    console.log("Lỗi khác: ", error.response.data);
                }
            })

        const socket = new SockJS('http://localhost:8080/ws');
        const client = over(socket);
        clientRef.current = client;

        client.connect({}, () => {
            client.subscribe('/topic/all', async (message) => {
                const lichHen = JSON.parse(message.body);
                console.log(lichHen)
                setAppointmentList((prevItems) => {
                    const newItems = [...prevItems];
                    newItems.unshift(lichHen);
                    return newItems;
                });
            })
        })
    }, []);

    const openModal = (lichHenId, ngayGioHen) => {
        setLichHenModal(lichHenId);

        axios.get('http://localhost:8080/lichHen/nhanVienCoSan?ngayGioHen=' + ngayGioHen, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-admin')}`
            }
        })
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setNhanVienModal(response.data[0].nhanVienId);
                }
                setListNhanVienCoSan(response.data);
            })
            .catch(error => {
                if (error.response.status === 403) {
                    localStorage.removeItem('token-admin');
                    navigate('/login');
                } else {
                    console.log("Lỗi khác: ", error.response.data);
                }
            })

        setIsOpen(true);
    }
    const closeModal = () => setIsOpen(false);

    const xacNhanLich = (lichHenId, nhanVienId, hanhDong) => {
        const updatedAppointmentList = appointmentList.map(appointment => {
            if (appointment.lichHenId === lichHenId && hanhDong === 'CHAP_NHAN') {
                return { ...appointment, chapNhan: true };
            } else if (appointment.lichHenId === lichHenId && hanhDong === 'HUY_HEN') {
                return { ...appointment, huyHen: true };
            }
            return appointment;
        });
        setAppointmentList(updatedAppointmentList);

        closeModal();

        axios.post('http://localhost:8080/lichHen/adminXacNhanLich', {
            lichHenId: lichHenId,
            nhanVienId: nhanVienId,
            hanhDong: hanhDong
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-admin')}`
            }
        })
            .then(response => {
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


    const formatDateTime = (dateTime) => {
        const inputDatetime = new Date(dateTime);

        // Lấy ngày, tháng, năm
        const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = inputDatetime.toLocaleDateString('en-GB', optionsDate); // Ngày/Tháng/Năm

        // Lấy giờ, phút
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
        const formattedTime = inputDatetime.toLocaleTimeString('en-GB', optionsTime); // Giờ:Phút

        return `${formattedTime} ${formattedDate}`; // Ghép giờ và ngày
    };

    return (
        <div className="container mx-auto px-8 mt-10">
            <h1 className="text-2xl font-semibold mb-6">Quản Lý Cuộc Hẹn</h1>

            {/* Bảng danh sách */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-left">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-6 py-3 font-medium text-gray-600">#</th>
                            <th className="px-6 py-3 font-medium text-gray-600">Tên Bất Động Sản</th>
                            <th className="px-6 py-3 font-medium text-gray-600">Ngày Giờ Hẹn</th>
                            <th className="px-6 py-3 font-medium text-gray-600">Email</th>
                            <th className="px-6 py-3 font-medium text-gray-600">Họ Tên</th>
                            <th className="px-6 py-3 font-medium text-gray-600">Số Điện Thoại</th>
                            <th className="px-6 py-3 font-medium text-gray-600">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentList && appointmentList.map((item, index) => (
                            <tr key={item.lichHenId} className="border-b">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{item.bds.tenBDS}</td>
                                <td className="px-6 py-4">{formatDateTime(item.ngayGioHen)}</td>
                                <td className="px-6 py-4 text-blue-500">{item.emailHen}</td>
                                <td className="px-6 py-4">{item.hoVaTen}</td>
                                <td className="px-6 py-4">{item.soDienThoai}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        {!item.chapNhan && !item.huyHen &&
                                            <div className="flex gap-3">
                                                < button
                                                    onClick={() => openModal(item.lichHenId, item.ngayGioHen)}
                                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                                >
                                                    Chấp Nhận
                                                </button>
                                                <button
                                                    onClick={() => xacNhanLich(item.lichHenId, -1, "HUY_HEN")}
                                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        }

                                        {item.chapNhan &&
                                            <span className="text-green-500">Đã chấp nhận</span>
                                        }

                                        {item.huyHen &&
                                            <span className="text-red-500">Đã huỷ hẹn</span>
                                        }

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    {/* Modal content */}
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                            ✖
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Chọn nhân viên</h2>
                        <div >
                            <select value={nhanVienModal} className="my-10 w-full" onChange={(e) => setNhanVienModal(e.target.value)}>
                                {listNhanVienCoSan && listNhanVienCoSan.map(nv => (
                                    <option key={nv.nhanVienId} value={nv.nhanVienId}>{nv.hoVaTen}</option>
                                ))}
                            </select>
                        </div>
                        {listNhanVienCoSan && listNhanVienCoSan.length > 0 &&
                            <button
                                onClick={() => xacNhanLich(lichHenModal, nhanVienModal, 'CHAP_NHAN')}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Xác nhận
                            </button>
                        }
                    </div>
                </div>
            )}



        </div >
    );
};

export default AdminAppointment;
