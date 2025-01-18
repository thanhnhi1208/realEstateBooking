import { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";


const EmployeeList = () => {
  const [listNV, setListNV] = useState([])
  const navigate = useNavigate();

  useEffect(() => {

    axios.get('http://localhost:8080/nhanVien', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token-nguoiDung')}`
      }
    }).then(response => {
      setListNV(response.data);
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
  }, [])



  return (
    <div className="container mx-auto px-8 mt-10">
      {listNV && listNV.map((nv) => (
        <div key={nv.nhanVienId} className="flex items-center bg-gray-100 p-4 mb-4 rounded shadow-md" >

          <img src={`http://localhost:8080/nhanVien/images/${nv.hinhAnh}`} alt="" className="w-16 h-16 rounded-full mr-4" />

          <div>
            <h2 className="text-lg font-semibold">{nv.hoVaTen}</h2>
            <p className="text-gray-600">
              Email: <span className="text-blue-500">{nv.taiKhoan}</span>
            </p>
            <p className="text-gray-600">Chức Vụ: <span className='font-semibold'>Nhân Viên Môi Giới</span></p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EmployeeList