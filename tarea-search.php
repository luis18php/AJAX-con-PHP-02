<?php

	include('database.php');

	$search = $_POST['search'];

	if(!empty($search)){
		$query = "SELECT * FROM tarea WHERE nombre LIKE '$search%'";
		$result = mysqli_query($connection, $query);
		if(!$result){
			die('Query Error'.mysqli_error($connection));
		}

		$json = array();
		while($row = mysqli_fetch_array($result)){
			$json[] = array(
				'name' => $row['nombre'],
				'description' => $row['descripcion'],
				'id' => $row['id']
			);
		}

		$jsonstring = json_encode($json);	//de array to string
		echo $jsonstring;
		//echo var_dump($jsonstring);
	}

?>