package com.nhi.api;

import java.net.MalformedURLException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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

import com.nhi.model.BatDongSan;
import com.nhi.service.BatDongSanService;

import lombok.RequiredArgsConstructor;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;

@RequiredArgsConstructor
@RequestMapping("/bds")
@RestController
public class BatDongSanController {
	private final BatDongSanService bdsService;

	@PostMapping("/themAnh")
	public ResponseEntity<?> themBatDongSan(@RequestPart("hinhAnh") MultipartFile hinhAnh) {
		return ResponseEntity.ok(bdsService.themHinhAnhBDS(hinhAnh));
	}

	@PostMapping("/themBDS")
	public ResponseEntity<?> themBatDongSan(@RequestBody BatDongSan bds) {
		return ResponseEntity.ok(bdsService.themBatDongSan(bds));
	}
	
	@PutMapping("/chinhSuaBDS")
	public ResponseEntity<?> chinhSuaBDS(@RequestBody BatDongSan bds) {
		return ResponseEntity.ok(bdsService.chinhSuaBDS(bds));
	}
	
	@PutMapping("/anHoacMoBDS/{bdsId}")
	public ResponseEntity<?> anHoacMoBDS(@PathVariable("bdsId") long bdsId) {
		bdsService.anHoacMoBDS(bdsId);
		return ResponseEntity.accepted().build();
	}
	
//	bên dưới là get

	@GetMapping("/loaiBDS")
	public ResponseEntity<?>  findLoaiBDS() {
		return ResponseEntity.ok(bdsService.findLoaiBDS());
	}
	
	@GetMapping
	public ResponseEntity<?>  findBDS(@RequestParam("loaiBDS_id") long loaiBDSId) {
		return ResponseEntity.ok(bdsService.findBDS(loaiBDSId));
	}
	
	@GetMapping("/findBDSKhongAnFalse")
	public ResponseEntity<?>  findBDSKhongAnFalse(@RequestParam("loaiBDS_id") long loaiBDSId) {
		return ResponseEntity.ok(bdsService.findBDSKhongAnFalse(loaiBDSId));
	}
	
	@GetMapping("/findById/{bdsId}")	
	public ResponseEntity<?>  findBDSById(@PathVariable("bdsId") long bdsId) {
		return ResponseEntity.ok(bdsService.findBDSById(bdsId));
	}
	
	@GetMapping("/timKiemTheoQuan")
	public ResponseEntity<?>  timKiemTheoQuan(@RequestParam("diaChi") String diaChi) {
		return ResponseEntity.ok(bdsService.timKiemTheoQuan(diaChi));
	}
	
	@GetMapping("/images/{hinhAnh}")
	public ResponseEntity<Resource> getImageFromFolder(@PathVariable("hinhAnh") String file) throws MalformedURLException{
		Path path = Paths.get("src/main/resources/static/bds/"+file);
        // Load the resource
        Resource resource = new UrlResource(path.toUri());
        // Return ResponseEntity with image content type
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
	}
	
	
}
