package com.cognizant.api.gateway.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component // Makes this a Spring component so it's picked up by Spring Boot
public class LoggingGlobalFilter implements GlobalFilter, Ordered {

    private static final Logger logger = LoggerFactory.getLogger(LoggingGlobalFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // Log the incoming request details before forwarding
        logger.info("Incoming Request: {} {} from {}",
                exchange.getRequest().getMethod(),
                exchange.getRequest().getURI(),
                exchange.getRequest().getRemoteAddress());

        // Continue the filter chain
        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            // Log response status after the request has been processed
            logger.info("Outgoing Response: Status {} for {} {}",
                    exchange.getResponse().getStatusCode(),
                    exchange.getRequest().getMethod(),
                    exchange.getRequest().getURI());
        }));
    }

    @Override
    public int getOrder() {
        // Define the order of this filter in the chain.
        // Ordered.HIGHEST_PRECEDENCE ensures it runs very early.
        return Ordered.HIGHEST_PRECEDENCE;
    }
}