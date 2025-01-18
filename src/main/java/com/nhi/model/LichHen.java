package com.nhi.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class LichHen {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "lichHen_id")
	private long lichHenId;
	
	private LocalDateTime ngayGioHen;
	private String emailHen;
	private String hoVaTen;
	private String soDienThoai;
	private boolean chapNhan;
	private boolean huyHen;
	
	private boolean hoanThanh;
	
	private String moTa;
	
	@ManyToOne
	@JoinColumn(name = "bds_id", referencedColumnName = "bds_id")
	private BatDongSan bds;
	
	@ManyToOne
	@JoinColumn(name = "nguoiDung_id", referencedColumnName = "nguoiDung_id")
	private NguoiDung nguoiDung;
	
	@ManyToOne
	@JoinColumn(name = "nhanVien_id", referencedColumnName = "nhanVien_id")
	private NhanVien nhanVien;
	
}
