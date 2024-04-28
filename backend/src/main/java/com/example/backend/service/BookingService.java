package com.example.backend.service;

import com.example.backend.dto.BookingDto;
import com.example.backend.entity.Booking;

import java.util.List;

public interface BookingService {
    BookingDto createBooking(BookingDto bookingDto);
    BookingDto updateBooking(Long id, BookingDto bookingDto);
    List<BookingDto> getAllBookings();
    BookingDto getBookingById(Long id);
    void deleteBooking(Long id);
    Integer checkAvailability(BookingDto bookingDto);
    List<Booking> findAllByUserId(Long userid);
}
