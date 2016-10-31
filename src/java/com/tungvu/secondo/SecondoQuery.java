/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tungvu.secondo;

import com.tungvu.filter.FileUtility;
import static com.tungvu.filter.Filter.*;
import com.tungvu.filter.Flume;
import com.tungvu.filter.VehicleGPS;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author TungVu
 */
public class SecondoQuery {

    public static void secondoQuery() {
        // filter data
        FilterData("resources/29B09266.txt", "resources/binhanh.csv");

        //
    }

    public static void FilterData(String InputFilePath, String OutputFilePath) {
        List<VehicleGPS> vehicleGPSList = new ArrayList<VehicleGPS>();
        vehicleGPSList = FileUtility.readFileSignal(InputFilePath);

        // Filter one
        filterWrongLocation(vehicleGPSList);

        // Filter range 1
        filterMultipleSignals1(vehicleGPSList);

        // Filter range 2
        filterMultipleSignals2(vehicleGPSList);

        // Filter range 3
        int currentSize = vehicleGPSList.size();
        do {
            filterMultipleSignals3(vehicleGPSList);

            if (currentSize == vehicleGPSList.size()) {
                break;
            } else {
                currentSize = vehicleGPSList.size();
                continue;
            }
        } while (true);
        System.out.println(vehicleGPSList.size());
        // Filter range 4
        filterMultipleSignals4(vehicleGPSList);

        // Output
        Flume.flume(vehicleGPSList, OutputFilePath);
    }

}
