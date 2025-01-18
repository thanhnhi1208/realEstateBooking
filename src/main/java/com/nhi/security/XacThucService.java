package com.nhi.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nhi.model.Admin;
import com.nhi.model.NguoiDung;
import com.nhi.model.NhanVien;
import com.nhi.repository.AdminRepository;
import com.nhi.repository.NguoiDungRepository;
import com.nhi.repository.NhanVienRepository;

import java.util.Optional;

@Service
public class XacThucService implements UserDetailsService {

	@Autowired
	private NguoiDungRepository nguoiDungRepo;

	@Autowired
	private AdminRepository adminRepo;

	@Autowired
	private NhanVienRepository nhanVienRepo;

//    @Autowired
//    private PasswordEncoder encoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		NguoiDung nguoiDung = nguoiDungRepo.findByTaiKhoan(username);
		Admin admin = adminRepo.findByTaiKhoan(username);
		NhanVien nhanVien = nhanVienRepo.findByTaiKhoan(username);

		if (nguoiDung != null) {
			return new UserInfoDetails(new ThongTinNguoiDung(nguoiDung.getNguoiDungId(), nguoiDung.getTaiKhoan(),
					nguoiDung.getMatKhau(), "NGUOI_DUNG"));
		}

		if (admin != null) {
			return new UserInfoDetails(
					new ThongTinNguoiDung(admin.getAdminId(), admin.getTaiKhoan(), admin.getMatKhau(), "ADMIN"));
		}

		return new UserInfoDetails(new ThongTinNguoiDung(nhanVien.getNhanVienId(), nhanVien.getTaiKhoan(),
				nhanVien.getMatKhau(), "NHAN_VIEN"));

	}

}
