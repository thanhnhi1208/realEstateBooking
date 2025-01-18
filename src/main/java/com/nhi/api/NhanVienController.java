package com.nhi.api;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nhi.model.NhanVien;
import com.nhi.service.NhanVienService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/nhanVien")
@RestController
public class NhanVienController {

	private final NhanVienService nhanVienService;
	
	@PostMapping("/themAnh")
	public ResponseEntity<?> themBatDongSan(@RequestPart("hinhAnh") MultipartFile hinhAnh) {
		return ResponseEntity.ok(nhanVienService.themHinhAnhNV(hinhAnh));
	}
	
	@PostMapping
	public ResponseEntity<?> themNhanVien(@RequestBody NhanVien nhanVien) {
		System.out.println(nhanVien);
		return ResponseEntity.ok(nhanVienService.themNhanVien(nhanVien));
	}
	
	@PutMapping
	public ResponseEntity<?> chinhSuaNhanVien(@RequestBody NhanVien nhanVien) {
		return ResponseEntity.ok(nhanVienService.chinhSuaNhanVien(nhanVien));
	}
	
	@GetMapping("timNhanVienById")
	public ResponseEntity<?> timNhanVienById(@RequestParam("nhanVienId") long nhanVienId) {
		return ResponseEntity.ok(nhanVienService.timNhanVienById(nhanVienId));
	}
	
	@GetMapping
	public ResponseEntity<?> findTatCaNhanVien() {
		return ResponseEntity.ok(nhanVienService.findTatCaNhanVien());
	}
	
	@GetMapping("/images/{hinhAnh}")
	public ResponseEntity<Resource> getImageFromFolder(@PathVariable("hinhAnh") String file) throws MalformedURLException{
		Path path = Paths.get("src/main/resources/static/nhanVien/"+file);
        // Load the resource
        Resource resource = new UrlResource(path.toUri());
        // Return ResponseEntity with image content type
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
	}
}
