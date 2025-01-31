package com.fishing.sensei.fishingsensei.Entity.User.Auth;

import com.fishing.sensei.fishingsensei.Entity.User.Auth.Dto.UserRegisterFormData;
import com.fishing.sensei.fishingsensei.Entity.User.UserService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody UserRegisterFormData loginData) {

        if (loginData.type.equals("Login")) {

            if (!userService.loginUser(loginData)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "msg", "Wrong email or password !",
                    "code", -1
                ));
            }
            return ResponseEntity.ok(Map.of(
                "msg", "Successfully logged in !",
                "code", 1
            ));
        }

        boolean isValid = userService.registerUser(loginData);

        if (!isValid) return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                "msg", "A user with that email already exist !",
                "code", -1
        ));

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "msg", "User created !",
                "code", 1
        ));
    }
}
