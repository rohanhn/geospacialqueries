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
public class VehicleRoute {
    private String RouteID;
    private String VehiclePlate;
    private String lat;
    private String lon;
    private String Time;

    /**
     * @return the RouteID
     */
    public String getRouteID() {
        return RouteID;
    }

    /**
     * @param RouteID the RouteID to set
     */
    public void setRouteID(String RouteID) {
        this.RouteID = RouteID;
    }

    /**
     * @return the VehiclePlate
     */
    public String getVehiclePlate() {
        return VehiclePlate;
    }

    /**
     * @param VehiclePlate the VehiclePlate to set
     */
    public void setVehiclePlate(String VehiclePlate) {
        this.VehiclePlate = VehiclePlate;
    }

    /**
     * @return the lat
     */
    public String getLat() {
        return lat;
    }

    /**
     * @param lat the lat to set
     */
    public void setLat(String lat) {
        this.lat = lat;
    }

    /**
     * @return the lon
     */
    public String getLon() {
        return lon;
    }

    /**
     * @param lon the lon to set
     */
    public void setLon(String lon) {
        this.lon = lon;
    }

    /**
     * @return the Time
     */
    public String getTime() {
        return Time;
    }

    /**
     * @param Time the Time to set
     */
    public void setTime(String Time) {
        this.Time = Time;
    }
}
