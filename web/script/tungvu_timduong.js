
function codeAddress() 
{
	var address = document.getElementById('searchTextField').value;
	geocoder.geocode( { 'address': address}, function(results, status) {
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