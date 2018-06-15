import { getCurrentZone } from './getCurrentZone.js';
import { changeFriendsColumn } from './changeColums.js';
import { arrays } from './const.js';
import { isMatch } from './isMatch.js';
import { update } from './updateDom.js';

export function initDrug (){
    let currentDrag;
    
    addEventListener('dragstart', e => {
        const zone = getCurrentZone(e.target, 'friends-wrapper');
        const item = getCurrentZone(e.target, 'friends-item');
        const column = getCurrentZone(e.target, 'left-column') === null ? 'right' : 'left';


        if (zone) {
            currentDrag = {
                startZone: zone,
                node: item,
                id: item,
                column: column
            }
            currentDrag.node.classList.add('friends-item_active');
        }
    });

    addEventListener('dragover', (e) => {
        const zone = getCurrentZone(e.target, 'friends-wrapper');

        if (zone) {
            e.preventDefault();
        }
    });

    addEventListener('drop', (e) => {
        e.preventDefault();

        if (currentDrag) {
            const zone = getCurrentZone(e.target, 'friends-wrapper');
            e.preventDefault();

            if (zone && currentDrag.startZone !== zone) {
                currentDrag.node.classList.remove('friends-item_active');
                zone.appendChild(currentDrag.node);
                changeFriendsColumn(currentDrag.id, currentDrag.column);
            }
        }
    });

   addEventListener('input', (e) => {
        let zone = getCurrentZone(e.target, 'input-friends-vk') === null ? arrays.rightItems : arrays.leftItems;
        let column = zone === arrays.rightItems ? 'right-column' : 'left-column';

        if (e.target.value) {
            let arr = [];

            zone.forEach(item => {
                if (isMatch(`${item.first_name} ${item.last_name}`, e.target.value)) {
                    arr.push(item);
                }
            });

            update(arr, column);
        } else {

            update(zone, column);
        }
    });
}