import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement, nextId} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: nextId(), title: 'Название элемента', selectionCount: 0},
    {code: nextId(), title: 'Некий объект', selectionCount: 0},
    {code: nextId(), title: 'Заголовок', selectionCount: 0},
    {code: nextId(), title: 'Очень длинное название элемента из семи слов', selectionCount: 0},
    {code: nextId(), title: 'Запись', selectionCount: 0},
    {code: nextId(), title: 'Шестая запись', selectionCount: 0},
    {code: nextId(), title: 'Седьмая запись', selectionCount: 0},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
