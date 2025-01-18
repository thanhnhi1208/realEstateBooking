import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const LoaiBDS = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/loaiBDS', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token-admin')}`
            }
        }).then(response => {
            setCategories(response.data);
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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Danh Sách Thể Loại Bất Động Sản</h1>
            <div className="mb-4">
                <button onClick={() => navigate('/them-loai-bds')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    + Thêm Thể Loại
                </button>
            </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">#</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Tên Thể Loại</th>
                        <th className="text-center px-6 py-3 text-sm font-medium text-gray-700">Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map((category, index) => (
                        <tr key={category.loaiBDSId} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-3">{index + 1}</td>
                            <td className="px-6 py-3">{category.tenLoaiBDS}</td>
                            <td className="px-6 py-3 flex justify-center space-x-2">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                    <Link to={`/chinhSuaLoaiBDS/${category.loaiBDSId}`}>
                                        Sửa
                                    </Link>
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoaiBDS
