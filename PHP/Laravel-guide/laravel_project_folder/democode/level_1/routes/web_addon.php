<?php

/* 
    Этот демонстрационный код нужно добавить в конец файла `.\routes\web.php`
   Для этого либо скопируйте его туда вручную, либо добавьте в него строку кода:
   
   require  base_path() . "/democode/level_0/routes-web_addon.php";
*/

###############################################################
#                         УРОВЕНЬ 1                           #
#   Создание маршрутов получения информации от пользователя   #
###############################################################

/* Когда на сайте есть только несколько десятков фиксированных ссылок, ведущих на те или иные страницы, то здесь нет особого места каким-либо алгоритмам. Собственно говоря, даже использование фреймворка тут может быть излишним - ведь можно просто создать нужные HTML-документы и расположить их в соответствующих папках на сервере.

Но как только появляется необходимость получить от пользователя сайта какую-то информацию, то возникают вопросы: во первых, как это сделать, а во вторых, каким образом и в какой части серверного кода эту информацию лучше обрабатывать. Освещению этих тем и посвящён уровень 1 нашего гида. */

use App\Http\Controllers\ParamController; // Объявляем классы вызываемых контоллеров

#----------------------------------#   
#   ОБРАБОТКА ПАРАМЕТРОВ ЗАПРОСА   #   
#----------------------------------#   

### ПОЛУЧЕНИЕ ПАРАМЕТРОВ ###

    /* В PHP cамый стандартный и старый способ передачи каких-то значений через GET-запросы - это использование GET-параметров в адресной строке. Для этого сразу посл URL ставится знак `?` и перечисляются имена параметров с их значениями после знака `=`. Несколько параметров разделяются знаком `&`. Например для страницы поиска можно в адресную строку добавить параметры c именами `s_string` (строка поиска) и `lang` (язык). Выглядеть это будет так: http://127.0.0.1:8000/search/?s_string=тест&lang=ru
    
    Чтобы получить параметры из этого запроса в замыкании маршрута или в контроллере нужно предварительно объявить использование класса Request: */
    
    use Illuminate\Http\Request;
   
    // Теперь можно создать маршрут с замыканием и с помощью request-метода `query()` получить значение каждого параметра, задав его имя в первом аргументе. Вторым аргументом в метод можно передать значение по умолчанию:
    Route::get('/search', function (Request $request) {
        return 'Ищем текст ' . $request->query('s_string') . 
               ' на языке ' . $request->query('lang','ru'); 
    });

    /* Более удобный и красивый способ - передавать параметры внутри URL. Обычно их принято разделять наклонной чертой (другие символы допустимы, но не практичны). Для того чтобы иметь возможность выудить параметры из URL, нужно в строке-образце для URI указывать имена этих параметров в фигурных скобках.  При этом имена переменных функции не имеют значения, важен только их порядок, т.к. именно в порядке расположения в URL параметры будут переданы в функцию: */

    Route::get('/cat/{cat_name}/page/{page_number}', function (string $n, $m) {
        return 'Запрошена страница ' . $m . ' для категории ' . $n;
    });

    /* Знак вопроса после имени параметра означает, что он необязателен. В этом случае у колбэк-функции соответствующие аргументы тоже должны быть необязательными (т.е. с заданными значениями по-умолчанию). В этом примере параметры передаются в метод контроллера, а он в свою очередь выдаёт ответ в виде списка полученных параметров: */
   
    Route::get('/sp/{par1}/{par2?}/{par3?}', 
               [ParamController::class, 'showParams']);
    
### ПРОВЕРКА ПАРАМЕТРОВ НА ДОПУСТИМЫЙ ФОРМАТ ###

    /* Чтобы внутри колбэк-функции не проверять допустимость значения полученного параметра можно воспользоваться для этого методами самого route-объекта. Метод `where()` сверяет значение параметра с регулярным выражением и меняет статус route-объекта на "отвергаемый" в случае несовпадения: */

    Route::get('/nametest/{nameLatin}', function ($name) {
        return 'Имя ' . $name . 'корректно, т.к. написано латинницей.';
    })->where('name', '[A-Za-z]+');

    /* Для нескольких параметров можно выстраивать цепочки из методов сверки, либо в один метод передавать ассоциативный массив соответствий: */
   
    Route::get('/adress/{streetName}/{homeNumber}', function ($x, $y) {
        return 'Адрес ' . $x . ' ' . $y . ' корректен';
    })->where('streetName', '[A-Za-zА-Яа-я]+')->where('homeNumber', '[0-9]+');
    
    Route::get('/adress2/{streetName}/{homeNumber}', function ($x, $y) {
        return 'Адрес ' . $x . ' ' . $y . ' корректен';
    })->where(['streetName' => '[A-Za-zА-Яа-я]+', 
               'homeNumber' => '[0-9]+'         ]);

    /* Методы `whereNumber()`, `whereAlpha()`, `whereAlphaNumeric()`, `whereUuid()` позволяют проверить сразу несколько параметров на то, содержат ли они соответсвенно только цифры, только латинские буквы, только буквы и цифры, либо корректный идентификатор UUID: */
   
    Route::get('/coord/{x}/{y}/{z}', function (string $x, $y, $z) {
        return 'Все три координаты корректны, т.к. записаны цифрами';
    })->whereNumber(['x','y','z']);

### ФИЛЬТРАЦИЯ МАРШРУТОВ ПО HTTP-МЕТОДУ ЗАПРОСА ### 

    /* Получение данных от пользователя может приходить не только через GET-запросы, но и через POST, PUT и пр. Использовавшийся нами ранее метод `get()` не среагирует на POST-запрос. Для обработки всех типов запросов в Laravel предусмотрены следущие инструменты. */

    // Отбор запросов конкретного типа делается одноимённым route-методом.
    // Вот их полный список:
    Route::get('/get-hi', function () { return 'hi'; });
    Route::post('/post-hi', function () { return 'hi'; });
    Route::put('/put-hi', function () { return 'hi'; });
    Route::patch('/patch-hi', function () { return 'hi'; });
    Route::delete('/delete-hi', function () { return 'hi'; });
    Route::options('/options-hi', function () { return 'hi'; });
   
    // Если нужны сразу два и более типа, то полезен route-метод `match()`, 
    // который принимает на вход массив из названий этих HTTP-методов:
    Route::match(['get', 'post'], '/get-post-hi', function () { return 'hi'; });
    
    // Принять сразу все типы HTTP-методов можно route-методом `any()`:
    Route::any('/any-hi', function () { return 'hi'; });
    