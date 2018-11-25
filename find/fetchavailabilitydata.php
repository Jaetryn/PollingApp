<?php
	require_once "dbLogin.php"; 

    /* Connecting to the database */		
        $meetID = $_POST["meet"];

		$db_connection = new mysqli($host, $user, $password, $database);
		if ($db_connection->connect_error) {
			die($db_connection->connect_error);
		}
		
		/* Query */
		$query = "SELECT name FROM attendees WHERE id = " . $meetID;
				
		/* Executing query */	    	
		$result = $db_connection->query($query);
		if (!$result) {
            die("Selection failed: " . $db_connection->error);
		} else {

            $output = ($result)->fetch_array(MYSQLI_ASSOC);
            
            if ($output == null){
                echo "fail";
            }else{
                echo implode(",", $output);
            }
        }
		/* Freeing memory */
		$result->close();
		
		/* Closing connection */
		$db_connection->close();




?>