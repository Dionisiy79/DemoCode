{{-- Это файл blade-шаблона с демонстрационным кодом.
  Если в файле `config\view.php` прописан путь к папке с этим файлом, то шаблон
  будет доступен под именем `menu1`. В противном случае его нужно скопировать 
  в папку шаблонов, чтобы путь к нему был такой: 
     `resources\views\menu1.blade.php`.
  
  Также Вы можете создать новый пустой файл шаблона консольной командой
     `php artisan make:view menu1` 
   и скопировать в него этот код ↓ ↓ ↓
--}}

    <nav>
		<a href="{{ route('land1')  }}"> Главная  </a> | 
        <a href="{{ route('topic1') }}"> Cекция 1 </a> | 
        <a href="{{ route('topic2') }}"> Cекция 2 </a>
    </nav>	

    <!-- Если этот шаблон подключать в качестве дочернего, то в нём будут доступны все переменные родительского шаблона, а также переданные из родительского шаблона в виде ассоциативного массива. Убедиться в этом можно, добавив в дочерний шаблон этот коментарий и просмотрев его содержимое на загруженной родительской странице:
        Значение переменной var1: {{ $var1 ?? "пусто" }}
        Значение переменной newvar1: {{ $newvar1 ?? "пусто" }}
    -->
