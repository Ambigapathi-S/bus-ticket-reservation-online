package com.example.backend.service.impl;

import com.example.backend.dto.BookingDto;
import com.example.backend.dto.BusDto;
import com.example.backend.entity.Booking;
import com.example.backend.entity.Bus;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.BusRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.BookingService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookingServiceImpl implements BookingService {
    private BookingRepository bookingRepository;
    private UserRepository userRepository;
    private BusRepository busRepository;
    private ModelMapper modelMapper;

    @Override
    public BookingDto createBooking(BookingDto bookingDto) {
        User user = userRepository.findById(bookingDto.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", bookingDto.getUser().getId()));
        bookingDto.setUser(user);

        Bus bus = busRepository.findById(bookingDto.getBus().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", bookingDto.getBus().getId()));
        bookingDto.setBus(bus);
        Integer checkTicketCount = checkAvailability(bookingDto);
        if(checkTicketCount == null || checkTicketCount < 0) checkTicketCount = 0;
        if (bus.getSeats() > checkTicketCount &&
                (bus.getSeats() - checkTicketCount < bookingDto.getNumSeats())) {
            try {
                throw new Exception("No Tickets are Available!");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        Booking booking = modelMapper.map(bookingDto, Booking.class);
        return modelMapper.map(bookingRepository.save(booking), BookingDto.class);
    }

    public Integer checkAvailability(BookingDto bookingDto) {
        return bookingRepository.checkAvailability(
                bookingDto.getBus().getId(),
                bookingDto.getBookingDate());
    }
    @Override
    public BookingDto updateBooking(Long id, BookingDto bookingDto) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", id));
        booking.setBookingDate(bookingDto.getBookingDate());
        booking.setNumSeats(bookingDto.getNumSeats());
        booking.setTotalAmount(bookingDto.getTotalAmount());
        booking.setStatus(bookingDto.getStatus());
        booking.setPaymentDetails(bookingDto.getPaymentDetails());

        User user = userRepository.findById(bookingDto.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", bookingDto.getUser().getId()));
        booking.setUser(user);

        Bus bus = busRepository.findById(bookingDto.getBus().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", bookingDto.getBus().getId()));
        booking.setBus(bus);

        return modelMapper.map(bookingRepository.save(booking), BookingDto.class);
    }

    @Override
    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll()
                .stream().map(booking -> modelMapper.map(booking, BookingDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public BookingDto getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", id));
        return modelMapper.map(booking, BookingDto.class);
    }

    public List<Booking> findAllByUserId(Long userid) {
        return bookingRepository.findAllByUserId(userid);
    }

    @Override
    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", id));
        bookingRepository.deleteById(id);
    }
}
