import { useEffect, useState } from 'react';
import axios from "axios";

const MyAppointment = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/lichHen/findAllLichHenCuaNguoiDung?nguoiDungId=' + localStorage.getItem('nguoiDungId')
            , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token-nguoiDung')}`
                }
            }
        ).then(response => {
            setAppointments(response.data);
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
        <div className="p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Thông tin các cuộc hẹn</h1>

                {appointments && appointments.map((appointment, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <div className="flex items-center gap-4 mb-6 ml-6">
                            <img src={`http://localhost:8080/bds/images/${appointment.bds.hinhAnh}`} className="w-32 h-32 object-cover rounded-lg" />
                            <div className='ml-6'>
                                <h2 className="text-xl font-semibold">{appointment.bds.tenBDS}</h2>
                                <p className="text-lg text-gray-600">{appointment.diaChi}</p>
                                <p className="text-lg text-gray-600">Ngày giờ hẹn: {formatDateTime(appointment.ngayGioHen)}</p>
                                {!appointment.huyHen && !appointment.chapNhan &&
                                    <p className="text-lg text-black-600">Đang chờ xác nhận</p>
                                }
                                {appointment.huyHen &&
                                    <p className="text-lg text-red-600">Đã bị huỷ lịch</p>
                                }
                                {appointment.chapNhan &&
                                    <p className="text-lg text-green-600">Đã chấp nhận lịch</p>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAppointment;
