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



        inputFriendsVk.addEventListener('input', (e)=>{
            
            leftArr.items = []
            if (e.target.value) {

                friends.items.forEach(item => { 
                    if (isMatch(`${item.first_name} ${item.last_name}`, e.target.value)){
                        leftArr.items.push(item)
                    }
                });

                update(leftArr);

            } else {

                update(friends);
            }
        });

        
        

        update(friends);        
        onButton();        
    
    } catch (e) {
        console.log(e);
    }

})();

let currentDrag;
let leftArr = {
    items: []
};

let rightArr = {
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

    wrapper.innerHTML = html;
}

function onButton() {
    let button = document.querySelectorAll('.button');

    let leftColumn = document.querySelector('.left-column');
    let leftZone = document.querySelector('.left-column .friends-wrapper');

    let rightZone = document.querySelector('.right-column .friends-wrapper');

    document.addEventListener('click', (e) => {

        var currentBtn = getCurrentZone(e.target, 'button');        

        if (getCurrentZone(currentBtn, 'left-column') === leftColumn) {
            rightZone.appendChild(getCurrentZone(currentBtn, 'friends-item'));
        } else {
            leftZone.appendChild(getCurrentZone(currentBtn, 'friends-item'));
        }
    });
}

document.addEventListener('dragstart', e => {
    const zone = getCurrentZone(e.target, 'friends-wrapper');
    const item = getCurrentZone(e.target, 'friends-item');   
    
    if (zone) {
        currentDrag = {
            startZone: zone,
            node: item
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
            currentDrag.node.classList.remove('friends-item_active')
            zone.appendChild(currentDrag.node);
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