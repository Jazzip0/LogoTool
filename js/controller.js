/*
TODO
ctr-z
gradient
cookies
look at fonts
zoom logo

save as optimized svg
convert flowroot text to "normal text" (not supported by html 5) text>unflow
**/

var app = angular.module('myApp', ['ngMaterial','ngFileUpload','ngSanitize']);
app.controller('appController', function($scope, $mdDialog,Upload,$mdToast,$sanitize) {
	this.openMenu = function($mdOpenMenu, ev) {
		originatorEv = ev;
		$mdOpenMenu(ev);
	};
	$scope.history = {
		events:[],
		index:0,
		start:{}
	};
	$scope.colorCardShow = function(field){
		$.each($scope.colorElements,function(i,ob){
			if(ob == field)
			ob.show = !ob.show;
			else
			ob.show = false;
		});
	}
	$scope.enterColorField = function(field){
		$.each(field.objects,function(i,ob){
			$(ob.ob).css(ob.el,"rgb(" + Math.round((field.color.r + 255) / 2) + "," + 64 + "," + 129 + ")")
		});
	}
	function inRange(min,max,vari){
		if(vari < min)
		return min;
		else if(vari > max)
		return max
		else
		return vari
	}
	$scope.leaveColorField = function(field){
		$.each(field.objects,function(i,ob){
			// $(ob.ob).css("stroke","none");
			$(ob.ob).css(ob.el,"rgb(" + field.color.r + "," + field.color.g + "," + field.color.b  + ")");
		});
	}
	$scope.setHistory = function(vari,ob){
		$scope.history.events = $scope.history.events.slice(0,$scope.history.index);
		$scope.history.events.push({variable:vari,ob:$.extend(true,{},ob)});
		$scope.history.index = $scope.history.events.length;
	}
	$scope.setStartHistory = function(vari,ob){
		if(ob.length > 0) //if variable is present
		$scope.history.start[vari] = {variable:vari,ob:$.extend(true,{},ob)};
	}
	window.onkeydown=function(e){
		var evtobj = window.event? event : e;
		if (evtobj.keyCode == 90 && evtobj.ctrlKey && $scope.history.index >= 0){
			if(evtobj.shiftKey){ //1+ to currenct
				$scope.checkRedo();
			}else
			$scope.checkUndo();
		}
	}
	$scope.checkUndo = function(){
		if($scope.history.index > 0){ //back in history
			$scope.showActionToast("undo","Undo Operation");
			undoHistory();
		}else
		$scope.openNoticeToast("No previous operation");

	}
	$scope.checkRedo = function(){
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
		}else{
			$.each($scope.history.start,function(i,ob){ //set default for every set element
				setDomStart(ob);
			});
		}
	}
	function setDom(cur){
		if(cur.variable == "textElements"){
			setTextEl(cur.ob)
			$.each(cur.ob.objects,function(i,ob) {
				ob.textContent = cur.ob.text;
			});
		}else if(cur.variable == "colorElements"){
			setColorEl(cur.ob);
			$.each(cur.ob.objects,function(i,ob) {
				$(ob.ob).css(ob.el,"rgb(" + cur.ob.color.r + "," + cur.ob.color.g + "," + cur.ob.color.b + ")");
			});
		}
	}
	function setColorEl(cur){
		var rawColor = $(cur.objects[0].ob).css(cur.objects[0].el).match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		var color = {css:rawColor[0],r:rawColor[1],g:rawColor[2],b:rawColor[3]}
		var i = findIndexColor(color);
		$scope.colorElements[i].color = cur.color;
	}
	function setTextEl(cur){
		$scope.textElements[findIndexText(cur.objects[0].textContent)].text = cur.text;
	}
	function findIndexText(vari){
		for (var i = 0; i < $scope.textElements.length; i++) {
			if(ar[i].text == vari)
			return i;
		}
		return false;
	}
	function findIndexColor(vari){
		for (var i = 0; i < $scope.colorElements.length; i++) {
			if($scope.colorElements[i].color.r == vari.r && $scope.colorElements[i].color.g == vari.g && $scope.colorElements[i].color.b == vari.b)
			return i;
		}
		return false;
	}
	function setDomStart(elements){
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
					$(el.ob).css(el.el,"rgb(" + ob.color.r + "," + ob.color.g + "," + ob.color.b + ")");
				});
			});
		}
	}
	$scope.showActionToast = function(type,text) {
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
	$scope.openNoticeToast = function(text) {
		$mdToast.show($mdToast.simple().content(text).parent(angular.element('#toastPlacer')));
	};


	$scope.isDragging = false;
	$scope.drag = function($isDragging, $class, $event){
		$scope.isDragging = $isDragging;
		if($isDragging && !$scope.uploadDialogOpened)
		$scope.showUploadDialog();
		else if(!$isDragging && $event.y == 0 && $event.x == 0)
		$mdDialog.hide();


	}
	$scope.logo = {loading:false,inserted:false};
	angular.element(document).ready(function () {
		$scope.showUploadDialog();
	});

	var textElements = "text";
	function getData(url)
	{
		return $.getJSON("http://query.yahooapis.com/v1/public/yql?"+
		"q=select%20*%20from%20html%20where%20url%3D%22"+
		encodeURIComponent(url)+"%22&format=json'&callback=?");
	}
	var fontWebsites = [{before:"http://www.1001fonts.com/",after:"-font.html"},{before:"https://typekit.com/fonts/",after:""},{before:"http://fontzone.net/font-details/",after:""},{before:"https://www.google.com/fonts/specimen/",after:""}]; //{before:"",after:""}
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
	$('#dialogPlacer').css('pointer-events','auto');
	var coloredElements = ["fill","stroke"]; //totdo get all style elements that color
	function showFontDialog($event) {
		var parentEl = angular.element('body');
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
			locals: {
				// notAvailableFonts: $scope.notAvailableFonts,
				// missingFontWebsites: $scope.missingFontWebsites
			},
			controller: uploadDialogController
		}).finally(function() {
			$('#dialogPlacer').css('pointer-events','none');
			$scope.uploadDialogOpened = false;
			setImage();
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
			// var canvas = document.getElementById("canvas");
			// canvas.height = $scope.height;
			// canvas.width = $scope.width;
			var svg = document.getElementsByTagName('svg')[0].cloneNode(true);
			// svg.setAttribute("width",$scope.width);
			// svg.setAttribute("height",$scope.height);
			svg.removeAttribute("inkscape:version");
			svg.removeAttribute("sodipodi:version");



			console.log(svg);
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
				console.log("loaded");
				var img = new Image();
				img.src = "upload/download.svg";
				img.onload = function(){
					console.log("loaded2");
					var canvas = document.getElementById("canvas");
					canvas.height = $scope.height;
					canvas.width = $scope.width;
					canvas.getContext('2d').drawImage(img, 0, 0,$scope.width,$scope.height);
					var t = Canvas2Image.convertToPNG(canvas,$scope.width,$scope.height);
					$('#link').html("<a href='" + t.src + "' download>Download link</a>");
					console.debug($scope.loading);
					$scope.loading = false;
					console.debug($scope.loading);
					$scope.$apply();
				};
			}, function (resp) {
				console.log('Error status: ' + resp.status);
			}, function (evt) {
				console.log("progress");
			});

			// var img = new Image();
			// img.src = $scope.svg;
			// canvas.getContext('2d').drawImage(img, 0, 0,$scope.width,$scope.height)
			//	canvg('canvas', $scope.svg,{scaleWidth:$scope.width});
			//	var img_PNG = Canvas2Image.convertToPNG(canvas);
			//var img_PNG = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream')
			// var img_PNG = 'data:image/svg+xml;base64,\n'+ btoa($scope.svg);
			// console.debug(img_PNG);
			$('#logoTemp').html($scope.svg);
			// 	//Canvas2Image.saveAsPNG(img_PNG);

			$scope.setDimentions = false;
		}
	}

	$scope.showDownloadDialog = function($event) {
		var box = document.getElementsByTagName('svg')[0].getAttribute('viewBox').split(/\s+|,/);
		var ratio = box[3] / box[2];
		var svg = $('svg').parent().html();
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
			// $scope.uploadDialogOpened = false;
			// setImage();
		});

	}
	function setImage(){
		$scope.logo.inserted = false;
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
			$("#logo").html($(el));
			$scope.logo.loading = false;
			$scope.setPageForLogo();
		},
		"xml");
	}
	function uploadDialogController($scope, $mdDialog,Upload) {
		$scope.closeDialog = function() {
			$mdDialog.hide();
		}
		$scope.progressUpload = 0;
		$scope.upload = function (file) {
			Upload.upload({
				url: 'upload.php',
				method: 'POST',
				file: file
			}).then(function (resp) {
				$scope.closeDialog();
			}, function (resp) {
				console.log('Error status: ' + resp.status);
			}, function (evt) {
				$scope.progressUpload = parseInt(100.0 * evt.loaded / evt.total);
			});
		};
	}
	$scope.updateText = function(set){
		$scope.setHistory("textElements",set);
		$.each(set.objects,function(i,ob) {
			ob.textContent = set.text;
		});
	}
	$scope.updateColor = function(set){
		$.each(set.objects,function(i,ob) {
			$(ob.ob).css(ob.el,"rgb(" + set.color.r + "," + set.color.g + "," + set.color.b + ")");
		});
	}
	$scope.setPageForLogo = function(){
		$scope.textElements = [];
		$scope.colorElements = [];
		$scope.missingFontWebsites = [];
		fontSitesCallBackData = [];
		fontSitesCallBack = [];
		$scope.notAvailableFonts = [];
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
						if($scope.missingFontWebsites[fontSitesCallBackData[i].name] == undefined){
							var ob = [];
							ob.push(fontSitesCallBackData[i].url);
							$scope.missingFontWebsites[fontSitesCallBackData[i].name] = ob;

						}else
						$scope.missingFontWebsites[fontSitesCallBackData[i].name].push(fontSitesCallBackData[i].url);
					}
				}
				showFontDialog();
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
					$scope.colorElements.push({color:color,objects:objects,show:false});//create new for new color
				}
			})
		});
		$scope.logo.inserted = true;
		$scope.setStartHistory("colorElements",$scope.colorElements);
		$scope.setStartHistory("textElements",$scope.textElements);
		$scope.$apply();
	}
});
