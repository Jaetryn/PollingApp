
<?php

	/* Basic functionality achieved.
		To do list:
			Add password verification. (Might be done in main.php actually? Research.)
			Encrypt/Salt password before sending to be stored in database? Read slides.
	*/

	require_once("support.php"); /* Includes things like header, meta information for HTML document. */
    session_start(); /* Begin/continue our session */
	require_once "dbLogin.php"; 

	$trim_pw = trim($_POST['password']);
	$trim_pwconfirm = trim($_POST['passwordconfirm']);
	$trim_email = trim($_POST['email']);
	$trim_name = trim($_POST['name']);

    if (isset($_POST["mainmenuButton"])) {
    	header("Location: main.php");
    }else{

		/* Connecting to the database */		
		$db_connection = new mysqli($host, $user, $password, $database);
		if ($db_connection->connect_error) {
			die($db_connection->connect_error);
		} else {
			echo "Connection to database established<br><br>";
		}
		
		/* Encrypt password before storing on database */
		$hashed = password_hash($trim_pw, PASSWORD_DEFAULT); 

		/* Query */
		if (isset($_POST["submitUpdateButton"])){
			$query = "update application set gpa=$_POST[gpa], year=$_POST[year], name='$trim_name', gender='$_POST[gender]', password='$hashed', email='$trim_email' where email='$_SESSION[oldemail]'";
		}else{
			$query = "insert into application values('$trim_name', '$trim_email', $_POST[gpa], $_POST[year], '$_POST[gender]', '$hashed')";
		}
				
		/* Executing query */
		$result = $db_connection->query($query);
		if (!$result) {
			die("Insertion failed: " . $db_connection->error);
		} else {
			echo "Insertion completed.<br>";
		}
		
		/* Closing connection */
		$db_connection->close();



		if (isset($_POST["submitUpdateButton"])){
	        $body = <<<EOBODY

	    	<h2> The entry has been updated in our database and the new values are: </h2>
	    	<strong>Name: </strong> $trim_name<br \>
	    	<strong>E-Mail: </strong> $trim_email<br \>
	    	<strong>GPA: </strong> $_POST[gpa]<br \>
	    	<strong>Year: </strong> $_POST[year]<br \>
	    	<strong>Gender: </strong> $_POST[gender]<br \>
	        <form action="{$_SERVER['PHP_SELF']}" method="post">
				<input type="submit" value="Return to Main Menu" name="mainmenuButton" />
			</form>
EOBODY;
		}else{
	        $body = <<<EOBODY
	    	<h2> The following entry has been added to the database. </h2>
	    	<strong>Name: </strong> $trim_name<br \>
	    	<strong>E-Mail: </strong> $trim_email<br \>
	    	<strong>GPA: </strong> $_POST[gpa]<br \>
	    	<strong>Year: </strong> $_POST[year]<br \>
	    	<strong>Gender: </strong> $_POST[gender]<br \>
	        <form action="{$_SERVER['PHP_SELF']}" method="post">
				<input type="submit" value="Return to Main Menu" name="mainmenuButton" />
			</form>
EOBODY;
		}
	}

 

    $page = generatePage($body);
    echo $page;
?>