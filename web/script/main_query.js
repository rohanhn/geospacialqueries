function mahoa(str) 
{
	var text="";
	//xá»­ lÃ½ vá»›i lá»—i dáº¥u cÃ¡ch
	//var strTemp = 	str.replace(" ","+");

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

// Phân tích URL để lấy ra username, groupname, companyname
var getUserData = function(){
	var url = window.location.href;
	var urlParams= url.split("?");
	var urlDecode = giaima(urlParams[1]);

	var paramsArray = urlDecode.split("&");
	userNameParam = paramsArray[0].split("=");
	userName = userNameParam[1];
	
	groupNameParam = paramsArray[1].split("=");
	groupName = groupNameParam[1];
//	groupId = groupNameParam[1];
//	
//	var successGroupFn = function(resp){
//		var data='';
//	  	if(resp){
//	  		//getting the data from the response object
//	  		data=resp.data;			
//	  	}
//	  			
//	  	if(data.length > 0){
//	  		for (i = 0; i<data.length;i++){
//	  			
//	  			if(data[i].cId == groupId){
//	  				groupName = data[i].gName;
//	  			}
//	  		}
//	  	}
//	}
	
	//getData("/group",null,successGroupFn,null);
	
	companyNameParam = paramsArray[2].split("=");
	companyName = companyNameParam[1];
//	companyId = companyNameParam[1];
//	
//	var successCompanyFn = function(resp){
//		var data='';
//	  	if(resp){
//	  		//getting the data from the response object
//	  		data=resp.data;			
//	  	}
//	  			
//	  	if(data.length > 0){
//	  		for (i = 0; i<data.length;i++){
//	  			
//	  			if(data[i].cId == companyId){
//	  				companyName = data[i].cName;
//	  			}
//	  		}
//	  	}
//	}
	
	//getData("/company",null,successCompanyFn,null);
}

// Tab tìm đường, báo cáo 
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
	if(entity == "baocao"){
		document.getElementById('txt_baocao_datefrom').value = currentDay + '/' + currentMonth + '/' + currentYear;
		document.getElementById('txt_baocao_dateto').value = currentDay + '/' + currentMonth + '/' + currentYear;
		document.getElementById('txt_baocao_timeto').value = currentHour + ":" + currentMin;
	}
	$('#' + entity + '-tab').show();
	//hiding the create block
	
}

var changeRowColor = function(i){
	$('.taxi_normal_row').removeClass("bold_row");
	$('#laixe_'+i).addClass("bold_row");
}

