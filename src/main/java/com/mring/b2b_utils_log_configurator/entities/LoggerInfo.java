package com.mring.b2b_utils_log_configurator.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LoggerInfo {
    private String loggerName;
    private String configuredLevel;
    private String effectiveLevel;


    public String getLoggerName() {
        return loggerName;
    }

    public String getConfiguredLevel() {
        return configuredLevel;
    }

    public String getEffectiveLevel() {
        return effectiveLevel;
    }
}
