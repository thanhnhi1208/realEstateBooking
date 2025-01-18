package com.nhi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nhi.model.LoaiBDS;
import com.nhi.repository.LoaiBDSRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoaiBDSService {
	private final LoaiBDSRepository loaiBDSRepository;
	
	public LoaiBDS themLoaiBDS(LoaiBDS loaiBDS) {
		if(loaiBDSRepository.findByTenLoaiBDSIgnoreCase(loaiBDS.getTenLoaiBDS()) != null) {
			return null;
		}
		
		return loaiBDSRepository.save(loaiBDS);
	}

	public LoaiBDS chinhSuaLoaiBDS(LoaiBDS loaiBDS) {
		if(loaiBDSRepository.findByTenLoaiBDSIgnoreCase(loaiBDS.getTenLoaiBDS()) != null 
				&& loaiBDSRepository.findByTenLoaiBDSIgnoreCase(loaiBDS.getTenLoaiBDS()).getLoaiBDSId() != loaiBDS.getLoaiBDSId()) {
			return null;
		}
		
		return loaiBDSRepository.save(loaiBDS);
	}

	public List<LoaiBDS> timTatCa() {
		return this.loaiBDSRepository.findAll();
	}

	public LoaiBDS timLoaiBDSByLoaiBDSId(long loaiBDSId) {
		return this.loaiBDSRepository.findById(loaiBDSId).get();
	}

}
