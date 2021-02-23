package com.mring.b2b_utils_log_configurator.web.controller;

import com.mring.b2b_utils_log_configurator.entities.LoggerInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("ws")
public class InfoController {

    @Value("${hamster.host:localhost}")
    private String hamsterHost;
    @Value("${hamster.port:9090}")
    private String hamsterPort;
    @Value("${gate.host:localhost}")
    private String gateHost;
    @Value("${gate.port:8080}")
    private String gatePort;

    private String getGateUrl() {
        return String.format("http://%s:%s", gateHost, gatePort);
    }

    private String getHamsterUrl() {
        return String.format("http://%s:%s", hamsterHost, hamsterPort);
    }

    @GetMapping(value = "/loggers/{app}")
    public String getLogLevels(@PathVariable String app) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(String.format("%s/actuator/loggers", getAppUrl(app)), String.class);
    }

    @PostMapping(path = "/changeLogger/{app}", consumes = "application/json")
    public String setLogLevelGate(@RequestBody LoggerInfo payload, @PathVariable String app) {
        RestTemplate restTemplate = new RestTemplate();

        Map map = new HashMap<String, String>();
        map.put("configuredLevel", payload.getConfiguredLevel());

        String url = String.format("%s/actuator/loggers/%s", getAppUrl(app), payload.getLoggerName());

        restTemplate.postForObject(url, map, String.class);
        return "Ok!";
    }

    private String getAppUrl(String app) {
        switch (app) {
            case "gate":
                return getGateUrl();
            case "hamster":
                return getHamsterUrl();
            default:
                return "UNKNOWN APP";
        }
    }

}
