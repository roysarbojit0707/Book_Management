package com.raj.library.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class GeminiService {
    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public GeminiService(WebClient.Builder webClientBuilder){
        this.webClient = webClientBuilder.baseUrl("https://generativelanguage.googleapis.com/v1beta/").build();
    }
    public Mono<Map<String, Object>> chat(String userMessage) {
        String formattedPrompt = "Suggest a book related to the following topic in 20 words: " + userMessage;

        return webClient.post()
                .uri(uriBuilder -> uriBuilder.path("/models/gemini-2.0-flash:generateContent").queryParam("key", apiKey).build())
                .bodyValue(Map.of(
                        "contents", new Object[]{
                                Map.of("parts", new Object[]{
                                        Map.of("text", formattedPrompt)
                                })
                        }
                ))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .map(response -> response);
    }

}
