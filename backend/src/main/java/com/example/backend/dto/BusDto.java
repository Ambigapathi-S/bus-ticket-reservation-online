package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusDto {
    private Long id;
    private String name;
    private String source;
    private String destination;
    private String departureTime;
    private String arrivalTime;
    private Integer seats;
    private Double fare;
    private String amenities;
    private String operators;
}
