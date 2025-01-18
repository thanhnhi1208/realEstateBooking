import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const EmployeeList = () => {
  const [listNV, setListNV] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/nhanVien', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token-admin')}`
      }
    }).then(response => {
      setListNV(response.data);
    })
      .catch(error => {
        if (error.response.status === 403) {
          localStorage.removeItem('token-admin');
          navigate('/login');
        } else {
          console.log("Lỗi khác: ", error.response.data);
        }
      })


  }, [])



  return (
    <div className="container mx-auto px-8 mt-10">

      <button onClick={() => navigate('/them-nhan-vien')} className="bg-green-500 text-white px-4 py-2 mb-4 rounded hover:bg-green-600" >
        + Thêm Nhân Viên
      </button>

      {listNV.map((nv) => (
        <div key={nv.nhanVienId} className="flex items-center bg-gray-100 p-4 mb-4 rounded shadow-md" >
          {/* Hình ảnh */}
          <img src={`http://localhost:8080/nhanVien/images/${nv.hinhAnh}`} alt="" className="w-16 h-16 rounded-full mr-4" />

          {/* Thông tin nhân viên */}
          <div className="flex-grow">
            <h2 className="text-lg font-semibold">{nv.hoTen}</h2>
            <p className="text-gray-600">  Email: <span className="text-blue-500">{nv.taiKhoan}</span> </p>
          </div>

          {/* <div className="flex gap-2">
            <button onClick={() => handleEdit(nv.nvID)} className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600" >
              Sửa
            </button>

          </div> */}
        </div>
      ))}
    </div>

  )
}

export default EmployeeList