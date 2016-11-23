/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tungvu.secondo;

import com.tungvu.libs.Trips;
import java.util.AbstractList;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author TungVu
 */
public class CommonLib {

    public static List<Trips> parseTripsFromString(String resultString) {
        List<Trips> mResult = new ArrayList<Trips>();
        int index = resultString.indexOf("(P point))))\n    (");
        String temp = resultString.substring(index + 19);
        String[] stringArray = temp.split("\\)\\)");
        for (int i = 0; i < stringArray.length; i++) {
            String[] stringArrayNew = stringArray[i].replaceAll("\\(", "").split(" ");
            Trips mTrip = new Trips();

            mTrip.setLatitude(Double.valueOf(stringArrayNew[8]));
            mTrip.setLongitude(Double.valueOf(stringArrayNew[9]));
            mTrip.setUTC(stringArrayNew[10].substring(1, stringArrayNew[10].length() - 1));
            mTrip.setSpeed(Integer.valueOf(stringArrayNew[11]));
            mTrip.setS(Integer.valueOf(stringArrayNew[12]));
            mTrip.setI(stringArrayNew[13].substring(1, stringArrayNew[13].length() - 1));
            mResult.add(mTrip);
        }
//        System.out.println(temp);
        return mResult;
    }

}
