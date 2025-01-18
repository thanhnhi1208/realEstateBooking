package com.nhi.service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nhi.model.LichHen;

@Service
public class QuartzSchedulerService {

	@Autowired
    private Scheduler scheduler;

    public void scheduleEmailJob(LichHen lichHen, String emailHen, String subject, LocalDateTime sendTime) throws SchedulerException, JsonProcessingException {
    	String hoVaTen = lichHen.getHoVaTen();
    	String soDienThoai = lichHen.getSoDienThoai();
    	String tenBDS = lichHen.getBds().getTenBDS();
    	String ngayGioHen = lichHen.getNgayGioHen().toString();
    	String tenNhanVien = lichHen.getNhanVien().getHoVaTen();
    	
    	JobDetail jobDetail = JobBuilder.newJob(NhacNhoEmailService.class)
                .withIdentity("emailJob-" + lichHen.getLichHenId(), "email-jobs")
                .usingJobData("emailHen", emailHen)
                .usingJobData("subject", subject)
                .usingJobData("hoVaTen", hoVaTen)
                .usingJobData("soDienThoai", soDienThoai)
                .usingJobData("tenBDS", tenBDS)
                .usingJobData("ngayGioHen", ngayGioHen)
                .usingJobData("tenNhanVien", tenNhanVien)
                .build();

        Trigger trigger = TriggerBuilder.newTrigger()
                .withIdentity("emailTrigger-" + lichHen.getLichHenId(), "email-triggers")
                .startAt(Date.from(sendTime.atZone(ZoneId.systemDefault()).toInstant()))
                .withSchedule(SimpleScheduleBuilder.simpleSchedule())
                .build();

        scheduler.scheduleJob(jobDetail, trigger);
    }
}
