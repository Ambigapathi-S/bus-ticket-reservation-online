package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bus")
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String source;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private String  departureTime;

    @Column(nullable = false)
    private String arrivalTime;

    @Column(nullable = false)
    private Integer seats;

    @Column(nullable = false)
    private Double fare;

    @Column(nullable = false)
    private String amenities;

    @Column(nullable = false)
    private String operators;

}
