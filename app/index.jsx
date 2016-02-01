import './css/base';

import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import EditVideoFlux from './flux/EditVideoFlux';
import FluxComponent from 'flummox/component';

const flux = new EditVideoFlux();

/*
* TODO:
* Добавить более длинный файл
* Поправить форму ввода
* Изменить дизайн
* Не происходит проигрывание видео при раннем фильтре
* */

ReactDOM.render(
    <FluxComponent
        flux={flux}
        render={() => <Application />} />, document.getElementById('app'));

let str = JSON.stringify([{
    "time":2,
    "duration":1,
    "x":40,
    "y":40,
    "width":40,
    "height":40,
    "type": "1"
}, {
    "time": 2,
    "duration": 1,
    "type": "0"
}]);
flux.getActions("editVideo").setFilters(str);
