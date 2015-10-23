var app = angular.module('myApp', ['ngMaterial']);
app.controller('appController', function($scope) {
$scope.textElements = [];
$scope.colorElements = [];
$scope.temp = "";
$scope.color = {
	red:223,
	green:250,
	blue:255
}
	 angular.element(document).ready(function () {
		$(".text" ).each(function(i,ob) {
			$scope.textElements.push({text:this.textContent});
				//this.setAttribute("ng-bind","textElements[" + i +"].text");
		});
		$("path").each(function(i,ob) {
			var rawColor = $(ob).css('fill').match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			var color = {css:rawColor[0],r:rawColor[1],g:rawColor[2],b:rawColor[3]};
			for (var i = 0; i < $scope.colorElements.length; i++) {
				if($scope.colorElements[i].color.css == color.css){
					$scope.colorElements[i].objects.push(ob);
					return true; //continue each
				}
			};
			var objects = [];
			objects.push(ob);
			$scope.colorElements.push({color:color,objects:objects});//create new for new color
		});

		$scope.$apply();

		 $(".colorCard").hide();
  		//toggle the componenet with class msg_body
		  $('.color1').click(function()
		  {
		  	$(this).parent().parent().parent().find('.colorCard').slideToggle('slow');
		  });

	});
	  $scope.update = function(){
	  	$(".text" ).each(function(i,ob) {
	  		console.debug($scope.textElements[i].text);
	 		ob.textContent = $scope.textElements[i].text;
	 	});
	 }

	});

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
