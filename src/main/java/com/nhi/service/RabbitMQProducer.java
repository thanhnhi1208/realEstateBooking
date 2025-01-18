package com.nhi.service;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nhi.model.LichHen;

@Component
public class RabbitMQProducer {

	@Autowired private RabbitTemplate rabbitTemplate;

    public void sendMessage(LichHen lichHen)
    {
        rabbitTemplate.convertAndSend(
            "exchange-name", "routing-key", lichHen);
    }
}
