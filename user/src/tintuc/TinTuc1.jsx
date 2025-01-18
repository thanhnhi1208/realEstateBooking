import React from "react";
import { assets } from "../assets/assets";

const TinTuc1 = () => {
    const data = {
        id: 1,
        tieuDe: "Giá bất động sản khu vực trung tâm tăng mạnh",
        moTa: "Thị trường bất động sản khu vực trung tâm tiếp tục tăng trưởng, thu hút sự quan tâm của nhà đầu tư.",
        ngayDang: "01/01/2025",
        hinhAnh: assets.tt2, // Thay thế bằng đường dẫn hình ảnh đúng
        noiDung: `
            Trong năm 2024, thị trường bất động sản tại khu vực trung tâm của các thành phố lớn như Hà Nội, TP.HCM và Đà Nẵng đã chứng kiến
            sự tăng trưởng vượt bậc. Theo báo cáo từ các chuyên gia kinh tế, giá trị bất động sản tại đây tăng trung bình 15% so với năm 2023.

            Nguyên nhân chính đến từ sự gia tăng nhu cầu nhà ở, văn phòng và trung tâm thương mại tại các khu vực trung tâm. Ngoài ra, các dự án
            phát triển hạ tầng như mở rộng hệ thống giao thông và cải thiện cơ sở hạ tầng đô thị cũng đóng vai trò quan trọng trong việc thúc đẩy giá trị bất động sản.

            Bên cạnh đó, sự hiện diện của các doanh nghiệp lớn và tổ chức quốc tế tại trung tâm thành phố khiến nhu cầu về văn phòng cao cấp tăng mạnh. 
            Điều này góp phần tạo ra cơ hội lớn cho các nhà đầu tư bất động sản, đặc biệt là trong phân khúc cao cấp.

            Tuy nhiên, sự tăng trưởng này cũng đặt ra không ít thách thức. Giá bất động sản cao khiến người dân gặp khó khăn trong việc sở hữu nhà ở, đặc biệt
            là các gia đình trẻ và người có thu nhập trung bình. Chính phủ đã có nhiều chính sách để kiểm soát giá nhà đất, nhưng hiệu quả thực tế vẫn đang được đánh giá.

            Trong năm 2025, các chuyên gia dự báo rằng thị trường bất động sản trung tâm sẽ tiếp tục tăng trưởng, nhưng với tốc độ chậm hơn. Các nhà đầu tư cần cẩn trọng
            hơn trong việc lựa chọn dự án, đặc biệt khi rủi ro về bong bóng bất động sản ngày càng gia tăng.
            `,
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{data.tieuDe}</h1>
            <p className="text-sm text-gray-500 mb-4">{data.ngayDang}</p>
            <img
                src={data.hinhAnh}
                alt={data.tieuDe}
                className="w-full h-64 object-cover rounded-md mb-6"
            />
            <p className="text-gray-700 leading-relaxed">{data.noiDung}</p>
        </div>
    );
};

export default TinTuc1;
