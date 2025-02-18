# Stellar Burgers

[Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

**Описание:** 

Сайт бургерной, предлагающий пользователям уникальный опыт создания бургеров. Платформа включает в себя главную страницу, ленту заказов и личный кабинет.

**Установка:**  

Запуск проекта: `npm start`\
Сборка проекта: `npm run build`

## Главные функции

### Главная страница
На главной странице вы можете создать бургер по своему вкусу. Интерфейс разделен на две части:
- Раздел с ингредиентами.
- Область, где отображается собранный бургер.
Перед оформлением заказа необходимо выбрать булки и хотя бы один ингредиент.

### Страница заказов
Страница заказов также состоит из двух частей:
- Список последних заказов.
- Счетчик заказов.

Список отображает информацию о 50 последних заказах пользователей. При выборе конкретного заказа открывается поп-ап с его подробной информацией.

Счетчик заказов показывает:
- Номера готовых заказов.
- Заказы, находящиеся в процессе выполнения.
- Общее количество бургеров, сделанных за все время.
- Количество бургеров, выполненных сегодня.

### Личный кабинет
В личном кабинете хранится история заказов пользователя, аналогично странице заказов. Соединение с сервером осуществляется через WebSockets, что позволяет в реальном времени обновлять информацию о заказах.
При выборе заказа открывается поп-ап с его деталями.
Пользователи могут изменять свои данные: восстанавливать или менять пароль, обновлять email и имя.
Также доступна кнопка выхода, которая завершает сессию и перенаправляет на страницу входа.

### Модальные окна
Для роутинга в проекте используется библиотека `react-router-dom`.
При открытии модального окна в адресной строке браузера появляется уникальная ссылка.
Если скопировать эту ссылку и открыть в новой вкладке, отобразится отдельная страница с информацией из модального окна, оформленная немного иначе.

## Технологический стек
- React (Functional Components)
- React Router DOM
- Redux (Thunk)
- TypeScript
- WebSocket
- JWT Tokens (вход, выход, регистрация, сброс пароля)
- Тестирование (Jest, Cypress)
