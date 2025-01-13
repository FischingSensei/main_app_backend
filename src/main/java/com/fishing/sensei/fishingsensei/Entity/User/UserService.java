package com.fishing.sensei.fishingsensei.Entity.User;

import com.fishing.sensei.fishingsensei.Entity.User.Auth.Dto.AUserLoginBaseFormData;
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

        if (foundUser != null)
        {
            System.out.println("Email " + foundUser.email );
            return false;
        }

        // Encode password
        {
            userData.password = _encoder.encode(userData.password);
            System.out.println(userData.password);
        }

        User user = new User(userData);

        _userRepository.save(user);

        return true;
    }

    public boolean loginUser(UserLoginFormData formData) {
        User foundUser = _userRepository.findByEmail(formData.email);

        if (foundUser == null) return false;

        String hashedPassword = foundUser.getPassword();

        return _encoder.matches(formData.password, hashedPassword);
    }

    public List<User> getAllUser() {
        return _userRepository.findAll();
    }

}
