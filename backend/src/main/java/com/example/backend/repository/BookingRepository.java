package com.example.backend.repository;

import com.example.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Arrays;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT SUM(a.numSeats) FROM Booking a " +
            "WHERE a.bus.id = :busId " +
            "AND a.bookingDate = :date ")
    Integer checkAvailability(Long busId, String date);

    @Query("SELECT a FROM Booking a " +
            "WHERE a.user.id = :userid ")
    List<Booking> findAllByUserId(Long userid);
}
