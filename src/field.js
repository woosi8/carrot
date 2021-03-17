'use strict';
import * as sound from './sound.js'
import * as Count from './main.js'
const CARROT_SIZE = 80;

export const pickElem = function randomNum(lower, upper) {
    for (var i = 0; i < 1; i++) {
        let myRandom = Math.floor(Math.random() * (upper - lower + 1)) + lower;
        console.log(myRandom);
        return myRandom;
    }
};

export const ItemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug'
})
export class Filed {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);

    }
    init() {
        this.field.innerHTML = '';
        this.carrotCount = pickElem(5, 10);
        this.bugCount = pickElem(1, 10);
        this._addItem('carrot', this.carrotCount, 'img/carrot.png');
        this._addItem('bug', this.bugCount, 'img/bug.png');
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
        // this.carrotCount = pickElem(5, 10);
        // this.bugCount = pickElem(1, 10);
    }

    onClick = (event) => {
        const target = event.target;
        if (target.matches('.carrot')) {
            target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick(ItemType.carrot);
        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    }
}


function randomNumber(min, max) {
    return Math.random() * (max - min) + min;

}



