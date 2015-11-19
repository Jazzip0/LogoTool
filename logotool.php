<!DOCTYPE html>
<html lang="en" ng-app="myApp" >
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="UTF-8">
	<title>LogoTool</title>
	<link rel="icon" href="images/favicon.png" type="image/png">
	<link rel="stylesheet" href="css/angularmaterial.css">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/animations.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<script src="js/jquery.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/mousewheel.js"></script>
	<script type="text/javascript" src="js/smoothscroll.js"></script>
	<script type="text/javascript" src="js/rgbcolor.js"></script>
	<script type="text/javascript" src="js/StackBlur.js"></script>
	<script type="text/javascript" src="js/canvas2image.js"></script>
	<script type="text/javascript" src="js/svgpanzoom.js"></script>
	<script src="js/fontdetect.js" type="text/javascript"></script>
	<script type="text/javascript">
	$(document).ready(function(){
		try {
			$.browserSelector();
			// Adds window smooth scroll on chrome.
			if($("html").hasClass("chrome")) {
				$.smoothScroll();
			}
		} catch(err) {

		}
	});
	$( window ).unload(function() {
		return "Handler for .unload() called.";
	});
	</script>
</head>
<body ng-controller="appController" ngf-drop="" ngf-drag="drag($isDragging, $class, $event)" layout="column">
	<md-toolbar id="header" class="dropShadow">
		<div class="md-toolbar-tools">
			<span>LogoTool</span>
		</md-tabs>
		<span flex></span>
		<md-button class="md-icon-button" aria-label="upload" ng-click="showUploadDialog()" >
			<i class="material-icons">file_upload</i>
			<md-tooltip md-delay="0">
				upload
			</md-tooltip>
		</md-button>

		<md-button class="md-icon-button" aria-label="undo" ng-click="checkUndo()" >
			<i class="material-icons">undo</i>
			<md-tooltip md-delay="0">
				undo
			</md-tooltip>
		</md-button>
		<md-button class="md-icon-button" aria-label="redo" ng-click="checkRedo()" >
			<i class="material-icons">redo</i>
			<md-tooltip md-delay="0">
				redo
			</md-tooltip>
		</md-button>

		<md-button class="md-icon-button" aria-label="undload" ng-click="showDownloadDialog()">
			<i class="material-icons">file_download</i>
			<md-tooltip md-delay="0">
				download
			</md-tooltip>
		</md-button>

		<md-button href="http://joepschyns.me" target="_blank" aria-label="joepschyns.me" ng-hide-sm="true" id="linkToJoepSchyns">
			Joep Schyns
		</md-button>
	</div>
</md-toolbar>
<div layout-sm="column" layout-md="column" layout-lg="column" layout="row" id="underHeader">
	<div flex-order="2" flex-order-sm="1" flex-order-md="1" flex-order-lg="1" layout="column" id="iconHeader" layout="column" flex-gt-lg>
		<div id="iconHeaderContent" layout="column" flex>
			<div layout-padding ng-show="logo.loading == false" id="logo" layout="row" layout-align="center center" flex>
				<!-- <ng-include src="'upload/image.svg'" /></ng-include> -->
			</div>
			<div layout="column" id="zoomButtons">
				<md-button class="md-icon-button" aria-label="redo" ng-click="zoom(1)">
					<img src="images/zoom.svg" />
				</md-button>
				<md-button class="md-icon-button" aria-label="redo" ng-click="zoom(-1)">
					<img src="images/zoomout.svg" />
				</md-button>
			</div>

			<div md-bind="logo.loading" ng-show="logo.loading" layout="column" id="logoLoading">
				<md-progress-circular md-mode="indeterminate"></md-progress-circular>
			</div>
		</div>
		<svg shape-rendering="optimizeQuality" id="angleHeader" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 8317.2325 312.70459">
			<defs id="defs4396">
				<filter id="filter4993" style="color-interpolation-filters:sRGB">
					<feFlood id="feFlood4995" result="flood" flood-opacity=".49804" flood-color="rgb(0,0,0)"/>
					<feComposite id="feComposite4997" operator="in" result="composite1" in2="SourceGraphic" in="flood"/>
					<feGaussianBlur id="feGaussianBlur4999" stdDeviation="2" result="blur" in="composite1"/>
					<feOffset id="feOffset5001" result="offset" dx="0" dy="2"/>
					<feComposite id="feComposite5003" operator="over" result="composite2" in2="offset" in="SourceGraphic"/>
				</filter>
			</defs>
			<g id="layer1" transform="translate(-371.19 105.17)">
				<g id="g4387" transform="translate(-2230.5 -399.48)">
					<path id="path4964" d="m1865.1 568.61h950.71v24.771z" fill-rule="evenodd" transform="matrix(8.7484 0 0 8.7484 -13715 -4680.1)" filter="url(#filter4993)" fill="#3f51b5"/>
				</g>
			</g>
		</svg>

	</div>
	<div layout="column" flex-order="1" flex-order-sm="2" flex-order-md="2" flex-order-lg="2" id="scrollContent" >
		<div layout="column" layout-md="row" layout-lg="row" layout-align-sm="center center" layout-align="center start">
			<div ng-show="textElements.length > 0" >
				<md-card class="contentCard">
					<md-content>
						<md-list>
							<md-subheader class="md-no-sticky">Text fields</md-subheader>
							<div ngbind="textElements" ng-repeat="field in textElements">
								<md-list-item >
									<div flex layout="column">
										<md-input-container >
											<label>Adjust text</label>
											<input ng-model="field.text" ng-change="updateText(field)">
										</md-input-container>
									</div>
								</md-list-item>
							</div>
						</md-list>
					</md-content>
				</md-card>
			</div>
			<div ng-show="colorElements.length > 0">
				<md-card class="contentCard">
					<md-content>
						<md-list>
							<md-subheader class="md-no-sticky">Color fields</md-subheader>
							<div ngbind="colorElements" ng-repeat="field in colorElements">
								<md-list-item>
									<div flex layout="column">
										<div class="colorText" >
											Adjust color
										</div>
										<div id='colorField{{$index}}' class="color1 colorField" ng-init="setFeedback(field,'colorElements',$index)" ng-click="colorCardShow(field)" ngbind="field.color" style="background-color:rgba({{field.color.r}},{{field.color.g}},{{field.color.b}},{{field.color.a}})">
											&nbsp;
										</div>
									</div>
								</md-list-item>
								<md-card class="colorCard" ng-show="field.show">
									<md-card-content>
										<md-tabs flex>
											<md-tab label="RGBA" flex>
												<md-content flex>
													<div layout="row" ng-mouseup='setHistory("colorElements",field)'>
														<md-slider flex min="0" max="255" ng-model="field.color.r" aria-label="red" id="red-slider" ng-change="updateColor(field)" >
														</md-slider>
														<div flex="20"  layout layout-align="right center">
															<md-input-container flex>
																<label>Red</label>
																<input ng-model="field.color.r" ng-change='setHistory("colorElements",field);updateColor(field)'>
															</md-input-container>
														</div>
													</div>
													<div layout="row" ng-mouseup='setHistory("colorElements",field)'>
														<md-slider flex ng-model="field.color.g" min="0" max="255" aria-label="green" id="green-slider" ng-change="updateColor(field)" >
														</md-slider>
														<div flex="20"  layout layout-align="right center" >
															<md-input-container flex>
																<label>Green</label>
																<input ng-model="field.color.g" ng-change='setHistory("colorElements",field);updateColor(field)'>
															</md-input-container>
														</div>
													</div>
													<div layout="row" ng-mouseup='setHistory("colorElements",field)'>
														<md-slider flex ng-model="field.color.b" min="0" max="255" aria-label="blue" id="blue-slider" ng-change="updateColor(field)" >
														</md-slider>
														<div flex="20"  layout layout-align="right center">
															<md-input-container flex>
																<label>Blue</label>
																<input ng-model="field.color.b" ng-change='setHistory("colorElements",field);updateColor(field)'>
															</md-input-container>
														</div>
													</div>
													<div layout="row" ng-mouseup='setHistory("colorElements",field)'>
														<md-slider step="0.0039" flex ng-model="field.color.a" min="0" max="1" aria-label="alpha" id="alpha-slider" ng-change="updateColor(field)">
														</md-slider>
														<div flex="20"  layout layout-align="right center">
															<md-input-container flex>
																<label>Alpha</label>
																<input ng-model="field.color.a" ng-change='setHistory("colorElements",field);updateColor(field)'>
															</md-input-container>
														</div>
													</div>
												</md-content>
											</md-tab>
											<md-tab label="HSLA">
												<md-content>
													<div layout="row" ng-mouseup='setHistory("colorElements",field)'>
														<md-slider flex min="0" max="255" ng-model="field.HSL.h" aria-label="red" id="hue-slider" ng-change="updateHSL(field)" >
														</md-slider>
														<div flex="20"  layout layout-align="right center">
															<md-input-container flex>
																<label>Hue</label>
																<input ng-model="field.HSL.h" ng-change='setHistory("colorElements",field);updateHSL(field)'>
															</md-input-container>
														</div>
													</div>
													<div layout="row" ng-mouseup='setHistory("colorElements",field)'>
														<md-slider flex ng-model="field.HSL.s" min="0" max="255" aria-label="green" id="saturation-slider" ng-change="updateHSL(field)" >
														</md-slider>
														<div flex="20"  layout layout-align="right center" >
															<md-input-container flex>
																<label>Saturation</label>
																<input ng-model="field.HSL.s" ng-change='setHistory("colorElements",field);updateHSL(field)'>
															</md-input-container>
														</div>
													</div>
													<div layout="row" ng-mouseup='setHistory("colorElements",field)'>
														<md-slider flex ng-model="field.HSL.l" min="0" max="255" aria-label="blue" id="lightness-slider" ng-change="updateHSL(field)" >
														</md-slider>
														<div flex="20"  layout layout-align="right center">
															<md-input-container flex>
																<label>Lightness</label>
																<input ng-model="field.HSL.l" ng-change='setHistory("colorElements",field);updateHSL(field)'>
															</md-input-container>
														</div>
													</div>
													<div layout="row" ng-mouseup='setHistory("colorElements",field)'>
														<md-slider step="0.0039" flex ng-model="field.color.a" min="0" max="1" aria-label="alpha" id="alpha-slider" ng-change="updateColor(field)">
														</md-slider>
														<div flex="20"  layout layout-align="right center">
															<md-input-container flex>
																<label>Alpha</label>
																<input ng-model="field.color.a" ng-change='setHistory("colorElements",field);updateColor(field)'>
															</md-input-container>
														</div>
													</div>
												</md-content>
											</md-tab>
										</md-tabs>
									</md-card-content>
								</md-card>
							</div>
						</md-list>
					</md-content>
				</md-card>
			</div>
		</div>
	</div>
</div>
<div id="toastPlacer">
</div>
<div id='dialogPlacer'>
</div>
<div style="display:none"> <!-- hidden elements -->
	<md-button class="md-primary md-hue-1" id="resetButton" ng-click="recenterSvg() ; resetLogo()">
		reset
	</md-button>
	<canvas  id="canvas" width="1000px" height="1000px"></canvas>
</div>
<!-- Angular Material Dependencies -->
<script src="js/angular.min.js"></script>
<script src="js/angular-animate.min.js"></script>
<script src="js/angular-aria.min.js"></script>

<script src="js/angular-material.min.js"></script>
<script src="ng-file-upload/ng-file-upload-shim.min.js"></script> <!-- for no html5 browsers support -->
<script src="ng-file-upload/ng-file-upload.min.js"></script>
<script type="text/javascript" src="js/sanitize.js"></script>

<!-- controller -->

<script type="text/javascript" src="js/controller.js"></script>

</body>

</html>
