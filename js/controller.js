/*
TODO
laad ding maken voor pagina

save as optimized svg
convert flowroot text to "normal text" (not supported by html 5) text>unflow
**/

var app = angular.module('myApp', ['ngMaterial']);
app.controller('appController', function($scope, $mdDialog) {
	var alert;
	$scope.textElements = [];
	$scope.colorElements = [];
	$scope.temp = "test";
	$scope.color = {
		red:223,
		green:250,
		blue:255
	}
	$scope.logo;
	var textElements = "text";
	function getData(url)
{
    return $.getJSON("http://query.yahooapis.com/v1/public/yql?"+
      "q=select%20*%20from%20html%20where%20url%3D%22"+
      encodeURIComponent(url)+"%22&format=json'&callback=?");
      // , function(data){
      //     if(data.results[0]){
      //         $scope.missingFontWebsites[name].push(url);
      //     }else{
      //     	console.debug("nee")
      //     }  
     // }
    //);
}
	$scope.missingFontWebsites = [];
	var fontWebsites = [{before:"http://www.1001fonts.com/",after:"-font.html"},{before:"https://typekit.com/fonts/",after:""},{before:"http://fontzone.net/font-details/",after:""},{before:"https://www.google.com/fonts/specimen/",after:""}]; //{before:"",after:""}
	var fontSitesCallBackData = [];
	var fontSitesCallBack = [];
	function getFontSitesCallBack(name){
		var wait = [];
		var waitData = [];
		$.each(fontWebsites,function(i,ob){
			var url = ob.before + name + ob.after;
			wait.push(getData(url));
			waitData.push({name:name,url:url});
		});
		$.merge(fontSitesCallBack,wait);//merge callbacks
		$.merge(fontSitesCallBackData,waitData);//merge callbacks
	}
	var coloredElements = ["fill","stroke"]; //totdo get all style elements that color
	function showDialog($event) {

		var parentEl = angular.element(document.body);
		$mdDialog.show({
			parent: parentEl,
			targetEvent: $event,
			templateUrl:'templates/font-dialog-template.html',
			locals: {
				notAvailableFonts: $scope.notAvailableFonts,
				missingFontWebsites: $scope.missingFontWebsites
			},
				controller: $scope.dialogController
			});

	}
	$scope.dialogController = function DialogController($scope, $mdDialog, notAvailableFonts,missingFontWebsites) {
			$scope.notAvailableFonts = notAvailableFonts;
			$scope.missingFontWebsites = missingFontWebsites;
			$scope.closeDialog = function() {
				$mdDialog.hide();
			}
			$scope.update = function(){
				console.debug("test");
			}

		}
	$scope.notAvailableFonts = [];
	 angular.element(document).ready(function () {
		var fontDetector = new Detector();

		$(textElements).each(function(i,ob) { //get all texts
			var font = $(ob).css('font-family').toLowerCase();
			if(fontDetector.detect(font) == false){ //detecr if font is available
				$.each($scope.notAvailableFonts,function(i,ob){ //check if font is not in list
					if(ob == font.toLowerCase())
						return false; //break each
				});
				var name= font.substring(0,1).toUpperCase() + font.substring(1)
				$scope.notAvailableFonts.push(name); //add font to list
				getFontSitesCallBack(name);
			}
			
			var text = this.textContent;
			for (var i = 0; i < $scope.textElements.length; i++) { //not add fields for equal texts
					if($scope.textElements[i].text == text){
						$scope.textElements[i].objects.push(ob);
						return true; //continue each
					}
				};
				var objects = [];
				objects.push(ob);
				$scope.textElements.push({text:text,objects:objects});//create new for new color	
				
		});
		if($scope.notAvailableFonts.length > 0){ //show dialog if one or more fonts are not available
			var obj = []
			$.when.apply($, fontSitesCallBack).done(function(){
				 var l = arguments.length,
        				i,
        				jqxhr;
    			for(var i = 0; i < l; i++){
    				if(arguments[i][0].results.length > 0){
    					console.debug(fontSitesCallBackData[i]);
    					if($scope.missingFontWebsites[fontSitesCallBackData[i].name] == undefined){
    						var ob = [];
    						ob.push(fontSitesCallBackData[i].url);
    						$scope.missingFontWebsites[fontSitesCallBackData[i].name] = ob;

    					}else{
    						console.debug("sdf");
    					$scope.missingFontWebsites[fontSitesCallBackData[i].name].push(fontSitesCallBackData[i].url);
    						}
    				}
    			}
    			console.debug($scope.missingFontWebsites);
    			showDialog();
			});
		}
		$("#logo").find("*").not("g").not("svg").each(function(i,ob) { //get all elements in id logo but not the groups and svg
			$.each(coloredElements,function(x,el){
				var rawColor = $(ob).css(el).match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
				if(rawColor != null){
					var color = {css:rawColor[0],r:rawColor[1],g:rawColor[2],b:rawColor[3]};
					for (var i = 0; i < $scope.colorElements.length; i++) {
						if($scope.colorElements[i].color.css == color.css){
							$scope.colorElements[i].objects.push({ob:ob,el:el});
							return true; //continue each
						}
					};
					var objects = [];
					objects.push({ob:ob,el:el});
					$scope.colorElements.push({color:color,objects:objects});//create new for new color	
				}
			})
		});

		$scope.$apply();

		 $(".colorCard").hide();
  		//toggle the componenet with class msg_body
		  $('.color1').click(function()
		  {
		  	$(this).parent().parent().parent().find('.colorCard').slideToggle('slow');
		  });

	});
	  $scope.updateText = function(set){
	 		$.each(set.objects,function(i,ob) {
	  			ob.textContent = set.text;
	  	});
	 }
	 $scope.updateColor = function(set){
	  	$.each(set.objects,function(i,ob) {
	  		$(ob.ob).css(ob.el,"rgb(" + set.color.r + "," + set.color.g + "," + set.color.b + ")");
	  	});
	}
});

