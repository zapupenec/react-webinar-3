import React, { useState } from 'react';
import {createElement, pluralize} from './utils.js';
import './styles.css';
import Store from './store.js';

/**
 * Приложение
 * @param {Store} store  Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const {list} = store.getState();

  const pluralForms = {
    one: 'раз',
    few: 'раза',
    many: 'раз'
  }

  const handleClickBtn = (code) => (e) => {
    e.stopPropagation();
    store.deleteItem(code)
  }

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>
                  {item.title}
                  {item.selectionCount !== 0 && ` | Выделяли ${pluralize(item.selectionCount, pluralForms)}`}
                </div>
                <div className='Item-actions'>
                  <button onClick={handleClickBtn(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
