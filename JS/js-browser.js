/* В этом файле преставлен код, демонcтрирующий и описывающий основы работы с документом в браузере 
   с помощью JavaScript в стандарте EcmaScript 5. Запускается этот код на странице js-begin.html, 
   а весь вывод результатов своей работы осуществляет прямо в браузере на эту же страницу. 
   
    Откройте этот скрипт в Notepad++ чтобы свернуть блоки в удобное меню простой комбинацией клавиш:
	(Alt + 2)          - свернуть 
    (Alt + Shift + 0)  - развернуть.
    
	То же самое можно сделать в Visual Studio Code:
	(Ctrl + K) + (Ctrl + 2) - свернуть, 
    (Ctrl + K) + (Ctrl + J) - развернуть      */
    
"use strict"; 
function isOldBrowser() { // Функция проверки поддержки браузером некоторых новых методов
    if (typeof(document.body.prepend)=="function") return false; 
        else return true;
    }
	
function wr(s) { document.write(s); } // Компактная замена методу document.write()
function wrn(s) { wr("<br>" + s); }   // То же самое, но с новой строки
	
{/* МОДИФИКАЦИЯ ДОКУМЕНТА В БРАУЗЕРЕ */
  // https://learn.javascript.ru/modifying-document 
  
  { /* Создание и клонирование узлов (вне DOM) */
    
    // Создание текстового узла с помощью метода createTextNode объекта document:
		var txt1 = document.createTextNode('Тут HTML-разметка <b>не работает</b>.'); 
    
    // Создание HTML-элемента с помощью метода createTextNode:
		var div1 = document.createElement('div');  
    
    // Изменение содержимого у элемента:
		div1.textContent = "Тут HTML-разметка <b>не работает</b>."; // Безопасная вставка строк
		div1.innerHTML = "Тут HTML-разметка <b>работает</b>.<br><hr>"; // Вставка HTML
		// document.body.innerHTML = ""; // Так можно очистить всё содержимое элемента <body> 
		// div1.className = "DemоClass"; // Изменение класса элемента
    
    // Клонирование элемента
        // var div1c = div1.cloneNode(false); // Клонирование без дочерних элементов
        var div1c = div1.cloneNode(true);  // Глубокое клонирование
        div1c.innerHTML = "Клонированный элемент."
  }
  
  { /* Добавление и удаление узлов DOM */
	wr("<h2> Модификация документа </h2>");
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
	
	//Создадим демонстрационный html-код с парой параграфов и списком:
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
		
		// Определение наиболее глубоковложенного видимого элемента по координатам ВНУТРИ окна:
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

  {	/* Работа с формами
		https://learn.javascript.ru/form-elements */ 
		wr('<h3>Работа с формами </h3> <div id="forminfo"></div><br>');
		wr('<form name="adressform"> Страна: <input name="incountry" value="Россия">');
		wr('<fieldset name="cityinfo"> Нас.пункт: <input name="incity" value="Москва"> <br> Тип: ');
		wr('<br><input type="radio" name="citytype" value="Город" checked="true"> Город ');
		wr('<br><input type="radio" name="citytype" value="Посёлок"> Посёлок');
		wr('<br><input type="radio" name="citytype" value="Село"> Село ');
		wr('<br><select name="citytype2"> <option value="Город"> Город </option>');
		wr('<option value="Посёлок"> Посёлок </option>');
		wr('<option value="Село"> Село </option> </select> </fieldset> ');
		wr('Виды пассажирских станций: <br> <select name="stationtype" multiple>');
		wr('<option value="aero"> Аэропорт </option>');
		wr('<option value="rail"> Ж/Д вокзал </option>');
		wr('<option value="bus"> Автовокзал </option> </select> </form>');
		
		/* Доступ к элементам формы */
		
			//Формы документа хранятся в коллекции объектов document.forms:
			var form1 = document.forms[0];	   // Первая форма на странице
			form1 = document.forms.adressform; // Также форму можно получить атрибуту name
		
			// Все элементы формы в линейном (а не древовидном) виде хранятся в коллекции elements:
				forminfo.innerHTML = "Название страны: " + form1.elements.incountry.value;
				/* При этом ссылка на каждый элемент автоматически копируется в одноимённое свойство 
				   самого объекта формы. Что означает что можно опускать название коллекции elements 
			       при обращении к элементу */
				forminfo.innerHTML += "<br> Название нас.пункта: " + form1.incity.value;
				// При переименовании элементов ссылки остаются доступными и по прежним именам
				form1.elements.incity.name = "intown";  // Меняем имя
				if (form1.incity == form1.intown) {
					forminfo.innerHTML += " (Старая и новая ссылка на элемент работают одинаково.)";
				}
			
			// Элементы с одинаковыми именами (тут имя citytype) объединяются в коллекцию:
				forminfo.innerHTML += "<br> Тип нас.пункта: " + form1.elements.citytype[0].value;
			
			// У каждого элемента формы есть свойство .form хранящее ссылку на родительскую форму:
				var childElem = form1.elements.citytype[1];						
				forminfo.innerHTML += "<br> Родительская форма для кнопки: " + childElem.form.name;
			
			// Дочерние элементы fieldset дублируются в коллекции elements для fieldset-элемента:
				if (form1.elements.cityinfo.elements.intown == form1.elements.intown) {
					forminfo.innerHTML += "<br> Ссылка из fieldset равна ссылке из формы.";
				}
			
			// Для элемена select можно задать выбранную опцию тремя способами:
				form1.citytype2.options[1].selected = true; // Задав для опции свойство selected
				form1.citytype2.selectedIndex = 1;			// Указав индекс нужной опции
				form1.citytype2.value = "Посёлок";			// Указав значение нужной опции
			
				// Если select-элемент множественный, то возможен только первый вариант:
				form1.stationtype.options[2].selected = true; 
				
				// Свойства index и text указывают порядковый номер и видимое содержимое опции
				var op = form1.stationtype.options[1];
				forminfo.innerHTML += "<br> Текст опции с индексом " + op.index + ": " + op.text;
				
				// Создать опцию можно вызовом new Option(text, value, defaultSelected, selected)
				form1.stationtype.options[3] = new Option("Таксопарк", "taxi");
				// 3-й аргумент задаёт HTML-атрибут defaultSelected. 4-й: свойство selected
				form1.stationtype.options[4] = new Option("Кареты", "horse", true, true);
  }

}

{ /* ОБРАБОТКА СОБЫТИЙ */

  { /* Простая обработка событий на примере события клика мыши на кнопке */
	wr("<h2> Основы обработки событий </h2>");
	
	// Самый примитивный способ - прописать тело анонимной функции в атрибут onclick прямо в HTML:
		wr('<input type="button" id="button1" value="Нажми меня" onclick="alert()">');
		wrn('<div id="b1info">Описание кнопки</div>');
	
	// Но лучше управлять атрибутом onclick через JS
		var onclickDemo = function () {
			button1.onclick = null; // Удаление обработчика события
			button1.onclick = function() { // Установка обработчика
				alert('Сработал код №2'); 
				// При таком способе this указывает на элемент, на котором произошло событие:
		        alert(this.value); // Выведется button1.value
			} 
			// (Установка атрибута альтернативным способом, через setAttribute(), не сработает)
			
			/* Если у фукнции обработчика объявить аргумент, то он станет объектом, хранящим 
			   параметры события. В новых браузерах даже если аргумент не объявлен, параметры 
			   хранятся в локальной переменной event. 
			   В Firefox legacy 52 без объявления выдаст ошибку - поэтому лучше объявить */
			button1.onclick = function(event) { 
				b1info.innerHTML = "Координаты клика: " + event.clientX + " / " + 
					                                      event.clientY +
				         ". Сработало событие с типом " + event.type +
						         	   " для элемента " + event.currentTarget;
			}		
		}
		// Чтобы элемент button1 успел появиться в DOM, запускаем функцию после объявления:
		onclickDemo();
	
	// Назначить несколько обработчиков на одно событие можно методом addEventListener()
	var eventListenerDemo = function() { 
		var alert4 = function() { alert('Сработал код №4'); }
		button1.addEventListener("click", alert4); // Добавление обработчика alert4 на событие click
		button1.removeEventListener("click", alert4); // Удаление функции alert4 из обработчика 
		
		/* Вместо функции-обработчика в addEventListener можно передавать объект. 
		   Тогда обработчиком будет выступать метод handleEvent() этого объекта: */
		
		var handleObj = {
			handleEvent: function(event) { 
				if (event.clientX % 2 == 0) this.oddAlert(); 
				else this.evenAlert();},
			// В объекте можно разнести код по разным методам:	
			evenAlert: function() { button1.value = "X-координата клика - нечётное число"; },
			oddAlert:  function() { button1.value = "X-координата клика - чётное число"; }
		}
		
		button1.addEventListener("click", handleObj); // Добавление обработчика-объекта
	}
	eventListenerDemo();
  }	
	
  { /* Погружение и всплытие событий в дереве элементов 
	   https://learn.javascript.ru/bubbling-and-capturing */
		wr('<div id="bubledemo" style="background-color:#f99;"><p>Нажми <em>меня</em> </p></div>'); 
		wr('<div id="bubleinfo">Описание событий блока bubledemo</div>');	
		
	/* При нажатии на вложенный элемент происходит вызов обработчиков этого события 
	   поочерёдно во всех предках - вплоть до window. Поэтому клик на параграф 
	   или элемент <em> приводит к вызову onclick-функции у родительского div */
	
		bubledemo.onclick = function(eventObj) {
			bubleinfo.innerHTML = "Кликнут элемент " + eventObj.target.tagName + 
				" а событие обработано на родителе " + eventObj.currentTarget.tagName;
		}
	
	/* По умолчанию события обрабатывают на этапе всплытия от элемента target до предка window.
	   Но перед всплытием аналогичным образом браузер производит фазу погружения (захвата) 
	   от window до target. Обработать событие на этом этапе можно задав третий аргумент 
	   capture:true при вызове метода addEventListener. */
	
		var bubledownFunc = function() { bubledemo.style.backgroundColor="#9f9"; }
		bubledemo.addEventListener("click", bubledownFunc, {capture: true});
	
	/* Можно то же самое сделать более коротко - просто третьим параметром передать true -
	   это стандарт древних браузеров, который из соображений совместимости остался */
		bubledemo.addEventListener("click", bubledownFunc, true);
	
	// Для удаления этого обработчика нужно в removeEventListener также указать capture:true
		bubledemo.removeEventListener("click", bubledownFunc, true);
	
	/* Существует возможность запретить всплытие события. Для этого в функции-обработчике можно 
	   использовать такие методы: */
	   
	    var bublestopFunc = function() { 
			event.stopPropagation; // Прекратить дальнейшее всплытие события
			event.stopImmediatePropagation; // Прекратить не только всплытие,  
		}									   // но и его обработку на текущем элементе 
		
	// Если задать параметр once:true , то обработчик удалится после первого выполнения:
		if (!isOldBrowser()) { 	// Не работает в некоторых старых браузерах
			var onceFunc = function() { alert('Выполнено одноразовое действие'); }
			bubledemo.addEventListener("click", onceFunc , {once: true});
		}
  }
					
  { /* Отмена стандартного действия браузера для события
	  производится методом event.preventDefault() 
	  https://learn.javascript.ru/default-browser-action   */
			wrn('<a href="/" onclick="event.preventDefault()">Эта ссылка не работает</a>');
		
		/* При назначении обработчика с помощью атрибута(!) можно запретить стандартное действие 
		   просто вернув false из функции. */
			wrn('<a href="/" onclick="return false">Эта ссылка тоже не работает</a> <br>');
		
		/* И наоборот, в целях повышения производительности можно сообщить браузеру, 
		   что стандартное действие отменяться не будет, задав параметр passive:true */
			bubledemo.addEventListener("click", bubledownFunc, {passive: true});	
			
		/* Если свойство event.defaultPrevented == true , значит сработал обработчик, в котором
           было предотвращено стандартное действие браузера. 
		   Это свойство удобно использовать для умной замены метода event.stopPropagation */
		    var preventCheckFunc = function(event) { 
				if (event.defaultPrevented == true) { alert ("Обработчик сработал") }
			}
  }
	
  { /* Создание пользовательских событий 
	   https://learn.javascript.ru/dispatch-events */
		wr('<h3>Создание пользовательских событий</h3>');
		wr('<input type="button" id="button2" value="Кнопка 2">');
		wrn('<div id="b2info">Описание кнопки 2</div>');

			button2.onclick = function() { b2info.innerHTML += "Нажата кнопка 2<br>"; }

		// Стандартные события можно создавать с помощью специального встроенного конструктора Event
			var userEvent1 = new Event("click"); 		
			button2.dispatchEvent(userEvent1); // Метод dispatchEvent вызывает событие для элемента
			
		// Создадим обработчик события для выдуманного события myEvent и повесим на document
			document.addEventListener("myEvent", function(event) { 
				b2info.innerHTML += "Сработало событие myEvent на элементе " + event.target.tagName;
			});
		
		// Тем же конструктором Event можно создать любое другое, в т.ч. пользовательское событие
			var userEvent1 = new Event("myEvent", {bubbles: true}); // bubbles задаёт всплывание
			button2.dispatchEvent(userEvent1); // Вызываем событие
			
		/* Но лучше для разных событий использовать специализированные конструкторы
		   Конструктор customEvent предусматривает стандартное свойство detail, через которое можно 
		   передавать полезную информацию */
			var userEvent2 = new CustomEvent("signal", {detail: "Важная информация!"});
			button2.addEventListener("signal", function(event) { 
				b2info.innerHTML += "<br>Получен сигнал: " + event.detail;
			});
			button2.dispatchEvent(userEvent2);

		// Для пользовательских событий тоже можно отменять действия по умолчанию. 
			button2.addEventListener("myEvent2", function(event) { 
				if (Math.random() > 0.5) event.preventDefault(); // Отменяем случайным образом
			});
			
			b2info.innerHTML += "<br>Действие по умолчанию или выполняется (+) или нет (-): <br>";
			/* Для конкретного объекта-события preventDefault срабатывает раз и навсегда
			   поэтому нужно каждый раз на лету создавать новый объект-событие */
			for (var i=1; i<100; i++) { // При этом важно установить флаг cancelable:true 
				if (button2.dispatchEvent(new CustomEvent("myEvent2", 
					                      {cancelable: true, once: true} ))) {
					     b2info.innerHTML += "+";
				} else { b2info.innerHTML += "-"; // dispatchEvent возвращает false, если 
				}                                 // в обработчике события сработал preventDefault
			}
  }

  { /* События мыши */
	// https://learn.javascript.ru/mousemove-mouseover-mouseout-mouseenter-mouseleave
	
	wr("<h3> Клики и движения мыши над элементом </h3>");
	
	wr('<div id="mbox1" style="width: 210px; height: 210px; float:left;');
	wr('     border: 2px solid #ce8;  padding: 20px; ">  ' );
	wr('<div id="mbox2" style="width: 200px; height: 200px;');
	wr('     border: 2px solid #8ec;  "> Тут можно кликать мышью. </div> </div>' );
	wr('<div id="mouseinfo" style="float:left; margin-left:20px; "></div>');

	
	// При обработке событий мыши у каждого из событий есть такие свойства:
		var mousemsg = function(event) { 
			mouseinfo.innerHTML += "Событие " + event.type      +    // Название события
								 ". Элемент " + event.target.id +    // Элемент на кот-м произошло
				   ((event.type=="mouseover" || event.type=="mouseout")  ? 
						// Элемент с которого или на который ушёл курсор (может быть null):
					   ". Связанный элемент " + event.relatedTarget.id : "")  +    
								". X/Y окна " + event.clientX   + "/" + event.clientY +
						   ". X/Y документа " + event.pageX     + "/" + event.pageY +
						     ". Кнопка мыши " + event.which     +    // 1 - левая,  3 - правая
			// Следующие свойства равны true, если была зажата соответсвующая клавиша клавиатуры:
						    ((event.shiftKey) ? " + Shift" : "") +   
						    ((event.altKey)   ? " + Alt"   : "") +
						    ((event.ctrlKey)  ? " + Ctrl"  : "") +
						    ((event.metaKey)  ? " + Cmd"   : "") + "<br>"; // Для Apple Mac
		} 

	// Для мыши доступны следующие события:
		if (!isOldBrowser()) {
			mbox1.addEventListener("mousemove", mousemsg, {once: true}); // Движение мыши
		}
		mbox1.addEventListener("mousedown"   , mousemsg); // Нажата кнопка мыши
		mbox1.addEventListener("mouseup"     , mousemsg); // Отжата кнопка мыши
		mbox1.addEventListener("click"       , mousemsg); // Кнопка нажата и отжата на элементе
		mbox1.addEventListener("dblclick"    , mousemsg); // Двойной клик на элементе
		mbox1.addEventListener("contextmenu" , mousemsg); // Вызвано контекстное меню
			// Всплывающие переходы между любыми элементами
		mbox1.addEventListener("mouseover"   , mousemsg, {once: true}); // Стрелка зашла на эл-т
		mbox1.addEventListener("mouseout"    , mousemsg, {once: true}); // Стрелка вышла с эл-та
			// Невсплывающие переходы с элемента или на элемент, не являющийся потомком:
		mbox1.addEventListener("mouseenter"   , mousemsg, {once: true}); // Стрелка зашла
		mbox1.addEventListener("mouseleave"   , mousemsg, {once: true}); // Стрелка вышла
		
		// Популярные способы защиты документа:
			mbox1.oncopy = function () { // Событие попытки копирования текста в буфер
				alert("Копирование текста заблокировано!"); 
				return false;  // Запрет копирования текста в буфер (действия по умолчанию)
			}
			// Запрет выделения текста (события по умолчанию для mousedown):
			mbox1.onmousedown = function () { return false; }
  }
  
  { /* События клавиатуры
		https://learn.javascript.ru/keyboard-events */
		wr('<br style="clear:both;"> <h3>Нажатия на клавиатуру </h3> <div id="kbinfo"></div>');
		wr('<input type="text" placeholder="Редактируйте меня" id="kbinput">');

		var kbmsg = function(event) { 
			kbinfo.innerHTML += "Событие " + event.type +    // Название события
					         ". Клавиша: " + event.key  +    
			// Следующие свойства равны true, если была зажата дополнительная клавиша:
						    ((event.shiftKey) ? " + Shift" : "") +   
						    ((event.altKey)   ? " + Alt"   : "") +
						    ((event.ctrlKey)  ? " + Ctrl"  : "") +
						    ((event.metaKey)  ? " + Cmd"   : "") +  // Для Apple Mac
						    ((event.repeat)   ? " + (повтор нажатия)"   : "") +
				  (!isOldBrowser() ? ". Код клавиши: " + event.code : "" ) + "<br>";
		} 

		kbinput.addEventListener("keydown" , kbmsg); // Нажата клавиша
		kbinput.addEventListener("keyup"   , kbmsg); // Отжата клавиша
  }
	  
  {	/* События прокрутки и редактирования элементов */
		
		wr('<h3>События прокрутки и редактирования элементов </h3> <div id="scrollinfo"></div>');
		// https://learn.javascript.ru/onscroll 

		window.addEventListener('scroll', function() {
			scrollinfo.innerHTML = "Страница прокручена на " + pageYOffset + 'px';
		});
  
		/* События фокуса на элементе 
			https://learn.javascript.ru/focus-blur  */
			wr('<br style="clear:both;"> <div id="focusinfo"></div>');
			wr('<input type="text" placeholder="Редактируйте меня" id="focusinput">');
		
			var focusmsg = function(event) { 
				focusinfo.innerHTML += "Событие " + event.type + 
								" на элементе "+ event.target.id + "<br>"; 
			} 		
		
			// События focus и blur:
				focusinput.addEventListener("focus", focusmsg); // Событие фокусировки на элементе
				focusinput.addEventListener("blur" , focusmsg); // Событие расфокусировки.	
			/* События focus и blur погружаются, но не всплывают. 
				Аналогичные события focusin и focusout срабатывают и на стадии всплытия */
	
			// Можно фокусироваться на элементе с помощью JS:
				focusinput.focus(); // Установить фокус на элемент focusinput
				focusinput.blur();  // Убрать фокус с элемента
				
			/* Наличие HTML-атрибута tabindex даёт возможность фокусироваться на DIV и пр.элементах
			Числовое значение tabindex задаёт приоритет при переключении с помощью клавиши TAB.
			В приоритете значение 1, потом 2 и т.д. Значение 0 - самый низкий приоритет.
			Значение -1 позволяет фокусироваться мышью и программно, но игнорирует нажатие TAB. */
				focusinfo.setAttribute("tabindex", "0"); 
				focusinfo.addEventListener("focus", focusmsg); 
 
		/* События редактирования элемента 
			https://learn.javascript.ru/events-change-input */
				
			// Событие change срабатывает при завершении редактирования элемента
				focusinput.addEventListener("change", focusmsg); 
				
			// Событие input срабатывает при каждом изменении в процессе редактирования элемента
				focusinput.addEventListener("input", focusmsg); 
			
			// События срабатывания буфера обмена
				focusinput.addEventListener("cut", focusmsg); 
				focusinput.addEventListener("copy", focusmsg); 
				focusinput.addEventListener("paste", focusmsg); 
  }

  {	/* Слежение за изменениями узлов 
	   https://learn.javascript.ru/mutation-observer*/
	if (!isOldBrowser()) {    // Эти методы не работают в Opera Presto
		wr('<h3>Слежение за изменениями узлов</h3> <div id="changeinfo"></div>');
		wr('<div contentEditable id="mutabletext">Этот текст можно менять!</div>');
		var changeSignal = function() {	changeinfo.innerHTML += "Узел изменился.<br>"; }
	
	// Объекты MutationObserver вызывают функцию при обнаружении изменений указанных узлов:
		var observer1 = new MutationObserver(changeSignal); // Создание нового наблюдателя
		// Указываем наблюдателю observer1 следить за узлом, указанным в первом аргументе:
		observer1.observe(mutabletext, { // Второй аргумент - объект с параметрами где следить:
			childList : true, 		// в детях
			subtree: true,    		// в потомках
			characterData : true, 	// в текстовом содержимом
			atributes: true,  		// в атрибутах
			attributeFilter : [],   // Массив с именами отслеживаемых атрибутов
			// В callback-функцию возвращается список объектов MutationRecord в которых хранится 
			// информация об изменениях. Помимо новой информации можно возвращать и старые значения:
			characterDataOldValue: true,  // Возврат старого значения для текстовых данных
			attributeOldValue: true		  // Возврат старого значения для атрибута
		}); 
		if (0) {
			observer1.disconnect(); // Остановить отслеживание
			// Получить список изменений, для которых ещё не выполнилась callback-функция:
			var mutationRecords = observer1.takeRecords(); 
		}
	}
  }

  { /* События загрузки страницы и элементов 
		https://learn.javascript.ru/onload-ondomcontentloaded */

	  	wr('<h3>События загрузки страницы и элементов</h3> <div id="onloadinfo"></div>');
		
		document.addEventListener("DOMContentLoaded", function() {
			onloadinfo.innerHTML += "Дерево элементов загружено.<br>"
			                      + "Текущее состояние документа: " + document.readyState + "<br>";
		}); 

		window.onload = function() {
			onloadinfo.innerHTML += "Всё содержимое страницы загружено.<br>"
								  + "Текущее состояние документа: " + document.readyState + "<br>";
		};

		window.onunload = function() {
			onloadinfo.innerHTML += "Страница закрыта.<br>";
		};
		
		// Предупреждение перед закрытием страницы (не работает в Opera Presto):
		window.onbeforeunload = function() { return false; };  // Включить предупреждение
		window.onbeforeunload = function() {};   // Возврат к нормальному поведению
		
		if(0){
		// Если вставить в документ элемент <script> то он автоматически выполнится в режиме async
		wr('<script src="notexist.js" id="wrongscript"></script>');
		
		// При окончании загрузки скриптов, картинок и фреймов срабатывает событие load:
		wrongscript.onload = function() { onloadinfo.innerHTML += "Скрипт успешно загружен.<br>";};
		
		// При ошибке загрузки - событие error (не работает в Opera Presto):
		wrongscript.onerror = function() { onloadinfo.innerHTML += "Ошибка загрузки скрипта.<br>";};
		}
		
  }

  { /* Событие отправки формы 
		https://learn.javascript.ru/forms-submit */

	  		wr('<h3>Событие отправки формы </h3> <div id="submitinfo"></div>');
			wr('<form id="submitform"> <input type="text" value="Тут нужно нажать Enter"><br>');
			wr('<input id="submitbutton" type="submit" value="Отправить"></form>');
			wr('<form id="codeform" action = "https://ya.ru" method="GET"> </form>');
			wr('Ведите код 1234: <input id="codeinput" type="text">');
			
			var submitmsg = function(event) { 
				submitinfo.innerHTML += "Событие " + event.type + 
								    " на элементе "+ event.target.id + "<br>"; 
				if (event.type == "submit") {
					event.preventDefault(); // Предотвращаем отправку формы на сервер
				}
			} 				

		var submitPlan = function() { 
		// Событие submit срабатывает при попытке отправки формы:
			submitform.addEventListener("submit", submitmsg); 
		
		// Событие клика генерируется даже если вместо клика в форме была нажата клавиша Enter:
			submitform.addEventListener("click", submitmsg); 

		// Метод .submit отправляет форму программно
			codeinput.oninput = function () {
				if (codeinput.value == "1234") {
					codeform.submit();  // Программная отправка формы в случае правильного кода
		}}}
       setTimeout(submitPlan, 2000);
			
		
  }

  { /* ---2do--- Обработка выделения элементов и текста 
       https://learn.javascript.ru/selection-range  */
  }

  { /* ---2do--- Работа с окнами и фреймами 
       https://learn.javascript.ru/frames-and-windows  */
  }

  {  
	  
  }
}

