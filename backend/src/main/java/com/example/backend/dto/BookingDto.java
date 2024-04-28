package com.example.backend.dto;

import com.example.backend.entity.Bus;
import com.example.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private Long id;
    private String bookingDate;
    private Integer numSeats;
    private Double totalAmount;
    private String status;
    private String paymentDetails;
    private Bus bus;
    private User user;
}
