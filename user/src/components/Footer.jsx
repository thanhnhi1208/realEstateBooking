import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* Left Section */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                        Cuộc sống xanh với Nhà Việt mang đến không gian sống tươi mát, hòa quyện cùng thiên nhiên,
                        tạo nên một môi trường sống trong lành và hạnh phúc. Nhà Việt không chỉ là nơi trú ngụ,
                        mà còn là tổ ấm lý tưởng cho gia đình bạn, nơi mỗi ngày tràn đầy năng lượng tích cực, thư giãn và an yên.
                        Với sự kết hợp hoàn hảo giữa thiết kế hiện đại và thiên nhiên xanh mát, Nhà Việt là lựa chọn tuyệt vời
                        cho những ai mong muốn một cuộc sống bền vững và trọn vẹn.
                    </p>
                </div>

                {/* Center Section */}
                <div>
                    <p className='text-xl font-medium mb-5'>PAGE</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>Dự án</li>
                        <li>Chuyên viên môi giới</li>
                        <li>Về chúng tôi</li>
                    </ul>
                </div>

                {/* Right Section */}
                <div>
                    <p className='text-xl font-medium mb-5'>Liên Hệ</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+0-123-456-789</li>
                        <li>thanhnhi@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Copyright text */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024 @ Thanhnhi.dev - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer