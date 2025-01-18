package com.nhi.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThongTinNguoiDung {

	private long id;
	private String taiKhoan;
	private String matKhau;
	private String role;
}
