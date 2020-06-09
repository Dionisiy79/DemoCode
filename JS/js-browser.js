"use strict"; 
function isOldBrowser() { // Функция проверки совместимости браузера с новыми методами
    if (typeof(document.body.prepend)=="function") return false; 
        else return true;
    }

{/* МОДИФИКАЦИЯ ДОКУМЕНТА */
  // https://learn.javascript.ru/modifying-document 
  
  { /* Создание и клонирование узлов (вне DOM) */
    
    // Создание текстового узла с помощью метода createTextNode объекта document:
    var txt1 = document.createTextNode('Тут HTML-разметка <b>не работает</b>.'); 
    
    // Создание HTML-элемента с помощью метода createTextNode:
    var div1 = document.createElement('div');  
    
    // Изменение содержимого у элемента:
    div1.textContent = "Тут HTML-разметка <b>не работает</b>."; // Безопасная вставка строк
    div1.innerHTML = "Тут HTML-разметка <b>работает</b>.<br><hr>"; // Вставка HTML
    document.body.innerHTML = ""; // Так можно очистить всё содержимое элемента <body> 
    // div1.className = "DemоClass"; // Изменение класса элемента
    
    // Клонирование элемента
        // var div1c = div1.cloneNode(false); // Клонирование без дочерних элементов
        var div1c = div1.cloneNode(true);  // Глубокое клонирование
        div1c.innerHTML = "Клонированный элемент."
    //    div1c.className = "DemоClassClone";
		
  }
  
  { /* Добавление и удаление узлов DOM */
	document.write("<h3> Добавление узлов в DOM </h3>");
    
    //  Метод appendChild добавляет в DOM узел, как последний дочерний:
        document.body.appendChild(div1); // Можно добавлять как HTML-элементы
        document.body.appendChild(txt1); //   так и текстовые узлы
        // При помещении элемента в новое место из старого он исчезает:
        document.body.appendChild(div1); // Элемент div теперь стал вторым, а не первым
        document.body.appendChild(div1c);
    
    // Добавление элемента в DOM перед или после указанного другого элемента
        // Добавление в DOM текстовой строки:
        
		{	// Создание демонстрационных данных:
			var p1 = document.createElement('p');  
			p1.innerHTML = "<b>Середина</b>";
			document.body.appendChild(p1); 
	
			var div3 = document.createElement('div');  
			div3.innerHTML = '<p>Параграф 1</p><p id="par2">Параграф 2</p><p>Параграф 3</p><hr>';
			document.body.appendChild(div3);
		}
    
        if (isOldBrowser()) // Методы вставки, работающие в старых браузерах:
        {   // Добавление в DOM произвольного HTML-кода
			p1.insertAdjacentHTML("beforebegin","<hr><b> Введение </b>");
			p1.insertAdjacentHTML("afterbegin" ,"<b> Начало </b>");
			p1.insertAdjacentHTML("beforeend"  ,"<b> Конец </b>");
			p1.insertAdjacentHTML("afterend"   ,"<b> Послесловие </b><hr>");
		
			// Добавление в DOM текста
			p1.insertAdjacentText("beforebegin"," * ");
			p1.insertAdjacentText("afterbegin" ," * ");
			p1.insertAdjacentText("beforeend"  ," * ");
			p1.insertAdjacentText("afterend"   ," * ");
				
			// Устаревший, но надёжный метод вставки insertBefore имеет два аргумента:
			// вставляемый элемент и элемент перед которым нужно произвести вставку
			var span3 = document.createElement('span'); 
			span3.innerHTML = "Legacy-код";
			
			div3.insertBefore(span3,div3.children[2]); // Вставка перед третьим параграфом
			
			// Замена одного элемента на другой методом replaceChild(node, oldChild)
			div3.replaceChild(span3, div3.children[0]);
        
		} else {  // Эти методы не работают в старых браузерах
			// Добавляем к элементу p1 тест:
            p1.before("Введение (<b>HTML не работает</b>).");  // Перед начальным тегом элемента
            p1.prepend("Начало ");   // После начального тега элемента
            p1.append (" Конец");    // Перед закрывающим тегом
            p1.after  ("Послесловие"); // После закрывающего тега
            
            // Аналогичное добавление в DOM HTML-элемента:
            var span2 = document.createElement('span');  
            span2.innerHTML = "Дополнение (<b>HTML работает</b>).";
            
            p1.before(span2);  
            p1.prepend(span2); 
            p1.append(span2);  
            p1.after(span2);   
            
            // Альтернативный метод вставки HTML-элемента
            p1.insertAdjacentElement("beforebegin",span2);
            p1.insertAdjacentElement("afterbegin" ,span2);
            p1.insertAdjacentElement("beforeend"  ,span2);
            p1.insertAdjacentElement("afterend"   ,span2);
            
            // Замена одного элемента на другой
            div1c.replaceWith(span2);
		}
  
    /* Удаление узлов */
        // Удаляем параграф 3:
        if (isOldBrowser()) { 
            div3.removeChild(div3.children[2]); // Старым но надёжным методом (для Opera Presto)
        } else {
            div3.children[2].remove(); // То же самое современным методом
        }
  }  
  
  { /* Навигация по дереву узлов DOM 
	   https://learn.javascript.ru/dom-navigation  */
	document.write("<h3> Навигация по дереву узлов DOM </h3>");
  
	var node1 = document.documentElement;  // Ссылка на первый узел (он имеет тег <html>)
	node1 = document.head; // Ссылка на узел <head>
	node1 = document.body; // Ссылка на узел <body>
	
	//Создадим демонстрационный html-код с парой параграфов и списком
	document.body.insertAdjacentHTML('beforeend', 
	    '<div><p></p><ol id="list1"><li></li><li></li><li></li></ol><p></p></div>');
	node1 = list1;  // Можно обратиться к элементу по id - он совпадает с именем переменной
	node1.insertAdjacentHTML("afterbegin"  ,'Текущий элемент (доступ по id "list1")');

	// Обход дерева элементов
	node1 = list1.parentElement; // Ссылка на элемент-родитель (в нашем случае <div>)
	node1.insertAdjacentHTML("afterbegin"  ,"Родительский элемент (parentElement)");
	if (document.documentElement.parentElement == null) { // true т.к. это вершина дерева элементов
		document.write('У documentElement нет элемента-родителя <br>');
	} ; 
	
	node1 = list1.previousElementSibling; // Ссылка на предыдущий элемент (<p>)
	node1.insertAdjacentHTML("afterbegin"  ,"Предыдущий элемент (previousElementSibling);");

	node1 = list1.nextElementSibling; // Ссылка на следующий элемент (тоже <p>)
	node1.insertAdjacentHTML("afterbegin"  ,"Следующий элемент (nextElementSibling);");

	node1 = list1.firstElementChild; // Ссылка на первый элемент-потомок (<li>)
	node1.insertAdjacentHTML("afterbegin"  ,"Первый элемент-потомок (firstElementChild);");

	node1 = list1.lastElementChild; // Ссылка на последний элемент-потомок (<li>)
	node1.insertAdjacentHTML("afterbegin"  ,"Последний элемент-потомок (lastElementChild);");

	// Перебор дочерних элементов для list1
	for (var i=0; i < list1.children.length; ++i)  
		list1.children[i].insertAdjacentHTML("afterbegin"  ," * ");

   // Обход дерева узлов (не только элементов, но и текстовых, комментариев и пр.)
	node1 = list1.parentNode; // Ссылка на узел-родитель (в нашем случае <div>)
	node1.insertAdjacentHTML("afterbegin"  ,"Родительский узел (parentNode)<br>");
	if (document.documentElement.parentNode == document) { // true т.к. это вершиныа дерева узлов
	  document.write('У documentElement родительский узел document');
	} ; 

	node1 = list1.previousSibling; // Ссылка на предыдущий узел (<p>)
	node1.insertAdjacentText("afterbegin"  ,"Предыдущий узел (previousSibling); ");

	node1 = list1.nextSibling; // Ссылка на следующий узел (тоже <p>)
	node1.insertAdjacentText("afterbegin"  ,"Следующий узел (nextSibling); ");

	node1 = list1.firstChild; // Ссылка на первый узел-потомок (<li>)
 	node1.textContent += " Первый узел-потомок (firstChild);"; 	// Для текстовых узлов не работает 
																// метод insertAdjacentText
	node1 = list1.lastChild; // Ссылка на последний узел-потомок (<li>)
 	node1.textContent += " Последний узел-потомок (lastChild);";

    // Перебор дочерних узлов для list1
	for (var i=0; i < list1.childNodes.length; ++i)
		list1.childNodes[i].textContent += " # ";
  }

  { /* Работа с атрибутами HTML-элементов через свойства DOM-объектов 
	   https://learn.javascript.ru/dom-attributes-and-properties */
	document.write("<h3> Работа с атрибутами HTML-элементов через свойства DOM-объектов </h3>");
	
	// Для стандартных(!) HTML-атрибутов автоматически создаётся одноимённое DOM-свойство 
	document.write("ID второго параграфа: " + div3.children[1].id); // par2
	div3.children[1].id = "par2b";
	document.write("<br> ID второго параграфа изменилось: " + div3.children[1].id); // par2b
	
	// Все атрибуты, в том числе и нестандартные, доступны через методы:
	
		// Установка нового атрибута;
		div3.setAttribute("id", "block-3");  
		document.write("<br> ID блока: " + div3.id);  // block-3
		
		// Для пользовательских атрибутов желательно использовать префикс data- 
		// В этом случае они доступны через коллекцию dataset:
		div3.setAttribute("data-about", "Описание блока");  
		div3.dataset.about = "Описание №2";  //  Изменение свойства меняет и атрибут
		
		// Если в имени атрибута есть дефис, то в имени свойства он исчезает 
		// а следующиепосле дефиса слова начинается с заглавной буквы:
		div3.setAttribute("data-adress-city", "Москва");  // Имя свойства: adressCity
		document.write("<br>Город: " + div3.dataset.adressCity);
		div3.dataset.adressStreet = "ул.Центральная";  // Имя атрибута: data-adress-street
		
		// Чтение атрибута
		document.write("<br> В атрибуте data-about хранится: " + div3.getAttribute("data-about"));
		
		// Удаление атрибута
		div3.removeAttribute("data-about");
		
		// Проверка существования атрибута
		if (!div3.hasAttribute("data-about")) 
			document.write("<br> Атрибут data-about не существует. ");
		
		document.write("<br> Перебор всех атрибутов блока: ");
		for (var i=0; i < div3.attributes.length; ++i)  
			document.write("<br>" + div3.attributes[i].name + " : " + div3.attributes[i].value);
  }

  { /* Модификация классов 
	   https://learn.javascript.ru/styles-and-classes */
	document.write("<h3> Модификация классов </h3>");
	
	var div2 = document.createElement('div');  
    document.body.appendChild(div2);

	// Строка с именами классов хранится в свойстве className:
		div2.className = "Class1 Class2"; // Это свойство можно переприсваивать
		div2.innerHTML += "Текущие имена классов: " + div2.className;
		
		div2.className = "Class3"; // Простая запись в свойство стирает предыдущие данные
		div2.innerHTML += "<br> А теперь имя класса: " + div2.className; // Class3
		
	// Оперировать каждым именем классом по отдельности можно через свойство-коллекцию classList
		div2.classList.add("Class4"); // Добавление ещё одного класса 
		div2.innerHTML += "<br> Добавлен один класс: " + div2.className; // Class3 Class4
	
		div2.classList.remove("Class3");  // Удаление класса с указанным именем
		div2.innerHTML += "<br> Удалён один класс: " + div2.className; // Class4

		div2.classList.toggle("Class3");  // Переключение наличия имени класса 
		div2.innerHTML += "<br> Переключен один класс: " + div2.className; // Class3 Class4

		if (div2.classList.contains("Class3")) {  // Проверка наличия имени класса
			div2.innerHTML += "<br> Класс Class3 обнаружен."; // Class3 Class4
		}
		
		for (var i=0; i < div2.classList.length; ++i) {  // Перебор всех классов
			div2.innerHTML += "<br>Обнаружен класс: " + div2.classList[i];
		}
  }

  { /* Модификация стилей*/
	document.write("<h3> Модификация стилей </h3>");
	
  }
}