/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tungvu.servlet;

import com.sun.javafx.scene.control.skin.VirtualFlow;
import com.tungvu.geo.GeoPoint;
import static com.tungvu.geo.Geometry.get_line_intersection;
import com.tungvu.libs.Parameters;
import com.tungvu.libs.VehicleRoute;
import com.tungvu.libs.VehicleTracking;
import java.io.BufferedReader;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import vn.com.binhanh.gps.*;

/**
 *
 * @author TungVu
 */
public class CommonLibForServlet {

    public static String request(String url, String servletName, String urlParameters) {
        String result = "";

        String requestString = url + "/" + servletName;
        HttpURLConnection connection = null;
        InputStream inputstream = null;

        int nTime = 0;

        while (nTime < 2) {
            try {

                URL myUrl = new URL(requestString);
                connection = (HttpURLConnection) myUrl.openConnection();
                //HTTP Request
                connection.setRequestMethod("GET");
                //connection.setRequestProperty("User-Agent",
                //        "Profile/MIDP-1.0 Confirguration/CLDC-1.0");
                connection.setRequestProperty("Content-Type",
                        "application/x-www-form-urlencoded");
                connection.setRequestProperty("Content-Length", ""
                        + Integer.toString(url.getBytes().length));
                //connection.setRequestProperty("Content-Language", "en-US");
                //connection.setRequestProperty("Authorization", "Basic " + PBoxCaches.PBoxWebBase64Auth);  

                connection.setUseCaches(false);
                connection.setDoInput(true);
                connection.setDoOutput(true);

//                //Send HTTP request data
//                DataOutputStream wr = new DataOutputStream(
//                        connection.getOutputStream());
//                wr.writeBytes(urlParameters);
//                wr.flush();
//                wr.close();
                // HTTP Response
                if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                    String str;
                    inputstream = connection.getInputStream();
                    BufferedReader rd = new BufferedReader(new InputStreamReader(inputstream, "UTF-8"));
                    String line;
                    while ((line = rd.readLine()) != null) {
                        if (result.length() > 0) {
                            result = result + "\r\n";
                        }
                        result = result + line;
                    }
                    rd.close();
                    System.out.println(result);
                }

                //Close connection
                connection.disconnect();
                break;
            } catch (Exception e) {
                e.printStackTrace();
            }

            nTime++;
        }
        return result;
    }

    public static String query001(String connectType) {
        String result = "{\"data\": [";
        switch (connectType) {
            case "oracle":
                break;
            case "mssql":
                break;
            case "mysql": {
                try {
                    // Khai báo class Driver cho DB MySQL                    
                    Class.forName("com.mysql.jdbc.Driver");
                    // Cấu trúc URL Connection dành cho MySQL                    
                    String connectionURL = "jdbc:mysql://" + Parameters.DATABASE_SERVER_IP_ADDRESS
                            + ":" + Parameters.DATABASE_SERVER_PORT + "/"
                            + Parameters.DATABASE_NAME + "?useUnicode=true&characterEncoding=utf-8";

                    // Mở kết nối
                    Connection conn = DriverManager.getConnection(connectionURL,
                            Parameters.DATABASE_USERNAME, Parameters.DATABASE_PASSWORD);

                    // Truy vấn
                    Statement stmt = conn.createStatement();
                    String sql = "select * from vehicle";

                    ResultSet rs = stmt.executeQuery(sql);

                    //STEP 5: Extract data from result set
                    while (rs.next()) {

                        String vehicle_data = "{";
                        vehicle_data = vehicle_data + "\"name\" : \"" + rs.getString("CompanyID") + "\",";
                        vehicle_data = vehicle_data + "\"lon\" : \"" + rs.getString("Longitude") + "\",";
                        vehicle_data = vehicle_data + "\"xCompanyName\" : \"" + rs.getString("CompanyID") + "\",";
                        vehicle_data = vehicle_data + "\"xSoxe\" : \"" + rs.getString("VehiclePlate") + "\",";
                        vehicle_data = vehicle_data + "\"status\" : \"" + rs.getString("State") + "\",";
                        vehicle_data = vehicle_data + "\"xBienso\" : \"" + rs.getString("VehiclePlate") + "\",";
                        vehicle_data = vehicle_data + "\"xCompany\" : \"" + rs.getString("CompanyID") + "\",";
                        vehicle_data = vehicle_data + "\"time\" : \"" + rs.getString("LastUpdateTime") + "\",";
                        vehicle_data = vehicle_data + "\"tocdo\" : \"" + rs.getString("Speed") + "\",";
                        vehicle_data = vehicle_data + "\"lat\" : \"" + rs.getString("Latitude") + "\",";
                        vehicle_data = vehicle_data + "\"huong\" : \"" + rs.getString("Direction") + "\",";
                        vehicle_data = vehicle_data + "\"address\" : \"" + rs.getString("Address") + "\"";
                        vehicle_data = vehicle_data + "},";
                        result = result + vehicle_data;
                    }

                    result = result.substring(0, result.length() - 1) + "]}";

                    //STEP 6: Clean-up environment
                    rs.close();
                    stmt.close();
                    conn.close();
                    break;
                } catch (Exception ex) {
                    Logger.getLogger(CommonLibForServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

        }
        return result;
    }

    public static String query002(String connectType, String startTime, String endTime,
            String companyID, String streetID) {
        String result = "{\"data\": [";
        GeoPoint startPoint = null, endPoint = null;
        switch (connectType) {
            case "oracle":
                break;
            case "mssql":
                break;
            case "mysql": {
                try {
                    // Khai báo class Driver cho DB MySQL                    
                    Class.forName("com.mysql.jdbc.Driver");
                    // Cấu trúc URL Connection dành cho MySQL                    
                    String connectionURL = "jdbc:mysql://" + Parameters.DATABASE_SERVER_IP_ADDRESS
                            + ":" + Parameters.DATABASE_SERVER_PORT + "/"
                            + Parameters.DATABASE_NAME + "?useUnicode=true&characterEncoding=utf-8";

                    // Mở kết nối
                    Connection conn = DriverManager.getConnection(connectionURL,
                            Parameters.DATABASE_USERNAME, Parameters.DATABASE_PASSWORD);

                    // Truy vấn
                    Statement stmt = conn.createStatement();
                    String company = companyID;
                    String sql = "SELECT * FROM vehicle_tracking "
                            + "WHERE (CompanyID=" + company + ") "
                            + "and (Cast(LocalTime as UNSIGNED) > Cast(\'" + startTime + "\' as UNSIGNED)) "
                            + "and (Cast(LocalTime as UNSIGNED) < Cast(\'" + endTime + "\' as UNSIGNED)) "
                            + "ORDER BY VehiclePlate ";
                    ResultSet rs = stmt.executeQuery(sql);
                    List<VehicleTracking> mRawResult = new ArrayList<VehicleTracking>();

                    while (rs.next()) {
                        VehicleTracking mTrack = new VehicleTracking();
                        mTrack.setAddress(rs.getString("Address"));
                        mTrack.setCompanyID(rs.getString("CompanyID"));
                        mTrack.setDirection(rs.getString("Direction"));
                        mTrack.setLatitude(rs.getString("Latitude"));
                        mTrack.setLocalTime(rs.getString("LocalTime"));
                        mTrack.setLongtitude(rs.getString("Longitude"));
                        mTrack.setSpeed(rs.getString("Speed"));
                        mTrack.setState(rs.getString("State"));
                        mTrack.setUTCTime(rs.getString("UTCTime"));
                        mTrack.setVehiclePlate(rs.getString("VehiclePlate"));
                        mRawResult.add(mTrack);
                    }

                    if (mRawResult.size() > 0) {
                        streetID = "1";
                        if (streetID.endsWith("1")) {
//                            // hoang quoc viet
//                            startPoint = new GeoPoint(21.020236, 105.807178);
//                            endPoint = new GeoPoint(21.019204, 105.809779);

                            // dong nai
                            startPoint = new GeoPoint(10.950268, 107.087615);
                            endPoint = new GeoPoint(10.933411, 107.080469);
                        }

                        String vehicle = mRawResult.get(0).getVehiclePlate();
                        List<GeoPoint> vehicle_location = new ArrayList<GeoPoint>();
                        vehicle_location.add(new GeoPoint(Double.parseDouble(mRawResult.get(0).getLatitude()),
                                Double.parseDouble(mRawResult.get(0).getLongtitude())));
                        String vehicle_data = "{";

                        for (int i = 0; i < mRawResult.size() - 1; i++) {
                            if (vehicle.equals(mRawResult.get(i + 1).getVehiclePlate())) {
                                vehicle_location.add(new GeoPoint(Double.parseDouble(mRawResult.get(i + 1).getLatitude()),
                                        Double.parseDouble(mRawResult.get(i + 1).getLongtitude())));

                            } else {
                                if ((get_line_intersection(vehicle_location, startPoint, endPoint)) == 1) {
                                    // add return String                                    
                                    vehicle_data = vehicle_data + "\"name\" : \"" + mRawResult.get(i).getCompanyID() + "\",";
                                    vehicle_data = vehicle_data + "\"lon\" : \"" + mRawResult.get(i).getLongtitude() + "\",";
                                    vehicle_data = vehicle_data + "\"xCompanyName\" : \"" + mRawResult.get(i).getCompanyID() + "\",";
                                    vehicle_data = vehicle_data + "\"xSoxe\" : \"" + mRawResult.get(i).getVehiclePlate() + "\",";
                                    vehicle_data = vehicle_data + "\"status\" : \"" + mRawResult.get(i).getState() + "\",";
                                    vehicle_data = vehicle_data + "\"xBienso\" : \"" + mRawResult.get(i).getVehiclePlate() + "\",";
                                    vehicle_data = vehicle_data + "\"xCompany\" : \"" + mRawResult.get(i).getCompanyID() + "\",";
                                    vehicle_data = vehicle_data + "\"time\" : \"" + mRawResult.get(i).getLocalTime() + "\",";
                                    vehicle_data = vehicle_data + "\"tocdo\" : \"" + mRawResult.get(i).getSpeed() + "\",";
                                    vehicle_data = vehicle_data + "\"lat\" : \"" + mRawResult.get(i).getLatitude() + "\",";
                                    vehicle_data = vehicle_data + "\"huong\" : \"" + mRawResult.get(i).getDirection() + "\",";
                                    vehicle_data = vehicle_data + "\"address\" : \"" + mRawResult.get(i).getAddress() + "\"";
                                    vehicle_data = vehicle_data + "},";
                                    result = result + vehicle_data;
                                }

                                // reset
                                vehicle_location.clear();
                                vehicle_location.add(new GeoPoint(Double.parseDouble(mRawResult.get(i + 1).getLatitude()),
                                        Double.parseDouble(mRawResult.get(i + 1).getLongtitude())));
                            }
                        }
                    }
                    result = result.substring(0, result.length() - 1) + "]}";

                    //STEP 6: Clean-up environment
                    rs.close();
                    stmt.close();
                    conn.close();
                    break;
                } catch (Exception ex) {
                    Logger.getLogger(CommonLibForServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

        }
        return result;
    }

    public static String query004(String connectType, String startTime, String endTime) {
        String result = "{\"data\": [";
        GeoPoint startPoint = null, endPoint = null;
        switch (connectType) {
            case "oracle":
                break;
            case "mssql":
                break;
            case "mysql": {
                try {
                    // Khai báo class Driver cho DB MySQL                    
                    Class.forName("com.mysql.jdbc.Driver");
                    // Cấu trúc URL Connection dành cho MySQL                    
                    String connectionURL = "jdbc:mysql://" + Parameters.DATABASE_SERVER_IP_ADDRESS
                            + ":" + Parameters.DATABASE_SERVER_PORT + "/"
                            + Parameters.DATABASE_NAME + "?useUnicode=true&characterEncoding=utf-8";

                    // Mở kết nối
                    Connection conn = DriverManager.getConnection(connectionURL,
                            Parameters.DATABASE_USERNAME, Parameters.DATABASE_PASSWORD);

                    // Truy vấn
                    Statement stmt = conn.createStatement();

                    String sql = "SELECT * FROM vehicle_route "
                            + "WHERE (Cast(Time as TIME) > Cast(\'" + startTime + "\' as TIME)) "
                            + "and (Cast(Time as TIME) < Cast(\'" + endTime + "\' as TIME)) "
                            ;
                    ResultSet rs = stmt.executeQuery(sql);
                    List<VehicleRoute> mRawResult = new ArrayList<VehicleRoute>();

                    while (rs.next()) {
                        VehicleRoute mTrack = new VehicleRoute();
                        mTrack.setRouteID(rs.getString("routeID"));
                        mTrack.setVehiclePlate(rs.getString("vehiclePlate"));
                        mTrack.setLat(rs.getString("latitute"));
                        mTrack.setLon(rs.getString("longtitude"));
                        mTrack.setTime(rs.getString("Time"));
                        mRawResult.add(mTrack);
                    }

                    if (mRawResult.size() > 0) {                       

                        for (int i = 0; i < mRawResult.size() - 1; i++) {
                            String vehicle_data = "{";
                            // add return String                                    
                            vehicle_data = vehicle_data + "\"routeID\" : \"" + mRawResult.get(i).getRouteID() + "\",";
                            vehicle_data = vehicle_data + "\"vehiclePlate\" : \"" + mRawResult.get(i).getVehiclePlate() + "\",";
                            vehicle_data = vehicle_data + "\"latitute\" : \"" + mRawResult.get(i).getLat() + "\",";
                            vehicle_data = vehicle_data + "\"longtitude\" : \"" + mRawResult.get(i).getLon() + "\",";
                            vehicle_data = vehicle_data + "\"Time\" : \"" + mRawResult.get(i).getTime() + "\"";

                            vehicle_data = vehicle_data + "},";
                            result = result + vehicle_data;
                        }

                        result = result.substring(0, result.length() - 1) + "]}";
                    } else {
                        result = result + "]}";
                    }
                    //STEP 6: Clean-up environment
                    rs.close();
                    stmt.close();
                    conn.close();
                    break;
                } catch (Exception ex) {
                    Logger.getLogger(CommonLibForServlet.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

        }
        return result;
    }

    public static void getdata(String state) {
        switch (state) {
            case "start":
                String currentState = "";

                synchronized (Parameters.GET_DATA_STATE) {
                    currentState = Parameters.GET_DATA_STATE;
                }

                while (currentState.equals("start")) {
                    try {
                        System.out.println("Get data at: " + System.currentTimeMillis());
                        BAVehicle mResult = getVehicleInfoByCompanyID(Parameters.COMPANY_ID, Parameters.key);
                        putDataToLocalDBMS(Parameters.DATABASE_TYPE, String.valueOf(Parameters.COMPANY_ID), mResult);

                        Thread.sleep(10 * 60 * 1000); // update 10 mins

                    } catch (InterruptedException ex) {
                        Logger.getLogger(CommonLibForServlet.class
                                .getName()).log(Level.SEVERE, null, ex);
                    }
                }

                break;
            case "stop":
                break;
        }
    }

    public static void putDataToLocalDBMS(String connectType, String companyID, BAVehicle vehicleList) {

        switch (connectType) {
            case "oracle":
                break;
            case "mssql":
                break;
            case "mysql": {
                try {
                    // Khai báo class Driver cho DB MySQL                    
                    Class.forName("com.mysql.jdbc.Driver");
                    // Cấu trúc URL Connection dành cho MySQL                    
                    String connectionURL = "jdbc:mysql://" + Parameters.DATABASE_SERVER_IP_ADDRESS
                            + ":" + Parameters.DATABASE_SERVER_PORT + "/"
                            + Parameters.DATABASE_NAME + "?useUnicode=true&characterEncoding=utf-8";

                    // Mở kết nối
                    Connection conn = DriverManager.getConnection(connectionURL,
                            Parameters.DATABASE_USERNAME, Parameters.DATABASE_PASSWORD);

                    // Truy vấn
                    Statement stmt = conn.createStatement();
                    String sql_01 = "";
                    String sql_02 = "";
                    for (int i = 0; i < vehicleList.getVehicles().getVehicle().size(); i++) {
                        sql_01 = "Insert into vehicle_tracking values ";
                        Vehicle mVehicle = vehicleList.getVehicles().getVehicle().get(i);
                        String temp = "(\'" + companyID + "\',\'" + mVehicle.getVehiclePlate()
                                + "\',\'" + mVehicle.getUTCTime() + "\',\'" + mVehicle.getLocalTime()
                                + "\',\'" + mVehicle.getLatitude() + "\',\'" + mVehicle.getLongitude()
                                + "\',\'" + mVehicle.getSpeed() + "\',\'" + String.valueOf(mVehicle.getState())
                                + "\',\'" + mVehicle.getDirection() + "\',\'" + mVehicle.getAddress().replaceAll("\'", "")
                                + "\');";
                        sql_01 = sql_01 + temp;
                        temp = "";
                        int rs = stmt.executeUpdate(sql_01);

                        sql_02 = "UPDATE vehicle SET ";
                        temp = "LastUpdateTime=\'" + mVehicle.getUTCTime()
                                + "\',Latitude=\'" + mVehicle.getLatitude()
                                + "\',Longitude=\'" + mVehicle.getLongitude()
                                + "\',Speed=\'" + mVehicle.getSpeed()
                                + "\',state=\'" + mVehicle.getState()
                                + "\',Direction=\'" + mVehicle.getDirection()
                                + "\',Address=\'" + mVehicle.getAddress().replaceAll("\'", "")
                                + "\' where VehiclePlate=\'" + mVehicle.getVehiclePlate()
                                + "\';";
                        sql_02 = sql_02 + temp;
                        temp = "";
                        rs = stmt.executeUpdate(sql_02);
                    }

                    stmt.close();
                    conn.close();
                    break;

                } catch (Exception ex) {
                    Logger.getLogger(CommonLibForServlet.class
                            .getName()).log(Level.SEVERE, null, ex);
                }
            }

        }

    }

    private static BAVehicle getVehicleInfoByCompanyID(int companyID, java.lang.String key) {
        vn.com.binhanh.gps.BinhAnh service = new vn.com.binhanh.gps.BinhAnh();
        vn.com.binhanh.gps.BinhAnhSoap port = service.getBinhAnhSoap12();
        return port.getVehicleInfoByCompanyID(companyID, key);
    }

}
