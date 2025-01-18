package com.nhi.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhi.model.Admin;
import com.nhi.model.NguoiDung;
import com.nhi.model.NhanVien;
import com.nhi.service.NguoiDungService;

import lombok.RequiredArgsConstructor;



@RequiredArgsConstructor
@RequestMapping("/nguoiDung")
@RestController
public class NguoiDungController {
	private final NguoiDungService nguoiDungService;
	
	@PostMapping
	public ResponseEntity<?> themNguoiDung(@RequestBody NguoiDung nguoiDung) {
		return ResponseEntity.ok(nguoiDungService.themNguoiDung(nguoiDung));
	}
	
	@PutMapping
	public ResponseEntity<?> chinhSuaNguoiDung(@RequestBody NguoiDung nguoiDung) {
		return ResponseEntity.ok(nguoiDungService.chinhSuaNguoiDung(nguoiDung));
	}
	
	@GetMapping
	public ResponseEntity<?> timKiemNguoiDungById(@RequestParam("nguoiDungId") long nguoiDungId) {
		return ResponseEntity.ok(nguoiDungService.timKiemNguoiDungById(nguoiDungId));
	}
	
//	nguoiDung, admin dang nhap
	
	@PostMapping("/dangNhap")
	public ResponseEntity<?> nguoiDungDangNhap(@RequestBody NguoiDung nguoiDung) {
		return ResponseEntity.ok(nguoiDungService.nguoiDungDangNhap(nguoiDung));
	}
	
	@PostMapping("/admin/dangNhap")
	public ResponseEntity<?> adminDangNhap(@RequestBody Admin admin) {
		return ResponseEntity.ok(nguoiDungService.adminDangNhap(admin));
	}
	
	@PostMapping("/nhanVien/dangNhap")
	public ResponseEntity<?> nhanVienDangNhap(@RequestBody NhanVien nv) {
		return ResponseEntity.ok(nguoiDungService.nhanVienDangNhap(nv));
	}
	
	
}
