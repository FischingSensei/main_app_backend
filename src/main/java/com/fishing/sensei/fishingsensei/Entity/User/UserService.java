package com.fishing.sensei.fishingsensei.Entity.User;

import com.fishing.sensei.fishingsensei.Entity.User.Auth.Dto.UserLoginFormData;
import com.fishing.sensei.fishingsensei.Entity.User.Auth.Dto.UserRegisterFormData;
import com.fishing.sensei.fishingsensei.Entity.User.Document.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository _userRepository;
    private final BCryptPasswordEncoder _encoder;

    public UserService(UserRepository userRepository) {
        this._userRepository = userRepository;
        _encoder = new BCryptPasswordEncoder(16);
    }

    public boolean registerUser(UserRegisterFormData userData) {

        // Check if user is already registered
        User foundUser = _userRepository.findByEmail(userData.email);

        if (userData.password.isBlank() ||
            userData.firstname.isBlank() ||
            userData.lastname.isBlank() ||
            userData.email.isBlank() ||
            userData.type.isBlank()) {
            System.out.println("Missing field");
            return false;
        }

        if (foundUser != null)
        {
            System.out.println("Email " + foundUser.email );
            return false;
        }

        // Encode password
        {
            userData.password = _encoder.encode(userData.password);
        }

        _userRepository.save(new User(userData));
        return true;
    }

    public boolean loginUser(UserLoginFormData formData) {
        User foundUser = _userRepository.findByEmail(formData.email);

        if (foundUser == null || formData.email.isEmpty() || formData.password.isEmpty()) return false;

        // Check if password match the hashedPassword
        {
            String hashedPassword = foundUser.getPassword();

            return _encoder.matches(formData.password, hashedPassword);
        }
    }

    public List<User> getAllUser() {
        return _userRepository.findAll();
    }

}
