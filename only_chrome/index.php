<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1">
	<meta charset="UTF-8">
	<link rel="shortcut icon" type="image/png" href="/scg/images/favicon.png">
	<link rel="icon" sizes="192x192" href="/scg/images/large_favicon.png">
	<title>only Chrome</title>
	<link href='http://fonts.googleapis.com/css?family=Roboto:300,700,400' rel='stylesheet' type='text/css'>
	<style type="text/css">
	</style>
</head>
<style type="text/css">
body{
	overflow: hidden;
	position: absolute;
	background-color: #4285f4;

	color:#fff;
	vertical-align: middle;
	text-align: center;
	width:100%;
	height:100%;
	margin:0;
	padding:0;
}
img{
	user-drag: none;
	-moz-user-select: none;
	-webkit-user-drag: none;
}
.center{
	position: relative;
	top:50%;
	height:500px;
	margin-top: -250px;
	padding:10px;
}
#text{
	width:100%;
	margin-top: 50px;
	font-family: 'Roboto', sans-serif;
	font-weight: 300;
	font-size: 25px;
	line-height: 175%;
}
#button{
	display: inline-block;
	padding: 10px 20px 10px 20px;
	margin-top: 50px;
	position: relative;
	margin-left: auto;
	margin-right: auto;
	border-radius: 2px;
	background-color: #346ac3;
	font-family: 'Roboto', sans-serif;
	font-weight: 700;
	font-size: 17px;
}
a{
	color:#fff;
	text-decoration: none;
}

#button:hover {
	background-color: #3266bd;
	color:#fff;
}

#button:active {
	background-color: #366dc9;
	color:#fff;
}
</style>

<body>
	<div class="center">
		<img src="/logotool/only_chrome/logotoollogo.svg" alt="SimpleCarGame logo" style="width:150px; ">
		<!-- <img src="http://joepschyns.me/only_chrome/chromeLogo.svg" alt="chrome logo" style="width:150px;"> -->
		<div id="text">
			LogoTool only works in Google Chrome.</br>
			More browsers coming soon.
		</div>
		<a href="https://www.google.com/chrome">
			<div id="button">
				DOWNLOAD GOOGLE CHROME
			</div>
		</a>
	</div>
	<?php

	$useragent=$_SERVER['HTTP_USER_AGENT'];

	if(!preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4)))

		echo '<a style="position:fixed;bottom:0; right:-2px;" href="http://www.chromeexperiments.com/" target="_blank"><img src="/only_chrome/img_chrome-experiment.png" alt="This is a Chrome Experiment"></a>';
	?>
</body>

</html>
