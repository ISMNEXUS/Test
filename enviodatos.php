<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>Documento sin título</title>

<style type="text/css">

<!--

body,td,th {

	font-family: Trebuchet MS, Arial, Helvetica, sans-serif;

	color: #006;

}

-->

</style></head>



<body>

<? 

	if($_REQUEST['nombre']=="" || $_REQUEST['edad']=="" || $_REQUEST['ciudad']=="" || $_REQUEST['celular']==""){

		

			echo "<h2>Uno o mas campos obligatorios no han sido diligenciados.<br>";

			echo "Click " ?> <a href="http://www.englishmyway.com/datosOs/">aqui</a> <? echo "para intentar de nuevo.</h2>";

		}

	else {

		

	$mensaje = "Nombre : ". $_REQUEST['nombre']."\n";

	$mensaje = $mensaje ."Edad : ". $_REQUEST['edad']."\n";

	$mensaje = $mensaje ."Profesion : ". $_REQUEST['profesion']."\n";

	$mensaje = $mensaje ."Ciudad : ". $_REQUEST['ciudad']."\n";

	$mensaje = $mensaje ."Telefono fijo : " .$_REQUEST['fijo']."\n";

	$mensaje = $mensaje ."Telefono celular : " .$_REQUEST['celular']."\n";

	



	mail('oscarlopinde@live.com', 'Dato Email English My Way', $mensaje);

	mail('centerbta@englishmyway.com', 'Dato Email English My Way', $mensaje);

	mail('sistemas@englishmyway.com', 'Dato Email campana oscar lopez', $mensaje);

	mail('oscarlopez@englishmyway.com', 'Dato Email English My Way', $mensaje);

	

	

	echo "Tus datos han sido recibidos. Agradecemos tu interés.";

	

	}



?>



</body>

</html>