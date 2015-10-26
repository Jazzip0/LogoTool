<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="UTF-8">
	<title>Logo Tool</title>
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/0.9.4/angular-material.min.css">
	<link rel="stylesheet" href="font/font-awesome/css/font-awesome.min.css">
	<script src="js/jquery.js" type="text/javascript"></script>
	<script src="js/fontdetect.js" type="text/javascript"></script>
	<style type="text/css">
		svg{
			margin:auto;
			width:90vw;
			max-width: 90%;
		}
		@media screen and (min-width:600px) and (max-width: 960px) {
    	#settings {
        	margin-left:auto;
        	margin-right: auto;
    		}
		}

		.content{
			margin:auto;
			
		}
		md-card{
			width:97vw;
			max-width: 450px;
		}


		#blue-slider .md-thumb:after {
			border-color: #3F51B5;
			background-color: #3F51B5;
		}
		#blue-slider .md-track.md-track-fill {
			background-color:#3F51B5;
		}
		#green-slider .md-thumb:after {
			border-color: #4CAF50;
			background-color: #4CAF50;
		}
		#green-slider .md-track.md-track-fill {
			background-color: #4CAF50;
		}
		#red-slider .md-thumb:after {
			border-color: #F44336;
			background-color: #F44336;
		}
		#red-slider .md-track.md-track-fill {
			background-color: #F44336;
		}
		md-content{
			overflow:hidden;
		}
		.colorText{
			font-size: 13px;
			color: rgba(0, 0, 0, 0.541176);
		}
		.colorField{
			margin-top:10px;
			border-radius:4px;
			border-bottom:solid 1px rgba(0, 0, 0, 0.2);
			margin-bottom:10px;

		}
		.colorField:hover{
			-moz-box-shadow:    inset 0 0 100px rgba(0, 0, 0, 0.05);
   			-webkit-box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.05);
  			 box-shadow:         inset 0 0 100px rgba(0, 0, 0, 0.05);
		}


		
	</style>
</head>
<body ng-controller="appController">
<md-toolbar>
	<div class="md-toolbar-tools">
			<span>Logo Download Tool</span>
			<!-- fill up the space between left and right area -->
			<span flex></span>
			<md-button>
			Joep Schyns
		</md-button>
	</div>
</md-toolbar>

<div layout-sm="column" layout-md="column" layout="row">
	<div flex flex-order="2" flex-order-sm="1" flex-order-md="1" layout="column" >
		<span layout-align="center start" id="logo" >
			<?php
				include "logo.php";
			?>
		</span>
	</div>
	<div style="height:100vh">
		<md-list flex-order="1" flex-order-sm="2" flex-order-md="2" id="settings">
			<md-list-item>
				<md-card>
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
								<md-divider ng-if="!$last"></md-divider>
								</div>
						</md-list>
					</md-content>
				</md-card>
			</md-list-item>
			<md-list-item  md-colspan="1" md-rowspan="1" >
				<md-card>
					<md-content>
						<md-list>
						  <md-subheader class="md-no-sticky">Color fields</md-subheader>
						  	<div ngbind="colorElements" ng-repeat="field in colorElements">
							  	<md-list-item>
									<div flex layout="column">
										<div class="colorText">
											Adjust color
										</div>
										<div class="color1 colorField" ngbind="field.color" style="background-color:rgb({{field.color.r}},{{field.color.g}},{{field.color.b}})">
											&nbsp;
										</div>
									</div>
								</md-list-item>
								<md-card class="colorCard">
									<md-card-content>
										<div layout="row">
											<md-slider flex min="0" max="255" ng-model="field.color.r" aria-label="red" id="red-slider" ng-change="updateColor(field)">
											</md-slider>
											<div flex="20"  layout layout-align="right center">
												<md-input-container flex>
													<label>Red</label>
													<input ng-model="field.color.r">
												</md-input-container>
											</div>
										</div>
										<div layout="row">
											<md-slider flex ng-model="field.color.g" min="0" max="255" aria-label="green" id="green-slider" ng-change="updateColor(field)">
											</md-slider>
											<div flex="20"  layout layout-align="right center">
												<md-input-container flex>
													<label>Green</label>
													<input ng-model="field.color.g">
												</md-input-container>
											</div>
										</div>
										<div layout="row">
											<md-slider flex ng-model="field.color.b" min="0" max="255" aria-label="blue" id="blue-slider" ng-change="updateColor(field)">
											</md-slider>
											<div flex="20"  layout layout-align="right center">
												<md-input-container flex>
													<label>Blue</label>
													<input ng-model="field.color.b">
												</md-input-container>
											</div>
										</div>
									</md-card-content>
								</md-card>
								<md-divider ng-if="!$last"></md-divider>
							</div>
						</md-list>
					</md-content>
				</md-card>
			</md-list-item>
			<md-list-item layout layout-align="center center">
				<md-button class="md-fab" aria-label="FAB">
					<i class="fa fa-download"></i>
				</md-button>
			</md-list-item>
		</md-list>
	</div>
	







<!-- Angular Material Dependencies -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-animate.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-aria.min.js"></script>

<script src="https://ajax.googleapis.com/ajax/libs/angular_material/0.9.4/angular-material.min.js"></script>
<script src="https://code.angularjs.org/1.4.7/angular-sanitize.js"></script>

<!-- controller -->

<script type="text/javascript" src="js/controller.js"></script>

</body>

</html>