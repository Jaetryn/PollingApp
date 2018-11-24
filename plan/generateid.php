<?php
	require_once "dbLogin.php"; 

    /* Connecting to the database */		
		$db_connection = new mysqli($host, $user, $password, $database);
		if ($db_connection->connect_error) {
			die($db_connection->connect_error);
		}
		
		/* Query */
		$query = "SELECT id FROM meetup";
				
		/* Executing query */	    	
		$result = $db_connection->query($query);
		if (!$result) {
            echo "FAIL";
            die("Selection failed: " . $db_connection->error);
            
		} else {
            $column = array();

            while ($row = (($result)->fetch_array(MYSQLI_ASSOC))){
                $column[] = implode(" ", $row);
            }

            echo implode(",", $column);
        }
		/* Freeing memory */
		$result->close();
		
		/* Closing connection */
		$db_connection->close();




?>