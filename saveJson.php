<?php
  $json = file_get_contents("php://input");
  $file = fopen('JSON/mainData.json','w+');
  fwrite($file, $json);
  fclose($file);
?>