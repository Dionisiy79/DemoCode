<?php

/* Этот файл с демонстрационным кодом нужно скопировать в пакпу контроллеров, 
   чтобы путь к нему был такой: `app\Http\Controllers\SimpleController.php`.
   Также вы можете как положено создать новый пустой файл контроллера командой
   `php artisan make:controller SimpleController` 
   и скопировать в него методы класса из этого кода ↓ ↓ ↓
*/

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SimpleController extends Controller
{
    ################################################################  
    #                          УРОВЕНЬ 0                           #
    #   ПРИМЕРЫ МЕТОДОВ КОНТРОЛЛЕРА, ВОЗВРАЩАЮЩИХ 'ОТВЕТ СЕРВЕРА'  #  
    ################################################################

    // Колбэк-методы, вызываемые при срабатывании ссылающихся на них маршрутов:
    
    public function showText() {
        return 'Привет от контроллера!'; // Возврат простого текста
    }
    
    // Возврат шаблона `resources\views\welcome.blade.php`:
    public function showWelcome() { 
        return view('welcome'); 
    } 
    
    // Возврат шаблона `resources\views\landing1.blade.php`:
    public function showLanding1() { 
        return view('landing1'); 
    }     
}