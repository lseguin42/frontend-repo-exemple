const template = document.createElement('div');

template.innerHTML = `
    <button class="button_1">hello react</button>
    <button class="button_2">hello react (2)</button>
    <button class="button_3">hello angularjs</button>
    <button class="button_4">hello angular</button>
    <div id="appContainer"></div>
`;
document.body.appendChild(template);

const appContainer = template.querySelector('#appContainer');

template.querySelector('.button_1').addEventListener('click', action1);
template.querySelector('.button_2').addEventListener('click', action2);
template.querySelector('.button_3').addEventListener('click', action3);
template.querySelector('.button_4').addEventListener('click', action4);

async function action1() {
    await import('react-app-1');
    appContainer.innerHTML = '<react-app-1></react-app-1>';
}

async function action2() {
    await import('react-app-2');
    appContainer.innerHTML = '<react-app-2></react-app-2>';
}

async function action3() {
    await import('angularjs-app-1');
    appContainer.innerHTML = '<angularjs-app-1></angularjs-app-1>';
}

async function action4() {
    // await import('angular-app-1');
    appContainer.innerHTML = '<angular-app-1></angular-app-1>';
}