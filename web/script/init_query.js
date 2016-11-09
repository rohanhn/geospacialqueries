var map = null;
var service;
var infowindow;
var myOptions;
var directionsDisplay;
var distance;
var directionsService = new google.maps.DirectionsService();
var bankAdd;
// Ham khoi tao du lieu autocComplete cho textbox
// tungvuduong - 14/08/2012
function Init() {
    myOptions = {
        center: new google.maps.LatLng(21.044813, 105.79864),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        }
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(
            21.272739, 105.634918), new google.maps.LatLng(20.775375,
            105.901337));

    var input = document.getElementById('searchTextInput');
    var options = {
        types: ['establishment'],
        bounds: defaultBounds
    };

    // rightclick event
    google.maps.event.addListener(map, "rightclick", function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        var position = document.getElementById("position");
        position.value = lat + "," + lng;
    });

    // show block
    showpattern();
}

// Ham tim kiem xung quanh 1 diem cho truoc
// tungvuduong - 14/08/2012
function SearchMap() {
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    // Toa do diem tim kiem
    var LatLon = new google.maps.LatLng(21.044813, 105.79864);

    var request = {
        location: LatLon,
        radius: '500',
        types: ['atm']
    };
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.search(request, callback);
}

function showpattern() {
    var pattern = document.getElementById("select_pattern").options[document
            .getElementById("select_pattern").selectedIndex].value;

    var query001_block = document.getElementById("query001");
    var query002_block = document.getElementById("query002");
    var query003_block = document.getElementById("query003");
    var query004_block = document.getElementById("query004");
    var query005_block = document.getElementById("query005");
    var query006_block = document.getElementById("query006");
    var query007_block = document.getElementById("query007");

    switch (pattern) {
        case "1":
            query001_block.style.display = "block";
            query002_block.style.display = "none";
            query003_block.style.display = "none";
            query004_block.style.display = "none";
            query005_block.style.display = "none";
            query006_block.style.display = "none";
            query007_block.style.display = "none";
            break;
        case "2":
            query001_block.style.display = "none";
            query002_block.style.display = "block";
            query003_block.style.display = "none";
            query004_block.style.display = "none";
            query005_block.style.display = "none";
            query006_block.style.display = "none";
            query007_block.style.display = "none";
            break;
        case "3":
            query001_block.style.display = "none";
            query002_block.style.display = "none";
            query003_block.style.display = "block";
            query004_block.style.display = "none";
            query005_block.style.display = "none";
            query006_block.style.display = "none";
            query007_block.style.display = "none";
            break;
        case "4":
            query001_block.style.display = "none";
            query002_block.style.display = "none";
            query003_block.style.display = "none";
            query004_block.style.display = "block";
            query005_block.style.display = "none";
            query006_block.style.display = "none";
            query007_block.style.display = "none";
            // rightclick event
            google.maps.event.addListener(map, "rightclick", function (event) {
                var lat = event.latLng.lat();
                var lng = event.latLng.lng();
                var position = document.getElementById("position_query004");
                position.value = lat + "," + lng;
            });
            break;
        case "5":
            query001_block.style.display = "none";
            query002_block.style.display = "none";
            query003_block.style.display = "none";
            query004_block.style.display = "none";
            query005_block.style.display = "block";
            query006_block.style.display = "none";
            query007_block.style.display = "none";
            // rightclick event
            google.maps.event.addListener(map, "rightclick", function (event) {
                var lat = event.latLng.lat();
                var lng = event.latLng.lng();
                var position = document.getElementById("position_query005");
                position.value = lat + "," + lng;
            });
            break;
        case "6":
            query001_block.style.display = "none";
            query002_block.style.display = "none";
            query003_block.style.display = "none";
            query004_block.style.display = "none";
            query005_block.style.display = "none";
            query006_block.style.display = "block";
            query007_block.style.display = "none";
            // rightclick event
            google.maps.event.addListener(map, "rightclick", function (event) {
                var lat = event.latLng.lat();
                var lng = event.latLng.lng();
                var position = document.getElementById("position_query006");
                position.value = lat + "," + lng;
            });
            break;
        case "7":
            query001_block.style.display = "none";
            query002_block.style.display = "none";
            query003_block.style.display = "none";
            query004_block.style.display = "none";
            query005_block.style.display = "none";
            query006_block.style.display = "none";
            query007_block.style.display = "block";
            break;

    }
}

// Hàm tìm kiếm theo nội dung
// tungvuduong - 21/11/2012
function query001() {
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var resettxtResult = document.getElementById("resultBox").innerHTML;
    resettxtResult = "";
    document.getElementById("resultBox").innerHTML = resettxtResult;

    // Lay tham so tim kiem
    var Latlon = document.getElementById("position").value;
    var TempLatlon = new Array();
    TempLatlon = Latlon.split(",");
    var TempLat = parseFloat(TempLatlon[0]);
    var TempLon = parseFloat(TempLatlon[1]);
    var KhoangCach = getRadioValue("distance");
    distance = parseFloat(KhoangCach);
    var Source = getRadioValue("source");
    // var stringRequest = document.getElementById("searchTextInput").value;
    var stringRequest = document.getElementById("searchTextInput").options[document
            .getElementById("searchTextInput").selectedIndex].value;

    if ((Latlon != "") && (stringRequest != "")) {
        // Toa do diem tim kiem
        var LatLon = new google.maps.LatLng(TempLat, TempLon);

        // Hien thi vi tri hien tai tren ban do
        var image = 'images/people_32.png';
        var beachMarker = new google.maps.Marker({
            position: LatLon,
            map: map,
            icon: image
        });

        // Hien thi vung gioi han
        var cityCircle;
        var CircleOptions = {
            strokeColor: "#99F",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#99F",
            fillOpacity: 0.35,
            map: map,
            center: LatLon,
            radius: distance
        };
        cityCircle = new google.maps.Circle(CircleOptions);

        // Cap nhat center cua map
        map.setCenter(LatLon);

        var request = {
            location: LatLon,
            radius: distance,
            query: stringRequest
        };
        if (Source == 2) {

            var response = requestHTML("/GeoSpacialQuerries/getalls");
            var obj = convertResponseDataToObj(response);
            var txtResult = document.getElementById("resultBox").innerHTML;
            txtResult = txtResult + "<table style=\"width:100%\">";
            for (var i = 0; i < obj.length; i++) {
                var TempLatAtm = parseFloat(obj[i].lat);
                var TempLonAtm = parseFloat(obj[i].lon);
                var AtmAdress = obj[i].xLaixeHoten;
                var d = Distance(TempLat, TempLon, TempLatAtm,
                        TempLonAtm);
                var checkSts = false;
                if ((obj[i].xCompanyName.toUpperCase().search(
                        stringRequest.toUpperCase()) != -1)
                        || (obj[i].xLaixeHoten.toUpperCase()
                                .search(stringRequest.toUpperCase()) != -1)) {
                    checkSts = true;
                }
                // kiem tra khoang cach thoa man dieu kien
                if ((d <= distance) && (checkSts)) {
                    // alert(d);
                    txtResult = txtResult + "<tr bgcolor=\"#8fbafa\">";
                    txtResult = txtResult + "<td style=\"width:55%\">"
                            + obj[i].xBienso + "-"
                            + obj[i].xCompanyName + "</td>";
                    txtResult = txtResult
                            + "<td style=\"width:30% ;text-align: right\">"
                            + d.toFixed(3) + " m" + "</td>";
                    txtResult = txtResult
                            + "<td style=\"width:15%\"><img src=\"/images/btn.png\" style=\"width:30px; padding:5px \" onclick=\"GetDirection("
                            + TempLat + "," + TempLon + ","
                            + TempLatAtm + "," + TempLonAtm + ")\"/>";
                    txtResult = txtResult + "</td></tr>";
                    bankAdd = obj[i].xBienso + "-" + obj[i].xCompanyName;
                    createMarker2(TempLatAtm, TempLonAtm, bankAdd);
                    checkSts = false;
                }

            }
            txtResult = txtResult + "</table>";
            document.getElementById("resultBox").innerHTML = txtResult;
        }

        // rightclick event
        google.maps.event.addListener(map, "rightclick", function (event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            var position = document.getElementById("position");
            position.value = lat + "," + lng;
        });
    } else {
        alert("Chưa nhập đủ dữ liệu!");
    }
}

function query002() {

    // get input
    var street_name = document.getElementById("street").value;
    var start_time = document.getElementById("starttime").value;
    var end_time = document.getElementById("endtime").value;

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var resettxtResult = document.getElementById("resultBox").innerHTML;
    resettxtResult = "";
    document.getElementById("resultBox").innerHTML = resettxtResult;

    if (true) {
        // truy van tu Secondo        
        var response = requestHTML("/GeoSpacialQuerries/getalls");
        var report_data = convertResponseDataToObj(response);
        var txtResult = document.getElementById("resultBox").innerHTML;
        txtResult = txtResult + "<table style=\"width:100%\">";
        for (var i = 0; i < report_data.length; i++) {
            var TempLatAtm = parseFloat(report_data[i].lat);
            var TempLonAtm = parseFloat(report_data[i].lon);
            var AtmAdress = report_data[i].xLaixeHoten;

            // alert(d);
            txtResult = txtResult + "<tr bgcolor=\"#8fbafa\">";
            txtResult = txtResult + "<td style=\"width:55%\">"
                    + report_data[i].xBienso + "-"
                    + report_data[i].xCompanyName + "</td>";
            txtResult = txtResult + "</td></tr>";
            bankAdd = report_data[i].xBienso + "-"
                    + report_data[i].xCompanyName;
            createMarker2(TempLatAtm, TempLonAtm, bankAdd);
        }
        txtResult = txtResult + "</table>";
        document.getElementById("resultBox").innerHTML = txtResult;

        // hien thi ket qua truy van secondo

        // rightclick event
        google.maps.event.addListener(map, "rightclick", function (event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            var position = document.getElementById("position");
            position.value = lat + "," + lng;
        });
    } else {
        alert("Chưa nhập đủ dữ liệu!");
    }

}

function query003() {

    // get input
    var number_of_vehicles = document.getElementById("number_of_vehicles").options[document
            .getElementById("number_of_vehicles").selectedIndex].value;
    var street_length = getRadioValue("distance");

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var resettxtResult = document.getElementById("resultBox").innerHTML;
    resettxtResult = "";
    document.getElementById("resultBox").innerHTML = resettxtResult;

    if ((street_length.length > 0) && (number_of_vehicles.length > 0)) {
        // truy van tu Secondo
        // hoac
        // gia lap lay du lieu tu CSDL

        // hien thi ket qua truy van secondo

    } else {
        alert("Chưa nhập đủ dữ liệu!");
    }

}

function query004() {
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var resettxtResult = document.getElementById("resultBox").innerHTML;
    resettxtResult = "";
    document.getElementById("resultBox").innerHTML = resettxtResult;

    // Lay tham so tim kiem
    var Latlon = document.getElementById("position").value;
    var TempLatlon = new Array();
    TempLatlon = Latlon.split(",");
    var TempLat = parseFloat(TempLatlon[0]);
    var TempLon = parseFloat(TempLatlon[1]);
    var KhoangCach = getRadioValue("distance");
    distance = parseFloat(KhoangCach);
    var Source = getRadioValue("source");
    var time = document.getElementById("time").value;

    if ((Latlon != "") && (time != "")) {
        // Toa do diem tim kiem
        var LatLon = new google.maps.LatLng(TempLat, TempLon);

        // Hien thi vi tri hien tai tren ban do
        var image = 'images/people_32.png';
        var beachMarker = new google.maps.Marker({
            position: LatLon,
            map: map,
            icon: image
        });

        // Hien thi vung gioi han
        var cityCircle;
        var CircleOptions = {
            strokeColor: "#99F",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#99F",
            fillOpacity: 0.35,
            map: map,
            center: LatLon,
            radius: distance
        };
        cityCircle = new google.maps.Circle(CircleOptions);
        // Cap nhat center cua map
        map.setCenter(LatLon);

        // truy van tu Secondo
        var response = requestHTML("/GeoSpacialQuerries/getalls");
        var report_data = convertResponseDataToObj(response);
        var txtResult = document.getElementById("resultBox").innerHTML;
        txtResult = txtResult + "<table style=\"width:100%\">";
        for (var i = 0; i < report_data.length; i++) {
            var TempLatAtm = parseFloat(report_data[i].lat);
            var TempLonAtm = parseFloat(report_data[i].lon);
            var AtmAdress = report_data[i].xLaixeHoten;
            var d = Distance(TempLat, TempLon, TempLatAtm, TempLonAtm);

            // kiem tra khoang cach thoa man dieu kien
            if (d <= distance) {
                // alert(d);
                txtResult = txtResult + "<tr bgcolor=\"#8fbafa\">";
                txtResult = txtResult + "<td style=\"width:55%\">"
                        + report_data[i].xBienso + "-"
                        + report_data[i].xCompanyName + "</td>";
                txtResult = txtResult
                        + "<td style=\"width:30% ;text-align: right\">"
                        + d.toFixed(3) + " m" + "</td>";
                txtResult = txtResult
                        + "<td style=\"width:15%\"><img src=\"/images/btn.png\" style=\"width:30px; padding:5px \" onclick=\"GetDirection("
                        + TempLat + "," + TempLon + "," + TempLatAtm
                        + "," + TempLonAtm + ")\"/>";
                txtResult = txtResult + "</td></tr>";
                bankAdd = report_data[i].xBienso + "-"
                        + report_data[i].xCompanyName;
                createMarker2(TempLatAtm, TempLonAtm, bankAdd);
            }
        }
        txtResult = txtResult + "</table>";
        document.getElementById("resultBox").innerHTML = txtResult;

        // hien thi ket qua truy van secondo

        // rightclick event
        google.maps.event.addListener(map, "rightclick", function (event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            var position = document.getElementById("position");
            position.value = lat + "," + lng;
        });
    } else {
        alert("Chưa nhập đủ dữ liệu!");
    }

}

function main_query004() {
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var resettxtResult = document.getElementById("resultBox").innerHTML;
    resettxtResult = "";
    document.getElementById("resultBox").innerHTML = resettxtResult;

    // Lay tham so tim kiem
    var Latlon = document.getElementById("position_query004").value;
    var TempLatlon = new Array();
    TempLatlon = Latlon.split(",");
    var TempLat = parseFloat(TempLatlon[0]);
    var TempLon = parseFloat(TempLatlon[1]);
    var KhoangCach = getRadioValue("distance_query004");
    distance = parseFloat(KhoangCach);
    var Source = getRadioValue("source_query004");
    var time = document.getElementById("time_query004").value;

    if ((Latlon != "") && (time != "")) {
        // Toa do diem tim kiem
        var LatLon = new google.maps.LatLng(TempLat, TempLon);

        // Hien thi vi tri hien tai tren ban do
        var image = 'images/people_32.png';
        var beachMarker = new google.maps.Marker({
            position: LatLon,
            map: map,
            icon: image
        });

        // Hien thi vung gioi han
        var cityCircle;
        var CircleOptions = {
            strokeColor: "#99F",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#99F",
            fillOpacity: 0.35,
            map: map,
            center: LatLon,
            radius: distance
        };
        cityCircle = new google.maps.Circle(CircleOptions);
        // Cap nhat center cua map
        map.setCenter(LatLon);

        // truy van tu Secondo
        var response = requestHTML("/GeoSpacialQuerries/getalls");
        var report_data = convertResponseDataToObj(response);
        var txtResult = document.getElementById("resultBox").innerHTML;
        txtResult = txtResult + "<table style=\"width:100%\">";
        for (var i = 0; i < report_data.length; i++) {
            var TempLatAtm = parseFloat(report_data[i].lat);
            var TempLonAtm = parseFloat(report_data[i].lon);
            var AtmAdress = report_data[i].xLaixeHoten;
            var d = Distance(TempLat, TempLon, TempLatAtm, TempLonAtm);

            // kiem tra khoang cach thoa man dieu kien
            if (d <= distance) {
                // alert(d);
                txtResult = txtResult + "<tr bgcolor=\"#8fbafa\">";
                txtResult = txtResult + "<td style=\"width:55%\">"
                        + report_data[i].xBienso + "-"
                        + report_data[i].xCompanyName + "</td>";
                txtResult = txtResult
                        + "<td style=\"width:30% ;text-align: right\">"
                        + d.toFixed(3) + " m" + "</td>";
                txtResult = txtResult
                        + "<td style=\"width:15%\"><img src=\"/images/btn.png\" style=\"width:30px; padding:5px \" onclick=\"GetDirection("
                        + TempLat + "," + TempLon + "," + TempLatAtm
                        + "," + TempLonAtm + ")\"/>";
                txtResult = txtResult + "</td></tr>";
                bankAdd = report_data[i].xBienso + "-"
                        + report_data[i].xCompanyName;
                createMarker2(TempLatAtm, TempLonAtm, bankAdd);
            }
        }
        txtResult = txtResult + "</table>";
        document.getElementById("resultBox").innerHTML = txtResult;

        // hien thi ket qua truy van secondo

        // rightclick event
        google.maps.event.addListener(map, "rightclick", function (event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            var position = document.getElementById("position_query004");
            position.value = lat + "," + lng;
        });
    } else {
        alert("Chưa nhập đủ dữ liệu!");
    }

}

function query005() {
    // get input
    var Latlon = document.getElementById("position").value;
    var time = document.getElementById("time").value;

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var resettxtResult = document.getElementById("resultBox").innerHTML;
    resettxtResult = "";
    document.getElementById("resultBox").innerHTML = resettxtResult;
    var TempLatlon = new Array();
    TempLatlon = Latlon.split(",");
    var TempLat = parseFloat(TempLatlon[0]);
    var TempLon = parseFloat(TempLatlon[1]);

    // truy van
    if (time.length > 0) {
        // Toa do diem tim kiem
        var LatLon = new google.maps.LatLng(TempLat, TempLon);

        // Hien thi vi tri hien tai tren ban do
        var image = 'images/people_32.png';
        var beachMarker = new google.maps.Marker({
            position: LatLon,
            map: map,
            icon: image
        });

        // Hien thi vung gioi han
        var cityCircle;
        var CircleOptions = {
            strokeColor: "#99F",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#99F",
            fillOpacity: 0.35,
            map: map,
            center: LatLon,
            radius: distance
        };
        cityCircle = new google.maps.Circle(CircleOptions);
        // Cap nhat center cua map
        map.setCenter(LatLon);

        // truy van tu Secondo
        var response = requestHTML("/GeoSpacialQuerries/getalls");
        var report_data = convertResponseDataToObj(response);
        var txtResult = document.getElementById("resultBox").innerHTML;
        txtResult = txtResult + "<table style=\"width:100%\">";
        for (var i = 0; i < report_data.length; i++) {
            var TempLatAtm = parseFloat(report_data[i].lat);
            var TempLonAtm = parseFloat(report_data[i].lon);
            var AtmAdress = report_data[i].xLaixeHoten;
            var d = Distance(TempLat, TempLon, TempLatAtm, TempLonAtm);
            // kiem tra khoang cach thoa man dieu kien
            if (d <= 1000) {
                // alert(d);
                txtResult = txtResult + "<tr bgcolor=\"#8fbafa\">";
                txtResult = txtResult + "<td style=\"width:55%\">"
                        + report_data[i].xBienso + "-"
                        + report_data[i].xCompanyName + "</td>";
                txtResult = txtResult
                        + "<td style=\"width:15%\"><img src=\"/images/btn.png\" style=\"width:30px; padding:5px \" onclick=\"GetDirection("
                        + TempLat + "," + TempLon + "," + TempLatAtm
                        + "," + TempLonAtm + ")\"/>";
                txtResult = txtResult + "</td></tr>";
                bankAdd = report_data[i].xBienso + "-"
                        + report_data[i].xCompanyName;
                createMarker2(TempLatAtm, TempLonAtm, bankAdd);
            }
        }
        txtResult = txtResult + "</table>";
        document.getElementById("resultBox").innerHTML = txtResult;

        // hien thi ket qua truy van secondo

        // rightclick event
        google.maps.event.addListener(map, "rightclick", function (event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            var position = document.getElementById("position");
            position.value = lat + "," + lng;
        });
    } else {
        alert("Chưa nhập đủ dữ liệu!");
    }

}

function main_query005() {
    // get input
    var Latlon = document.getElementById("position_query005").value;
    var time = document.getElementById("time_query005").value;

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var resettxtResult = document.getElementById("resultBox").innerHTML;
    resettxtResult = "";
    document.getElementById("resultBox").innerHTML = resettxtResult;
    var TempLatlon = new Array();
    TempLatlon = Latlon.split(",");
    var TempLat = parseFloat(TempLatlon[0]);
    var TempLon = parseFloat(TempLatlon[1]);

    // truy van
    if (time.length > 0) {
        // Toa do diem tim kiem
        var LatLon = new google.maps.LatLng(TempLat, TempLon);

        // Hien thi vi tri hien tai tren ban do
        var image = 'images/people_32.png';
        var beachMarker = new google.maps.Marker({
            position: LatLon,
            map: map,
            icon: image
        });

        // Hien thi vung gioi han
        var cityCircle;
        var CircleOptions = {
            strokeColor: "#99F",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#99F",
            fillOpacity: 0.35,
            map: map,
            center: LatLon,
            radius: distance
        };
        cityCircle = new google.maps.Circle(CircleOptions);
        // Cap nhat center cua map
        map.setCenter(LatLon);

        // truy van tu Secondo
        // gia lap lay du lieu tu CSDL
        var response = requestHTML("/GeoSpacialQuerries/getalls");
        var report_data = convertResponseDataToObj(response);
        var txtResult = document.getElementById("resultBox").innerHTML;
        txtResult = txtResult + "<table style=\"width:100%\">";
        for (var i = 0; i < report_data.length; i++) {
            var TempLatAtm = parseFloat(report_data[i].lat);
            var TempLonAtm = parseFloat(report_data[i].lon);
            var AtmAdress = report_data[i].xLaixeHoten;
            var d = Distance(TempLat, TempLon, TempLatAtm, TempLonAtm);
            // kiem tra khoang cach thoa man dieu kien
            if (d <= 1000) {
                // alert(d);
                txtResult = txtResult + "<tr bgcolor=\"#8fbafa\">";
                txtResult = txtResult + "<td style=\"width:55%\">"
                        + report_data[i].xBienso + "-"
                        + report_data[i].xCompanyName + "</td>";
                txtResult = txtResult
                        + "<td style=\"width:15%\"><img src=\"/images/btn.png\" style=\"width:30px; padding:5px \" onclick=\"GetDirection("
                        + TempLat + "," + TempLon + "," + TempLatAtm
                        + "," + TempLonAtm + ")\"/>";
                txtResult = txtResult + "</td></tr>";
                bankAdd = report_data[i].xBienso + "-"
                        + report_data[i].xCompanyName;
                createMarker2(TempLatAtm, TempLonAtm, bankAdd);
            }
        }
        txtResult = txtResult + "</table>";
        document.getElementById("resultBox").innerHTML = txtResult;

        // hien thi ket qua truy van secondo

        // rightclick event
        google.maps.event.addListener(map, "rightclick", function (event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            var position = document.getElementById("position_query005");
            position.value = lat + "," + lng;
        });
    } else {
        alert("Chưa nhập đủ dữ liệu!");
    }

}

function query006() {
    // get input
    var Latlon = document.getElementById("position").value;
    var KhoangCach = getRadioValue("distance");
    alert(Latlon);
    alert(KhoangCach);

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var resettxtResult = document.getElementById("resultBox").innerHTML;
    resettxtResult = "";
    document.getElementById("resultBox").innerHTML = resettxtResult;
    var TempLatlon = new Array();
    TempLatlon = Latlon.split(",");
    var TempLat = parseFloat(TempLatlon[0]);
    var TempLon = parseFloat(TempLatlon[1]);

    // truy van
    if (KhoangCach.length > 0) {
        // truy van tu Secondo
        var response = requestHTML("/GeoSpacialQuerries/query006?start_point=" + Latlon + "&&distance=" + KhoangCach);
        var report_data = convertResponseDataToObj(response);



//        // Toa do diem tim kiem
//        var LatLon = new google.maps.LatLng(TempLat, TempLon);
//
//        // Hien thi vi tri hien tai tren ban do
//        var image = 'images/people_32.png';
//        var beachMarker = new google.maps.Marker({
//            position: LatLon,
//            map: map,
//            icon: image
//        });
//
//        // Hien thi vung gioi han
//        var cityCircle;
//        var CircleOptions = {
//            strokeColor: "#99F",
//            strokeOpacity: 0.8,
//            strokeWeight: 1,
//            fillColor: "#99F",
//            fillOpacity: 0.35,
//            map: map,
//            center: LatLon,
//            radius: distance
//        };
//        cityCircle = new google.maps.Circle(CircleOptions);
//        // Cap nhat center cua map
//        map.setCenter(LatLon);
//
//        // truy van tu Secondo
//        var response = requestHTML("/GeoSpacialQuerries/getalls");
//        var report_data = convertResponseDataToObj(response);
//        var txtResult = document.getElementById("resultBox").innerHTML;
//        txtResult = txtResult + "<table style=\"width:100%\">";
//        for (var i = 0; i < report_data.length; i++) {
//            var TempLatAtm = parseFloat(report_data[i].lat);
//            var TempLonAtm = parseFloat(report_data[i].lon);
//            var AtmAdress = report_data[i].xLaixeHoten;
//            var d = Distance(TempLat, TempLon, TempLatAtm, TempLonAtm);
//            // kiem tra khoang cach thoa man dieu kien
//            if (d <= 1000) {
//                // alert(d);
//                txtResult = txtResult + "<tr bgcolor=\"#8fbafa\">";
//                txtResult = txtResult + "<td style=\"width:55%\">"
//                        + report_data[i].xBienso + "-"
//                        + report_data[i].xCompanyName + "</td>";
//                txtResult = txtResult
//                        + "<td style=\"width:15%\"><img src=\"/images/btn.png\" style=\"width:30px; padding:5px \" onclick=\"GetDirection("
//                        + TempLat + "," + TempLon + "," + TempLatAtm
//                        + "," + TempLonAtm + ")\"/>";
//                txtResult = txtResult + "</td></tr>";
//                bankAdd = report_data[i].xBienso + "-"
//                        + report_data[i].xCompanyName;
//                createMarker2(TempLatAtm, TempLonAtm, bankAdd);
//            }
//        }
//        txtResult = txtResult + "</table>";
//        document.getElementById("resultBox").innerHTML = txtResult;
//
//        // hien thi ket qua truy van secondo
//
//        // rightclick event
//        google.maps.event.addListener(map, "rightclick", function (event) {
//            var lat = event.latLng.lat();
//            var lng = event.latLng.lng();
//            var position = document.getElementById("position");
//            position.value = lat + "," + lng;
//        });
    } else {
        alert("Chưa nhập đủ dữ liệu!");
    }

}

function main_query006() {
    // get input
    var Latlon = document.getElementById("position_query006").value;
    var KhoangCach = getRadioValue("distance_query006");

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var resettxtResult = document.getElementById("resultBox").innerHTML;
    resettxtResult = "";
    document.getElementById("resultBox").innerHTML = resettxtResult;
    var TempLatlon = new Array();
    TempLatlon = Latlon.split(",");
    var TempLat = parseFloat(TempLatlon[0]);
    var TempLon = parseFloat(TempLatlon[1]);

    // truy van
    if (KhoangCach.length > 0) {
        // Toa do diem tim kiem
        var LatLon = new google.maps.LatLng(TempLat, TempLon);

        // Hien thi vi tri hien tai tren ban do
        var image = 'images/people_32.png';
        var beachMarker = new google.maps.Marker({
            position: LatLon,
            map: map,
            icon: image
        });

        // Hien thi vung gioi han
        var cityCircle;
        var CircleOptions = {
            strokeColor: "#99F",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#99F",
            fillOpacity: 0.35,
            map: map,
            center: LatLon,
            radius: distance
        };
        cityCircle = new google.maps.Circle(CircleOptions);
        // Cap nhat center cua map
        map.setCenter(LatLon);

        // truy van tu Secondo
        var response = requestHTML("/GeoSpacialQuerries/getalls");
        var report_data = convertResponseDataToObj(response);
        var txtResult = document.getElementById("resultBox").innerHTML;
        txtResult = txtResult + "<table style=\"width:100%\">";
        for (var i = 0; i < report_data.length; i++) {
            var TempLatAtm = parseFloat(report_data[i].lat);
            var TempLonAtm = parseFloat(report_data[i].lon);
            var AtmAdress = report_data[i].xLaixeHoten;
            var d = Distance(TempLat, TempLon, TempLatAtm, TempLonAtm);
            // kiem tra khoang cach thoa man dieu kien
            if (d <= 1000) {
                // alert(d);
                txtResult = txtResult + "<tr bgcolor=\"#8fbafa\">";
                txtResult = txtResult + "<td style=\"width:55%\">"
                        + report_data[i].xBienso + "-"
                        + report_data[i].xCompanyName + "</td>";
                txtResult = txtResult
                        + "<td style=\"width:15%\"><img src=\"/images/btn.png\" style=\"width:30px; padding:5px \" onclick=\"GetDirection("
                        + TempLat + "," + TempLon + "," + TempLatAtm
                        + "," + TempLonAtm + ")\"/>";
                txtResult = txtResult + "</td></tr>";
                bankAdd = report_data[i].xBienso + "-"
                        + report_data[i].xCompanyName;
                createMarker2(TempLatAtm, TempLonAtm, bankAdd);
            }
        }
        txtResult = txtResult + "</table>";
        document.getElementById("resultBox").innerHTML = txtResult;

        // hien thi ket qua truy van secondo

        // rightclick event
        google.maps.event.addListener(map, "rightclick", function (event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            var position = document.getElementById("position_query006");
            position.value = lat + "," + lng;
        });
    } else {
        alert("Chưa nhập đủ dữ liệu!");
    }

}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var txtResult = document.getElementById("resultBox").innerHTML;
        txtResult = txtResult + "<table style=\"width:100%\">";
        // Lay tham so tim kiem
        var Latlon = document.getElementById("position").value;
        var TempLatlon = new Array();
        TempLatlon = Latlon.split(",");
        var TempLat = parseFloat(TempLatlon[0]);
        var TempLon = parseFloat(TempLatlon[1]);
        // alert(txtResult);
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            // tinh khoang cach toi diem tim thay
            var d = Distance(TempLat, TempLon, results[i].geometry.location
                    .lat(), results[i].geometry.location.lng());
            // kiem tra khoang cach thoa man dieu kien
            if (d <= distance) {
                txtResult = txtResult + "<tr bgcolor=\"#dad981\">";
                txtResult = txtResult + "<td style=\"width:85%\">"
                        + results[i].name + "</td>";
                txtResult = txtResult
                        + "<td style=\"width:15%\"><img src=\"/images/btn.png\" style=\"width:30px; padding:5px \" onclick=\"GetDirection("
                        + TempLat + "," + TempLon + ","
                        + results[i].geometry.location.lat() + ","
                        + results[i].geometry.location.lng() + ")\"/>";
                txtResult = txtResult + "</td></tr>";
                createMarker(results[i]);
            }
        }
        txtResult = txtResult + "</table>";
        document.getElementById("resultBox").innerHTML = txtResult;
        // alert(txtResult);
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var image = 'images/myATM_32.png';
    var marker = new google.maps.Marker({
        map: map,
        icon: image,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

function createMarker2(lat, lon, add) {
    var LatLonMarker = new google.maps.LatLng(lat, lon);
    // Hien thi vi tri hien tai tren ban do
    var image2 = 'images/TaxiGreen_32.png';
    var AtmMarker = new google.maps.Marker({
        position: LatLonMarker,
        map: map,
        icon: image2
    });

    // click event
    infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(AtmMarker, 'click', function () {
        // alert(bankAdd);
        infowindow.setContent(add);
        infowindow.open(map, this);
    });
}

// ham tim duong voi diem dau va diem cuoi
function GetDirection(lat1, lng1, lat2, lng2) {
    // khoi tao lai map de reset cac lop ban do
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var directionsService = new google.maps.DirectionsService();
    var start = new google.maps.LatLng(lat1, lng1);
    var end = new google.maps.LatLng(lat2, lng2);
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function (results, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(results);
        }
    });
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    // rightclick event
    google.maps.event.addListener(map, "rightclick", function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        var position = document.getElementById("position");
        position.value = lat + "," + lng;
    });
}

// ham tim gia tri theo geocode
function codeAddress() {
    var address = document.getElementById('searchTextField').value;
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

        } else {
            alert('Không xác định được vị trí cần tìm');
        }
    });
}

// tinh khoang cach giua 2 diem co toa do lat, lng
// tungvuduong - 30/10/2012
function Distance(lat1, lng1, lat2, lng2) {
    var R = 6371;
    var lat1rad = deg2rad(lat1);
    var lng1rad = deg2rad(lng1);
    var lat2rad = deg2rad(lat2);
    var lng2rad = deg2rad(lng2);

    var deltaLat = lat2rad - lat1rad;
    var deltaLng = lng2rad - lng1rad;

    var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1rad)
            * Math.cos(lat2rad) * Math.sin(deltaLng / 2)
            * Math.sin(deltaLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c * 1000; // chuyen sang don vi met
    // alert(d);
    return d;
}

// convert he toa do degrees sang radians
// radians = degrees * pi/180
function deg2rad(deg) {
    rad = deg * Math.PI / 180;
    return rad;
}

function getRadioValue(name) {
    for (var i = 0; i < document.getElementsByName(name).length; i++) {
        if (document.getElementsByName(name)[i].checked) {
            return document.getElementsByName(name)[i].value;
        }
    }
}

function Hello() {
    alert("hello");
}

function reloadPage() {
    location.reload();
}

function makeHttpObject() {
    try {
        return new XMLHttpRequest();
    } catch (error) {
    }
    try {
        return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (error) {
    }
    try {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (error) {
    }
    throw new Error("Could not create HTTP request object.");
}

function requestHTML(url) {
    var request = makeHttpObject();
    request.open("GET", url, false);
    request.send(null);
    return (request.responseText);
}

function convertResponseDataToObj(datainput) {
    var start = datainput.indexOf("[");
    var end = datainput.indexOf("]");
    var subString = datainput.substring(start, end + 1);
    var obj = JSON.parse(subString);
    return obj;
}