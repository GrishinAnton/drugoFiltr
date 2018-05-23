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

document.addEventListener('click', e => {
    console.log(getCurrentZone(e.target))
})

function getCurrentZone(from) {

    if(from == null || from.classList.contains('friends-wrapper')){

        return from;
    } else {

        return getCurrentZone(from.parentElement);
    }    
}