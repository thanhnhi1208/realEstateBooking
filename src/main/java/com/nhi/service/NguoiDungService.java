package com.nhi.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.nhi.model.Admin;
import com.nhi.model.NguoiDung;
import com.nhi.model.NhanVien;
import com.nhi.repository.AdminRepository;
import com.nhi.repository.NguoiDungRepository;
import com.nhi.repository.NhanVienRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NguoiDungService {
	
	private final NguoiDungRepository nguoiDungRepository;
	private final AdminRepository adminRepository;
	private final NhanVienRepository nhanVienRepository;
	
	public NguoiDung themNguoiDung(NguoiDung nguoiDung) {
		if(nguoiDungRepository.findByTaiKhoan(nguoiDung.getTaiKhoan()) != null) {
			return null;
		}
		
		if(adminRepository.findByTaiKhoan(nguoiDung.getTaiKhoan()) != null) {
			return null;
		}
		
		if(nhanVienRepository.findByTaiKhoan(nguoiDung.getTaiKhoan()) != null) {
			return null;
		}
		
		String matKhau = BCrypt.hashpw(nguoiDung.getMatKhau(), BCrypt.gensalt());
		nguoiDung.setMatKhau(matKhau);
		return this.nguoiDungRepository.save(nguoiDung);
	}

	public Long nguoiDungDangNhap(NguoiDung nguoiDung) {
		NguoiDung check = nguoiDungRepository.findByTaiKhoan(nguoiDung.getTaiKhoan());
		if(check == null) {
			return null;
		}
		boolean result = BCrypt.checkpw(nguoiDung.getMatKhau(), check.getMatKhau());
		if(result) {
			return check.getNguoiDungId();
		}else {
			return null;
		}
	}

	public Long adminDangNhap(Admin admin) {
		Admin check = adminRepository.findByTaiKhoan(admin.getTaiKhoan());
		if(check == null) {
			return null;
		}
		boolean result = BCrypt.checkpw(admin.getMatKhau(), check.getMatKhau());
		if(result) {
			return check.getAdminId();
		}else {
			return null;
		}
	}

	public Long nhanVienDangNhap(NhanVien nv) {
		NhanVien check = nhanVienRepository.findByTaiKhoan(nv.getTaiKhoan());
		if(check == null) {
			return null;
		}
		boolean result = BCrypt.checkpw(nv.getMatKhau(), check.getMatKhau());
		if(result) {
			return check.getNhanVienId();
		}else {
			return null;
		}
	}

	public NguoiDung chinhSuaNguoiDung(NguoiDung nguoiDung) {
		return nguoiDungRepository.save(nguoiDung);
	}

	public NguoiDung timKiemNguoiDungById(long nguoiDungId) {
		return nguoiDungRepository.findById(nguoiDungId).get();
	}
	

}
