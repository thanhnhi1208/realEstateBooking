import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { assets } from '../assets/assets'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Home = () => {

    const [listBDS, setListBDS] = useState([])
    const [loaiBDS, setLoaiBDS] = useState([]);

    const [diaChiDuocChon, setDiaChiDuocChon] = useState('');

    const navigate = useNavigate();

    const danhSachQuan = ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5",
        "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 10", "Quận 11",
        "Quận 12", "Quận Tân Bình", "Quận Bình Tân", "Quận Bình Thạnh", "Quận Tân Phú",
        "Quận Gò Vấp", "Quận Phú Nhuận", "Quận Thủ Đức", "Nhà Bè",
        "Bình Chánh", "Hóc Môn", "Củ Chi", "Cần Giờ",
    ];

    const timKiemTheoQuan = (diaChi) => {
        console.log(diaChi)
        axios.get('http://localhost:8080/bds/timKiemTheoQuan?diaChi=' + diaChi, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-nguoiDung')}`
            }
        }).then(response => {
            setListBDS(response.data);
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
    }

    useEffect(() => {
        axios.get('http://localhost:8080/bds?loaiBDS_id=' + 0)
            .then(response => {
                setListBDS(response.data);
            })
            .catch(error => {
                console.log(error.message);
            })

        axios.get('http://localhost:8080/bds/loaiBDS')
            .then(response => {
                setLoaiBDS(response.data);
            })
            .catch(error => {
                console.log(error.message);
            })

    }, []);

    const thayDoiBDS = (loaiBDSId) => {
        axios.get('http://localhost:8080/bds?loaiBDS_id=' + loaiBDSId)
            .then(response => {
                setListBDS(response.data);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const formatDateTime = (dateTime) => {
        const inputDatetime = new Date(dateTime);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDatetime = inputDatetime.toLocaleDateString('en-GB', options);  // Định dạng ngày/tháng/năm
        return formattedDatetime;
    }

    return (
        <div>
            <div className="relative px-2">
                <img className="w-[100vw] h-[300px]" src={assets.nen_bds} alt="" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-1/2 p-4 flex items-center">
                    <input value={diaChiDuocChon} onChange={(e) => setDiaChiDuocChon(e.target.value)} type="text" placeholder="Tìm kiếm" list="danhSachQuan"
                        className="w-full p-3 rounded-l-md text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" />
                    <FontAwesomeIcon onClick={(e) => timKiemTheoQuan(diaChiDuocChon)} icon={faMagnifyingGlass} className="text-white ml-5 cursor-pointer text-2xl" />
                    <datalist id="danhSachQuan">
                        {danhSachQuan.map((quan, index) => (
                            <option key={index} value={quan} />
                        ))}
                    </datalist>
                </div>
            </div>

            <div className="my-16 text-gray-900 md:mx-10">
                <h1 className="text-4xl font-bold text-blue-800 mb-8">Danh Sách Dự Án</h1>

                {/* Phân loại */}
                <div className="mb-4">
                    <button onClick={() => thayDoiBDS(0)} className="text-lg mr-4 text-blue-600">Tất cả</button>
                    {loaiBDS && loaiBDS.map(lbds => (
                        <button onClick={() => thayDoiBDS(lbds.loaiBDSId)} key={lbds.loaiBDSId} className="text-lg mr-4 text-blue-600">{lbds.tenLoaiBDS}</button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {listBDS && listBDS.map((bds) => (
                        <Link to={`/appointment/${bds.bdsId}`} key={bds.bdsId} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300" >
                            {/* Hiển thị hình ảnh đầu tiên */}
                            <img className="w-full h-[200px] object-cover" src={Array.isArray(bds.hinhAnh) ? bds.hinhAnh[0] : `http://localhost:8080/bds/images/${bds.hinhAnh}`} />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{bds.tenBDS}</h2>
                                <p className="text-lg font-bold text-blue-600 mb-2 ">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                        .format(bds.giaTien)
                                        .replace('₫', '')} triệu/tháng
                                </p>
                                <p className="text-gray-600 mb-2">{bds.moTa}</p>

                                <div className="flex items-center justify-between text-gray-600 mb-2">
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-red-500" />
                                        <p>{bds.diaChi}</p>
                                    </div>
                                    <p>{formatDateTime(bds.ngayDang)}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Home