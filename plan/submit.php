
<?php
	require_once "dbLogin.php";
	
	$name = $_POST["name"];
	$description = $_POST["description"];
	$day = $_POST["day"];
	$start = $_POST["start"];
	$end = $_POST["end"];
	$id = $_POST["id"];

	$db_connection = new mysqli($host, $user, $password, $database);
	if ($db_connection->connect_error) {
		die($db_connection->connect_error);
	}
	
	/* Query */
	$query = "INSERT INTO meetup (name, description, date, start, end, id) VALUES ('$name', '$description', '$day', '$start', '$end', '$id')";
			
	/* Executing query */	    	
	$result = $db_connection->query($query);
	if (!$result) {
		die("Insertion failed: " . $db_connection->error);
	} else {
		$dbpassword = (($result)->fetch_array(MYSQLI_ASSOC))['password'];
	}

	/* Freeing memory */
	$result->close();
	
	/* Closing connection */
	$db_connection->close();
?>