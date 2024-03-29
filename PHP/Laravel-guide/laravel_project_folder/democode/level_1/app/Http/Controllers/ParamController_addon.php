<?php

/* Этот файл с демонстрационным кодом нужно скопировать в папку контроллеров, 
   чтобы путь к нему был такой: `app\Http\Controllers\ParamController.php`.
   Также вы можете как положено создать новый пустой файл контроллера командой
   `php artisan make:controller ParamController` 
   и скопировать в него методы класса из этого кода ↓ ↓ ↓
*/

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ParamController extends Controller
{
    ####################################################################  
    #                           УРОВЕНЬ 1                              #
    #   ПРИМЕРЫ МЕТОДОВ КОНТРОЛЛЕРА, ОБРАБАТЫВАЮЩИХ ПАРАМЕТРЫ ЗАПРОСА  #  
    ####################################################################

    /* Колбэк, принимающий в обработку три параметра маршрута из HTTP-запроса. Второй и третий параметры не обязательны - если они не будут переданы в запросе, то подставятся значения по умолчанию: */
    public function showParams($param1, $param2='', $param3='') {
        return ' Параметр 1 = ' . $param1 .
               ' Параметр 2 = ' . $param2 .
               ' Параметр 3 = ' . $param3;
    }
    
    /* Если помимо параметров маршрута нужно обрабатывать GET-параметры и их хочется получить не просто через хелпер `request()`, а через внедрение зависимости в виде Request-объекта, то в аргументах функции эта и другие зависимости должна стоять перед URL-параметрами маршрута: */
    public function showAllParams(Request $request, 
                                  $param1, $param2='', $param3='') {
        $s = 'Все GET-параметры запроса: ';
        foreach ( $request->query() as $key=>$value ) 
            $s .= "$key => $value | ";
           
        return $s . '<br> URL-параметры: ' .
               ' Параметр 1 = ' . $param1 .
               ' Параметр 2 = ' . $param2 .
               ' Параметр 3 = ' . $param3;
    }

}