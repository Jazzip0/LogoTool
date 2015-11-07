<!DOCTYPE html>
<html lang="en" ng-app="myApp" >
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="UTF-8">
	<title>LogoTool</title>
	<link rel="icon" href="images/favicon.png" type="image/png">
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/0.9.4/angular-material.min.css">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/animations.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<script src="js/jquery.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/smoothscroll.js"></script>
	<script type="text/javascript" src="http://gabelerner.github.io/canvg/rgbcolor.js"></script>
	<script type="text/javascript" src="http://gabelerner.github.io/canvg/StackBlur.js"></script>
	<script type="text/javascript" src="http://gabelerner.github.io/canvg/canvg.js"></script>
	<script type="text/javascript" src="js/canvas2image.js"></script>
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
<body ng-controller="appController" ngf-drop="" ngf-drag="drag($isDragging, $class, $event)">
	<md-toolbar style="position:fixed; top:0;">
		<div class="md-toolbar-tools">
			<span>Logo Tool</span>
			<span flex></span>
			<md-button class="md-icon-button" aria-label="upload" ng-click="showUploadDialog()" >
				<i class="material-icons">file_upload</i>
			</md-button>

			<md-button class="md-icon-button" aria-label="undo" ng-click="checkUndo()" >
				<i class="material-icons">undo</i>
			</md-button>
			<md-button class="md-icon-button" aria-label="redo" ng-click="checkRedo()" >
				<i class="material-icons">redo</i>
			</md-button>

			<md-button class="md-icon-button" aria-label="menu" >
				<i class="material-icons">more_vert</i>
			</md-button>
			<md-button href="http://joepschyns.me" target="_blank" aria-label="joepschyns.me" >
				Joep Schyns
			</md-button>
		</div>
	</md-toolbar>
	<div style="margin-top:64px; overflow-y: scroll; ">
		<div layout-sm="column" layout-md="column" layout-lg="column" layout="row">
			<div flex flex-order="2" flex-order-sm="1" flex-order-md="1" flex-order-lg="1" layout="column" >
				<md-content layout-padding ng-show="logo.loading == false" id="logo" layout="row" layout-align="center center">
					<!-- <ng-include src="'upload/image.svg'" /></ng-include> -->
				</md-content>
				<div md-bind="logo.loading" ng-show="logo.loading" layout="column" id="logoLoading">
					<md-progress-circular md-mode="indeterminate"></md-progress-circular>
				</div>
			</div>
			<div layout="column" flex-order="1" flex-order-sm="2" flex-order-md="2" flex-order-lg="2" >
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
												<div class="colorText">
													Adjust color
												</div>
												<div class="color1 colorField" ng-mouseLeave="leaveColorField(field)" ng-mouseEnter="enterColorField(field)" ng-click="colorCardShow(field)" ngbind="field.color" style="background-color:rgb({{field.color.r}},{{field.color.g}},{{field.color.b}})">
													&nbsp;
												</div>
											</div>
										</md-list-item>
										<md-card class="colorCard" ng-show="field.show">
											<md-card-content>
												<div layout="row" ng-mouseup='setHistory("colorElements",field)'>
													<md-slider flex min="0" max="255" ng-model="field.color.r" aria-label="red" id="red-slider" ng-change="updateColor(field)" >
													</md-slider>
													<div flex="20"  layout layout-align="right center">
														<md-input-container flex>
															<label>Red</label>
															<input ng-model="field.color.r" ng-change='setHistory("colorElements",field)'>
														</md-input-container>
													</div>
												</div>
												<div layout="row" ng-mouseup='setHistory("colorElements",field)'>
													<md-slider flex ng-model="field.color.g" min="0" max="255" aria-label="green" id="green-slider" ng-change="updateColor(field)" >
													</md-slider>
													<div flex="20"  layout layout-align="right center" >
														<md-input-container flex>
															<label>Green</label>
															<input ng-model="field.color.g" ng-change='setHistory("colorElements",field)'>
														</md-input-container>
													</div>
												</div>
												<div layout="row" ng-mouseup='setHistory("colorElements",field)'>
													<md-slider flex ng-model="field.color.b" min="0" max="255" aria-label="blue" id="blue-slider" ng-change="updateColor(field)" >
													</md-slider>
													<div flex="20"  layout layout-align="right center">
														<md-input-container flex>
															<label>Blue</label>
															<input ng-model="field.color.b" ng-change='setHistory("colorElements",field)'>
														</md-input-container>
													</div>
												</div>
											</md-card-content>
										</md-card>
									</div>
								</md-list>
							</md-content>
						</md-card>
					</div>
				</div>
				<div layout layout-align="center center" ng-show="logo.inserted">
					<md-button class="md-fab" aria-label="FAB" ng-click="showDownloadDialog()">
						<i class="material-icons">file_download</i>
					</md-button>
				</div>
			</div>
		</div>
		<div id="footer">
		</div>
	</div>
	<div id="toastPlacer">
	</div>
	<div id='dialogPlacer'>
	</div>
	<canvas style="display:none" id="canvas" width="1000px" height="1000px"></canvas>
	<!-- Angular Material Dependencies -->
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-animate.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-aria.min.js"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/angular_material/0.9.4/angular-material.min.js"></script>
	<script src="ng-file-upload/ng-file-upload-shim.min.js"></script> <!-- for no html5 browsers support -->
	<script src="ng-file-upload/ng-file-upload.min.js"></script>
	<script type="text/javascript" src="js/sanitize.js"></script>

	<!-- controller -->

	<script type="text/javascript" src="js/controller.js"></script>

</body>

</html>
