package com.example.backend.controller;

import com.example.backend.dto.BookingDto;
import com.example.backend.entity.Booking;
import com.example.backend.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("api/booking")
public class BookingController {
    private BookingService bookingService;

    @Operation(
            summary = "Create Booking REST API ",
            description = "Create Booking"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status 201 Created"
    )
    @PostMapping
    public ResponseEntity<BookingDto> createBooking(@RequestBody BookingDto bookingDto) {
        BookingDto savedBooking = bookingService.createBooking(bookingDto);
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }

    @Operation(
            summary = "Get Bookings REST API ",
            description = "Get Bookings"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @GetMapping
    public ResponseEntity<List<BookingDto>> getAllBookings() {
        List<BookingDto> BookingDtoList = bookingService.getAllBookings();
        return ResponseEntity.ok().body(BookingDtoList);
    }

    @Operation(
            summary = "Get Booking by ID REST API ",
            description = "Get Booking by ID"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @GetMapping("{id}")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable("id") Long id) {
        BookingDto BookingDtoList = bookingService.getBookingById(id);
        return ResponseEntity.ok().body(BookingDtoList);
    }

    @Operation(
            summary = "Update Booking REST API ",
            description = "Get Booking"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PutMapping("update/{id}")
    public ResponseEntity<BookingDto> updateBooking(@PathVariable("id") Long id, @RequestBody BookingDto bookingDto) {
        BookingDto updatedBooking = bookingService.updateBooking(id, bookingDto);
        return ResponseEntity.ok(updatedBooking);
    }

    @Operation(
            summary = "Delete Booking REST API ",
            description = "Delete Booking"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 OK"
    )
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok("Booking deleted successfully!");
    }

    @Operation(
            summary = "Get Bookings by User ID REST API ",
            description = "Get Bookings by User ID"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @GetMapping("/user/{userid}")
    public ResponseEntity<List<Booking>> findAllByUserId(@PathVariable("userid") Long userid) {
        return ResponseEntity.ok(bookingService.findAllByUserId(userid));
    }
}
