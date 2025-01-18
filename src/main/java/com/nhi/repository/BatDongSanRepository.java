package com.nhi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nhi.model.BatDongSan;

public interface BatDongSanRepository extends JpaRepository<BatDongSan, Long> {
	List<BatDongSan> findByLoaiBDS_loaiBDSIdAndAnFalse(long loaiBDSId);
	
	List<BatDongSan> findByLoaiBDS_loaiBDSId(long loaiBDSId);
	
	 List<BatDongSan> findByAnFalse();
	 
	List<BatDongSan> findByDiaChiContainingIgnoreCase(String diaChi);
}
