import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from 'axios';

const Appointment = () => {
    const { bdsID } = useParams();
    const [bdsData, setBdsData] = useState({});

    const [appointmentDate, setAppointmentDate] = useState("");
    const [gioHenList, setGioHenList] = useState([]);
    const [gioHen, setGioHen] = useState('');
    const [emailHen, setEmailHen] = useState('');
    const [hoVaTen, setHoVaTen] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://localhost:8080/bds/findById/' + bdsID)
            .then(response => {
                setBdsData(response.data);
            })
            .catch(error => {
                console.log(error.message);
            })
    }, [bdsID]);

    const handleDateChange = (e) => {
        setAppointmentDate(e.target.value);

        axios.get(`http://localhost:8080/lichHen/gioTrong?ngayHen=${e.target.value}&bdsId=${bdsID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-nguoiDung')}`
            }
        })
            .then(response => {
                setGioHen('');
                setGioHenList(response.data);
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


    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedDateTime = new Date(appointmentDate);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + 1);

        if (selectedDateTime < nextDay) {
            alert("Vui lòng chọn ngày từ ngày mai trở đi.");
            return;
        }

        if (gioHen == '') {
            alert("Vui lòng chọn giờ.");
            return;
        }


        const ngayGioHen = selectedDateTime.toLocaleDateString('en-CA') + 'T' + (gioHen >= 10 ? gioHen : '0' + gioHen) + ':00:00';
        const lichHen = {
            ngayGioHen: ngayGioHen,
            emailHen: emailHen,
            hoVaTen: hoVaTen,
            soDienThoai: soDienThoai,
            bds: {
                bdsId: bdsID
            },
            nguoiDung: {
                nguoiDungId: localStorage.getItem('nguoiDungId')
            }
        }

        axios.post('http://localhost:8080/lichHen/datLich', lichHen, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-nguoiDung')}`
            }
        })
            .then(response => {
                alert(response.data);
                navigate('/my-appointment');
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


    const formatDateTime = (dateTime) => {
        const inputDatetime = new Date(dateTime);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDatetime = inputDatetime.toLocaleDateString('en-GB', options);  // Định dạng ngày/tháng/năm
        return formattedDatetime;
    }


    return (
        <div className="p-4">
            <div className="max-w-4xl mx-auto">
                {/* Phần hiển thị hình ảnh */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {/* Hình lớn */}
                    {
                        bdsData && bdsData.hinhAnh &&

                        <div className="col-span-2">
                            <img className="w-full h-full object-cover rounded-lg" src={`http://localhost:8080/bds/images/${bdsData.hinhAnh}`} alt={bdsData.tenBDS} />
                        </div>
                    }

                    {/* Hình nhỏ */}
                    <div className="flex flex-col gap-4">
                        {/* {Array.isArray(bdsData.hinhAnh) &&
                            bdsData.hinhAnh.map((image, index) => (
                                <img key={index} className={`w-[180px] h-[120px] object-cover rounded-lg cursor-pointer ${mainImage === image ? "ring-4 ring-blue-400" : "hover:opacity-75"}`} src={image} alt={`Hình ${index + 1}`} onClick={() => setMainImage(image)} />// Cập nhật hình lớn
                            ))} */}
                    </div>
                </div>

                {/* Phần thông tin chi tiết */}
                <h1 className="text-4xl font-bold text-gray-800 my-4">{bdsData.tenBDS}</h1>
                <p className="text-lg text-gray-600 mb-4">{bdsData.moTa}</p>
                <p className="text-lg font-bold text-blue-600 mb-4 ">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                        .format(bdsData.giaTien)
                        .replace('₫', '')} triệu/tháng
                </p>
                <p>
                    <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-red-500" />
                    <span>{bdsData.diaChi} | Ngày đăng: {formatDateTime(bdsData.ngayDang)}</span>
                </p>

                {localStorage.getItem('token-nguoiDung') &&
                    <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col my-5 gap-5 border border-gray-800 p-5'>
                        < input className='px-5 py-2 border border-gray-300 p-5'
                            type="date"
                            onChange={handleDateChange}
                            value={appointmentDate} required />

                        <div className='flex gap-10 justify-center items-center '>
                            {gioHenList && gioHenList.map(gh => (
                                <button
                                    type="button"
                                    onClick={() => setGioHen(gh)}
                                    key={gh}
                                    className={`border p-1 ${gioHen === gh
                                        ? "bg-blue-500 text-white"
                                        : "bg-black text-white"
                                        }`}
                                >
                                    {gh}:00
                                </button>
                            ))}
                        </div>


                        <input onChange={(e) => setEmailHen(e.target.value)} value={emailHen}
                            className='px-5 py-2 border border-gray-300 p-5' type='email' placeholder='Email hẹn' required />
                        <input onChange={(e) => setHoVaTen(e.target.value)} value={hoVaTen}
                            className='px-5 py-2 border border-gray-300 p-5' type='text' placeholder='Họ và tên' required />
                        <input onChange={(e) => setSoDienThoai(e.target.value)} value={soDienThoai}
                            className='px-5 py-2 border border-gray-300 p-5' type='text' placeholder='Số điện thoại' required />

                        <button
                            className="bg-blue-600 text-white px-6 py-3  rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition duration-300"
                        >
                            Đặt Lịch Hẹn Xem Dự Án
                        </button>

                    </form>
                }
            </div>
        </div>
    );
};

export default Appointment;