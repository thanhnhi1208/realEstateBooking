package com.nhi.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nhi.model.BatDongSan;
import com.nhi.model.LoaiBDS;
import com.nhi.repository.BatDongSanRepository;
import com.nhi.repository.LoaiBDSRepository;
import com.nhi.util.UploadFileToFolder;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BatDongSanService {

	private final BatDongSanRepository batDongSanRepository;
	private final UploadFileToFolder uploadFileToFolder;
	private final LoaiBDSRepository loaiBDSRepository;
	
	public String themHinhAnhBDS(MultipartFile hinhAnh) {
		return uploadFileToFolder.uploadFileOfImageBDS(hinhAnh);
	}
	
	public BatDongSan themBatDongSan(BatDongSan bds) {
		bds.setNgayDang(LocalDateTime.now());
		bds.setAn(false);
		return this.batDongSanRepository.save(bds);
	}


	public List<BatDongSan> findBDS(long loaiBDSId) {
		if(loaiBDSId ==0) {
			return batDongSanRepository.findByAnFalse();
		}
		
		return batDongSanRepository.findByLoaiBDS_loaiBDSIdAndAnFalse(loaiBDSId);
	}
	
	public List<BatDongSan> findBDSKhongAnFalse(long loaiBDSId) {
		if(loaiBDSId ==0) {
			return batDongSanRepository.findAll();
		}
		
		return batDongSanRepository.findByLoaiBDS_loaiBDSId(loaiBDSId);
	}
	
	

	public List<LoaiBDS> findLoaiBDS() {
		return loaiBDSRepository.findAll();
	}

	public BatDongSan findBDSById(long bdsId) {
		return batDongSanRepository.findById(bdsId).get();
	}

	public void anHoacMoBDS(long bdsId) {
		BatDongSan bds = this.batDongSanRepository.findById(bdsId).get();
		bds.setAn(!bds.isAn());
		this.batDongSanRepository.save(bds);
	}

	public BatDongSan chinhSuaBDS(BatDongSan bds) {
		if(bds.getHinhAnh() == null) {
			BatDongSan bdsTemp = this.batDongSanRepository.findById(bds.getBdsId()).get();
			bds.setHinhAnh(bdsTemp.getHinhAnh());
			return this.batDongSanRepository.save(bds);
		}else {
			return this.batDongSanRepository.save(bds);
		}
		
	}

	public List<BatDongSan> timKiemTheoQuan(String diaChi) {
		return  batDongSanRepository.findByDiaChiContainingIgnoreCase(diaChi);
	}
}
