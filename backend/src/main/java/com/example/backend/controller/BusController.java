package com.example.backend.controller;

import com.example.backend.dto.BusDto;
import com.example.backend.entity.Booking;
import com.example.backend.entity.Bus;
import com.example.backend.service.BusService;
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
@RequestMapping("api/bus")
public class BusController {
    private BusService busService;
    @Operation(
            summary = "Create Bus REST API ",
            description = "Create Booking"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status 201 Created"
    )
    @PostMapping
    public ResponseEntity<BusDto> saveBus(@RequestBody BusDto busDto) {
        BusDto savedBus = busService.saveBus(busDto);
        return new ResponseEntity<>(savedBus, HttpStatus.CREATED);
    }

    @Operation(
            summary = "Get All Bus REST API ",
            description = "Get All Bus"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Created"
    )
    @GetMapping
    public ResponseEntity<List<BusDto>> getAllBus() {
        List<BusDto> BusDtoList = busService.getAllBus();
        return ResponseEntity.ok().body(BusDtoList);
    }

    @Operation(
            summary = "Get Bus By ID REST API ",
            description = "Get Bus By ID"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Created"
    )
    @GetMapping("{id}")
    public ResponseEntity<BusDto> getBusById(@PathVariable("id") Long id) {
        BusDto busDto = busService.getBusById(id);
        return ResponseEntity.ok().body(busDto);
    }

    @Operation(
            summary = "Update Bus REST API ",
            description = "Update Bus"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PutMapping("update/{id}")
    public ResponseEntity<BusDto> updateBus(@PathVariable("id") Long id, @RequestBody BusDto busDto) {
        BusDto updatedBus = busService.updateBus(id, busDto);
        return ResponseEntity.ok(updatedBus);
    }

    @Operation(
            summary = "Delete Bus REST API ",
            description = "Delete Bus"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 OK"
    )
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteBus(@PathVariable Long id) {
        busService.deleteBus(id);
        return ResponseEntity.ok("Bus deleted successfully!");
    }

    @Operation(
            summary = "Search Bus REST API ",
            description = "Search Bus"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @GetMapping("/search")
    public ResponseEntity<List<Bus>> searchBus(@RequestParam("source") String source, @RequestParam("destination") String destination ) {
        return ResponseEntity.ok(busService.searchBus(source, destination));
    }
}
