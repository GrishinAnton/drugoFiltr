import { update } from './updateDom.js';
import { initListener } from './listener.js';
import { arrays } from './const.js';
import { onButton } from './onButton.js';
import vkAuth from './apiVK/auth.js';
import vkAPI from './apiVK/callAPI.js';

(async () => {
    try {
        await vkAuth.auth();

        const friends = await vkAPI.getUsers({ fields: 'photo_100', count: 20 });

        if (localStorage.getItem('array')) {
            arrays.rightItems = JSON.parse(localStorage.getItem('array'));

            for(var i = 0; i < friends.items.length; i++){
                for(var j = 0; j < arrays.rightItems.length; j++) {

                    if(friends.items[i].id == arrays.rightItems[j].id) {
                        friends.items.splice(i, 1);
                    }
                }  
            }
            arrays.leftItems = friends.items.slice();
            update(arrays.rightItems, 'right-column');

        } else {
            arrays.leftItems = friends.items.slice();
        }

        update(arrays.leftItems, 'left-column');
        onButton()
    
    } catch (e) {
        console.log(e);
    }

})();

initListener()