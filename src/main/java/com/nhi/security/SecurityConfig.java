package com.nhi.security;


import lombok.RequiredArgsConstructor;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import jakarta.servlet.Filter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

	@Autowired
	private  JwtAuthFilter authFilter;

	@Bean
	public UserDetailsService userDetailsService() {
		return new XacThucService(); // Ensure UserInfoService implements UserDetailsService
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors(cr->cr.configurationSource(corsConfigurationSource()))
		.csrf(csrf -> csrf.disable()) // Disable CSRF for stateless APIs
				.authorizeHttpRequests(auth -> auth
						.requestMatchers("/auth/generateToken", "/nguoiDung/dangNhap", "/nguoiDung/admin/dangNhap", "/nguoiDung/nhanVien/dangNhap",
								"/ws/**").permitAll()
						.requestMatchers(HttpMethod.POST, "/nguoiDung").permitAll()
						.requestMatchers("/bds", "/bds/images/*", "/nhanVien/images/*", "/bds/loaiBDS", "/bds/findById/*").permitAll()
						.requestMatchers("/lichHen/themLichHen").permitAll()
//						.requestMatchers("/nguoiDung/**").hasAuthority("NGUOI_DUNG")
//						.requestMatchers("/bds/**", "/lichHen/**", "/nhanVien/**").hasAuthority("ADMIN")
						.anyRequest().authenticated() // Protect all other endpoints
				).sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // No sessions
				).authenticationProvider(authenticationProvider()) // Custom authentication provider
				.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter

		return http.build();
	}
	
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration configuration = new CorsConfiguration();
	    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:5174", "http://localhost:5175"));
	    configuration.setAllowedMethods(Arrays.asList("*"));
	    configuration.setAllowedHeaders(Arrays.asList("*"));
	    configuration.setAllowCredentials(true);
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", configuration);
	    return source;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(); // Password encoding
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService());
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}
