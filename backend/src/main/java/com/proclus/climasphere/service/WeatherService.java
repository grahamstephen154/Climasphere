package com.proclus.climasphere.service;

import com.proclus.climasphere.dto.WeatherResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public WeatherResponse getWeather(String city, String state, String country) {
        String query = city;
        String formatter = "%s?q=%s&appid=%s&units=metric";

        if (state != null && !state.isEmpty()) {
            query = ',' + state;
        }
        if (country != null && !country.isEmpty()) {
            query = ',' + country;
        }

        String url = String.format(formatter, apiUrl, query, apiKey);

        return restTemplate.getForObject(url, WeatherResponse.class);
    }
}
