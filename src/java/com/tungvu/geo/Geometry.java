/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.tungvu.geo;

import java.awt.Point;
import java.util.List;
import javafx.scene.shape.Line;

/**
 *
 * @author TungVu
 */
public class Geometry {

    // Returns 1 if the lines intersect, otherwise 0. In addition, if the lines 
// intersect the intersection point may be stored in the floats i_x and i_y.
    public static int get_line_intersection(double p0_x, double p0_y, double p1_x, double p1_y,
            double p2_x, double p2_y, double p3_x, double p3_y) {
        double s1_x, s1_y, s2_x, s2_y;
        s1_x = p1_x - p0_x;
        s1_y = p1_y - p0_y;
        s2_x = p3_x - p2_x;
        s2_y = p3_y - p2_y;

        double s, t;
        s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
        t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

        if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
            return 1;
        }

        return 0; // No collision
    }

    public static int get_line_intersection(List<GeoPoint> mListPoint, GeoPoint startPoint, GeoPoint endPoint) {
        int result = 0;

        if (mListPoint.size() > 1) {
            try {
                for (int i = 0; i < mListPoint.size() - 1; i++) {
                    result = get_line_intersection(mListPoint.get(i).getLat(), mListPoint.get(i).getLon(),
                            mListPoint.get(i + 1).getLat(), mListPoint.get(i + 1).getLon(),
                            startPoint.getLat(), startPoint.getLon(),
                            endPoint.getLat(), endPoint.getLon());

                    if (result == 1) {
                        return 1;
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return result;
    }
}
