package com.example.backend.repository;

import com.example.backend.entity.Booking;
import com.example.backend.entity.Bus;
import com.example.backend.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;

@DataJpaTest
public class BookingRepositoryTests {
    @Autowired
    private BookingRepository bookingRepository;
    private UserRepository userRepository;
    private BusRepository busRepository;
    private ModelMapper modelMapper;
    private Booking booking;
    @BeforeEach
    public void setUp() {
        User user = new User();
        user.setName("Ambiga");
        user.setEmail("ambiga@gmail.com");
        user.setUsername("Ambiga");
        user.setPassword("Ambiga@123$");

        Bus bus = new Bus();
        bus.setName("Nellai Exp");
        bus.setSource("Tirunelveli");
        bus.setDestination("Chennai");
        bus.setDepartureTime("19:00");
        bus.setArrivalTime("06:00");
        bus.setSeats(50);
        bus.setAmenities("Ac, Wifi");
        bus.setFare(500.00);
        bus.setOperators("Book Bus");

        booking = new Booking();
        booking.setBookingDate("2024-05-01");
        booking.setNumSeats(5);
        booking.setTotalAmount(5000.00);
        booking.setStatus("pending");
        booking.setPaymentDetails("card_1234_23232_2323");
        booking.setUser(user);
        booking.setBus(bus);
    }
    @Test
    public void givenBookingObject_whenSave_thenReturnSavedBooking() {
        Booking savedBooking = bookingRepository.save(booking);

        // Checking - assertion
        assertThat(savedBooking).isNotNull();
        assertThat(savedBooking.getId()).isGreaterThan(0);
    }

    @Test
    public void givenBookingList_whenFindAll_thenReturnBookingList() {
        bookingRepository.save(booking);
        Booking booking2 = new Booking();
        User user = new User();
        user.setName("Raji");
        user.setEmail("raji@gmail.com");
        user.setUsername("Raji");
        user.setPassword("Raji@123$");

        Bus bus = new Bus();
        bus.setName("Chennai Exp");
        bus.setSource("Chennai");
        bus.setDestination("Mumbai");
        bus.setDepartureTime("19:00");
        bus.setArrivalTime("06:00");
        bus.setSeats(50);
        bus.setAmenities("Ac, Wifi");
        bus.setFare(500.00);
        bus.setOperators("Book Bus");

        booking2 = new Booking();
        booking2.setBookingDate("2024-05-02");
        booking2.setNumSeats(5);
        booking2.setTotalAmount(5000.00);
        booking2.setStatus("pending");
        booking2.setPaymentDetails("card_1234_23232_2323");
        booking2.setUser(user);
        booking2.setBus(bus);
        bookingRepository.save(booking2);
        List<Booking> bookingList = bookingRepository.findAll();

        // Checking - assertion
        assertThat(bookingList).isNotNull();
        assertThat(bookingList.size()).isEqualTo(2);
    }

    @Test
    public void givenBookingObject_whenFindById_thenReturnBookingObject() {
        Booking savedBooking = bookingRepository.save(booking);
        Booking bookingDb = bookingRepository.findById(savedBooking.getId()).get();
        // Checking - assertion
        assertThat(bookingDb).isNotNull();
    }

    @Test
    public void givenBookingObject_whenUpdateBooking_thenReturnUpdatedBookingObject() {
        Booking savedBooking = bookingRepository.save(booking);
        Booking bookingDb = bookingRepository.findById(savedBooking.getId()).get();
        bookingDb.setBookingDate("2024-05-02");
        Booking updatedBooking = bookingRepository.save(bookingDb);
        // Checking - assertion
        assertThat(updatedBooking.getBookingDate()).isEqualTo("2024-05-02");
    }

    @Test
    public void givenBookingObject_whenDeleteBooking_thenRemoveBooking() {
        Booking savedBooking = bookingRepository.save(booking);
        bookingRepository.deleteById(savedBooking.getId());

        Optional<Booking> bookingOptional = bookingRepository.findById(savedBooking.getId());

        // Checking - assertion
        assertThat(bookingOptional).isEmpty();
    }
}
