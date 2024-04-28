package com.example.backend.service;

import com.example.backend.dto.BusDto;
import com.example.backend.entity.Bus;

import java.util.List;

public interface BusService {
    BusDto saveBus(BusDto busDto);
    BusDto updateBus(Long id, BusDto busDto);
    List<BusDto> getAllBus();
    BusDto getBusById(Long id);
    void deleteBus(Long id);
    List<Bus> searchBus(String source, String destination);
}
