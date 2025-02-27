package com.fishing.sensei.fishingsensei;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class FishingSenseiApplication {

	public static void main(String[] args) {
		SpringApplication.run(FishingSenseiApplication.class, args);
	}

	@GetMapping("/")
	public String test() {

		return "Hello world";
	}

}
