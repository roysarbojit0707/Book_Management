package com.raj.library.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CORSConfig {
    @Bean
    public WebMvcConfigurer config(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") //allowed all end points
                        .allowedOrigins("http://localhost:5173/","https://bookie-delta.vercel.app/")
                        .allowedMethods("GET","POST","PUT","DELETE")//allowed methods
                        .allowedHeaders("*");//all headers allowed
            }
        };
    }
}
