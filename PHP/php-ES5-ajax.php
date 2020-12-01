<?php 
	echo "Тестовые данные. ";
	
	/* Если в POST-запросе пришёл JSON (при указанном Content-type = "application/json"), получить
	   его можно из потока input: */
	$postData1 = file_get_contents('php://input'); // Сохранение потока в переменную
	$data1 = json_decode($postData1, true); // Декодирование в JSON

	for ($i=1; $i<10; $i++) { // Получение параметров var1, var2, var3 ...
		if (isset($_GET["var$i"]))  echo "var$i=".$_GET["var$i"]."; ";  // GET-запрос
		if (isset($_POST["var$i"])) echo "var$i=".$_POST["var$i"]."; "; // POST-запрос
		if (isset($data1["var$i"])) echo "var$i=".$data1["var$i"]."; "; // JSON 
	}
?>
