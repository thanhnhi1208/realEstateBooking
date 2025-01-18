package com.nhi.config;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import ch.qos.logback.classic.pattern.MessageConverter;

@Configuration
public class RabbitMQConfig {
	@Bean public Queue queue()
    {
        return new Queue("queue-name", false);
    }

    @Bean public Exchange exchange()
    {
        return new DirectExchange("exchange-name");
    }

    @Bean
    public Binding binding(Queue queue, Exchange exchange)
    {
        return BindingBuilder.bind(queue)
            .to(exchange)
            .with("routing-key")
            .noargs();
    }
    
    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
