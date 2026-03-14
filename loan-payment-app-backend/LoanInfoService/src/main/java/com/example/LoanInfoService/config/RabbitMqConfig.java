package com.example.LoanInfoService.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitMqConfig {

    @Bean
    public Queue queue(){
        String queueName = "rabbitmq_queueLoan";
        return new Queue(queueName);
    }

    @Bean
    public Exchange exchange(){
        String exchangeName = "rabbitmq_exchangeKey";
        return new DirectExchange(exchangeName);
    }

    @Bean
    public Binding binding(){
        String secretKey = "rabbitmq_routeKey";
        return BindingBuilder.bind(queue()).to(exchange()).with(secretKey).noargs();
    }

    @Bean
    public ConnectionFactory connectionFactory(){
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory("localhost");
        connectionFactory.setUsername("guest");
        connectionFactory.setPassword("guest");
        return connectionFactory;
    }

    @Bean
    public MessageConverter converter(){
        return new Jackson2JsonMessageConverter();
    }


    @Bean
    public AmqpTemplate template(){
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory());
        rabbitTemplate.setMessageConverter(converter());
        return rabbitTemplate;
    }
}
