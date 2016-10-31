package com.tungvu.filter;

import java.util.List;
import java.io.FileWriter;
import java.io.IOException;



public class Flume {

	// Convert other data to CSV data file
	// Secondo can import data from CSV file into Secondo's schema
	// Before import data, must create schema
	
	// input : example is objects list data
	// output : file csv output
	// format : Example :Latitude, Longitude, Time, Speed
	public static void flume(List<VehicleGPS> input, String output){
		try
		{
		    FileWriter writer = new FileWriter(output);
		    for (VehicleGPS vehicleGPS : input) {
		    	writer.append(String.valueOf(vehicleGPS.getLatitude()));
			    writer.append(',');
			    writer.append(String.valueOf(vehicleGPS.getLongitude()));
			    writer.append(',');
			    writer.append(String.valueOf(vehicleGPS.getTime()));
			    writer.append(',');
			    writer.append(String.valueOf(vehicleGPS.getSpeed()));
			    writer.append('\n');
			}
		    //generate whatever data you want	
		    writer.flush();
		    writer.close();
		}
		catch(IOException e){
			e.printStackTrace();
		}
	}
}
