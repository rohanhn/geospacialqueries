// Hàm tạo marker trên bản đồ và đặt sự kiện popup thông tin xe
    function createMarker(latlng, map, html, icon, bienso, drivername, searching, soxe) {

        var contentString = html;
		
		//alert(map);
        var mk = new google.maps.Marker({
        //var mk = new Gmarker({	

            position: latlng,

            map: map,
            
            icon: icon
            });
		
		var boxText = document.createElement("div");
        boxText.style.cssText = "border: 1px solid black; margin-top: 4px; padding: 7px; font-family:Arial, Helvetica, sans-serif; font-size: 12px; border: none;";
		boxText.setAttribute("class", "taxi_popup");
        boxText.innerHTML = contentString;
                
        var ibOptions = {
                 content: boxText,				 
				 alignBottom: true,
				 maxWidth: 250
                ,disableAutoPan: false
                ,maxWidth: 0
                ,pixelOffset: new google.maps.Size(-15, 0)
                ,zIndex: null
                ,boxStyle: { 
                  opacity: 0.75
                  ,width: "229px"
				  ,height: "182px"
				  ,margin: "10px"
                 }
                ,closeBoxMargin: "12px 12px 2px 2px"
                ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
                ,infoBoxClearance: new google.maps.Size(1, 1)
                ,isHidden: false
                ,pane: "floatPane"
                ,enableEventPropagation: false
        };

        var ib = new InfoBox(ibOptions);
        //ib.open(map, mk);
		google.maps.event.addListener(mk, "mouseover", function (e) {
			ib.open(map, this);
		});
		google.maps.event.addListener(mk, "mouseout", function (e) {
			ib.close();
		});
        
        vehicle_marker.push(mk);
        panelMarker +=  '<tr class="taxi_normal_row" id="laixe_'+bienso+'" height="16px">'+        
        				'<td>'+ soxe +
        				'</td>'+
        				'<td>'+
        					//'<a title="Click để focus vào vị trí xe" class="list_taxi_panel" href="javascript:myclick(' + (vehicle_marker.length-1) + ')">' + bienso + '<\/a> ' + 
        					'<a title="Click để focus vào vị trí xe" class="list_taxi_panel" href="javascript:myclick(' + (vehicle_marker.length-1) + ')">' + bienso + '<\/a> ' +
        				'</td>'+
        				'<td style="padding-left: 5px;">'+
        					drivername +
        				'</td>'+
        				'</tr>';
        	
        if(searching!=null){
        	searched_vehicle_marker.push(mk);
      		side_bar_html += '<a class="list_taxi_panel" href="javascript:myclick(' + (searched_vehicle_marker.length-1) + ')">' + bienso + '<\/a> ' + drivername +'<br>';
        }
    }
    
    function myclick(i) {
        //alert(vehicle_marker.length);
    	for(j=0; j<vehicle_marker.length; j++){
			if(j!=i)
				google.maps.event.trigger(vehicle_marker[j], "mouseout");			
			
		}
		google.maps.event.trigger(vehicle_marker[i], "mouseover");
    }
    
    function createFloodMarker(latlng, map, html, icon){
    	var contentString = html;
		var floodCirlce;
		//alert(map);
        var mk = new google.maps.Marker({
        //var mk = new Gmarker({	

            position: latlng,

            map: map,
            
            icon: icon
            });
		
        var boxText = document.createElement("div");
        boxText.style.cssText = "font-family:Arial, Helvetica, sans-serif; font-size: 12px;";
		boxText.setAttribute("class", "flood_popup");
        boxText.innerHTML = contentString;
                
        var ibOptions = {
                 content: boxText,				 
				 alignBottom: true,
				 maxWidth: 250
                ,disableAutoPan: false
                ,maxWidth: 0
                ,pixelOffset: new google.maps.Size(-75, -15)
                ,zIndex: null
                ,boxStyle: { 
                  opacity: 0.75
                  ,width: "211px"
				  ,height: "132px"
				  ,margin: "0px"
                 }
                ,closeBoxMargin: "12px 12px 2px 2px"
                ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
                ,infoBoxClearance: new google.maps.Size(1, 1)
                ,isHidden: false
                ,pane: "floatPane"
                ,enableEventPropagation: false
                ,boxClass: "flood_infobox"
        };

        var ib = new InfoBox(ibOptions);
        //ib.open(map, mk);
		google.maps.event.addListener(mk, "mouseover", function (e) {
			ib.open(map, this);
		});
		google.maps.event.addListener(mk, "mouseout", function (e) {
			ib.close();
		});
        
        flood_marker.push(mk);
//        var circleOptions = {
//        	      strokeColor: "#FF0000",
//        	      strokeOpacity: 0.8,
//        	      strokeWeight: 2,
//        	      
//        	      fillOpacity: 0.35,
//        	      map: map,
//        	      center: latlng,
//        	      radius: 100
//        	    };
//         floodCircle = new google.maps.Circle(circleOptions);
//         floodCircleArray.push(floodCircle);
    }
    
    function createTrafficjamMarker(latlng, map, html, icon){
    	var contentString = html;
		var trafficjamCirle;
		//alert(map);
        var mk = new google.maps.Marker({
        //var mk = new Gmarker({	

            position: latlng,

            map: map,
            
            icon: icon
            });		
        
        var boxText = document.createElement("div");
        boxText.style.cssText = "font-family:Arial, Helvetica, sans-serif; font-size: 12px;";	
		boxText.setAttribute("class", "trafficjam_popup");
        boxText.innerHTML = contentString;
                
        var ibOptions = {
                 content: boxText,				 
				 alignBottom: true,
				 maxWidth: 250
                ,disableAutoPan: false
                ,maxWidth: 0
                ,pixelOffset: new google.maps.Size(-75, -15)
                ,zIndex: null
                ,boxStyle: { 
                  opacity: 0.75
                  ,width: "211px"
				  ,height: "132px"
				  ,margin: "0px"						
                 }
                ,closeBoxMargin: "12px 20px 2px 2px"
                ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
                ,infoBoxClearance: new google.maps.Size(1, 1)
                ,isHidden: false
                ,pane: "floatPane"
                ,enableEventPropagation: false
                ,boxClass: "trafficjam_infobox"
        };

        var ib = new InfoBox(ibOptions);
        //ib.open(map, mk);
		google.maps.event.addListener(mk, "mouseover", function (e) {
			ib.open(map, this);
		});
		google.maps.event.addListener(mk, "mouseout", function (e) {
			ib.close();
		});
        
        trafficjam_marker.push(mk);
        /*var circleOptions = {
      	      strokeColor: "#FF0000",
      	      strokeOpacity: 0.8,
      	      strokeWeight: 2,
      	      fillColor: "#FFFFFF",
      	      fillOpacity: 0.35,
      	      map: map,
      	      center: latlng,
      	      radius: 100
      	    };
       trafficjamCircle = new google.maps.Circle(circleOptions);
       trafficjamCircleArray.push(trafficjamCircle);*/
    }