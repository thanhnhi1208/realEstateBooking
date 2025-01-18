package com.nhi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhi.model.NhanVien;

public interface NhanVienRepository extends JpaRepository<NhanVien, Long> {
	NhanVien findByTaiKhoan(String taiKhoan);
}
