
import { getCurrentZone } from './getCurrentZone.js';
import { changeFriendsColumn } from './changeColums.js';

export function onButton() {    

    document.addEventListener('click', (e) => {

        let leftZone = document.querySelector('.left-column .friends-wrapper');
        let rightZone = document.querySelector('.right-column .friends-wrapper');

        let currentBtn = getCurrentZone(e.target, 'js-button');

        if (currentBtn) {
            if (currentBtn.classList.contains('button-item')) {

                if (getCurrentZone(currentBtn, 'left-column')) {
                    let currentItem = getCurrentZone(currentBtn, 'friends-item')
                    changeFriendsColumn(currentItem, 'left')
                    rightZone.appendChild(currentItem);
                } else {
                    let currentItem = getCurrentZone(currentBtn, 'friends-item')
                    changeFriendsColumn(currentItem, 'right')
                    leftZone.appendChild(currentItem);
                }
            }

            if (currentBtn.classList.contains('button-save')) {
                localStorage.setItem('array', JSON.stringify(arrays.rightItems));
            }
        }
    });
}