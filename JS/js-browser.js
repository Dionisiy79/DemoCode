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
    div1.innerHTML = "Тут HTML-разметка <b>работает</b>.<BR><HR>"; // Вставка HTML
    document.body.innerHTML = ""; // Так можно очистить всё содержимое элемента <body> 
    div1.className = "DemоClass"; // Изменение класса элемента
    
    // Клонирование элемента
        // var div1c = div1.cloneNode(false); // Клонирование без дочерних элементов
        var div1c = div1.cloneNode(true);  // Глубокое клонирование
        div1c.innerHTML = "Клонированный элемент."
        div1c.className = "DemоClassClone";
		
  }
  
  { /* Добавление узлов в DOM */
    
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
			div3.innerHTML = "<p>Параграф 1</p><p>Параграф 2</p><p>Параграф 3</p><HR>";
			document.body.appendChild(div3);
		}
    
        if (isOldBrowser()) 
        {   // Методы вставки, работающие в старых браузерах:
		
			// Добавление в DOM произвольного HTML-кода
			p1.insertAdjacentHTML("beforebegin","<HR><b> Введение </b>");
			p1.insertAdjacentHTML("afterbegin" ,"<b> Начало </b>");
			p1.insertAdjacentHTML("beforeend"  ,"<b> Конец </b>");
			p1.insertAdjacentHTML("afterend"   ,"<b> Послесловие </b><HR>");
		
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
            span2.innerHTML = "Дополнение (<b>HTML работает</b>).<BR>";
            
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
  }  
  
  { /* Удаление узлов */

        // Удаляем параграф 2:
        if (isOldBrowser()) { 
            div3.removeChild(div3.children[1]); // Старым но надёжным методом (для Opera Presto)
        } else {
            div3.children[1].remove(); // То же самое современным методом
        }
  }
  
  { /* Навигация по html-документу */
  
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
		document.body.insertAdjacentHTML('beforeend','У documentElement нет элемента-родителя <br>');
	} ; 
	
	node1 = list1.previousElementSibling; // Ссылка на предыдущий элемент (<p>)
	node1.insertAdjacentHTML("afterbegin"  ,"Предыдущий элемент (previousElementSibling);");

	node1 = list1.nextElementSibling; // Ссылка на следующий элемент (тоже <p>)
	node1.insertAdjacentHTML("afterbegin"  ,"Следующий элемент (nextElementSibling);");

	node1 = list1.firstElementChild; // Ссылка на первый элемент-потомок (<li>)
	node1.insertAdjacentHTML("afterbegin"  ,"Первый элемент-потомок (firstElementChild);");

	node1 = list1.lastElementChild; // Ссылка на последний элемент-потомок (<li>)
	node1.insertAdjacentHTML("afterbegin"  ,"Последний элемент-потомок (lastElementChild);");
	
	for (var i=0; i < list1.children.length; ++i) {  // Перебор дочерних элементов для list1
		list1.children[i].insertAdjacentHTML("afterbegin"  ," * ");
    }

   // Обход дерева узлов (не только элементов, но и текстовых и пр.)
	node1 = list1.parentNode; // Ссылка на узел-родитель (в нашем случае <div>)
	node1.insertAdjacentHTML("afterbegin"  ,"Родительский узел (parentNode)<br>");
	if (document.documentElement.parentNode == document) { // true т.к. это вершина дерева элементов
	  document.body.insertAdjacentHTML('beforeend','У documentElement родительский узел document');
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
	
	for (var i=0; i < list1.children.length; ++i) {  // Перебор дочерних узлов для list1
		list1.children[i].insertAdjacentText("afterbegin"  ," # ");
    }

	
  }
}