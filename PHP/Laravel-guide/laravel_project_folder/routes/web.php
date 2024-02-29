<?php

/* Этот файл с демонстрационным кодом нужно скопировать с заменой 
   в папку `routes`, чтобы путь к нему был такой: `routes\web.php`.
   Также Вы можете заменить всё содержимое существующего файла на эти строки, 
   подключающие демо-код: ↓ ↓ ↓
*/

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

require  base_path() . "/democode/level_0/routes/web_addon.php";
require  base_path() . "/democode/level_1/routes/web_addon.php";