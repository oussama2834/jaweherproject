package com.example.ecommerce.entities;
import lombok.*;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class JwtResponse {
    private User user;
    private String jwtToken;
    private String refreshToken;

}
