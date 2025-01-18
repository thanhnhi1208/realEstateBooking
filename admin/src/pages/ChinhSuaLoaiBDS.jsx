import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const AddLoaiBDS = () => {
    const [tenLoaiBDS, setTenLoaiBDS] = useState('');
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8080/loaiBDS/timLoaiBDSByLoaiBDSId?loaiBDSId=' + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-admin')}`
            }
        }).then(response => {
            const loaiBDS = response.data;
            setTenLoaiBDS(loaiBDS.tenLoaiBDS);
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

    const chinhSuaLoaiBDS = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8080/loaiBDS', { loaiBDSId: id, tenLoaiBDS: tenLoaiBDS }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-admin')}`
            }
        }).then(response => {
            if (response.data && response.data != null) {
                alert('Chỉnh sửa thành công');
                window.location.reload();
            } else {
                alert('Đã trùng tên loại bất động sản');
            }
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
                    Chỉnh sửa Loại Bất Động Sản
                </h2>
                <form onSubmit={chinhSuaLoaiBDS} className="space-y-4">

                    <div>
                        <label htmlFor="theLoai" className="block text-sm font-medium text-gray-700" >
                            Thể Loại Bất Động Sản
                        </label>
                        <input value={tenLoaiBDS} onChange={(e) => setTenLoaiBDS(e.target.value)} type="text" placeholder="Nhập thể loại bất động sản" className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                    </div>

                    <div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300" >
                            Chỉnh sửa Thể Loại Bất Động Sản
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddLoaiBDS