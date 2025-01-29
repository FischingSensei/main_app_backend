package com.fishing.sensei.fishingsensei.Entity.User.Document;

import com.fishing.sensei.fishingsensei.Entity.User.Auth.Dto.UserRegisterFormData;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
public class User {

    @Id
    private String _id;

    private String _firstName;

    private String _lastName ;

    private String _password;

    public String email;

    public User() {}

    public User(UserRegisterFormData formData) {

        super();

        _firstName = formData.firstname;
        _lastName = formData.lastname;
        _password = formData.password;
        email = formData.email;
    }

    public String getPassword() {
        return _password;
    }
}
