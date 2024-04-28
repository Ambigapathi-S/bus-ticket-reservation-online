package com.example.backend.controller;

import com.example.backend.dto.JwtAuthResponse;
import com.example.backend.dto.LoginRequestDto;
import com.example.backend.dto.RegisterDto;
import com.example.backend.entity.User;
import com.example.backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("api/")
public class AuthController {
    private AuthService authService;

    @Operation(
            summary = "Login User REST API ",
            description = "Login User"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PostMapping("auth/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginRequestDto requestDto) {
        JwtAuthResponse jwtAuthResponse = authService.login(requestDto);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    @Operation(
            summary = "Register User REST API ",
            description = "Register User"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status 201 CREATED"
    )
    @PostMapping("auth/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        String response = authService.register(registerDto);

        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Get User by Email REST API ",
            description = "Get User by Email"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @GetMapping("user/profile")
    public ResponseEntity<RegisterDto> findByEmail(@RequestParam("email") String email) {
        RegisterDto user = authService.findByEmail(email);
        return ResponseEntity.ok(user);
    }

    @Operation(
            summary = "Get User by ID REST API ",
            description = "Get User by ID"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @GetMapping("user/profile/{id}")
    public ResponseEntity<RegisterDto> findById(@PathVariable Long id) {
        RegisterDto user = authService.findById(id);
        return ResponseEntity.ok(user);
    }

    @Operation(
            summary = "Update User REST API ",
            description = "Update User"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status 201 Success"
    )
    @PutMapping("user/profile/{id}")
    public ResponseEntity<RegisterDto> updateUserDetails(@PathVariable("id") Long id, @RequestBody RegisterDto registerDto) {
        RegisterDto updatedUser = authService.updateUserDetails(id, registerDto);
        return ResponseEntity.ok(updatedUser);
    }
}