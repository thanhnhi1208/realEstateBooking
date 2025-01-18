import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const TinTuc = () => {

    const navigate = useNavigate();

    const danhSachTinTuc = [
        {
            id: 1,
            tieuDe: "Giá bất động sản khu vực trung tâm tăng mạnh",
            moTa: "Thị trường bất động sản khu vực trung tâm tiếp tục tăng trưởng, thu hút sự quan tâm của nhà đầu tư.",
            ngayDang: "01/01/2025",
            hinhAnh: assets.tt2,
        },

    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Tin Tức Bất Động Sản</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {danhSachTinTuc.map((tin) => (
                    <div
                        key={tin.id}
                        className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <img src={tin.hinhAnh} alt={tin.tieuDe} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{tin.tieuDe}</h2>
                            <p className="text-sm text-gray-500 mt-2">{tin.ngayDang}</p>
                            <p className="text-gray-700 mt-3">{tin.moTa}</p>
                            <button onClick={() => navigate('/tt1')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Xem chi tiết
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TinTuc;
