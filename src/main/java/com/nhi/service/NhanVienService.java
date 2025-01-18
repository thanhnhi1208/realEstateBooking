package com.nhi.service;


import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nhi.model.NhanVien;
import com.nhi.repository.AdminRepository;
import com.nhi.repository.NguoiDungRepository;
import com.nhi.repository.NhanVienRepository;
import com.nhi.util.UploadFileToFolder;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class NhanVienService {

	private final NhanVienRepository nhanVienRepository;
	private final NguoiDungRepository nguoiDungRepository;
	private final AdminRepository adminRepository;
	private final UploadFileToFolder uploadFileToFolder;
	
	public NhanVien themNhanVien(NhanVien nhanVien) {
		
		if(nguoiDungRepository.findByTaiKhoan(nhanVien.getTaiKhoan()) != null) {
			return null;
		}
		
		if(adminRepository.findByTaiKhoan(nhanVien.getTaiKhoan()) != null) {
			return null;
		}
		
		if(nhanVienRepository.findByTaiKhoan(nhanVien.getTaiKhoan()) != null) {
			return null;
		}
		
		String matKhau = BCrypt.hashpw(nhanVien.getMatKhau(), BCrypt.gensalt());
		nhanVien.setMatKhau(matKhau);
		return this.nhanVienRepository.save(nhanVien);
	}
	
	public NhanVien chinhSuaNhanVien(NhanVien nhanVien) {
		NhanVien nhanVienTamThoi = nhanVienRepository.findById(nhanVien.getNhanVienId()).orElse(null);
		if(nhanVienTamThoi == null) {
			return null;
		}
		
		if(nhanVien.getHinhAnh() == null) {
			nhanVien.setHinhAnh(nhanVienTamThoi.getHinhAnh());
		}
		
		if(!nhanVien.getMatKhau().equals(nhanVienTamThoi.getMatKhau())) {
			String matKhau = BCrypt.hashpw(nhanVien.getMatKhau(), BCrypt.gensalt());
			nhanVien.setMatKhau(matKhau);
		}
		
		return this.nhanVienRepository.save(nhanVien);
	}

	public String themHinhAnhNV(MultipartFile hinhAnh) {
		return uploadFileToFolder.uploadFileOfImageNV(hinhAnh);
	}

	public List<NhanVien> findTatCaNhanVien() {
		return nhanVienRepository.findAll();
	}

	public NhanVien timNhanVienById(long nhanVienId) {
		return nhanVienRepository.findById(nhanVienId).get();
	}
}
