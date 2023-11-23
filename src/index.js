import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement, nextId} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: nextId(), title: 'Название элемента'},
    {code: nextId(), title: 'Некий объект'},
    {code: nextId(), title: 'Заголовок'},
    {code: nextId(), title: 'Очень длинное название элемента из семи слов'},
    {code: nextId(), title: 'Запись'},
    {code: nextId(), title: 'Шестая запись'},
    {code: nextId(), title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
