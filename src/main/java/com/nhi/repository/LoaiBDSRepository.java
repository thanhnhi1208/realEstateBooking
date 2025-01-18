package com.nhi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhi.model.LoaiBDS;

public interface LoaiBDSRepository extends JpaRepository<LoaiBDS, Long> {
	LoaiBDS findByTenLoaiBDSIgnoreCase(String tenLoaiBDS);
}
