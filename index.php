<?php
if (strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome') !== false|| strpos($_SERVER['HTTP_USER_AGENT'], 'CriOS') !== false)
    include "logotool.php";
else
	include "../only_chrome/index.php";


?>
