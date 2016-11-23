/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tungvu.libs;

/**
 *
 * @author TungVu
 */
public class Trips {
    private Double latitude;
    private Double longitude;
    private String UTC;
    private int speed;
    private int S;
    private String I;

    /**
     * @return the latitude
     */
    public double getLatitude() {
        return latitude;
    }

    /**
     * @param latitude the latitude to set
     */
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    /**
     * @return the longitude
     */
    public double getLongitude() {
        return longitude;
    }

    /**
     * @param longitude the longitude to set
     */
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    /**
     * @return the UTC
     */
    public String getUTC() {
        return UTC;
    }

    /**
     * @param UTC the UTC to set
     */
    public void setUTC(String UTC) {
        this.UTC = UTC;
    }

    /**
     * @return the speed
     */
    public int getSpeed() {
        return speed;
    }

    /**
     * @param speed the speed to set
     */
    public void setSpeed(int speed) {
        this.speed = speed;
    }

    /**
     * @return the S
     */
    public int getS() {
        return S;
    }

    /**
     * @param S the S to set
     */
    public void setS(int S) {
        this.S = S;
    }

    /**
     * @return the I
     */
    public String getI() {
        return I;
    }

    /**
     * @param I the I to set
     */
    public void setI(String I) {
        this.I = I;
    }
    
}
