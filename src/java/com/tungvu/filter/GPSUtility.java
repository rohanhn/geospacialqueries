package com.tungvu.filter;

import java.sql.Time;

public class GPSUtility {
	// return range between two points
	// result meter
	
	
	private static double DegreesToRadians(double degrees)
    {
        return degrees * Math.PI / 180.0;
    }
 
    public static double CalculateDistance(VehicleGPS location1, VehicleGPS location2)
    {
        double circumference = 40000.0; // Earth's circumference at the equator in km
        double distance = 0.0;
       
        //Calculate radians
        double latitude1Rad = DegreesToRadians(location1.getLatitude());
        double longitude1Rad = DegreesToRadians(location1.getLongitude());
        double latititude2Rad = DegreesToRadians(location2.getLatitude());
        double longitude2Rad = DegreesToRadians(location2.getLongitude());
 
        double logitudeDiff = Math.abs(longitude1Rad - longitude2Rad);
 
        if (logitudeDiff > Math.PI)
        {
            logitudeDiff = 2.0 * Math.PI - logitudeDiff;
        }
       
        double angleCalculation =
            Math.acos(
              Math.sin(latititude2Rad) * Math.sin(latitude1Rad) +
              Math.cos(latititude2Rad) * Math.cos(latitude1Rad) * Math.cos(logitudeDiff));
 
        distance = circumference * angleCalculation / (2.0 * Math.PI);
 
        return distance * 1000;
    }
 
    public static long CalculateTime(VehicleGPS location1, VehicleGPS location2){
    	long range = 0;
		Time time1 = Time.valueOf(location1.getTime());
    	Time time2 = Time.valueOf(location2.getTime());
    	range = ((time2.getTime() - time1.getTime()) / 1000);
    	return range;
    }
}
