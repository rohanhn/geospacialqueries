package com.tungvu.filter;

import java.util.ArrayList;
import java.util.List;

public class Filter 
{
	// Filter wrong location
	public static void filterWrongLocation(List<VehicleGPS> input){
		for(int i = 0; i < input.size(); i++){
			if(input.get(i).getLatitude() == 0 || input.get(i).getLatitude() == 0){
				input.remove(i);
			}
		}
	}
	// Filter multiple signals
	public static void filterMultipleSignals1(List<VehicleGPS> input){
		for(int i = 0; i < input.size(); i++){
			int j = i + 1;
			while (j < input.size()){
				Double range = GPSUtility.CalculateDistance(input.get(i), input.get(j));
				if(String.valueOf(range).equals("NaN") || range == 0.0){
					input.remove(j);
				} else
					break;
			}
		}
	}
	
	// Overload speed
	public static void filterMultipleSignals2(List<VehicleGPS> input){
		for(int i = 0; i < input.size(); i++){
			int j = i + 1;		
			while (j < input.size()){
				Double range = GPSUtility.CalculateDistance(input.get(i), input.get(j));
				Long time = GPSUtility.CalculateTime(input.get(i), input.get(j));
				if((range / time) > 20){
					input.remove(j);
					j ++;
				} else
					break;
			}
		}
	}
	
	// Filter Multiple Stop Point --> Only one Stop Point
	public static void filterMultipleSignals3(List<VehicleGPS> input){
		// Remove Multiple Stop point Step 1
		// Remove near stop
		for(int i = 0; i < input.size(); i++){
			int j = i + 1;		
			while (j < input.size()){
				if(input.get(i).getSpeed() == 0 && input.get(j).getSpeed() == 0){
					input.remove(j);
					j ++;
				} else
					break;
			}
		}
	}

	public static void filterMultipleSignals4(List<VehicleGPS> input){
		// Remove Multiple Stop point Step 2
		// Remove tiny stop <= 30 minus
		for(int i = 0; i < input.size(); i++){
			int j = i + 1;		
			if (j < input.size()){
				if(
						input.get(i).getSpeed() == 0 && 
						input.get(j).getSpeed() > 0 && 
						GPSUtility.CalculateTime(input.get(i), input.get(j)) < (30 * 60)){
					input.remove(i);
				}
			}
		}
	}
	
    public static void main( String[] args )
    {
    	
    }
    
}
