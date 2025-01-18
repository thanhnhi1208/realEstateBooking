package com.nhi.service;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.nhi.model.BatDongSan;
import com.nhi.model.LichHen;
import com.nhi.repository.BatDongSanRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
	private final JavaMailSender mailSender;
	private final SpringTemplateEngine templateEngine;
	private final BatDongSanRepository dongSanRepository;

	public void sendscheduledConfirmation(LichHen lichHen)
			throws MessagingException {
		BatDongSan bds = dongSanRepository.findById(lichHen.getBds().getBdsId()).orElse(null);
		lichHen.setBds(bds);
		
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage,
				MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
		messageHelper.setFrom("contact@nhi.com");

		final String templateName = "confirmation-email";

		Map<String, Object> variables = new HashMap<>();
		variables.put("lichHen", lichHen);
		System.out.println(lichHen.getNgayGioHen());
		

		Context context = new Context();
		context.setVariables(variables);
		if(lichHen.isChapNhan() || lichHen.isHuyHen()) {
			messageHelper.setSubject("Admin phản hồi lịch hẹn");
		}else {
			messageHelper.setSubject("Xác nhận đặt lịch");
		}
		

		try {
			String htmlTemplate = templateEngine.process(templateName, context);
			messageHelper.setText(htmlTemplate, true);

			List<String> emailAddresses = List.of(lichHen.getEmailHen(),
					"nguyenthithanhnhi310718@gmail.com");

			messageHelper.setTo(emailAddresses.toArray(new String[0]));
			mailSender.send(mimeMessage);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}
}
