"use strict"; 
/* В этом файле преставлен код, демонcтрирующий особенности языка Javascript, появивишиеся 
   в новом стандарте EcmaScript 6. Запускается этот код на странице js-begin-ES6.html, 
   а весь вывод результатов своей работы осуществляет в консоль браузера. 
   
    Откройте этот скрипт в Notepad++ чтобы свернуть блоки в удобное меню простой комбинацией клавиш:
    (Alt + 2)          - свернуть 
    (Alt + Shift + 0)  - развернуть.
    
    То же самое можно сделать в Visual Studio Code:
    (Ctrl + K) + (Ctrl + 2) - свернуть, 
    (Ctrl + K) + (Ctrl + J) - развернуть      */
  
                 
{/* ХРАНЕНИЕ И ОБРАБОТКА ДАННЫХ В ОПЕРАТИВНОЙ ПАМЯТИ. */

  {/* РАБОТА С ПЕРЕМЕННЫМИ LET И CONST
          https://learn.javascript.ru/variables
    */
  console.groupCollapsed("Хранение и обработка данных в оперативной памяти");  
  console.groupCollapsed("Переменные"); 

    // НОВЫЕ ПРАВИЛА ОБЪЯВЛЕНИЯ И ИСПОЛЬЗОВАНИЯ ПЕРЕМЕННЫХ //
    
      let str1; /* В стандарте ES6 переменные объявляются с помощью ключевого слова let, которое
        пришло на смену ключевому слову var. В целом использование let практически не отличается 
        от var, за исключением нескольких важных отличий: */
      
      /* Область видимости let-переменной ограничивается не только телом функции (как у var), но
         и любыми блоками кода, обрамлёнными фигурными скобками. 
         Кроме того, если в одной области видимости может быть сколько угодно var-объявлений 
         (у них все слова var кроме первого будут проигнорированы), то let-объявление требует 
         полного отсутствия любых других объявлений переменной с этим же именем в текущем уровне 
         видимости (иначе будет ошибка):
      */
      str1 = "Внешнее значение";
      var globalStr1 = "Глобальное значение";
      { let str1 = "Внутреннее значение"; /* Повторное объявление переменной возможно только 
          внутри дочернего блока или дочерней функции (в этом случае создаётся новая локальная 
          переменная, невидимая за пределами дочернего блока). */
        let str2 = "Новая локальная переменная"; // Эта переменная видна только внутри блока
        var globalStr2 = "Новая глобальная перменная";  // А эта видна для всего скрипта
        console.log({str1}); // "Значение в дочернем блоке"
      }         
      console.log({str1}); // "Значение в родительском блоке"

      /* При этом в дочерних блоках переменная родительского блока видна и доступна только если 
         в дочернем блоке нигде не объявлена одноимённая локальная переменная 
      */
        { console.log({str1}); // "Значение в родительском блоке"
            str1="Новое значение"
        } 
        console.log({str1}); // "Новое значение"
      
      /* Использование необъявленной переменной вне области её видимости вызывает ошибку. 
         В данном случае ошибки нет, поскольку переменная объявлена позже (тремя строками ниже): 
      */
        console.log({str2}); // undefined
        str2 = "Новое значение"; 
        console.log({str2}); // "Новое значение"
        var str2; /* Такое объявление переменной после её использования работает, но только со
            словом var - благодаря "всплытию" var-объявлений. Для let и const это не работает. */
    
    // НАСТОЯЩИЕ КОНСТАНТЫ //
    
      /* С помощью ключевого слова const можно объявлять константы. Оно полностью идентично let 
         за исключением того, что попытка изменения значения такой константы выдаст ошибку.
      */
          const number_PI = 3.14; 
          
      /* Стоит отметить, что запрет на изменение касается значения, хранящегося непосредственно
         в константе. Но если в константе хранится ссылка на что-то (например на объект), то хотя
         саму эту ссылку изменить не получится, но тем не менее можно изменить объект по ссылке:
      */
          const obj = { color: "синий" }
          obj.color = "красный";
          console.log("Цвет объекта стал " + obj.color); // "красный"
      
      /* N.B. Идентификаторы, объявленные через let и const, хранятся только в 
         [[LexicalEnvironment]] текущего контекста вызова. Их нет в [[VariableEnvironment]].
         Поэтому (в отличие от ES5) в ES6 [[LE]] чаще всего не идентично [[VE]]. */
  console.groupEnd("Переменные");
  } 

  {/* СТРОКИ В ОБРАТНЫХ КАВЫЧКАХ (ШАБЛОННЫЕ ЛИТЕРАЛЫ)
          https://learn.javascript.ru/string#kavychki
    */
  console.groupCollapsed("Строки в обратных кавычках (шаблонные литералы)");
    
    /* Новый дополнительный формат записи строк использует обратные кавычки вместо обычных.
       Это позволяет помещать в строку многострочный текст, не прибегая к спецсимволам.
       Такой формат задания строки называется шаблонным литералом или шаблонной строкой: 
    */
    let str = `Первая строка
               Вторая строка`;  // Пробелы после переноса строки тоже сохранятся в переменной
    console.log({str});
    
    // ПОДСТАНОВКИ ВЫРАЖЕНИЙ //
    
      /* В литерале можно делать подстановки JS-кода. Для этого используется синтаксическая 
         конструкция ${} внутри фигурных скобо помещается код, результат которого преобразуется 
         в строку и автоматически конкатенируется с другими частями литерала 
      */
     str = `Дважды два равно ${2*2}`; // "Дважды два равно 4"
     console.log(str);
    
      // Крайне удобно подставлять в шаблонный литерал имена переменных:
      let x=3, y=4;
      str = `Площадь прямоугольника размером ${x} на ${y} равна ${x*y}`;
      console.log(str); 
      
      // Подстановки можно вкладывать друг в друга
      str = `Выяснилось что ${ 
                  x<y ? `длина ${x} меньше ширины ${y}` 
                      : `всё нормально`
            } !!!`;
      console.log(str);
    
    // ТЕГОВЫЕ ШАБЛОНЫ //
    
      /* К шаблонному литералу можно создать так называемую теговую функцию, первый аргумент 
         которой примет в виде массива все фрагменты строк литерала, а в последующие передадутся 
         результаты вычислений подставленных выражений в порядке их очерёдности: 
      */
      function tagInfo1(strings, arg1, arg2) {
          return `Получены подстановки ${arg1}, ${arg2} и фрагменты строк ` +
                 `${strings[0]}|${strings[1]}|${strings[2]}`;
      } // Эта теговая функция просто выводит информацию о полученных ею аргументах       
      
      // Теговый шаблон запускается путём добавления имени теговой функции перед литералом:
      str = tagInfo1`Длина: ${x}, ширина: ${y}, ...`; // Для литерала вызвана функция tagInfo1
      console.log(str);
      // Таким образом в коде можно создавать различные шаблоны, применяя к ним различные функции.
      
    // ЭКРАНИРОВАНИЕ В ТЕГОВЫХ ШАБЛОНАХ //
    
      /* Чтобы добавить в шаблонный литерал особенные символы (например обратную кавычку или 
         перенос строки), нужно применять экранирование. При этом массив строк в первом аргументе 
         теговой функции будет содержать результаты работы этого экранирования. 
         Но есть возможность получить строку в таком виде, в котором она написана в коде, т.е. со 
         всеми экранирующими символами. Для этого обратиться к специальному свойству `raw`, 
         которое в свою очередь тоже является массивом, хранящим оригинальные "сырые" строки: */
         
      function tagR(strings) {
          return strings.raw[0];
      }   
      
      console.log(     `Спец.символы: \n Обратный слеш: \\ \n Обратная кавычка: \`` );  
      console.log( tagR`Спец.символы: \n Обратный слеш: \\ \n Обратная кавычка: \`` );  
      
      /* Если же нужно получить в сыром виде весь литерал целиком (а не разбитый на массив строк),
         то можно воспользоваться методом `raw` объекта `String`: */
      console.log(           `Параметры: \n\t Длина: ${x} \n\t Ширина: ${y}`);   
      console.log( String.raw`Параметры: \n\t Длина: ${x} \n\t Ширина: ${y}`);   
      
  console.groupEnd("Строки в обратных кавычках (шаблонные литералы)");
  }  console.groupEnd("Хранение и обработка данных в оперативной памяти");
}

{/* ПРОЦЕДУРНОЕ ПРОГРАММИРОВАНИЕ */

  {/* БЛОЧНАЯ ВИДИМОСТЬ ФУНКЦИЙ 
https://learn.javascript.ru/function-expressions#function-expression-v-sravnenii-s-function-declaration
    */
  console.groupCollapsed("Процедурное программирование");
  console.groupCollapsed("Блочная видимость функций");
    
    /* В ES6 отменено ограничение strict-режима на декларирование функций внутри блока.
       При этом видимость имени функции такая же, как и у let-переменных - т.е. за пределами блока
       функция не видна. Это удобно, т.к. пространство имён не замусоривается.
    */
      let x = Math.random();
      if (x > 0.5) { // В зависимости от условия создаётся разная функция:
          function coinInfo() { return ('Выпал орёл'); } // Эта функция не видна вне блока if
          console.log(coinInfo()); // "Выпал орёл"
      } else { // Вызвать функцию можно и до её декларации, т.к. декларации как бы всплывают вверх
          console.log(coinInfo()); // "Выпала решка"
          function coinInfo() { return ('Выпала решка'); }
      }  
      /* 
          console.log(coinInfo());  // Ошибка: Uncaught ReferenceError: coinInfo is not defined 
      */
    
    /* Чтобы иметь возможность запускать функцию вне блока, следует воспользоваться функциональным 
       выражением (т.е. поместить функцию в переменную, объявленную вне блока)
    */
      let f; // Сделаем переменную f внешней, а f_  внутренней для блока:
      if (x > 0.5) { let f_ = function() { return ('Выпал орёл');   }; f=f_; }
         else      { let f_ = function() { return ('Выпала решка'); }; f=f_; }
      console.log( f() ); // Функция f() доступна за пределами блока if, а функция f_() - нет.
      
    console.groupEnd("Блочная видимость функций");
  } 

  {/* ПАРАМЕТРЫ ПО УМОЛЧАНИЮ 
      https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Default_parameters
    */
    console.groupCollapsed("Параметры по умолчанию");
    
    /* В ES6 значения параметров по умолчанию можно задавать прямо в заголовке функции.
      Значение будет подставляться в парметр, если в аргументе передано `undefined`. 
      При этом не важен порядок следования параметров - правее могут располагаться парметры и без 
      значений по умолчанию.
    */
    function textLog(str = 'Привет!', reservedNumber) {
        console.log(str);
    }
    textLog('Новая информация.');  // 'Новая информация.'
    textLog();                     // 'Привет!'
    textLog(undefined);            // 'Привет!'
    textLog(false);                // false

    // Можно использовать не только литералы, но и выражения:
    function frameSize(width, heigth = width * 3/4 ) {
        console.log('Размер кадра в пикселях:', width*heigth);
    }
    frameSize(1920);  // 2764800 - (ширина посчиталась на основании длины)
    
    // Значения по умолчанию вычисляются в момент вызова функции, а не статически:
    var defaultValue = 0;
    function testX(x = defaultValue) { console.log({x}) };
    
    testX(5); // 5
    testX();  // 0
    defaultValue = 7;
    testX();  // 7, т.к. значение переменной `defaultValue` изменилось

    console.groupEnd("Параметры по умолчанию");
  console.groupEnd("Процедурное программирование"); 
  } 
} 

{/* ФУНКЦИОНАЛЬНОЕ ПРОГРАММИРОВАНИЕ */
  console.groupCollapsed("Функциональное программирование");

  {/* СОЗДАНИЕ СТРЕЛОЧНЫХ ФУНКЦИЙ 
      Стрелочная функция - это т.н. "синтаксический сахар" в ES6, который позволяет более 
      компактно записывать функциональные выражения.
      https://learn.javascript.ru/arrow-functions-basics
    */
    console.groupCollapsed("Создание стрелочных функций");
    
    /* Главный шаг в создании стрелочной функции - это в обычном функциональном выражении удалить
       слово function, а после круглых скобок поместить два символа: => 
    */
      let f1 = function() { return "Сработала обычная функция.";    };
      let f2 =      () => { return "Сработала стрелочная функция."; };
      console.log( f1() + f2() );

    /* Если тело стрелочной функции содержит единственный оператор rеturn, то ключевое слово 
      return и фигурные скобки вокруг оператора можно просто удалить:
    */
      let f3 = () => "Сработала компактная стрелочная функция.";
      console.log( f3() );
        
    /* Если у стрелочной функции нет аргументов или их 2 и больше, то необходимы круглые скобки,
       внутри которых и размещаются нужные аргументы. Но если аргумент всего один, то круглые
       скобки можно опустить. 
       Две функции ниже полностью идентичны:
    */   
      let sqr1 = function(x) { return x*x; };
      let sqr2 = x => x*x;                    
      console.log("Квадрат числа равен" + sqr2(5)); // 25

    // Естественно можно создавать и анонимные стрелочные функции, вызывая их на лету:
      console.log(    (function() { return "Сработала анонимная обычная функция."; })()   );
      console.log(            (() => "Сработала анонимная стрелочная функция.")()         );
    
    console.groupEnd("Создание стрелочных функций");
  }   

  {/* ОСОБЫЕ СВОЙСТВА СТРЕЛОЧНЫХ ФУНКЦИЙ 
        https://learn.javascript.ru/arrow-functions
    */
    console.groupCollapsed("Особые свойства стрелочных функций");
    
    console.groupEnd("Особые свойства стрелочных функций");

  console.groupEnd("Функциональное программирование"); 
  }   
} 



document.write("<pre>Скрипт js-begin-ES6.js успешно закончил работу!<\/pre>");

