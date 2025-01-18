import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Logo = () => {
    const navigate = useNavigate();


    const [currentImage, setCurrentImage] = useState(0); // Trạng thái lưu hình ảnh hiện tại

    const images = [assets.noiThat1, assets.noiThat2]; // Danh sách hình ảnh

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length); // Chuyển đổi hình ảnh
        }, 2500); // Chuyển ảnh sau mỗi 2 giây

        return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }, [images.length]);

    return (
        <div>
            <div className="flex flex-col md:flex-row mt-10 gap-8 hover:bg-blue-400 hover:text-white transition-all">
                <img onClick={() => navigate('/')} className="w-auto h-[400px]" src={assets.nenLogo} alt="Nền logo" />

                <div className="flex flex-col justify-center  text-lg">
                    <p className="mb-4">
                        Trang web của chúng tôi là nơi kết nối hoàn hảo dành cho những ai đang tìm kiếm bất động sản. Với giao diện thân thiện và hệ thống tìm kiếm thông minh, bạn dễ dàng khám phá các lựa chọn phù hợp từ nhà ở, căn hộ, đến phòng studio chỉ trong vài phút.
                    </p>
                    <p>
                        Hãy bắt đầu hành trình của bạn ngay hôm nay với các tính năng hỗ trợ tối ưu như đặt lịch hẹn trực tuyến và thông tin chi tiết từng bất động sản. "Bất động sản" cam kết mang lại trải nghiệm nhanh chóng, an toàn, và đáng tin cậy cho mọi giao dịch của bạn!
                    </p>
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <img onClick={() => navigate('/')} src={images[currentImage]} alt={`Nội thất ${currentImage + 1}`} className="w-full h-[500px] object-cover transition-all duration-500 ease-in-out"
                />
            </div>

            <div onClick={() => navigate('/')} className="flex items-center justify-between mt-10 hover:bg-blue-400 hover:text-white transition-all">
                <p className="w-1/3 ml-28 text-lg">
                    <span className='text-blue-900 font-bold'>Nhà Xanh</span> là không gian sống bền vững, hài hòa với thiên nhiên. Với thiết kế tiết kiệm năng lượng và sử dụng vật liệu thân thiện, nhà xanh mang lại môi trường trong lành và hiện đại.
                </p>
                <img src={assets.nenLogo1} alt="" className="w-1/2" />
            </div>


            <div onClick={() => navigate('/')} className="flex items-center justify-between mt-10 hover:bg-blue-400 hover:text-white transition-all">
                <img src={assets.nenLogo2} alt="" className="w-1/2" />
                <p className="w-1/3 text-lg mr-28"> <span className='text-blue-900 font-bold'>Gia đình nhà ấm</span> là nơi tình yêu thương, sự gắn kết và quan tâm lẫn nhau luôn hiện hữu.
                    Đó là không gian ấm cúng, nơi mọi người cùng chia sẻ niềm vui, nỗi buồn và hỗ trợ nhau trong cuộc sống.</p>
            </div>


        </div>
    )
}

export default Logo
