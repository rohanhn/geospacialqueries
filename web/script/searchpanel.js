
    //Tạo khung control liệt kê các marker khi tìm kiếm   
    var side_bar_html = "";
    var markerPanel;
    var panelMarker = '';
    var panelContent;
    var gmarkers = [];
    function LabelControl(controlDiv, map) { 
    	controlDiv.style.padding = '5px';
    	
    	var controlUI = document.createElement('div');
    	
    	controlUI.style.overflow="auto";
    	controlUI.style.backgroundColor = "#ffffff";
        controlUI.style.border = "1px solid black";
        controlUI.style.height="200px";
        controlUI.style.width="120px";
        controlUI.style.color="black";
        controlUI.style.paddingLeft="5px";
        controlDiv.appendChild(controlUI);
        
        return controlUI;
    }
  	//Tạo khung control liệt kê các marker khi tìm kiếm
  	
  	
  	