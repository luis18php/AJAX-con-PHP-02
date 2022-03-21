<?php

	include('database.php');

	if(isset($_POST['id'])) {
  		$id = mysqli_real_escape_string($connection, $_POST['id']);

  		$query = "SELECT * from tarea WHERE id = {$id}";

  		$result = mysqli_query($connection, $query);
  		if(!$result) {
    		die('Query Failed'. mysqli_error($connection));
  		}

  		$json = array();
  		while($row = mysqli_fetch_array($result)) {
    		$json[] = array(
      			'name' => $row['nombre'],
      			'description' => $row['descripcion'],
      			'id' => $row['id']
    		);
  		}
  		$jsonstring = json_encode($json[0]);
  		echo $jsonstring;
	}

?>