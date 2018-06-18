import { getCurrentZone } from './functions/getCurrentZone.js';
import { changeFriendsColumn } from './changeColums.js';
import { columns } from './const.js';
import { isMatch } from './functions/isMatch.js';
import { updateDom } from './updateDom.js';

export function initListener (){
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
        let zone = getCurrentZone(e.target, 'input-friends-vk') === null ? columns.getInstance().getRightColumn() : columns.getInstance().getLeftColumn();
        let column = zone === columns.getInstance().getRightColumn() ? 'right-column' : 'left-column';

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