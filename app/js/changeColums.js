import { arrays } from './const.js';

export function changeFriendsColumn(currentItem, column) {
    let currentColumn = column === 'left' ? arrays.leftItems : arrays.rightItems;
    let siblingColumn = column === 'left' ? arrays.rightItems : arrays.leftItems;

    for (let i in currentColumn) {
        if (currentColumn[i].id === currentItem.item) {
            siblingColumn.push(currentColumn[i]);
            currentColumn.splice(i, 1);
        }
    }
}