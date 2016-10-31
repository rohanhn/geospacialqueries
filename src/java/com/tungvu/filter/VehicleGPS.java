package com.tungvu.filter;

public class VehicleGPS {
	private double latitude;
	private double longitude;
	private int speed;
	private String time;
	
	public VehicleGPS(double latitude, double longitude, int speed, String time) {
		super();
		this.latitude = latitude;
		this.longitude = longitude;
		this.speed = speed;
		this.time = time;
	}
	
	// Convert GPS signal to Vehicle GPS object
	public VehicleGPS(String gpsSignal){
		super();
		String[] signal =  gpsSignal.split(",");
		this.time = signal[0].substring(1);
		this.longitude = Double.parseDouble(signal[1]);
		this.latitude = Double.parseDouble(signal[2]);
		this.speed = Integer.parseInt(signal[3]);
	}
		
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public int getSpeed() {
		return speed;
	}
	public void setSpeed(int speed) {
		this.speed = speed;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	
	@Override
	public String toString(){
		return this.time + ":" + "[" + this.longitude + "," + this.latitude + "]" + " - " + this.speed;
	}
}
