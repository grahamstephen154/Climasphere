package com.proclus.climasphere.controller;

import com.proclus.climasphere.dto.WeatherResponse;
import com.proclus.climasphere.service.WeatherService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping
    public WeatherResponse getWeather(
            @RequestParam String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String country) {
        return weatherService.getWeather(city, state, country);
    }
}
