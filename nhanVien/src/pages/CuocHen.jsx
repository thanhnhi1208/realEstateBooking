import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CuocHen = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cuocHenList, setCuocHenList] = useState([]);
    const navigate = useNavigate();

    const [moTa, setMoTa] = useState('');
    const [idLichHenDuocChon, setIdLichHenDuocChon] = useState(-1);

    useEffect(() => {
        axios.get('http://localhost:8080/lichHen/timLichHenTrongNgayCuaNhanVien/' + localStorage.getItem('nhanVienId'), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-nhanVien')}`
            }
        })
            .then(response => {
                console.log(response.data);
                setCuocHenList(response.data);
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

    const hoanThanhHoacHuyHoanThanhLichHen = (lichHenId, isHoanThanh) => {
        if (isHoanThanh) {
            setIsOpen(prev => !prev);
            setIdLichHenDuocChon(lichHenId);
        }

        axios.put('http://localhost:8080/lichHen/hoanThanhHoacHuyHoanThanhLichHen/' + lichHenId, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-nhanVien')}`
            }
        }).then(response => {
            const updatedAppointmentList = cuocHenList.map(appointment => {
                if (appointment.lichHenId === lichHenId) {
                    return { ...appointment, hoanThanh: !appointment.hoanThanh, moTa: !isHoanThanh ? null : appointment.moTa };
                }
                return appointment;
            });
            setCuocHenList(updatedAppointmentList);
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

    const capNhatMoTaHoanThanh = () => {
        console.log(idLichHenDuocChon)
        axios.put('http://localhost:8080/lichHen/capNhatMoTaHoanThanh/' + idLichHenDuocChon + '/' + moTa, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-nhanVien')}`
            }
        }).then(response => {
            const updatedAppointmentList = cuocHenList.map(appointment => {
                if (appointment.lichHenId === idLichHenDuocChon) {
                    return { ...appointment, moTa: moTa };
                }
                return appointment;
            });
            setCuocHenList(updatedAppointmentList);
            setIsOpen(prev => !prev);
            setMoTa('');
            setIdLichHenDuocChon(-1);
        })
            .catch(error => {
                console.log(error)
                if (error.response.status === 403) {
                    localStorage.removeItem('token-nhanVien');
                    localStorage.removeItem('nhanVienId');
                    navigate('/');
                } else {
                    console.log("Lỗi khác: ", error.response.data);
                }
            })
    }




    return (
        <div className="container mx-auto px-8 mt-10">
            <h1 className="text-2xl font-bold mb-5">Danh sách các cuộc hẹn</h1>
            <ul className="space-y-4">
                {cuocHenList && cuocHenList.map((item) => (<li key={item.lichHenId} className="border p-4 rounded-md shadow-md flex justify-between items-center" >
                    <div>
                        <h2 className="text-lg font-semibold">{item.tenCuocHen}</h2>
                        <p>
                            <strong>Ngày giờ hẹn:</strong> {formatDateTime(item.ngayGioHen)}
                        </p>
                        <p>
                            <strong>Khách hàng:</strong> {item.hoVaTen}
                        </p>
                        <p>
                            <strong>Số điện thoại:</strong> {item.soDienThoai}
                        </p>
                        <p>
                            <strong>Tên bất động sản:</strong> {item.bds.tenBDS}
                        </p>
                        <p>
                            <strong>Địa chỉ:</strong> {item.bds.diaChi}
                        </p>
                        {
                            item.moTa &&
                            <p>
                                <strong>Mô tả sau khi hoàn thành:</strong> {item.moTa}
                            </p>
                        }
                    </div>
                    <div>
                        {item.hoanThanh ? (
                            <button onClick={() => hoanThanhHoacHuyHoanThanhLichHen(item.lichHenId, false)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" >
                                Huỷ hoàn thành
                            </button>
                        ) : (
                            <button
                                onClick={() => hoanThanhHoacHuyHoanThanhLichHen(item.lichHenId, true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" >
                                Hoàn thành
                            </button>
                        )}
                    </div>
                </li>
                ))}
            </ul>

            {isOpen &&
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">

                        <textarea value={moTa} onChange={(e) => setMoTa(e.target.value)} placeholder="Nhập mô tả tại đây..." className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsOpen(prev => !prev)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                                Huỷ
                            </button>

                            <button onClick={capNhatMoTaHoanThanh} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default CuocHen;