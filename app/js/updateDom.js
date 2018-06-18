export function updateDom(friends, column) {
    const template = document.querySelector('#user-template').textContent;
    const render = Handlebars.compile(template);        
    const html = render(friends);
    const wrapper = document.querySelector(`.${column} .friends-wrapper`);

    wrapper.innerHTML = html;

    friends.forEach((item) => {    
        document.querySelector(`[data-id='${item.id}']`).item = item.id;
    });
};