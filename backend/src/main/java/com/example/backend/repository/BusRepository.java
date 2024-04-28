package com.example.backend.repository;

import com.example.backend.dto.BusDto;
import com.example.backend.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BusRepository extends JpaRepository<Bus, Long> {
    @Query("SELECT a FROM Bus a " +
            "WHERE a.source = :source " +
            "AND a.destination = :destination ")
    List<Bus> searchBus(String source, String destination);
}
