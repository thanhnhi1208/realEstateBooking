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
public class BatDongSan {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "bds_id")
	private long bdsId;
	
	private String hinhAnh;
	private String tenBDS;
	private String moTa;
	private LocalDateTime ngayDang;
	private double giaTien;
	private String diaChi;
	
	private boolean an;
	
	@ManyToOne
	@JoinColumn(name = "loaiBDS_id", referencedColumnName = "loaiBDS_id")
	private LoaiBDS loaiBDS;
	
}
