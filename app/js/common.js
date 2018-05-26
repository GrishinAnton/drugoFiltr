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
           
        let inputFriendsVk = document.querySelector('.input-friends-vk');
        let inputFriendsSave = document.querySelector('.input-friends-save');

        leftColumn.items = friends.items.slice()

        inputFriendsVk.addEventListener('input', (e)=>{

            if (e.target.value) {

                let arr = []

                leftColumn.items.forEach(item => { 
                    if (isMatch(`${item.first_name} ${item.last_name}`, e.target.value)){
                        arr.push(item)
                    }
                });

                update(arr);
            } else {

                update(leftColumn.items);
            }
        });       
        

        update(leftColumn.items);        
        onButton();        
    
    } catch (e) {
        console.log(e);
    }

})();

let currentDrag;
var leftColumn = {
    items: []
};

let rightColumn = {
    items: []
};


function isMatch(full, chunk){
    return full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1 ? true : false;
}

function update(friends) {
    const template = document.querySelector('#user-template').textContent;
    const render = Handlebars.compile(template);        
    const html = render(friends);
    const wrapper = document.querySelector('.friends-wrapper');

    setTimeout(()=>{
        friends.forEach((item) => {
            document.querySelector(`[data-id='${item.id}']`).item = item.id 
           
       })
    },0)    

    wrapper.innerHTML = html;
}

function onButton() {
    let button = document.querySelectorAll('.button');

    let leftBlock = document.querySelector('.left-column');
    let leftZone = document.querySelector('.left-column .friends-wrapper');

    let rightZone = document.querySelector('.right-column .friends-wrapper');

    document.addEventListener('click', (e) => {

        var currentBtn = getCurrentZone(e.target, 'button');   
        
        if(currentBtn) {
            if (getCurrentZone(currentBtn, 'left-column') === leftBlock) {
                let currentItem = getCurrentZone(currentBtn, 'friends-item')
                changeFriendsColumn(currentItem, 'left')
                rightZone.appendChild(currentItem);
                
            } else {
                let currentItem = getCurrentZone(currentBtn, 'friends-item')
                changeFriendsColumn(currentItem, 'right')
                leftZone.appendChild(currentItem);
            }
        }        
    });
}

function changeFriendsColumn(currentItem, column){
    var currentColumn = column === 'left' ? leftColumn : rightColumn
    var siblingColumn = column === 'left' ? rightColumn : leftColumn

    for(let i in currentColumn.items) {
        if(currentColumn.items[i].id === currentItem.item){
            siblingColumn.items.push(currentColumn.items[i])
            currentColumn.items.splice(i,1)
        }                    
    }
    console.log(leftColumn.items)
    console.log(rightColumn.items)
    
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