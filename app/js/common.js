VK.init({
    apiId: 6487256
});

function auth() {
    return new Promise((resolve, reject ) => {

        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не шмогла'));
            }
        },2);
    });
}

function callAPI(method, params) {
    params.v = '5.76';

    return new Promise((resolve, reject ) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    });
}

(async () => {
    try {
        await auth();

        const friends = await callAPI('friends.get', { fields: 'photo_100', count: 20 });

        if (localStorage.getItem('array')) {
            arrays.rightItems = JSON.parse(localStorage.getItem('array'))

            for(var i = 0; i < friends.items.length; i++){
                for(var j = 0; j < arrays.rightItems.length; j++) {

                    if(friends.items[i].id == arrays.rightItems[j].id) {
                        friends.items.splice(i, 1)                        
                    }
                }  
            }
            arrays.leftItems = friends.items.slice();
            update(arrays.rightItems, 'right-column'); 

        } else {
            arrays.leftItems = friends.items.slice();
        }

        document.addEventListener('input', (e)=>{
            zone =  getCurrentZone(e.target, 'input-friends-vk') === null ? arrays.rightItems : arrays.leftItems;
            column =  zone === arrays.rightItems ? 'right-column' : 'left-column';

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
        onButton();        
    
    } catch (e) {
        console.log(e);
    }

})();

let currentDrag;
var arrays= {
    leftItems: [],
    rightItems: []
};

function isMatch (full, chunk) {
    return full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1 ? true : false;
}

function update(friends, column) {
    const template = document.querySelector('#user-template').textContent;
    const render = Handlebars.compile(template);        
    const html = render(friends);
    const wrapper = document.querySelector(`.${column} .friends-wrapper`);

    wrapper.innerHTML = html;

    friends.forEach((item) => {    
        document.querySelector(`[data-id='${item.id}']`).item = item.id;
    });

    
}

function onButton () {
    let leftZone = document.querySelector('.left-column .friends-wrapper');
    let rightZone = document.querySelector('.right-column .friends-wrapper');
    
    document.addEventListener('click', (e) => {

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

            if(currentBtn.classList.contains('button-save')) {
                localStorage.setItem('array', JSON.stringify(arrays.rightItems))
            }

        }
               
    });
}

function changeFriendsColumn(currentItem, column){    
    let currentColumn = column === 'left' ? arrays.leftItems : arrays.rightItems;
    let siblingColumn = column === 'left' ? arrays.rightItems : arrays.leftItems;    

    for(let i in currentColumn) {
        if(currentColumn[i].id === currentItem.item){
            siblingColumn.push(currentColumn[i])
            currentColumn.splice(i,1)
        }                    
    }
}

document.addEventListener('dragstart', e => {
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
})

document.addEventListener('dragover', (e) => {
    const zone = getCurrentZone(e.target, 'friends-wrapper');

    if (zone) {
        e.preventDefault();
    }
});

document.addEventListener('drop', (e) => {
    e.preventDefault();

    if (currentDrag) {
        const zone = getCurrentZone(e.target, 'friends-wrapper')

        e.preventDefault();

        if (zone && currentDrag.startZone !== zone) {
            currentDrag.node.classList.remove('friends-item_active');
            zone.appendChild(currentDrag.node);
            changeFriendsColumn(currentDrag.id, currentDrag.column)
        }

    }
})

function getCurrentZone(from, zone) {

    if(from == null || from.classList.contains(zone)){

        return from;
    } else {

        return getCurrentZone(from.parentElement, zone);
    }    
}