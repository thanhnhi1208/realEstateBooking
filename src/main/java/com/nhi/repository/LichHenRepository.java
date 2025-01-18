package com.nhi.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nhi.model.LichHen;

public interface LichHenRepository extends JpaRepository<LichHen, Long> {
	LichHen findBybds_bdsIdAndNgayGioHen(long bdsId, LocalDateTime ngayGioHen);
	
	@Query("SELECT l FROM LichHen l WHERE FUNCTION('DATE', l.ngayGioHen) = :ngayGioHen AND l.bds.id = :bdsId")
	List<LichHen> findByNgayGioHenDayAndBdsId(@Param("ngayGioHen") LocalDate ngayGioHen, @Param("bdsId") long bdsId);
	
	List<LichHen> findAllByOrderByLichHenIdDesc();
	
	
	@Query("SELECT l FROM LichHen l WHERE l.ngayGioHen = :ngayGioHen")
	List<LichHen> findByNgayGioHenDay(@Param("ngayGioHen") LocalDateTime ngayGioHen);
	
	List<LichHen> findByNguoiDung_nguoiDungIdOrderByLichHenIdDesc(long nguoiDungId);

	List<LichHen> findByNhanVien_NhanVienIdAndHuyHenFalseAndChapNhanTrueOrderByLichHenId(long nhanVienId);

}
