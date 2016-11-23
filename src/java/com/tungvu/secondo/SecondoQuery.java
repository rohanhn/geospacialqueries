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
import com.tungvu.libs.Parameters;
import com.tungvu.libs.Trips;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import sj.lang.ESInterface;
import sj.lang.IntByReference;
import sj.lang.ListExpr;

/**
 *
 * @author TungVu
 */
public class SecondoQuery {

    public static void secondoQuery() {
        try {
            // filter data
            FilterData("resources/29B09266.txt", "resources/binhanh.csv");

            // query
            ListExpr resultList = new ListExpr();
            if (!query(resultList)) {
                System.err.println("error!");
            } else {
                System.err.println("success!");
            }
        } catch (Exception ex) {
            Logger.getLogger(SecondoQuery.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private static boolean query(ListExpr resultList)
            throws Exception {

        if (!Parameters.HAVE_LICENSE) {
            throw new Exception("Invalid license!");
        } else {

            ESInterface SecondoInterface = new ESInterface();
            SecondoInterface.setPort(Parameters.SECONDO_PORT);
            SecondoInterface.setHostname(Parameters.SECONDO_HOSTNAME);
            SecondoInterface.useBinaryLists(true);

            boolean ok = SecondoInterface.connect();
            if (!ok) {
                return false;
            }

            IntByReference errorCode = new IntByReference(0);
            IntByReference errorPos = new IntByReference(0);
            StringBuffer errorMessage = new StringBuffer();
            String query = null;
            List<Trips> mTrips;

            query = "open database binhanh_test";
            SecondoInterface.secondo(query, new ListExpr(), errorCode, errorPos, errorMessage);

            //                    
            query = "query Trips";
            SecondoInterface.secondo(query,
                    resultList, errorCode, errorPos, errorMessage);
            mTrips = CommonLib.parseTripsFromString(resultList.toString());

            //
            if (errorCode.value != 0) {
                System.err.println("Error in executing query " + query + "\n\n" + errorMessage);
            }

            SecondoInterface.secondo("close database", resultList, errorCode, errorPos, errorMessage);

            //very important
            SecondoInterface.terminate();

            if (errorCode.value != 0) {
                System.err.println("Error in executing query " + query + "\n\n" + errorMessage);
            }

            return errorCode.value == 0;
        }
    }

    public static boolean query(int queryNo, List<Trips> queryResult)
            throws Exception {

        if (!Parameters.HAVE_LICENSE) {
            throw new Exception("Invalid license!");
        } else {

            ESInterface SecondoInterface = new ESInterface();
            SecondoInterface.setPort(Parameters.SECONDO_PORT);
            SecondoInterface.setHostname(Parameters.SECONDO_HOSTNAME);
            SecondoInterface.useBinaryLists(true);

            boolean ok = SecondoInterface.connect();
            if (!ok) {
                return false;
            }

            IntByReference errorCode = new IntByReference(0);
            IntByReference errorPos = new IntByReference(0);
            StringBuffer errorMessage = new StringBuffer();
            String query = null;

            ListExpr resultList = new ListExpr();
            query = "open database binhanh_test";
            SecondoInterface.secondo(query, new ListExpr(), errorCode, errorPos, errorMessage);

            switch (queryNo) {
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    //
                    query = "query Stops";
                    SecondoInterface.secondo(query,
                            resultList, errorCode, errorPos, errorMessage);
                    queryResult = CommonLib.parseTripsFromString(resultList.toString());
                    break;
                default:
                    break;
            }

            //
            if (errorCode.value != 0) {
                System.err.println("Error in executing query " + query + "\n\n" + errorMessage);
            }

            SecondoInterface.secondo("close database", resultList, errorCode, errorPos, errorMessage);

            //very important
            SecondoInterface.terminate();

            if (errorCode.value != 0) {
                System.err.println("Error in executing query " + query + "\n\n" + errorMessage);
            }

            return errorCode.value == 0;
        }
    }

    public static List<Trips> query005()
            throws Exception {

        List<Trips> queryResult = new ArrayList<Trips>();
        if (!Parameters.HAVE_LICENSE) {
            throw new Exception("Invalid license!");
        } else {

            ESInterface SecondoInterface = new ESInterface();
            SecondoInterface.setPort(Parameters.SECONDO_PORT);
            SecondoInterface.setHostname(Parameters.SECONDO_HOSTNAME);
            SecondoInterface.useBinaryLists(true);

            boolean ok = SecondoInterface.connect();

            IntByReference errorCode = new IntByReference(0);
            IntByReference errorPos = new IntByReference(0);
            StringBuffer errorMessage = new StringBuffer();
            String query = null;

            ListExpr resultList = new ListExpr();
            query = "open database binhanh_test";
            SecondoInterface.secondo(query, new ListExpr(), errorCode, errorPos, errorMessage);

            //
            query = "query Trips";
            SecondoInterface.secondo(query,
                    resultList, errorCode, errorPos, errorMessage);
            queryResult = CommonLib.parseTripsFromString(resultList.toString());

            //
            if (errorCode.value != 0) {
                System.err.println("Error in executing query " + query + "\n\n" + errorMessage);
            }

            SecondoInterface.secondo("close database", resultList, errorCode, errorPos, errorMessage);

            //very important
            SecondoInterface.terminate();

            if (errorCode.value != 0) {
                System.err.println("Error in executing query " + query + "\n\n" + errorMessage);
            }

            return queryResult;
        }
    }

    public static List<Trips> query006()
            throws Exception {

        List<Trips> queryResult = new ArrayList<Trips>();
        if (!Parameters.HAVE_LICENSE) {
            throw new Exception("Invalid license!");
        } else {

            ESInterface SecondoInterface = new ESInterface();
            SecondoInterface.setPort(Parameters.SECONDO_PORT);
            SecondoInterface.setHostname(Parameters.SECONDO_HOSTNAME);
            SecondoInterface.useBinaryLists(true);

            boolean ok = SecondoInterface.connect();

            IntByReference errorCode = new IntByReference(0);
            IntByReference errorPos = new IntByReference(0);
            StringBuffer errorMessage = new StringBuffer();
            String query = null;

            ListExpr resultList = new ListExpr();
            query = "open database binhanh_test";
            SecondoInterface.secondo(query, new ListExpr(), errorCode, errorPos, errorMessage);

            //
            query = "query Stops";
            SecondoInterface.secondo(query,
                    resultList, errorCode, errorPos, errorMessage);
            queryResult = CommonLib.parseTripsFromString(resultList.toString());

            //
            if (errorCode.value != 0) {
                System.err.println("Error in executing query " + query + "\n\n" + errorMessage);
            }

            SecondoInterface.secondo("close database", resultList, errorCode, errorPos, errorMessage);

            //very important
            SecondoInterface.terminate();

            if (errorCode.value != 0) {
                System.err.println("Error in executing query " + query + "\n\n" + errorMessage);
            }

            return queryResult;
        }
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
