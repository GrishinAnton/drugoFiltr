import { update } from './updateDom.js';
import { initListener } from './listener.js';
import { columns } from './const.js';
import { onButton } from './onButton.js';
import vkAuth from './apiVK/auth.js';
import vkAPI from './apiVK/callAPI.js';

(async () => {
    try {
        await vkAuth.auth();

        const friends = await vkAPI.getUsers({ fields: 'photo_100', count: 20 });

        if (localStorage.getItem('array')) {
            columns.getInstance().getRightColumn() = JSON.parse(localStorage.getItem('array'));

            for(var i = 0; i < friends.items.length; i++){
                for(var j = 0; j < columns.getInstance().getRightColumn().length; j++) {

                    if(friends.items[i].id == columns.getInstance().getRightColumn()[j].id) {
                        friends.items.splice(i, 1);
                    }
                }  
            }

            
            
            columns.getInstance().getLeftColumn() = friends.items.slice();         
            update(columns.getInstance().getRightColumn(), 'right-column');

        } else {
            console.log(columns.getInstance().getLeftColumn());
            console.log(friends.items.slice());
            columns.getInstance().getLeftColumn() = friends.items.slice();
        }

        update(columns.getInstance().getLeftColumn(), 'left-column');
        onButton()
    
    } catch (e) {
        console.log(e);
    }

})();

initListener()