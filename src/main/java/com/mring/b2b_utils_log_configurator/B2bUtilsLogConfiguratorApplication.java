package com.mring.b2b_utils_log_configurator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class B2bUtilsLogConfiguratorApplication {

    public static void main(String[] args) {
        SpringApplication.run(B2bUtilsLogConfiguratorApplication.class, args);
    }

//    @GetMapping("/")
//    public String sayHello(@RequestParam(value = "myName", defaultValue = "World") String name) {
//        return String.format("Hello %s!", name);
//    }
}
