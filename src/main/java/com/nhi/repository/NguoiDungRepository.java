package com.nhi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhi.model.NguoiDung;

public interface NguoiDungRepository extends JpaRepository<NguoiDung, Long> {
	NguoiDung findByTaiKhoan(String taiKhoan);
	
}
