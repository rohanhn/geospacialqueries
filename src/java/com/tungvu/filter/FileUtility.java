package com.tungvu.filter;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FileUtility {

    public static List<VehicleGPS> readFileSignal(String fileName) {
        List<VehicleGPS> vehicleGPSList = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {

            String signal;
            while ((signal = br.readLine()) != null) {
                vehicleGPSList.add(new VehicleGPS(signal));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return vehicleGPSList;
    }
}
