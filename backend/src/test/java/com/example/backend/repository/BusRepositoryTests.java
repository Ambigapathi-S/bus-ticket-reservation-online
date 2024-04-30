package com.example.backend.repository;
import com.example.backend.entity.Bus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;

@DataJpaTest
public class BusRepositoryTests {
    @Autowired
    private BusRepository busRepository;
    private Bus bus;
    @BeforeEach
    public void setUp() {
        bus = new Bus();
        bus.setName("Nellai Exp");
        bus.setSource("Tirunelveli");
        bus.setDestination("Chennai");
        bus.setDepartureTime("19:00");
        bus.setArrivalTime("06:00");
        bus.setSeats(50);
        bus.setAmenities("Ac, Wifi");
        bus.setFare(500.00);
        bus.setOperators("Book Bus");
    }
    @Test
    public void givenBusObject_whenSave_thenReturnSavedBus() {
        Bus savedBus = busRepository.save(bus);

        // Checking - assertion
        assertThat(savedBus).isNotNull();
        assertThat(savedBus.getId()).isGreaterThan(0);
    }

    @Test
    public void givenBusList_whenFindAll_thenReturnBusList() {
        busRepository.save(bus);
        Bus bus2 = new Bus();
        bus.setName("Chennai Exp");
        bus.setSource("Chennai");
        bus.setDestination("Tvl");
        bus.setDepartureTime("05:00");
        bus.setArrivalTime("12:00");
        bus.setSeats(50);
        bus.setAmenities("Ac, Wifi");
        bus.setFare(500.00);
        bus.setOperators("Book Bus");
        busRepository.save(bus2);
        List<Bus> busList = busRepository.findAll();

        // Checking - assertion
        assertThat(busList).isNotNull();
        assertThat(busList.size()).isEqualTo(2);
    }

    @Test
    public void givenBusObject_whenFindById_thenReturnBusObject() {
        Bus savedBus = busRepository.save(bus);
        Bus busDb = busRepository.findById(savedBus.getId()).get();
        // Checking - assertion
        assertThat(busDb).isNotNull();
    }

    @Test
    public void givenBusObject_whenUpdateBus_thenReturnUpdatedBusObject() {
        Bus savedBus = busRepository.save(bus);
        Bus busDb = busRepository.findById(savedBus.getId()).get();
        busDb.setName("Nellai Express");
        Bus updatedBus = busRepository.save(busDb);
        // Checking - assertion
        assertThat(updatedBus.getName()).isEqualTo("Nellai Express");
    }

    @Test
    public void givenBusObject_whenDeleteBus_thenRemoveBus() {
        Bus savedBus = busRepository.save(bus);
        busRepository.deleteById(savedBus.getId());

        Optional<Bus> busOptional = busRepository.findById(savedBus.getId());

        // Checking - assertion
        assertThat(busOptional).isEmpty();
    }
}
