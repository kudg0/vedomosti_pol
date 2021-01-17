# vedomosti_pol
Проект ведомости для Московского Политеха


## How it work?
  1. Склонируйте репу к себе на копмупктер
  2. В склониной папке откройте терминал и выполните команды:
     ``` 
     npm i
     gulp
     ```
    
  3. должен запуститься сервер с таким response в терминал:

     ```
     [10:33:04] Using gulpfile ~/Desktop/my folder/projects/vedomosti_pol/gulpfile.js
     [10:33:04] Starting 'server'...
     [10:33:04] Finished 'server' after 24 ms
     [10:33:04] Starting 'default'...
     [10:33:04] Finished 'default' after 37 ms
     [Browsersync] Access URLs:
       --------------------------------------
         Local: http://localhost:8001
         External: http://192.168.0.101:8001
       --------------------------------------
         UI: http://localhost:3002
         UI External: http://localhost:3002
       --------------------------------------
       [Browsersync] Serving files from: dist
       gulp.run() has been deprecated. Use task dependencies or gulp.watch task triggering instead.
     ```
  4. Можете работать над проектом


## Структура сайта
Сайт представляет из себя одностроничник, который на уровне js отображает и скрывает необходимые секции, в зависимости от сценария работы.


## Описание работы над файлами.
### JS:
У нас есть index.js файл, в который мы добавляем файлы-компонененты, каждый компонент решает определенную задачу. 
Например: initFunctionsHelpers – здесь собираются шаблонные функции, которые могут пригодиться во всех сценариях работы приложения

### CSS:
По анологии работы с js, устроена работа с css-файлами. 
У нас есть index.scss, в который на глобальном уровне подключаются компоненты. Компоненты разбиваются при необходимости на доп. состовляющие. Например: для страницы преподавателя css лежит *css/professor/professor.scss*  professor.scss – это index файл для страницы преподавателя.
При необходимости можно создавать новые компоненты и подкомпоненты.

### HTML:
Все также как и с пред. пунктами.
index.html состоит из компонентов, каждый компонент независим от других сущностей.


**Макс уровень вложенности для компонентов 2. (Компоненет –> Под.компонент)**
