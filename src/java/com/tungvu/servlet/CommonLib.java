/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tungvu.servlet;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 *
 * @author TungVu
 */
public class CommonLib {

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
}
