//Tạo Slider panel
  	function SliderBox(controlDiv, map, content) {

	    var control = this;
	    control.isOpen = true;
		
	    var box = document.createElement('div');
	    box.id = 'sliderbox';
	    box.style.height = '500px';
	    box.style.width = '230px';
	    box.style.backgroundColor = 'black';
	    box.style.cssFloat = 'left';
		box.style.paddingLeft = '5px';
	    box.innerHTML = content;
	    controlDiv.appendChild(box);   
	
		var div = document.createElement('div');
		div.id = 'toggle_div';
		div.style.width = '20px';
		div.style.cssFloat = 'left';
		
		var toggleBtn = document.createElement('input');
	    toggleBtn.id = 'toggleBtn';
	    toggleBtn.type = 'button';
	    toggleBtn.className = 'toggle_close';
		toggleBtn.title ='Ẩn bảng tìm kiếm';
	    //box.appendChild(toggleBtn);
	    div.appendChild(toggleBtn);
	    controlDiv.appendChild(div); 
	
	    $('#toggleBtn').live('click', function() {
	        if (control.isOpen) {
	            $("#sliderbox").animate({
	                "marginLeft": "-=250px"
	            }, {
	                duration: 500,
	                step: function() {
	                    google.maps.event.trigger(map, 'resize');
	                }
	            });
	            control.isOpen = false;
	            toggleBtn.className = 'toggle_open';
				toggleBtn.title ='Hiện bảng tìm kiếm';
	        } else {
	            $("#sliderbox").animate({
	                "marginLeft": "+=250px"
	            }, {
	                duration: 500,
	                step: function() {
	                    google.maps.event.trigger(map, 'resize');
	                }
	            });
	            control.isOpen = true;
	            toggleBtn.className = 'toggle_close';
				toggleBtn.title ='Hiện bảng tìm kiếm';
	        };
	    });
	}
  	//Tạo Slider panel