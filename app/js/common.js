import { isMatch } from './isMatch.js';
import { getCurrentZone } from './getCurrentZone.js';
import { update } from './updateDom.js';
import {initDrug} from './drag.js';
import {arrays} from './const.js';
import {onButton} from './onButton.js';
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

        document.addEventListener('input', (e)=>{
            let zone =  getCurrentZone(e.target, 'input-friends-vk') === null ? arrays.rightItems : arrays.leftItems;
            let column =  zone === arrays.rightItems ? 'right-column' : 'left-column';

            if (e.target.value) {
                let arr = [];

                zone.forEach(item => { 
                    if (isMatch(`${item.first_name} ${item.last_name}`, e.target.value)){
                        arr.push(item);
                    }
                });

                update(arr, column);
            } else {

                update(zone, column);
            }
        });

        update(arrays.leftItems, 'left-column');        
        onButton()
    
    } catch (e) {
        console.log(e);
    }

})();

initDrug()