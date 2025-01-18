package com.nhi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhi.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
	Admin findByTaiKhoan(String taiKhoan);
}
