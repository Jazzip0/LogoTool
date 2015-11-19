var app = angular.module('myApp', ['ngMaterial','ngFileUpload']);
app.controller('appController', function($scope, $mdDialog,Upload,$mdToast) {

	//START Set color and text explanation make changes reversable
	$scope.history = { //history is saved as object:
		events:[],
		index:0, //current
		start:{}
	};

	$scope.setHistory = function(vari,ob){ //set history for a change
		$scope.history.events = $scope.history.events.slice(0,$scope.history.index);
		$scope.history.events.push({variable:vari,ob:$.extend(true,{},ob)});
		$scope.history.index = $scope.history.events.length;
	}
	$scope.setStartHistory = function(vari,ob){ //set history for the start of the session
		if(ob.length > 0) //if variable is present
		$scope.history.start[vari] = {variable:vari,ob:$.extend(true,{},ob)};
	}
	window.onkeydown=function(e){ //get ctrl-z and ctr-shift-z to trigger re and undo
		var evtobj = window.event? event : e;
		if (evtobj.keyCode == 90 && evtobj.ctrlKey && $scope.history.index >= 0){
			if(evtobj.shiftKey){ //1+ to currenct
				$scope.checkRedo();
			}else
			$scope.checkUndo();
		}
	}
	$scope.checkUndo = function(){ //check if undo is possible
		if($scope.history.index > 0){ //back in history
			$scope.showActionToast("undo","Undo Operation");
			undoHistory();
		}else
		$scope.openNoticeToast("No previous operation");

	}
	$scope.checkRedo = function(){ //check if undo is possible
		if($scope.history.index < $scope.history.events.length && $scope.history.index != $scope.history.events.length){ //if possible to go forward
			$scope.showActionToast("redo","Redo Operation");
			redoHistory();
		}else
		$scope.openNoticeToast("No sequent operation");
	}
	function redoHistory(){
		$scope.history.index++;
		var cur = $scope.history.events[$scope.history.index - 1];
		setDom(cur);
	}
	function undoHistory(){
		$scope.history.index--;
		if($scope.history.index > 0){
			var cur = $scope.history.events[$scope.history.index - 1];
			setDom(cur);
		}else
		$scope.resetLogo();
	}
	$scope.resetLogo = function(){
		$.each($scope.history.start,function(i,ob){ //set default for every set element
			setDomStart(ob);
		});
	}
	function setDom(cur){ //change colors or text in the logo
		if(cur.variable == "textElements"){
			setTextEl(cur.ob)
			$.each(cur.ob.objects,function(i,ob) {
				ob.textContent = cur.ob.text;
			});
		}else if(cur.variable == "colorElements"){
			setColorEl(cur.ob);
			$.each(cur.ob.objects,function(i,ob) {
				$(ob.ob).css(ob.el,"rgba(" + cur.ob.color.r + "," + cur.ob.color.g + "," + cur.ob.color.b +  "," + cur.ob.color.a + ")");
			});
		}
	}
	function setDomStart(elements){ //change text or colors to their initial value
		if(elements.variable == "textElements"){
			$.each(elements.ob,function(i,ob) {
				$.each(ob.objects,function(x,el) {
					el.textContent = ob.text;
				});
			});
		}else if(elements.variable == "colorElements"){
			$.each(elements.ob,function(i,ob) {
				setColorEl(ob);
				$.each(ob.objects,function(x,el) {
					$(el.ob).css(el.el,"rgba(" + ob.color.r + "," + ob.color.g + "," + ob.color.b + "," + ob.color.a + ")");
				});
			});
		}
	}
	function setColorEl(cur){ //set color arrays to current values
		var rawColor = $(cur.objects[0].ob).css(cur.objects[0].el).match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
		var color = {css:rawColor[0],r:rawColor[1],g:rawColor[2],b:rawColor[3],a:rawColor[4]}
		var i = findIndexColor(color);
		var rawHSL = rgbToHsl(cur.color.r,cur.color.g,cur.color.b);
		var hsl = {h:rawHSL[0],s:rawHSL[1],l:rawHSL[2]};
		$scope.colorElements[i].HSL = hsl;
		$scope.colorElements[i].color = cur.color;
	}
	function setTextEl(cur){ //set text arrays to current values
		$scope.textElements[findIndexText(cur.objects[0].textContent)].text = cur.text;
	}
	function findIndexText(vari){ //get index value in text array
		for (var i = 0; i < $scope.textElements.length; i++) {
			if(ar[i].text == vari)
			return i;
		}
		return false;
	}
	function findIndexColor(vari){ //get index value in color array
		for (var i = 0; i < $scope.colorElements.length; i++) {
			if($scope.colorElements[i].color.r == vari.r && $scope.colorElements[i].color.g == vari.g && $scope.colorElements[i].color.b == vari.b)
			return i;
		}
		return false;
	}
	$scope.updateText = function(set){
		$scope.setHistory("textElements",set);
		$.each(set.objects,function(i,ob) {
			ob.textContent = set.text;
		});
	}
	$scope.updateColor = function(set){
		$.each(set.objects,function(i,ob) {
			$(ob.ob).css(ob.el,"rgba(" + set.color.r + "," + set.color.g + "," + set.color.b + "," + set.color.a + ")");
		});
	}
	$scope.updateHSL = function(set){
		var rawRGB = hslToRgb(set.HSL.h / 255.0,set.HSL.s / 255.0,set.HSL.l / 255.0);
		set.color.r = rawRGB[0];
		set.color.g = rawRGB[1];
		set.color.b = rawRGB[2];
		$scope.updateColor(set);
	}
	//END Set Color and text

	//START Hover || feedback explanation make clear which parts correspond to which field
	$scope.setFeedback= function(field,array,index){//on init set hover mousedoen mouseup functions
		$.each(field.objects,function(i,ob){
			$(ob.ob).hover(hoverin,hoverout);
			$(ob.ob).mousedown(clickel);
			$(ob.ob).mouseup(mouseUp);
			ob.ob.addEventListener("touchstart", clickel, false);
			ob.ob.addEventListener("touchend", mouseUp, false);
			ob.ob.inArray = array;
			ob.ob.i= index;
		});
	}
	$scope.elementsLocked = false; //lick elements on click
	function mouseUp(){ //show user that he selected an element
		$('#iconHeaderContent').css("background-color",this.color);
	}
	function clickel(){ //lock element
		this.color = $('#iconHeaderContent').css("background-color");
		if(this.color == "rgba(0, 0, 0, 0)")
		$('#iconHeaderContent').css("background-color",'#d3d3d3');
		else
		$('#iconHeaderContent').css("background-color",'#413fb5');

		console.debug(this.color);
		if($scope.elementsLocked)
		openEl(this);
		else
		$scope.elementsLocked = true;
	}
	function hoverout(){}

	function hoverin(){
		if(!$scope.elementsLocked)
		openEl(this);
	}
	function openEl(el){ //open field corresponding to hover
		var field = $scope[el.inArray][el.i];
		$scope.colorCardShow(field);
		$scope.$apply();
	}

	$scope.colorCardShow = function(field){ //open current field and close the rest
		$.each($scope.colorElements,function(i,ob){
			if(ob == field)
			ob.show = !ob.show;
			else
			ob.show = false;
		});
	}
	//END Hover || feedback

	//START Toasts
	$scope.showActionToast = function(type,text) { //open toast with an undo button
		var toast = $mdToast.simple()
		.content(text)
		.action('UNDO')
		.highlightAction(false)
		.parent(angular.element('#toastPlacer'));
		toast.type = type;
		$mdToast.show(toast).then(function(response) {
			if(toast.type == 'undo')
			redoHistory();
			else if(toast.type == 'redo')
			undoHistory();
		});
	};
	$scope.openNoticeToast = function(text) { //open toast with plain text
		$mdToast.show($mdToast.simple().content(text).parent(angular.element('#toastPlacer')));
	};
	//END Toasts

	//START Upload
	$scope.isDragging = false;
	$scope.drag = function($isDragging, $class, $event){ //if an file is dragged in or out the screen
		$scope.isDragging = $isDragging;
		if($isDragging && !$scope.uploadDialogOpened) //open dialog when none is present
		$scope.showUploadDialog();
		else if(!$isDragging && $event.y == 0 && $event.x == 0) //if the file is dragged off the screen
		$mdDialog.hide();
	}
	$scope.logo = {loading:false};
	angular.element(document).ready(function () { //show upload dialog on load
		$scope.showUploadDialog();
	});
	//END Upload

	//START Dialogs
	function showFontDialog($event) { //TODO
		$('#dialogPlacer').css('pointer-events','auto');
		var parentEl = angular.element('#dialogPlacer');
		$mdDialog.show({
			parent: parentEl,
			targetEvent: $event,
			templateUrl:'templates/font-dialog-template.html',
			locals: {
				notAvailableFonts: $scope.notAvailableFonts,
				missingFontWebsites: $scope.missingFontWebsites
			},
			controller: fontDialogController
		}).finally(function(){
			$('#dialogPlacer').css('pointer-events','none');
		});
	}
	function fontDialogController($scope, $mdDialog, notAvailableFonts,missingFontWebsites) {
		$scope.notAvailableFonts = notAvailableFonts;
		$scope.missingFontWebsites = missingFontWebsites;
		$scope.closeDialog = function() {
			$mdDialog.hide();
		}
	}
	$scope.uploadDialogOpened = false;
	$scope.showUploadDialog = function($event) {
		$('#dialogPlacer').css('pointer-events','auto');
		$scope.uploadDialogOpened = true;
		var parentEl = angular.element('#dialogPlacer');
		$mdDialog.show({
			parent: parentEl,
			targetEvent: $event,
			templateUrl:'templates/upload-dialog-template.html',
			enctype:"multipart/form-data",
			controller: uploadDialogController
		}).finally(function() {
			$('#dialogPlacer').css('pointer-events','none');
			$scope.uploadDialogOpened = false;
			if(this.upload == undefined || this.upload){
				setImage();
				this.upload = false;
			}
		});
	}
	function uploadDialogController($scope, $mdDialog,Upload) {
		$scope.closeDialog = function() {
			$mdDialog.hide();
		}
		$scope.progressUpload = 0;
		$scope.srcUpload = function(src,tosrc){
			$.post("saveas.php", { src: src,tosrc:tosrc} ,function(data){
				console.debug(data);
				$scope.closeDialog();
				this.upload = true;
			});
		}
		$scope.upload = function (file) {
			Upload.upload({
				url: 'upload.php',
				method: 'POST',
				file: file
			}).then(function (resp) {
				$scope.closeDialog();
				this.upload = true;
			}, function (resp) {
				console.log('Error status: ' + resp.status);
			}, function (evt) {
				$scope.progressUpload = parseInt(100.0 * evt.loaded / evt.total);
			});
		};
	}
	$scope.showDownloadDialog = function($event) {
		var box = document.getElementById('svgLogo').getAttribute('viewBox').split(/\s+|,/);
		var ratio = box[3] / box[2];
		var svg = $('#svgLogo').parent().html();
		$('#dialogPlacer').css('pointer-events','auto');
		var parentEl = angular.element('#dialogPlacer');
		$mdDialog.show({
			parent: parentEl,
			targetEvent: $event,
			templateUrl:'templates/download-dialog-template.html',
			enctype:"multipart/form-data",
			locals: {
				ratio : ratio,
				svg:svg,
			},
			controller: downloadDialogController
		}).finally(function() {
			$('#dialogPlacer').css('pointer-events','none');
		});
	}
	function downloadDialogController($scope,ratio,svg ) {
		$scope.loading = false;
		$scope.ratio = ratio;
		$scope.svg = svg;
		$scope.width = 1000;
		$scope.height = Math.round($scope.width * $scope.ratio);
		$scope.setDimentions = true;

		$scope.closeDialog = function() {
			$mdDialog.hide();
		}
		$scope.setHeight = function(){
			$scope.height = Math.round($scope.width * $scope.ratio);
		}
		$scope.setWidth = function(){
			$scope.width = Math.round($scope.height / $scope.ratio);
		}
		$scope.getLink = function(width){
			var svg = document.getElementById('svgLogo').cloneNode(true);


			$('#logoTemp').html($scope.svg);
			svg.removeAttribute("inkscape:version");
			svg.removeAttribute("sodipodi:version");
			var image  = $(svg).context.outerHTML;
			var ar = [];
			ar.push(image);
			var blob = new Blob(ar, {type : 'image/svg+xml'});
			$scope.loading = true;
			Upload.upload({
				url: 'upload.php',
				method: 'POST',
				file: blob,
				data: { name: "download",extention:"svg"}
			}).then(function (resp) {
				var img = new Image();
				img.src = "upload/download.svg?" + Math.random() * 4;
				img.onload = function(){
					var canvas = document.getElementById("canvas");
					canvas.height = $scope.height;
					canvas.width = $scope.width;
					canvas.getContext('2d').drawImage(img, 0, 0,$scope.width,$scope.height);
					var t = Canvas2Image.convertToPNG(canvas,$scope.width,$scope.height);
					$('#link').html("<a href='" + t.src + "' download>Download PNG</a>");
					$('#linksvg').html("<a href='upload/download.svg' download>Download SVG</a>");
					$scope.loading = false;
					$scope.$apply();
				};
			}, function (resp) {
			}, function (evt) {});
			$scope.setDimentions = false;
		}
	}
	//END Dialogs

	//START Font
	//all website that supply fontds and give an 404 on non excisiting pages
	var fontWebsites = [{before:"http://www.1001fonts.com/",after:"-font.html"},{before:"https://typekit.com/fonts/",after:""},{before:"https://www.google.com/fonts/specimen/",after:""}]; //{before:"",after:""}
	$scope.missingFontWebsites = [];
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
	function getData(url)	{
		return $.getJSON("http://query.yahooapis.com/v1/public/yql?"+
		"q=select%20*%20from%20html%20where%20url%3D%22"+
		encodeURIComponent(url)+"%22&format=json'&callback=?");
	}
	//END Font

	//START init
	var textElements = "tspan"; //TODO tspan or text?
	var coloredElements = [{element:"*",styles:["fill","stroke"]},{element:"stop",styles:["stop-color"]}]; //TODO add gradient

	function setImage(){
		$scope.logo.loading= true;
		$.get("upload/image.svg?" + Math.random() * 1000,function(svgDoc){
			var el = document.importNode(svgDoc.documentElement,true);
			var viewbox = $(el).context.attributes.getNamedItem('viewBox');

			if(viewbox == null){ //do stuff when no viewbox is present
				var width = $(el).context.attributes.getNamedItem('width').nodeValue;
				var height = $(el).context.attributes.getNamedItem('height').nodeValue;
				el.setAttribute("viewBox", "0 0 " + width + " " + height);
				el.removeAttribute("height");
				el.removeAttribute("width");
			}

			$("#logo").html($(el).attr("id","svgLogo"));
			$scope.logo.loading = false;
			$scope.setPageForLogo();
		},
		"xml");
	}
	$scope.setPageForLogo = function(){
		$scope.textElements = [];
		$scope.colorElements = [];
		$scope.missingFontWebsites = [];
		fontSitesCallBackData = [];
		fontSitesCallBack = [];
		$scope.notAvailableFonts = [];
		//Setup for missing fonts
		var fontDetector = new Detector();
		$(textElements).each(function(i,elem) { //get all texts
			//get missing fonts
			var font = $(elem).css('font-family').toLowerCase();
			if(fontDetector.detect(font) == false){ //detecr if font is available
				var exist = false;
				$.each($scope.notAvailableFonts,function(i,ob){ //check if font is not in list

					if(ob == (font.substring(0,1).toUpperCase() + font.substring(1))){
						exist = true;
						return false; //break each
					}
				});
				if(!exist){
					var name= font.substring(0,1).toUpperCase() + font.substring(1);
					$scope.notAvailableFonts.push(name); //add font to list
					getFontSitesCallBack(name);
				}
			}
			//end get missing fonts
			$.each(elem.childNodes,function(i,ob){ //get all elements in text
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
		});
		if($scope.notAvailableFonts.length > 0){ //show dialog if one or more fonts are not available
			var obj = []
			$.when.apply($, fontSitesCallBack).done(function(){
				var l = arguments.length,
				i,
				jqxhr;
				for(var i = 0; i < l; i++){
					if(arguments[i][0].results.length > 0){
						if($scope.missingFontWebsites[fontSitesCallBackData[i].name] == undefined){
							var ob = [];
							ob.push(fontSitesCallBackData[i].url);
							$scope.missingFontWebsites[fontSitesCallBackData[i].name] = ob;

						}else
						$scope.missingFontWebsites[fontSitesCallBackData[i].name].push(fontSitesCallBackData[i].url);
					}
				}
				console.debug($scope.missingFontWebsites);
				showFontDialog();
			});
		}

		$.each(coloredElements,function(e,coloredEl){
			$("#logo").find(coloredEl.element).not("g").not("svg").each(function(i,ob) { //get all elements in id logo but not the groups and svg
				$.each(coloredEl.styles,function(x,el){
					var rawColor = $(ob).css(el).match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
					var alpha = $(ob).css("fill-opacity");
					if(rawColor != null){
						var color = {css:rawColor[0],r:rawColor[1],g:rawColor[2],b:rawColor[3],a:alpha};
						for (var i = 0; i < $scope.colorElements.length; i++) {
							if($scope.colorElements[i].color.css == color.css && alpha == $scope.colorElements[i].color.a){ //combine equal elements
								$scope.colorElements[i].objects.push({ob:ob,el:el});
								$(ob).css(el,"rgba(" + color.r + "," + color.g + "," + color.b  + "," + color.a + ")");
								return true; //continue each
							}
						};
						var objects = [];
						objects.push({ob:ob,el:el});
						var rawHSL = rgbToHsl(color.r,color.g,color.b);
						var hsl = {h:rawHSL[0],s:rawHSL[1],l:rawHSL[2]};
						$scope.colorElements.push({HSL:hsl,color:color,objects:objects,show:false});//create new for new color
						$(ob).css(el,"rgba(" + color.r + "," + color.g + "," + color.b  + "," + color.a + ")");
					}
				});
			});
		});
		$scope.setStartHistory("colorElements",$scope.colorElements);
		$scope.setStartHistory("textElements",$scope.textElements);
		var zoom = 1;
		$('#svgLogo').panzoom();
		$( "#svgLogo" ).on('mousewheel', function(event) {
			zoom += event.deltaY * 0.1;
			$('#svgLogo').panzoom("zoom",zoom,{animate:true});
		});
		$scope.zoom = function(side){
			zoom += side * 0.1;
			$('#svgLogo').panzoom("zoom",zoom,{animate:true});
		}
		$('#svgLogo').mouseleave(function( event ) {
			$scope.elementsLocked = false;
		});
		$(window).on('resize', function() {
			$('#svgLogo').panzoom("reset");
			$('#svgLogo').panzoom('resetDimensions');
		});
		$scope.recenterSvg = function(){
			$('#svgLogo').panzoom("reset");
		}
		$('#iconHeaderContent').append($('#resetButton'));

		$scope.$apply();
	}
	//END inti


	//START Color
	function rgbToHsl(r, g, b){ //TODO write down original source
		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if(max == min){
			h = s = 0; // achromatic
		}else{
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch(max){
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}

		return [h * 255, s * 255, l * 255];
	}
	function hslToRgb(h, s, l){
		var r, g, b;

		if(s == 0){
			r = g = b = l; // achromatic
		}else{
			var hue2rgb = function hue2rgb(p, q, t){
				if(t < 0) t += 1;
				if(t > 1) t -= 1;
				if(t < 1/6) return p + (q - p) * 6 * t;
				if(t < 1/2) return q;
				if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}

			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}

		return [Math.round(r * 255.0), Math.round(g * 255.0), Math.round(b * 255.0)];
	}
	//END color
});
