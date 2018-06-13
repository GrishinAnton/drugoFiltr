import { getCurrentZone } from './getCurrentZone.js';

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
}