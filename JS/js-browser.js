"use strict"; 
//var legacy=false;  
function isLegacyBrowser() { // Функция проверки совместимости браузера с новыми методами
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
    div1.className = "DemоClass"; // Добавление класса к элементу
    
    // Клонирование элемента
        // var div1c = div1.cloneNode(false); // Клонирование без дочерних элементов
        var div1c = div1.cloneNode(true);  // Глубокое клонирование
        div1c.innerHTML = "Клонированный элемент."
        div1c.className = "DemоClassClone";
  }
  
  { /* Добавление узлов в DOM */
	
	//	Метод appendChild добавляет в DOM узел, как последний дочерний:
        document.body.appendChild(div1); // Можно добавлять как HTML-элементы
        document.body.appendChild(txt1); //   так и текстовые узлы
        // При помещении элемента в новое место из старого он исчезает:
        document.body.appendChild(div1); // Элемент div теперь стал вторым, а не первым
        document.body.appendChild(div1c);
    
    // Добавление элемента в DOM перед или после указанного другого элемента
        // Добавление в DOM текстовой строки:
        var p1 = document.createElement('p');  
        p1.innerHTML = "<b>Середина</b>";
        document.body.appendChild(p1); 
	
		if (!isLegacyBrowser()) // Эти методы не работают в старых браузерах
		{	// Добавляем к элементу p1 тест:
			p1.before("Введение (<b>HTML не работает</b>).");  // Перед начальным тегом элемента
			p1.prepend("Начало ");   // После начального тега элемента
			p1.append (" Конец");    // Перед закрывающим тегом
			p1.after  ("Послесловие"); // После закрывающего тега
			
			// Альтернативный метод вставки текста
			p1.insertAdjacentText("beforebegin"," * ");
			p1.insertAdjacentText("afterbegin" ," * ");
			p1.insertAdjacentText("beforeend"  ," * ");
			p1.insertAdjacentText("afterend"   ," * ");
			
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
    
	// Методы вставки, работающие в старых браузерах:
	
		// Добавление в DOM произвольного HTML-кода
        p1.insertAdjacentHTML("beforebegin","<HR><b> Введение </b>");
        p1.insertAdjacentHTML("afterbegin" ,"<b> Начало </b>");
        p1.insertAdjacentHTML("beforeend"  ,"<b> Конец </b>");
        p1.insertAdjacentHTML("afterend"   ,"<b> Послесловие </b><HR>");
  	
		// Устаревший, но надёжный метод вставки insertBefore имеет два аргумента:
		// вставляемый элемент и элемент перед которым нужно произвести вставку
        var div3 = document.createElement('div');  
        div3.innerHTML = "<p>Параграф 1</p><p>Параграф 2</p><p>Параграф 3</p><HR>";
        document.body.appendChild(div3);
		var span3 = document.createElement('span'); 
		span3.innerHTML = "Legacy-код";
		
		div3.insertBefore(span3,div3.children[2]); // Вставка перед третьим параграфом
  }  
  
  { /* Удаление узлов */

		// Удаляем параграф 2:
		if (legacy) { 
			div3.removeChild(div3.children[1]); // Старым но надёжным методом (для Opera Presto)
		} else {
		    div3.children[1].remove(); // То же самое современным методом
		}
  }
        
    // Изменение элементов

}