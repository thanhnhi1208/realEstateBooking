package com.nhi.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhi.model.Admin;
import com.nhi.model.NguoiDung;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class XacThucController {
	

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;


    @PostMapping("/generateToken")
    public String authenticateAndGetTokenNguoiDung(@RequestBody ThongTinNguoiDung authRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getTaiKhoan(), authRequest.getMatKhau())
        );
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getTaiKhoan());
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }
    
    @PostMapping("/admin/generateToken")
    public String authenticateAndGetTokenAdin(@RequestBody Admin authRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getTaiKhoan(), authRequest.getMatKhau())
        );
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getTaiKhoan());
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }
}
