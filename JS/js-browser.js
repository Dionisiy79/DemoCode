"use strict"; 
function isOldBrowser() { // Функция проверки совместимости браузера с новыми методами
    if (typeof(document.body.prepend)=="function") return false; 
        else return true;
    }
	
function wr(s) { document.write(s); } // Компактная замена методу wr
function wrn(s) { wr("<br>" + s); }   // То же самое, но с новой строки
	
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
  }
  
  { /* Добавление и удаление узлов DOM */
	wr("<h3> Добавление узлов в DOM </h3>");
    
    //  Метод appendChild добавляет в DOM узел, как последний дочерний:
        document.body.appendChild(div1); // Можно добавлять как HTML-элементы
        document.body.appendChild(txt1); //   так и текстовые узлы
        // При помещении элемента в новое место из старого он исчезает:
        document.body.appendChild(div1); // Элемент div теперь стал вторым, а не первым
        document.body.appendChild(div1c);
    
    // Добавление элемента в DOM перед или после указанного другого элемента
        
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
		
			/* Устаревший, но надёжный метод вставки insertBefore имеет два аргумента:
			   вставляемый элемент и элемент перед которым нужно произвести вставку */
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
	
				// Добавление в DOM текста
				p1.insertAdjacentText("beforebegin"," * ");
				p1.insertAdjacentText("afterbegin" ," * ");
				p1.insertAdjacentText("beforeend"  ," * ");
				p1.insertAdjacentText("afterend"   ," * ");
				
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
	wr("<h3> Навигация по дереву узлов DOM </h3>");
  
	var node1 = document.documentElement;  // Ссылка на первый узел (он имеет тег <html>)
	node1 = document.head; // Ссылка на узел <head>
	node1 = document.body; // Ссылка на узел <body>
	
	//Создадим демонстрационный html-код с парой параграфов и списком
	wrn('<div><p></p><ol id="list1"><li></li><li></li><li></li></ol><p></p></div>');
	node1 = list1;  // Можно обратиться к элементу через имя переменной, совпадающее с ID
	node1.insertAdjacentHTML("afterbegin"  ,'Текущий элемент (доступ по id "list1")');

	// Обход дерева элементов
	node1 = list1.parentElement; // Ссылка на элемент-родитель (в нашем случае <div>)
	node1.insertAdjacentHTML("afterbegin"  ,"Родительский элемент (parentElement)");
	if (document.documentElement.parentElement == null) { // true т.к. это вершина дерева элементов
		wr('У documentElement нет элемента-родителя <br>');
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
	if (document.documentElement.parentNode == document) { // true т.к. это вершина дерева узлов
	  wr('<br>У documentElement родительский узел document');
	} ; 

		node1 = list1.previousSibling; // Ссылка на предыдущий узел (<p>)
		node1.insertAdjacentHTML("afterbegin"  ,"Предыдущий узел (previousSibling); ");
	
		node1 = list1.nextSibling; // Ссылка на следующий узел (тоже <p>)
		node1.insertAdjacentHTML("afterbegin"  ,"Следующий узел (nextSibling); ");
	
		node1 = list1.firstChild; // Ссылка на первый узел-потомок (<li>)
		node1.textContent += " Первый узел-потомок (firstChild);"; 	// Для текстовых узлов не работает 
																	// метод insertAdjacentHTML
		node1 = list1.lastChild; // Ссылка на последний узел-потомок (<li>)
		node1.textContent += " Последний узел-потомок (lastChild);";
	
		// Перебор дочерних узлов для list1
		for (var i=0; i < list1.childNodes.length; ++i)
			list1.childNodes[i].textContent += " # ";
	
	// Проверка, является ли узел потомком:  
	if (document.body.contains(node1)) wrn("node1 - потомок body")
	if (!document.head.contains(node1)) wr(" и не потомок head.")
  }

  { /* Работа с атрибутами HTML-элементов через свойства DOM-объектов 
	   https://learn.javascript.ru/dom-attributes-and-properties */
	wrn("<h3> Работа с атрибутами HTML-элементов через свойства DOM-объектов </h3>");

	// В свойстве tagName можно считать тег элемента. Это свойство только для чтения.
		wrn("Тег элемента: " + div3.tagName);

	// Для стандартных(!) HTML-атрибутов автоматически создаётся одноимённое DOM-свойство 
		wrn("ID второго параграфа: " + div3.children[1].id); // par2
		div3.children[1].id = "par2b";
		wrn("ID второго параграфа изменилось: " + div3.children[1].id); // par2b
	
	// Все атрибуты, в том числе и нестандартные, доступны через методы:
	
		// Установка нового атрибута;
		div3.setAttribute("id", "block-3");  
		wrn("ID блока: " + div3.id);  // block-3
		
		/* Для пользовательских атрибутов желательно использовать префикс data- 
		   В этом случае они доступны через коллекцию dataset: */
		div3.setAttribute("data-about", "Описание блока");  
		div3.dataset.about = "Описание №2";  //  Изменение свойства меняет и атрибут
		
		// Если в имени атрибута есть дефис, то в имени свойства он исчезает 
		// а следующиепосле дефиса слова начинается с заглавной буквы:
		div3.setAttribute("data-adress-city", "Москва");  // Имя свойства: adressCity
		wrn("Город: " + div3.dataset.adressCity);
		div3.dataset.adressStreet = "ул.Центральная";  // Имя атрибута: data-adress-street
		
		// Чтение атрибута
		wrn("В атрибуте data-about хранится: " + div3.getAttribute("data-about"));
		
		// Удаление атрибута
		div3.removeAttribute("data-about");
		
		// Проверка существования атрибута
		if (!div3.hasAttribute("data-about")) 
			wrn("Атрибут data-about не существует. ");
		
		wrn("Перебор всех атрибутов блока: ");
		for (var i=0; i < div3.attributes.length; ++i)  
			wrn("" + div3.attributes[i].name + " : " + div3.attributes[i].value);
  }
  
  { /* Модификация классов 
	   https://learn.javascript.ru/styles-and-classes */
	wr("<h3> Модификация классов </h3>");
	
	var div2 = document.createElement('div');  
    document.body.appendChild(div2);
		
	// Строка с именами классов хранится в свойстве className:
		div2.className = "Class1 Class2"; // Это свойство можно переприсваивать
		div2.innerHTML += "Текущие имена классов: " + div2.className;
		
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

  { /* Модификация инлайн-стилей*/
	wr("<h3> Модификация инлайн-стилей </h3>");

	var div3 = document.createElement('div');  
    document.body.appendChild(div3);
	div3.innerHTML = "Текст к которому применяются инлайн-стили.";
	
	// Все стилевые свойства содержатся внутри свойства-объекта style:
	div3.style.color = "blue";
	
	// Как и для всех атрибутов дефис меняется на прописную следующую букву:
	div3.style.backgroundColor = "lightgray";
	
	// Очистка свойства выполняется присвоением пустой строки:
	div3.style.color = "";
	
	// Комбинированные стили типа padding автоматически прописываются в padding-left и пр.
	wr("Левый отступ до изменения - пустой: " + div3.style.paddingLeft);
	div3.style.padding = "20px";
	wrn("Отступ слева после изменения: " + div3.style.paddingLeft);
	
	// Чтение вычисленных браузером стилей с помощью функции getComputedStyle()
	wrn("Цвет текста в инлайн-стиле пустой: " + div3.style.color);
	wrn("Цвет текста вычисленный браузером: " + getComputedStyle(div3).color);
	
	// Стереть все инлайн-стили и прописать несколько новых можно через свойство cssText:
	div3.style.cssText = "color: blue; background-color: #ffa;";
  }

  { /* Доступ к элементам через ID и CSS-селекторы
	   https://learn.javascript.ru/searching-elements-dom */
	wrn("<h3> Доступ к элементам через ID и классы </h3>");  

	wrn('<div><p class="c1">Текст 1</p>'); // Демонстрационный html-код
	wr('<p class="c1">Текст 2</p><p id="p3-id"class="c1">Текст 3</p></div>');  
	
	// Метод document.getElementById("идентификатор") даёт ссылку на элемент с указанным ID
		var p3 = document.getElementById("p3-id");  // Элемент с идентификатором "p3-id"
		p3.style.color = "red"; 
		wr('Текст параграфа c ID "p3-id" теперь красный.');
	
	// Метод .querySelectorAll("селектор") возвращает коллекцию элементов по CSS-селектору
		var textcollection = document.querySelectorAll(".c1"); // Все элементы с селектором ".c1"
	
		for (var i=0; i < textcollection.length; ++i)  
			textcollection[i].style.backgroundColor = "#afa";
		wr('<br>Все параграфы помечены салатовым фоном.');	
	
		// Поиск можно делать не по всему документу, а среди потомков конкретного элемента:
		var d = p3.parentNode; 
		textcollection = d.querySelectorAll(".c1"); // Поиск внутри блока, родительского для p3
	
	// Если нужен только первый элемент этой коллекции, то лучше использовать document.querySelector
		document.querySelector(".c1").style.fontStyle = "italic"; 
		wr('<br>В первом параграфе теперь наклонный текст.');	
	
	// .querySelectorAll() возвращает коллекцию, которая в дальнейшем не меняется с изменением DOM:
		var n = textcollection.length; // Количество параграфов с классом c1 в коллекции
		wr('<p class="c1">Новый параграф</p>'); // Добавили ещё один параграф .c1
		if (n == textcollection.length) wr("Коллекция не поменялась"); // true
	
	// Методы серии getElementsBy возвращают коллекции, которые меняются вместе с DOM:
		var cTag = document.getElementsByTagName('p'); // Элементы с указанным тегом
		var cClass = document.getElementsByClassName('c1'); // Элементы с указанным классом
		// Элементы с атрибутом name равным указанной строке
		var cName = document.getElementsByName('name1');
		
		// Запоминаем количество элементов в коллекции
		var nTag   = cTag.length;	
		var nClass = cClass.length;	
		var nName  = cName.length;	
	
		wrn('<p class="c1" name="name1">Новый параграф</p>'); // Добавили ещё параграф
	
		// Демонстрация того, что все три коллекции после добавления параграфа поменялись:
		if (nTag != cTag.length) 
			wr("Количество тегов p поменялось"); // true
		if (nClass != cClass.length) 
			wrn("Количество элементов .c1 поменялось"); // true
		if (nName != cName.length) 
			wrn("Появился элемент с именем name1"); // true
		
	// Проверка на соответствие элемента CSS-селектору методом .matches()
	if (!isOldBrowser()) // В некоторых старых браузерах метод имеет другое имя
		if (p3.matches(".c1")) wr('<br>Параграф 3 удовлетворяет селектору ".c1".');
	
	// Поиск ближайшего предка, удовлетворяющего CSS-селектору методом .closest()
	if (!isOldBrowser()) { // Метод не поддерживается в Opera Presto 
		p3.closest("div").style.border = "1px solid blue";
		wr('<br>Родительский блок, ближайший к параграфу 3, выделен синей границей.');	
		// Если исходный элемент удовлетворяет CSS-селектору, то возвращается он сам:
		p3.closest(".c1").style.border = "1px solid red";
		wrn('<br>Параграф 3 оказался "ближайшим" сам себе и выделен красной границей.');	
	}	
  }
  
  { /* Определение размеров и расположения элементов
	   https://learn.javascript.ru/size-and-scroll */
	wrn("<h3> Определение размеров и расположения элементов </h3>");
	var str = "Демонстрационный текст. ";
	for (var i=0;i<3;i++) {str = str + str;} // Продублируем демонстрационный текст несколько раз
	
	// Создадим демонстрационный DIV
	wrn('<div id="box1" style="width: 100px; height: 80px; border: 5px solid #ce8; ');
	wr('padding: 10px; overflow: auto;"> ' + str + ' </div>' );

	/* Метод .offsetParent возвращает  предка, относительно которого позиционируется элемент.
	   Если элемент скрыт или у него position:fixed , то offsetParent == null  */ 
		wrn("Предок, относительно которого позиционируется box1: " + box1.offsetParent.tagName);
	
	/* КООРДИНАТЫ */
	    // Координаты элемента относительно предка: (для скрытых элементов == 0)
			wrn("Смещение box1 по горизонтали и вертикали относительно предка: " + 
				 box1.offsetLeft + " / " + 
				 box1.offsetTop );
	
		// Координаты внутренней части документа относительно координат элемента:
			wrn("Ширина верхней и левой рамки блока box1: " + 
				 box1.clientTop + " / " + 
				 box1.clientLeft );
				 
		// Координаты элемента относительно окна 
			/* Метод getBoundingClientRect() элемента возвращает объект, в свойствах которого 
			   хранятся параметры минимального прямоугольника, в который вписан элемент */
			var rect = box1.getBoundingClientRect();
			wrn("Оконные координаты начала прямоугольника для box1 (X/Y): " + 
				 rect.x + " / " +     
				 rect.y );			
			wrn("Ширина и высота прямоугольника для box1: " + 
				 rect.width + " / " + 	// Если эти значения отрицательные, 
				 rect.height );			// то началом прямоугольника является правый нижний угол		
				 	
			wrn("Координаты левого верхнего и правого нижнего углов прямоугольника для box1: [" + 
				 rect.left   + " ; " + 	 rect.top    + "] / [" + 
				 rect.right  + " ; " + 	 rect.bottom + "]");	
		
		// Определение элемента по координатам ВНУТРИ окна методом document.elementFromPoint()
			wrn("По координатам [100;100] находится элемент: " + 
				 document.elementFromPoint(100, 100) ); // За пределами окна возвратит null

	/* РАЗМЕРЫ */
		// Размер элемента включая рамки: (для скрытых элементов == 0):
			wrn("Ширина и высота блока: " + 
				 box1.offsetWidth + "/" + 
				 box1.offsetHeight );
	
		// Размеры внутренней части элемента (включая padding и не включая ширину полосы прокрутки):
			wrn("Ширина и высота внутренней видимой части блока: " + 
			     box1.clientWidth + "/" + 
			     box1.clientHeight );
			wrn("Ширина окна без скролл-бара: " + document.documentElement.clientWidth);	
	
			wrn("Ширина и высота внутренней виртуальной части блока: " + 
				 box1.scrollWidth + "/" + 
				 box1.scrollHeight );
			wrn("Ширина всего документа: " + document.documentElement.scrollWidth);
		
		/* Высота документа не может быть однозначно определена через свойство .scrollHeight т.к.
		   некоторые браузеры обрабатывают это свойство неправильно. Поэтому нужно делать так: */
			var docHeight = Math.max(
				document.body.scrollHeight, document.documentElement.scrollHeight,
				document.body.offsetHeight, document.documentElement.offsetHeight,
				document.body.clientHeight, document.documentElement.clientHeight
			);
			wrn("Высота всего документа: " + docHeight);

  }
  
  { /* Прокрутка элементов и страниц */	
		// Размеры прокрученной части документа:
			wrn("Ширина и высота области, скрытой в результате прокрутки: " + 
				 box1.scrollLeft + "/" + 
				 box1.scrollTop );

		// Свойства scrollTop и scrollLeft можно менять
			box1.scrollTop += 30; 		// Сделать прокрутку вниз на 30 пикселей	
			box1.scrollTop = 0;   		// Прокрутить до конца вверх	
			box1.scrollTop = Infinity;  // Прокрутить до конца вниз	
		
		// Установка новых координат прокрутки для элемента 
		if (!isOldBrowser()) {    // Эти методы не работают в Opera Presto
			box1.scrollTo(30,30); // Пиксель с координатами {30,30} теперь в левом верхнем углу
			box1.scroll(30,30);   // Синоним метода scrollTo()
			
			// То же самое можно сделать с помощью установки свойств метода-объекта scrollTo()
			box1.scrollTo({
				top: 50,
				left: 10,
				behavior: 'smooth'  // Параметром behavior='smooth' можно задать плавную прокрутку
			});
			box1.scrollBy(0,20);
		}
		
		// Запрет прокрутки
			box1.style.overflow = 'hidden';    // Запретить прокрутку элемента
			box1.style.overflow = 'auto';      // Разрешить прокрутку элемента
			document.body.style.overflow = 'hidden'; // Запретить прокрутку всей страницы
			document.body.style.overflow = ''; // Для страницы значение по умолчанию - пустое

		/* Методы прокрутки всей страницы */

			// Для чтения значений прокрутки всего документа лучше использовать такие свойства:
			wrn('Документ прокручен вниз и вправо на ' + 
				window.pageYOffset + "/" +
				window.pageXOffset + " пикселей.");
		
			// Прокрутка страницы относительно текущего положения (работает во всех браузерах):
			window.scrollBy(0,20);  // Прокрутить на 0px вправо и на 20px вниз
			window.scrollTo(30,30); // Пиксель с координатами {30,30} теперь в левом верхнем углу
			window.scroll(30,30);
			
			box1.scrollIntoView();      // Прокрутить страницу, чтобы box1 оказался вверху
			box1.scrollIntoView(false); // Прокрутить страницу, чтобы box1 оказался внизу
  }

  { 
	  
  }
}

