VK.init({
    apiId: 6487256
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve()
            } else {
                reject(new Error('Не шмогла'))
            }
        },2)
    })
}

function callAPI(method, params) {
    params.v = '5.76';

    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error)
            } else {
                resolve(data.response)
            }
        })
    })
}

(async () => {
    try {
        await auth();

        const friends = await callAPI('friends.get', { fields: 'photo_100', count: 20 });


        const template = document.querySelector('#user-template').textContent;
        const render = Handlebars.compile(template);        
        const html = render(friends);
        const wrapper = document.querySelector('.friends-wrapper');

        wrapper.innerHTML = html;
    
    } catch (e) {
        console.log(e)
    }

})();
let currentDrag;



document.addEventListener('dragstart', e => {
    const zone = getCurrentZone(e.target)
    const item = getCurrentItem(e.target)
    
    
    if (zone) {
        currentDrag = {
            startZone: zone,
            node: item
        }
        currentDrag.node.classList.add('friends-item_active')
    }
})

document.addEventListener('dragover', (e) => {
    const zone = getCurrentZone(e.target);

    if (zone) {
        e.preventDefault();
    }
});

document.addEventListener('drop', (e) => {
    e.preventDefault()

    if (currentDrag) {
        const zone = getCurrentZone(e.target)

        e.preventDefault()

        if (zone && currentDrag.startZone !== zone) {
            currentDrag.node.classList.remove('friends-item_active')
            zone.insertBefore(currentDrag.node, e.target.nextElementSibling);
        }

    }
})

function getCurrentZone(from) {

    if(from == null || from.classList.contains('friends-wrapper')){

        return from;
    } else {

        return getCurrentZone(from.parentElement);
    }    
}

function getCurrentItem(from) {

    if(from == null || from.classList.contains('friends-item')){
  
        return from;
    } else {

        return getCurrentItem(from.parentElement);
    }    
}