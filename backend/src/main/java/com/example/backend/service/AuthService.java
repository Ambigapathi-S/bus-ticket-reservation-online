package com.example.backend.service;

import com.example.backend.dto.JwtAuthResponse;
import com.example.backend.dto.LoginRequestDto;
import com.example.backend.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto doctorRegisterDto);
    JwtAuthResponse login(LoginRequestDto loginRequestDto);

    RegisterDto updateUserDetails(Long id, RegisterDto registerDto);

    RegisterDto findByEmail(String email);

    RegisterDto findById(Long id);
}
