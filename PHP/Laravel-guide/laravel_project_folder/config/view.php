<?php

/* Этот файл с демонстрационным кодом нужно скопировать с заменой 
   в папку `config`, чтобы путь к нему был такой: `config\view.php`.
   Также Вы можете заменить всё содержимое существующего файла на эти строки, 
   которые помимо стандартного кода Laravel содержат пути к пользовательским
   папкам с blade-шаблонами: ↓ ↓ ↓
   
   После обновления файла может потребоваться обновить кэш конфигурации командой
   `php artisan config:cache`.
*/


return [

    /*
    |--------------------------------------------------------------------------
    | View Storage Paths
    |--------------------------------------------------------------------------
    |
    | Most templating systems load templates from disk. Here you may specify
    | an array of paths that should be checked for your views. Of course
    | the usual Laravel view path has already been registered for you.
    |
    */

    'paths' => [
        resource_path('views'),  // Стандартный путь Laravel
        // Дополнительные пути к пользовательским шаблонам:
        base_path() . "/democode/level_0/resources/views",
    ],

    /*
    |--------------------------------------------------------------------------
    | Compiled View Path
    |--------------------------------------------------------------------------
    |
    | This option determines where all the compiled Blade templates will be
    | stored for your application. Typically, this is within the storage
    | directory. However, as usual, you are free to change this value.
    |
    */

    'compiled' => env(
        'VIEW_COMPILED_PATH',
        realpath(storage_path('framework/views'))
    ),

];
