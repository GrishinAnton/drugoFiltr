import { columns } from './const.js';

export function changeFriendsColumn(currentItem, column) {
    let currentColumn = column === 'left' ? columns.getInstance().getLeftColumn() : columns.getInstance().getRightColumn();
    let siblingColumn = column === 'left' ? columns.getInstance().getRightColumn() : columns.getInstance().getLeftColumn();

    for (let i in currentColumn) {
        if (currentColumn[i].id === currentItem.item) {
            siblingColumn.push(currentColumn[i]);
            currentColumn.splice(i, 1);
        }
    }
}