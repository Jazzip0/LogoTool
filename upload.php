<?php

$filename = $_FILES['file']['name'];
$tmpLoc = $_FILES["file"]['tmp_name'];
if(is_array($filename)){ //workaround for svgs
	$filename = $filename[0];
	$tmpLoc = $tmpLoc[0];
}

$extention = pathinfo($filename, PATHINFO_EXTENSION);
$name = "image." . $extention; //give default name to induce overwriting of images on the server

  $destination = 'upload/';
  if (move_uploaded_file($tmpLoc, $destination . $name)) {
    echo "Uploaded";
} else {
   echo "File was not uploaded";
}
?>