import { updateDom } from './updateDom.js';
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
            columns.getInstance().setRightColumn(JSON.parse(localStorage.getItem('array')));

            for(var i = 0; i < friends.items.length; i++){
                for(var j = 0; j < columns.getInstance().getRightColumn().length; j++) {

                    if(friends.items[i].id == columns.getInstance().getRightColumn()[j].id) {
                        friends.items.splice(i, 1);
                    }
                }  
            }

            columns.getInstance().setLeftColumn(friends.items);         
            updateDom(columns.getInstance().getRightColumn(), 'right-column');

        } else {

            columns.getInstance().setLeftColumn(friends.items);
        }

        updateDom(columns.getInstance().getLeftColumn(), 'left-column'); 
    } catch (e) {
        console.log(e);
    }

})();
onButton()
initListener()