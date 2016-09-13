function mahoa(str) 
{
	var text="";
	//xá»­ lÃ½ vá»›i lá»—i dáº¥u cÃ¡ch
	//var strTemp = 	str.replace(" ","+");
	//alert(strTemp);
	var mahoachuoi = encodeURIComponent(str);	
	for (i = 0; i <= mahoachuoi.length; i++)
	{
		text = mahoachuoi.substring(i, i+1) + text;
	}
	return text;
}

function giaima(str)
{
	var text="";	
	for (i = 0; i <= str.length; i++)
	{
		text = str.substring(i, i+1) + text;
	}
	var giaimachuoi = decodeURIComponent(text);
	return giaimachuoi;
}
var getUserData = function(){
	var userName = readCookie("username");	
}

var showHomeTab = function(entity) {
	var currentDate = new Date();
	var currentYear = currentDate.getFullYear();
	var currentMonth = currentDate.getMonth() + 1;
	var currentDay = currentDate.getDate();
	var currentHour = currentDate.getHours();
	var currentMin = currentDate.getMinutes();
	
	//remove the active class from all the tabs
	$('.tab').removeClass("active");
	//setting the active class to the selected tab
	$('#'+entity).addClass("active");
	//hiding all the tabs
	$('.tab-unit').hide();
	//showing the selected tab
	if(entity == "xemvet"){
		document.getElementById('txt_baocao_datefrom').value = currentDay + '/' + currentMonth + '/' + currentYear;
		document.getElementById('txt_baocao_dateto').value = currentDay + '/' + currentMonth + '/' + currentYear;
		document.getElementById('txt_baocao_timeto').value = currentHour + ":" + currentMin;
	}
	if(entity == "baocao"){
		document.getElementById('txt_report_datefrom').value = currentDay + '/' + currentMonth + '/' + currentYear;
		document.getElementById('txt_report_dateto').value = currentDay + '/' + currentMonth + '/' + currentYear;
		document.getElementById('txt_report_timeto').value = currentHour + ":" + currentMin;
	}
	$('#' + entity + '-tab').show();
	//hiding the create block
	
}

var changeRowColor = function(i){
	$('.taxi_normal_row').removeClass("bold_row");
	$('#laixe_'+i).addClass("bold_row");
	var row = $('#laixe_'+i).css("display");
	if(row == "none"){
		//alert($('#tbody_list_vehicle tr').index($('#laixe_'+i)));
		go_to_page($('#tbody_list_vehicle tr').index($('#laixe_'+i))/10);
	}
}

/* Cookies Login*/
function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function logOut(){
	eraseCookie("username");
	eraseCookie("groupId");
	eraseCookie("companyId");
	window.location = "./login.html";
}

function vehicleSearchKeyPress(e){
	if (e.keyCode == 13) 
	{
		searchTaxi();
	}
}

function stringToDateTime(s){
	var t = s.split("_");
	return t[1]+'-'+t[0];
}

function HomeControl(controlDiv, html, map) {
	  // Set CSS styles for the DIV containing the control
	  controlDiv.style.marginTop = '5px';
	  controlDiv.style.padding = '5px';
	  controlDiv.style.height = '155px';	
	  controlDiv.style.width = '135px';

	  // Set CSS for the control border.
	  var controlUI = document.createElement('div');
	  controlUI.style.backgroundColor = 'black';
	  controlUI.style.cursor = 'pointer';
	  controlUI.style.textAlign = 'center';	  
	  controlDiv.appendChild(controlUI);

	  // Set CSS for the control interior.
	  var controlHeading = document.createElement('h1');
	  controlHeading.id = 'alertHeading';
	  controlHeading.innerHTML = 'QUÁ TỐC ĐỘ';
	  controlUI.appendChild(controlHeading);
	  var controlText = document.createElement('div');
	  controlText.id = 'alertContent';
	  controlText.style.fontFamily = 'Arial,sans-serif';
	  controlText.style.height = '110px';
	  controlText.style.overflow = 'auto';
	  controlText.style.fontSize = '12px';
	  controlText.style.paddingLeft = '4px';
	  controlText.style.paddingRight = '4px';
	  controlText.style.textAlign = 'left';
	  //controlText.style.marginTop = '15px';
	  controlText.innerHTML = '';
	  controlText.innerHTML += html;
	  controlUI.appendChild(controlText);

	  // Setup the click event listeners: simply set the map to Chicago.
	  google.maps.event.addDomListener(controlUI, 'click', function() {
	    
	  });
	}

function showAlertWindow(html){	
	var homeControlDiv = document.createElement('div'); // Thẻ div cảnh báo nguy hiểm
	homeControlDiv.id= 'alertPopup';
	homeControlDiv.style.top = '255px';
	var homeControl = new HomeControl(homeControlDiv, html, map);
	homeControlDiv.index = 1;
	homeControlDiv.style.top = '255px';
	map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(homeControlDiv);
}

function hideAlertWindow(){
	map.controls[google.maps.ControlPosition.RIGHT_CENTER].clear();
}

function SOSControl(controlDiv, html, map) {

	  // Set CSS styles for the DIV containing the control	  
	  controlDiv.style.padding = '5px';
	  controlDiv.style.height = '155px';
	  controlDiv.style.width = '135px';

	  // Set CSS for the control border.
	  var controlUI = document.createElement('div');
	  controlUI.style.backgroundColor = 'black';
	  controlUI.style.cursor = 'pointer';
	  controlUI.style.textAlign = 'center';	  	  
	  controlDiv.appendChild(controlUI);

	  // Set CSS for the control interior.
	  var controlHeading = document.createElement('h1');
	  controlHeading.id = 'sosHeading';
	  controlHeading.innerHTML = 'NGUY HIỂM';
	  controlUI.appendChild(controlHeading);
	  var controlText = document.createElement('div');
	  controlText.id = 'sosContent';
	  controlText.style.fontFamily = 'Arial,sans-serif';
	  controlText.style.color = 'red';
	  controlText.style.height = '110px';
	  controlText.style.overflowY = 'auto';
	  controlText.style.fontSize = '12px';
	  controlText.style.paddingLeft = '4px';
	  controlText.style.paddingRight = '4px';
	  controlText.style.textAlign = 'left';
	  //controlText.style.marginTop = '15px';
	  controlText.innerHTML = '';
	  controlText.innerHTML += html;
	  controlUI.appendChild(controlText);

	  // Setup the click event listeners: simply set the map to Chicago.
	  google.maps.event.addDomListener(controlUI, 'click', function() {
	    
	  });
	}

function showSOSWindow(html){	
	var homeControlDiv = document.createElement('div'); // Thẻ div cảnh báo nguy hiểm
	homeControlDiv.id= 'sosPopup';
	var homeControl = new SOSControl(homeControlDiv, html, map);
	homeControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(homeControlDiv);
}

function hideSOSWindow(){
	map.controls[google.maps.ControlPosition.RIGHT_CENTER].clear();
}

function checkGroup(){
	
	if(groupName == 3){
		alert("Bạn không được quyền truy cập chức năng này");
		/*window.location = "index.html";*/
		showHomeTab("timduong");
	}
}
