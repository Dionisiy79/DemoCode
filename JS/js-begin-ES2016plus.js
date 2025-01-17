"use strict"; 
/* В этом файле преставлен код, который вызывает ошибки синтаксического анализатора в устаревших 
   версиях браузеров (например в Firefox 52, наиболее функциональном браузере для Windows XP). 
   Чтобы совсем не отказываться от возможности запустить код в таких браузерах, для текущего скрипта 
   применяется хитрость - условная загрузка файла на странице js-begin-ES6.html.
   Весь вывод результатов работы кода осуществляется в консоль браузера. 
   
    Откройте этот скрипт в Notepad++ чтобы свернуть блоки в удобное меню простой комбинацией клавиш:
    (Alt + 2)          - свернуть 
    (Alt + Shift + 0)  - развернуть.
    
    То же самое можно сделать в Visual Studio Code:
    (Ctrl + K) и затем (Ctrl + 2) - свернуть, 
    (Ctrl + K) и затем (Ctrl + J) - развернуть      
*/
  
{/* РАСШИРЕННЫЕ ВОЗМОЖНОСТИ EcmaScript 2016+ */
  console.groupCollapsed("Новые возможности EcmaScript 2016+");   
  
  {/* НОВЫЙ ТИП ДАННЫХ BIGINT (ES2020+)
          https://learn.javascript.ru/types#bigint
   */
  console.groupCollapsed("Новый тип данных BigInt");
    /* В ES2020 появилась поддержка больших целых числел, что позволяет безопасно работать с числами,
       превышающими значение Number.MAX_SAFE_INTEGER */
       
    // Тип BigInt поддерживается далеко не всеми браузерами, поэтому нужна проверка его наличия:
    if (typeof BigInt == "function") 
           console.log('Большие целые числа поддерживаются!');
      else console.log('Большие целые числа не поддерживаются!');
    
    if (typeof BigInt == "function") { 
        // Записать BigInt значение в переменную можно двумя способами:
        let N = 15n;    // Указать число с символом `n` в конце
        N = BigInt(15); // Применить функцию приведения целого(!) числа к BigInt 
        console.log(N); // 15n
    
    // Использование больших целых чисел:
          
        // Для обычных чисел мы имеем известное ограничение:
        let n = Number.MAX_SAFE_INTEGER; /* 9007199254740991 */
        let b = (n+1) == (n+2); // Результат true (обе суммы дают результат 9007199254740992) 
        
        // Если же вместо обычных чисел использовать большие целые, то проблема исчезает
        N = BigInt(Number.MAX_SAFE_INTEGER);
        b = (N+1n) == (N+2n); // Результат false, т.к. второе число равно
        console.log(N+2n);    // 9007199254740993n
    
    // Операции
    
        /* К большим целым можно применять операции +,-,*,/,% но автоматическое приведение типов 
           не работает - т.е. в них к обычному числу нужно применять функцию BigInt() */
        N = N * BigInt(n);
        console.log(N);        // 81129638414606663681390495662081n   
        console.log(13n / 5n); // 2n (в операциях деления возвращается целая часть)
        console.log(13n % 5n); // 3n (остаток)
        
        /* Для обратного приведения можно использовать только функцию Number(). При этом для очень 
           больших значений результат преобразования может оказаться округлённым, т.к. 64 бита 
           обычного числа может не хватить для хранения точного значения большого числа. */ 
        n = Number(N);
        console.log(n);         // 8.112963841460666e+31
        console.log(N);         // 81129638414606663681390495662081n
        console.log(BigInt(n)); // 81129638414606663681390495662080n
        
        /* А вот в операциях сравнения и логических операциях автоматическое приведение работает:
           Во всех нижепреведенных сравнениях результат равен true:  */
        b = 3n > "2"      && // Строка привелась к BigInt
            7n == 7       && // Number приведен к BigInt  
            7n !== 7      && // Типы Number и BigInt разные
            !!-1n == true && // Отличное от нуля большое число при булевом преобразовании равно true
            !!0n == false && // а нулевое - false
            typeof 1n == "bigint";
        console.log("Результат всех сравнений и логических операций: " + b); // true
    }  
    console.groupEnd("Новый тип данных BigInt");
  } 

  {/* НОВЫЕ ОПЕРАТОРЫ ЛОГИЧЕСКОГО ПРИСВАИВАНИЯ И НУЛЕВОГО СЛИЯНИЯ (ES2021+)
   */
  console.groupCollapsed("Новые логические и комбинированные операторы");
    
    // ОПЕРАТОРЫ ЛОГИЧЕСКОГО ПРИСВАИВАНИЯ //
    
        /* Логичекое присваивание записывает в переменную результат вычисления второго операнда 
           при условии что переменная приводится к нужному булеву значению.
                https://learn.javascript.ru/logical-operators#logicheskoe-prisvaivanie-ili
        */
        
        let x = Math.random() > 0.5; // Подкинем монетку: x == true или false с вероятностью 50%.
        // Мы можем воспользоваться этими новыми комбинированными операторами в двух случаях:

        // 1. Если мы хотим заменить значение переменной, приводящееся к false, на любое другое:
            x ||= "орёл";  // Является эквивалентом (синтаксическим сахаром) выражений:
                              x || (x="орёл");   
                              if (!x) x="орёл";
        
        // 2. Если мы хотим заменить значение переменной, приводящееся к true, на любое другое:
            x &&= "решка"; // Является эквивалентом (синтаксическим сахаром) выражений:
                              x && (x="решка");  
                              if (x) x="решка"; 
        
        console.log("Выпало: " + x);  // Вывод результата словами "орёл" или "решка"
 
    // НУЛЕВОЕ ПРИСВАИВАНИЕ И НУЛЕВОЕ СЛИЯНИЕ //

        // Нулевое присваивание изменит переменную, если в ней хранится null или undefined:
            x = null;
            x ??= 0; // Является эквивалентом (синтаксическим сахаром) выражений:
                        x ?? (x=0); 
                        if (x === null || x === undefined) {x = 0};
            console.log("Значение исправлено на " + x);  // 0
        
        // Нулевое слияние вернёт первый операнд, если он равен null или undefined, а иначе - второй
        x = null ?? "";  // ""

            // В ряде случаев его удобно использовать вместо операции `ИЛИ`:
            let a=null, b=undefined, c=0, d="", e=5;
            x = a || b || c || d || e; 
                console.log("Первое не ложное значение: " + x);  // 5
            x = a ?? b ?? c ?? d ?? e; 
                console.log("Первое значение, отличное от null и undefined : " + x);  // 0

    console.groupEnd("Новые логические и комбинированные операторы");
  } console.groupEnd("Новые возможности EcmaScript 2016+");
}

document.write("<pre>Скрипт js-begin-ES6-extended.js успешно закончил работу!<\/pre>");