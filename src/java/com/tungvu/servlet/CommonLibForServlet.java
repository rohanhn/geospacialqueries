/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tungvu.servlet;

import com.tungvu.libs.Parameters;
import java.io.BufferedReader;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
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

                        Thread.sleep(60 * 10 * 1000);
                    } catch (InterruptedException ex) {
                        Logger.getLogger(CommonLibForServlet.class.getName()).log(Level.SEVERE, null, ex);
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
                            + Parameters.DATABASE_NAME;

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
                                + "\',Address=\'" + mVehicle.getAddress()
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
                    Logger.getLogger(CommonLibForServlet.class.getName()).log(Level.SEVERE, null, ex);
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
