/* В стандарте ES5 для AJAX-запросов используется специальный объект XMLHttpRequest, 
   в функциональность которого входит умение создавать и отправлять http-запросы. 
   https://learn.javascript.ru/xmlhttprequest */


/* ПРОСТЫЕ AJAX-ЗАПРОСЫ */

	/* СОЗДАНИЕ И ОТПРАВКА ЗАПРОСА */
		var d1 = document.getElementById("ajax-get"); // В этом <div> будем отображать сообщения
	
		var req1 = new XMLHttpRequest(); // Создание объекта XMLHttpRequest
		req1.open("GET", "php-ES5-ajax.php"); // Конфигурирование запроса (тип, URL и т.д.)
		req1.send(); // Отправка сконфигурированного запроса
			d1.innerHTML += "Отправлен GET-запрос 1.<br>"; 
		
	/* ПОЛУЧЕНИЕ ОТВЕТА СЕРВЕРА */
		// Ответы от сервера обрабатываются через события:
		req1.onload = function() { // Событие получение ответа от сервера
			d1.innerHTML += "Получен ответ 1: " + req1.status + ". " + req1.response + "<br>";
		};

	/* ОБРАБОТКА ПРОЦЕССА ЗАГРУЗКИ ДАННЫХ */ 	
		req1.onprogress = function(event) {
			if (event.lengthComputable) { // Если в заголовке ответа есть размер данных:
				d1.innerHTML += "1. Получено " + event.loaded + " из " + event.total  + " байт<br>";
			} else {
				d1.innerHTML += "1. Получено " + event.loaded + " байт<br>";
			}
		};
		
	/* ОБРАБОТКА ОШИБКИ СОЕДИНЕНИЯ */	
		var err1 = new XMLHttpRequest();
		err1.open("GET", "http://badsitename.ru");  err1.send(); // Несуществующий сервер
		err1.onerror = function() { // Событие ошибки отправки запроса
			d1.innerHTML += "Ошибка соединения! <br>";
		}; 
	
	/* ОБРАБОТКА ОШИБКИ ПРИСЛАННОЙ СЕРВЕРОМ */	
		var err2 = new XMLHttpRequest();
		err2.open("GET", "notexist.php"); err2.send(); // Несуществующий файл на сервере
		err2.onload = function() {   
			if (err2.status != 200)  // если статус ответа не 200, то произошла ошибка
				d1.innerHTML += "Ошибка " + err2.status + ": " + err2.statusText + "<br>";
		};
		
	/* ОТМЕНА ЗАПРОСА */ 
		err1.abort();
	

/* ЗАПРОСЫ С ПАРАМЕТРАМИ */
	
	/* ПЕРЕДАЧА ПАРАМЕТРОВ НЕПОСРЕДСТВЕННО В СТРОКЕ ЗАПРОСА */
		var req2 = new XMLHttpRequest();
		req2.open("GET", "php-ES5-ajax.php?var1=value1&var2=value2&var3=5"); req2.send();
			d1.innerHTML += "Отправлен GET-запрос 2 с тремя переменными в URL.<br>"; 
		req2.onload = function() { // Событие получение ответа от сервера
			d1.innerHTML += "Получен ответ 2: " + req2.response + "<br>";
		};
		/* Для того чтобы не использовать отдельный PHP-скрипт, можно добавлять параметры к текущей
		   строке запроса таким методом: 
		   https://www.php.net/manual/ru/faq.html.php#faq.html.javascript-variable */

	/* ПЕРЕДАЧА GET-ПАРАМЕТРОВ ЧЕРЕЗ URL-ОБЪЕКТ */
		/* При создании URL-объекта нужно либо задать полный путь (с протоколом), либо указать
		   первым аргументом относительный путь, а вторым - базовый полный (тут это текущий путь) 
		   https://learn.javascript.ru/url    */
		var url1 = new URL("php-ES5-ajax.php", window.location.href); 
		url1.searchParams.set('var1', 'value1');
		url1.searchParams.set('var2', 5); // Число преобразуется к строке
		url1.searchParams.set('var3', 'Пара слов'); // Пробелы и пр.символы сменятся на безопасные

		var req3 = new XMLHttpRequest();
		req3.open("GET", url1); req3.send();
			d1.innerHTML += "Отправлен GET-запрос 3 с тремя переменными в URL.<br>"; 
			d1.innerHTML += "URL запроса: " + url1.href +"<br>"; 
		req3.onload = function() { // Событие получение ответа от сервера
			d1.innerHTML += "Получен ответ 3: " + req3.response + "<br>";
		};
		
	/* ПЕРЕДАЧА ПАРАМЕТРОВ В POST-ЗАПРОСЕ */
		// POST-запросы передаются вместе с объектом FormData:
		var fd1 = new FormData();   
		fd1.append('var1', 'value1'); // В объект добавляются новые поля
		fd1.append('var2', 5); 
		fd1.append('var3', 'Пара слов'); // Кириллические символы передаются нормально

		var req4 = new XMLHttpRequest();
		req4.open("POST", "php-ES5-ajax.php"); 
		req4.send(fd1); // Объект FormData указывается параметром к методу send()
			d1.innerHTML += "Отправлен POST-запрос 4 с тремя переменными в форме.<br>"; 
		req4.onload = function() { // Событие получение ответа от сервера
			d1.innerHTML += "Получен ответ 4: " + req4.response + "<br>";
		};
		
	/* ОТПРАВКА JSON */
		json = JSON.stringify({
			var1: "value1",
			var2: 5,
			var3: "Пара слов"
		});
		var req5 = new XMLHttpRequest();
		req5.open("POST", "php-ES5-ajax.php"); 
		req5.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		req5.send(json);
			d1.innerHTML += "Отправлен POST-запрос 5 c JSON.<br>"; 
		req5.onload = function() { // Событие получение ответа от сервера
			d1.innerHTML += "Получен ответ 5: " + req5.response + "<br>";
		};
		
