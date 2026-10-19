// src/main/java/com/outfit/recommendation/dto/UserDTO.java
package com.outfit.recommendation.dto;

public class UserDTO {
    private String username;
    private String password;
    private String role;
    private boolean enabled = true;
    // Default constructor
    public UserDTO() {}

    // Parameterized constructor
    public UserDTO(String username, String password, String role,boolean enabled) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.enabled = enabled;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    // Setters
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}


