import { assets } from "../assets/assets";


const About = () => {
    return (
        <div>
            <div className="text-center text-3xl pt-10 text-gray-500">
                <span className="text-gray-700 font-bold">Về Chúng Tôi</span>
            </div>

            <div className="my-16 flex flex-col md:flex-row gap-16 ml-40">
                <img className="w-full md:max-w-[360px]" src={assets.about_image} alt="" />
                <div className="flex flex-col justify-center gap-8 md:w-2/4 text-sm text-gray-700">
                    <p>Chúng tôi là đơn vị chuyên cung cấp các dịch vụ bất động sản uy tín và chất lượng,
                        cam kết mang lại những giá trị tối ưu cho khách hàng. Với đội ngũ chuyên gia giàu kinh nghiệm và
                        hiểu biết sâu rộng về thị trường, chúng tôi luôn nỗ lực mang đến những giải pháp phù hợp nhất,
                        giúp khách hàng tìm kiếm và đầu tư vào các bất động sản tiềm năng.</p>
                    <p>Trang web chính thức của Công ty TNHH HGM Holdings trong lĩnh vực bất động sản.
                        Chúng tôi mang đến danh mục bất động sản đa dạng, từ căn hộ cao cấp, nhà phố đến văn phòng cho thuê và đất nền tiềm
                        năng. Với hệ thống đặt lịch xem nhà trực tuyến, công cụ tìm kiếm thông minh và đội ngũ tư vấn tận tâm,
                        HGM Real Estate cam kết đáp ứng mọi nhu cầu của bạn với dịch vụ chuyên nghiệp và minh bạch.
                        Truy cập ngay để khám phá các dự án nổi bật và sở hữu bất động sản lý tưởng!

                    </p>
                    <p>Địa chỉ: 894 An Dương Vương Phường 13 Quận 6 TP.HCM</p>
                </div>
            </div>

            <div className="text-xl my-4">
                <p>Tại Sao Nên <span className="text-gray-700 font-semibold">Chọn Chúng Tôi</span> </p>
            </div>

            <div className="flex flex-col md:flex-row mb-20">
                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>Chuyên Môn Cao và Kinh Nghiệm Dày Dặn:</b>
                    <p>Công ty sở hữu đội ngũ chuyên gia với nhiều năm kinh nghiệm trong ngành bất động sản, đảm bảo cung cấp các dịch vụ tư vấn và hỗ trợ giao dịch chính xác, uy tín.</p>
                </div>

                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>Danh Mục Sản Phẩm Đa Dạng và Chất Lượng Cao:</b>
                    <p>Công ty cung cấp một loạt các sản phẩm bất động sản từ căn hộ, đất nền, nhà ở cho đến các dự án thương mại, phù hợp với nhu cầu của nhiều đối tượng khách hàng.</p>
                </div>

                <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>Dịch Vụ Hỗ Trợ Khách Hàng Tận Tâm và Toàn Diện:</b>
                    <p>Công ty không chỉ tập trung vào việc giao dịch mua bán bất động sản mà còn cung cấp dịch vụ hỗ trợ toàn diện như tư vấn pháp lý, tài chính, và hỗ trợ thủ tục giấy tờ.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
