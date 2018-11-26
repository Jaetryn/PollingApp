<?php
	require_once "dbLogin.php"; 

    /* Connecting to the database */		
        $meetID = $_POST["meet"];
        $availability = $_POST["availability"];
        $name = $_POST["name"];

		$db_connection = new mysqli($host, $user, $password, $database);
		if ($db_connection->connect_error) {
			die($db_connection->connect_error);
		}
		
		/* Query */
        $query = "INSERT INTO attendees (name, availability, id) VALUES ('$name', '$availability', $meetID)";
				
		/* Executing query */	    	
		$result = $db_connection->query($query);
		if (!$result) {
            die("Selection failed: " . $db_connection->error);
            echo "fail";
		}else{
            echo "success";
        }
		/* Freeing memory */
		$result->close();
		
		/* Closing connection */
		$db_connection->close();




?>