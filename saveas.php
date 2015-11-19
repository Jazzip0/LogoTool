<?php
$src = $_POST['src'];
$tosrc = $_POST['tosrc'];
echo $src;
echo $tosrc;
if (copy($src, $tosrc)) {
  echo "Uploaded";
} else {
  $errors= error_get_last();
      echo "COPY ERROR: ".$errors['type'];
      echo "<br />\n".$errors['message'];
}
?>
