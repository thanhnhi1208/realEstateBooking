package com.nhi.api;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.quartz.SchedulerException;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.nhi.model.BatDongSan;
import com.nhi.model.LichHen;
import com.nhi.service.LichHenService;
import com.nhi.service.RabbitMQProducer;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/lichHen")
@RestController
public class LichHenController {
	
	private final LichHenService lichHenService;

	private final RabbitMQProducer rabbitMQProducer;

	
	@PostMapping("/datLich")
	public ResponseEntity<?> datLichHen(@RequestBody LichHen lichHen) {
		String kiemTraLich = lichHenService.kiemTraLich(lichHen.getBds().getBdsId(), lichHen.getNgayGioHen());
		if(kiemTraLich != null) {
			return ResponseEntity.ok(kiemTraLich);
		}
		
		rabbitMQProducer.sendMessage(lichHen);
		return ResponseEntity.ok("Vui lòng kiểm trả email để xác nhận lịch hẹn");
	}
	
	@GetMapping("/themLichHen")
	public ResponseEntity<?> themLichHen(@RequestParam("ngayGioHen") LocalDateTime ngayGioHen, 
			@RequestParam("emailHen") String emailHen, 
			@RequestParam("hoVaTen") String hoVaTen, 
			@RequestParam("soDienThoai") String soDienThoai, 
			@RequestParam("bdsId") long bdsId, 
			@RequestParam("nguoiDungId") long nguoiDungId ) {
		
		return ResponseEntity.ok(lichHenService.themLichHen(ngayGioHen, emailHen, hoVaTen, soDienThoai, bdsId, nguoiDungId));
	}
	
	@PostMapping("/adminXacNhanLich")
	public ResponseEntity<?> adminXacNhanLich(@RequestBody Map<String, String> map 
			) throws MessagingException, JsonProcessingException, NumberFormatException, SchedulerException {
		
		return ResponseEntity.ok(lichHenService.adminXacNhanLich(Long.parseLong(map.get("lichHenId")),
				Long.parseLong(map.get("nhanVienId")), map.get("hanhDong")));
	}
	
	@GetMapping("/gioTrong")
	public ResponseEntity<?>  gioTrong(@RequestParam("ngayHen") LocalDate ngayHen, @RequestParam("bdsId") long bdsId) {
		return ResponseEntity.ok(lichHenService.gioTrong(ngayHen, bdsId));
	}
	
	@GetMapping("/nhanVienCoSan")
	public ResponseEntity<?>  nhanVienCoSan(@RequestParam("ngayGioHen") LocalDateTime ngayGioHen) {
		return ResponseEntity.ok(lichHenService.nhanVienCoSan(ngayGioHen));
	}
	
	@GetMapping("/findAllLichHen")
	public ResponseEntity<?>  findAllLichHen() {
		return ResponseEntity.ok(lichHenService.findAllLichHen());
	}
	
	@GetMapping("/findAllLichHenCuaNguoiDung")
	public ResponseEntity<?>  findAllLichHenCuaNguoiDung(@RequestParam("nguoiDungId") long nguoiDungId) {
		return ResponseEntity.ok(lichHenService.findAllLichHenCuaNguoiDung(nguoiDungId));
	}
	
	@GetMapping("/timLichHenTrongNgayCuaNhanVien/{nhanVienId}")
	public ResponseEntity<?>  timLichHenTrongNgayCuaNhanVien(@PathVariable("nhanVienId") long nhanVienId) {
		return ResponseEntity.ok(lichHenService.timLichHenTrongNgayCuaNhanVien(nhanVienId));
	}
	
	@PutMapping("/hoanThanhHoacHuyHoanThanhLichHen/{lichHenId}")
	public ResponseEntity<?>  hoanThanhHoacHuyHoanThanhLichHen(@PathVariable("lichHenId") long lichHenId) {
		lichHenService.hoanThanhHoacHuyHoanThanhLichHen(lichHenId);
		return ResponseEntity.accepted().build();
	}
	
	@PutMapping("/capNhatMoTaHoanThanh/{lichHenId}/{moTa}")
	public ResponseEntity<?>  capNhatMoTaHoanThanh(@PathVariable("lichHenId") long lichHenId, @PathVariable("moTa") String moTa) {
		lichHenService.capNhatMoTaHoanThanh(lichHenId, moTa);
		return ResponseEntity.accepted().build();
	}
	
//	@PostMapping("/call")
//	public void sendMessage(@RequestBody LichHen lichHen) {
////		kafkaProducerService.sendMessage(lichHen);
//		rabbitMQProducer.sendMessage(lichHen);
////        return "Message sent successfully";
//    }
//	
//	
//	
//	private final RestTemplate restTemplate;
//	
//	@PostMapping("/kafka")
//	public void kafkaTest() {
//		String apiUrl = "http://localhost:8080/lichHen/call"; // Địa chỉ API của bạn
//        ExecutorService executor = Executors.newFixedThreadPool(10); // Sử dụng ThreadPool để gửi các yêu cầu đồng thời
//        
//        BatDongSan bds = new BatDongSan();
//    	bds.setBdsId(3);
//    	NguoiDung nguoiDung = new NguoiDung();
//    	nguoiDung.setNguoiDungId(1);
//		for (int i = 0; i < 1000; i++) {
//			final int index = i;  
//            executor.submit(() -> {
//            	LichHen lichHen =  new LichHen();
//            	LocalDateTime date = LocalDateTime.now();
//            	lichHen.setNgayGioHen(date.plusYears(index));
//            	lichHen.setHoVaTen("Nhi "+index);
//            	lichHen.setSoDienThoai("1");
//            	lichHen.setBds(bds);
//            	lichHen.setNguoiDung(nguoiDung);
//            	
//            	restTemplate.postForObject(apiUrl, lichHen, String.class);
//            });
//        }
//    }
}
