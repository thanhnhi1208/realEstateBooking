package com.nhi.service;

import java.nio.charset.StandardCharsets;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nhi.model.LichHen;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class NhacNhoEmailService implements Job {
	
	@Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		try {
            // Lấy dữ liệu từ JobDataMap
            String hoVaTen = context.getJobDetail().getJobDataMap().getString("hoVaTen");
            String soDienThoai = context.getJobDetail().getJobDataMap().getString("soDienThoai");
            String tenBDS = context.getJobDetail().getJobDataMap().getString("tenBDS");
            String ngayGioHen = context.getJobDetail().getJobDataMap().getString("ngayGioHen");
            String tenNhanVien = context.getJobDetail().getJobDataMap().getString("tenNhanVien");
            
            String emailHen = context.getJobDetail().getJobDataMap().getString("emailHen");
			
            String subject = context.getJobDetail().getJobDataMap().getString("subject");

            // Render nội dung email bằng Thymeleaf
            Context thymeleafContext = new Context();
            thymeleafContext.setVariable("hoVaTen", hoVaTen);
            thymeleafContext.setVariable("soDienThoai", soDienThoai);
            thymeleafContext.setVariable("tenBDS", tenBDS);
            thymeleafContext.setVariable("ngayGioHen", ngayGioHen);
            thymeleafContext.setVariable("tenNhanVien", tenNhanVien);

            String content = templateEngine.process("nhac-nho-email", thymeleafContext);

            // Gửi email
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(
                    mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name()
            );
            messageHelper.setFrom("contact@nhi.com");
            messageHelper.setTo(emailHen);
            messageHelper.setSubject(subject);
            messageHelper.setText(content, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new JobExecutionException("Error sending email", e);
        }
	}

}
