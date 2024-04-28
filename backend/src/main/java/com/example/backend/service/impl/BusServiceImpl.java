package com.example.backend.service.impl;

import com.example.backend.dto.BusDto;
import com.example.backend.entity.Bus;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.BusRepository;
import com.example.backend.service.BusService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BusServiceImpl implements BusService {
    private BusRepository busRepository;
    private ModelMapper modelMapper;
    @Override
    public BusDto saveBus(BusDto busDto) {
        Bus bus = modelMapper.map(busDto, Bus.class);
        return modelMapper.map(busRepository.save(bus), BusDto.class);
    }

    @Override
    public BusDto updateBus(Long id, BusDto busDto) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", id));
        bus.setName(busDto.getName());
        bus.setSource(busDto.getSource());
        bus.setDestination(busDto.getDestination());
        bus.setDepartureTime(busDto.getDepartureTime());
        bus.setArrivalTime(busDto.getArrivalTime());
        bus.setSeats(busDto.getSeats());
        bus.setAmenities(busDto.getAmenities());
        bus.setFare(busDto.getFare());
        bus.setOperators(busDto.getOperators());
        return modelMapper.map(busRepository.save(bus), BusDto.class);
    }

    @Override
    public List<BusDto> getAllBus() {
        return busRepository.findAll()
                .stream().map(bus -> modelMapper.map(bus, BusDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public BusDto getBusById(Long id) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", id));
        return modelMapper.map(bus, BusDto.class);
    }

    @Override
    public void deleteBus(Long id) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bus", "id", id));
         busRepository.deleteById(id);
    }

    @Override
    public List<Bus> searchBus(String source, String destination) {
        return busRepository.searchBus(source, destination);
    }
}
