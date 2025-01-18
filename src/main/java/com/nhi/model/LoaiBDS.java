package com.nhi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class LoaiBDS {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "loaiBDS_id")
	private long loaiBDSId;
	
	private String tenLoaiBDS;
}
