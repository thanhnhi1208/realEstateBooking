package com.nhi.api;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhi.model.LoaiBDS;
import com.nhi.service.LoaiBDSService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/loaiBDS")
@RestController
public class LoaiBDSController {
	private final LoaiBDSService loaiBDSService;
	
	@PostMapping
	public ResponseEntity<?> themLoaiBDS(@RequestBody LoaiBDS loaiBDS){
		return ResponseEntity.ok(loaiBDSService.themLoaiBDS(loaiBDS));
	}
	
	@PutMapping
	public ResponseEntity<?> chinhSuaLoaiBDS(@RequestBody LoaiBDS loaiBDS){
		return ResponseEntity.ok(loaiBDSService.chinhSuaLoaiBDS(loaiBDS));
	}
	
	@GetMapping
	public ResponseEntity<?> timTatCa(){
		return ResponseEntity.ok(loaiBDSService.timTatCa());
	}
	
	@GetMapping("/timLoaiBDSByLoaiBDSId")
	public ResponseEntity<?> timLoaiBDSByLoaiBDSId(@RequestParam("loaiBDSId") long loaiBDSId){
		return ResponseEntity.ok(loaiBDSService.timLoaiBDSByLoaiBDSId(loaiBDSId));
	}
	
}
