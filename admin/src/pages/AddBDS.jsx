import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddBDS = () => {
    const [tenBDS, setTenBDS] = useState('');
    const [moTa, setMoTa] = useState('');
    const [giaTien, setGiaTien] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [loaiBDS, setLoaiBDS] = useState('');

    const [hinhAnh, setHinhAnh] = useState('');

    const [loaiBDSList, setLoaiBDSList] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://localhost:8080/bds/loaiBDS')
            .then(response => {
                setLoaiBDSList(response.data);
                if (response.data && response.data.length > 0) {
                    setLoaiBDS(response.data[0].loaiBDSId);
                }
            })
            .catch(error => {
                console.log(error.message);
            })
    }, []);



    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Lấy tệp đầu tiên trong danh sách (nếu có)
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Tạo URL tạm thời
            setHinhAnh(imageUrl); // Cập nhật state với URL của hình ảnh
        }
    };

    const themBDS = async (e) => {
        e.preventDefault();

        if (!hinhAnh) {
            alert("Vui lòng chọn một tệp trước!");
            return;
        }

        let tenHinhAnh = null;

        const files = e.target.file.files;
        const formData = new FormData();
        formData.append("hinhAnh", files[0]);
        await axios.post('http://localhost:8080/bds/themAnh', formData, {
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

        const bds = {
            hinhAnh: tenHinhAnh,
            tenBDS: tenBDS,
            moTa: moTa,
            giaTien: giaTien,
            diaChi: diaChi,
            loaiBDS: {
                loaiBDSId: loaiBDS
            }
        }

        await axios.post('http://localhost:8080/bds/themBDS', bds, {
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
    }

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    Thêm Bất Động Sản
                </h2>
                <form onSubmit={(e) => themBDS(e)} className="space-y-4">
                    <div >
                        <label htmlFor="tenBDS" className="block text-sm font-medium text-gray-700" >
                            Hình ảnh
                        </label>
                        <div className="flex items-ceter justify-center w-20 h-20 border border-black rounded-full">
                            <img className="w-full h-full border border-black rounded-full" src={hinhAnh} alt="" />
                        </div>
                        <input name="file" onChange={(e) => handleFileChange(e)} type="file" placeholder="Nhập tên dự án bất động sản" className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                    </div>

                    <div>
                        <label htmlFor="tenBDS" className="block text-sm font-medium text-gray-700" >
                            Tên Dự Án Bất Động Sản
                        </label>
                        <input value={tenBDS} onChange={(e) => setTenBDS(e.target.value)} type="text" placeholder="Nhập tên dự án bất động sản" className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                    </div>

                    <div>
                        <label htmlFor="moTa" className="block text-sm font-medium text-gray-700" >
                            Mô Tả
                        </label>
                        <input value={moTa} onChange={(e) => setMoTa(e.target.value)} type="text" placeholder="Nhập mô tả dự án bất động sản" className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                    </div>



                    <div>
                        <label htmlFor="giaTien" className="block text-sm font-medium text-gray-700" >
                            Giá Tiền
                        </label>
                        <input value={giaTien} onChange={(e) => setGiaTien(e.target.value)} type="text" placeholder="Nhập giá tiền bất động sản" className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                    </div>

                    <div>
                        <label htmlFor="diaChi" className="block text-sm font-medium text-gray-700" >
                            Địa Chỉ
                        </label>
                        <input value={diaChi} onChange={(e) => setDiaChi(e.target.value)} type="text" placeholder="Nhập địa chỉ dự án bất động sản" className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                    </div>

                    <div>
                        <label htmlFor="loaiBDS" className="block text-sm font-medium text-gray-700" >
                            Loại Bất Động Sản
                        </label>
                        <select value={loaiBDS} onChange={(e) => setLoaiBDS(e.target.value)} id="loaiBDS" name="loaiBDS" className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required >
                            {loaiBDSList && loaiBDSList.map(lbds => (
                                <option key={lbds.loaiBDSId} value={lbds.loaiBDSId}>{lbds.tenLoaiBDS}</option>
                            ))}
                        </select>
                    </div>


                    {/* Nút Submit */}
                    <div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300" >
                            Thêm Bất Động Sản
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddBDS