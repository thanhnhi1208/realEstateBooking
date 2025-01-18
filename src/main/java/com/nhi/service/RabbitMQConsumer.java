package com.nhi.service;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.nhi.model.LichHen;
import com.nhi.repository.LichHenRepository;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RabbitMQConsumer {
	private final EmailService emailService;
	private final LichHenRepository lichHenRepository;
	
	@RabbitListener(queues = "queue-name")
    public void receiveMessage(LichHen lichHen) throws MessagingException
    {
		emailService.sendscheduledConfirmation(lichHen);
    }
}
