package com.nhi.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.quartz.SchedulerException;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.nhi.model.BatDongSan;
import com.nhi.model.LichHen;
import com.nhi.model.NguoiDung;
import com.nhi.model.NhanVien;
import com.nhi.repository.BatDongSanRepository;
import com.nhi.repository.LichHenRepository;
import com.nhi.repository.NguoiDungRepository;
import com.nhi.repository.NhanVienRepository;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LichHenService {
	
	private final LichHenRepository lichHenRepository;
	private final EmailService emailService;
	private final NhanVienRepository nhanVienRepository;
	private final BatDongSanRepository batDongSanRepository;
	private final NguoiDungRepository nguoiDungRepository;
	private final SimpMessagingTemplate messagingTemplate;
	private final QuartzSchedulerService quartzService;
	
	public String kiemTraLich(long bdsId, LocalDateTime ngayGioHen) {
		if(lichHenRepository.findBybds_bdsIdAndNgayGioHen(bdsId, ngayGioHen) != null) {
			return "Đã có người đặt lịch hẹn vào giờ này rồi !";
		}else {
			return null;
		}
	}
	
//	public String datLichHen(LichHen lichHen) {
//		if(lichHenRepository.findBybds_bdsIdAndNgayGioHen(lichHen.getBds().getBdsId(), lichHen.getNgayGioHen()) != null) {
//			return "Đã có người đặt lịch hẹn vào giờ này rồi !";
//		}
//		
//		lichHen.setChapNhan(false);
//		lichHen.setHuyHen(false);
//		
//		this.lichHenRepository.save(lichHen);
//		return "Đã đặt lịch hẹn, vui lòng chờ xác nhận";
//	}

	public String adminXacNhanLich(long lichHenId, long nhanVienId, String hanhDong) throws MessagingException, JsonProcessingException, SchedulerException {
		LichHen lichHen = lichHenRepository.findById(lichHenId).get();
		if(hanhDong.equals("CHAP_NHAN")) {
			NhanVien nv =  nhanVienRepository.findById(nhanVienId).get();
			lichHen.setNhanVien(nv);
			lichHen.setChapNhan(true);
		}else {
			lichHen.setHuyHen(true);
		}
		
		lichHenRepository.save(lichHen);
		
		emailService.sendscheduledConfirmation(lichHen);
		if(lichHen.isChapNhan()) {
			quartzService.scheduleEmailJob(lichHen, lichHen.getEmailHen(), "Nhắc nhở lịch hẹn", LocalDateTime.now().plusMinutes(1));
		}
		
		return "Xác nhận thành công";
	}

	public String themLichHen(LocalDateTime ngayGioHen, String emailHen, String hoVaTen, String soDienThoai, long bdsId,
			long nguoiDungId) {
		
		String kiemTraLich = kiemTraLich(bdsId, ngayGioHen) ;
		if(kiemTraLich != null) {
			return kiemTraLich;
		}
		
		LichHen lichHen = new LichHen();
		lichHen.setNgayGioHen(ngayGioHen);
		lichHen.setEmailHen(emailHen);
		lichHen.setHoVaTen(hoVaTen);
		lichHen.setSoDienThoai(soDienThoai);
		
		BatDongSan bds = batDongSanRepository.findById(bdsId).get();
		lichHen.setBds(bds);
		
		NguoiDung nguoiDung= nguoiDungRepository.findById(nguoiDungId).get();
		lichHen.setNguoiDung(nguoiDung);
		
		lichHen.setChapNhan(false);
		lichHen.setHuyHen(false);
		
		LichHen lichHenAfterSave =  this.lichHenRepository.save(lichHen);
		sendToMessageToSpecificUser(lichHenAfterSave);
		
		return "Đã đặt lịch hẹn, vui lòng chờ quản trị viên xác nhận";
	}
	
	public void sendToMessageToSpecificUser(@Payload LichHen lichHen) {
		 messagingTemplate.convertAndSend("/topic/all", lichHen);
	}

	public List<Integer> gioTrong(LocalDate ngayHen, long bdsId) {
		 List<Integer> availableHours = new ArrayList<>();
        for (int i = 9; i <= 18; i++) {
            availableHours.add(i);
        }
        
        List<LichHen> lichhenList = lichHenRepository.findByNgayGioHenDayAndBdsId(ngayHen, bdsId);
        for (LichHen lichHen : lichhenList) {
        	int hour = lichHen.getNgayGioHen().getHour();
            availableHours.remove(Integer.valueOf(hour));  
		}
        
		return availableHours;
	}

	public List<LichHen> findAllLichHen() {
		return lichHenRepository.findAllByOrderByLichHenIdDesc();
	}

	public List<NhanVien> nhanVienCoSan(LocalDateTime ngayGioHen) {
		List<NhanVien> nhanVien = nhanVienRepository.findAll();
		
		List<LichHen> lichhenList = lichHenRepository.findByNgayGioHenDay(ngayGioHen);
		for (LichHen lichHen : lichhenList) {
			if(lichHen.getNhanVien() != null) {
				long idNhanVien = lichHen.getNhanVien().getNhanVienId();
	        	nhanVien.removeIf(nv -> nv.getNhanVienId() == idNhanVien);
			}
		}
		
		return nhanVien;
	}

	public List<LichHen> findAllLichHenCuaNguoiDung(long nguoiDungId) {
		return lichHenRepository.findByNguoiDung_nguoiDungIdOrderByLichHenIdDesc(nguoiDungId);
	}

	public List<LichHen> timLichHenTrongNgayCuaNhanVien(long nhanVienId) {
		return lichHenRepository.findByNhanVien_NhanVienIdAndHuyHenFalseAndChapNhanTrueOrderByLichHenId(nhanVienId);
	}

	public void hoanThanhHoacHuyHoanThanhLichHen(long lichHenId) {
		LichHen lh = lichHenRepository.findById(lichHenId).get();
		if(lh.isHoanThanh()) {
			lh.setMoTa(null);
		}
		lh.setHoanThanh(!lh.isHoanThanh());
		lichHenRepository.save(lh);
	}

	public void capNhatMoTaHoanThanh(long lichHenId, String moTa) {
		LichHen lh = lichHenRepository.findById(lichHenId).get();
		lh.setMoTa(moTa);
		lichHenRepository.save(lh);
	}

}
