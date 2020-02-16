const template = document.createElement('div');

template.innerHTML = `
    <button class="button_1">react (1)</button>
    <button class="button_2">react (2)</button>
    <button class="button_3">angularjs (1)</button>
    <button class="button_4">angularjs (2)</button>
    <button class="button_5">angularjs (1) + angularjs (2)</button>
    <div id="appContainer"></div>
`;
document.body.appendChild(template);

const appContainer = template.querySelector('#appContainer');

template.querySelector('.button_1').addEventListener('click', action1);
template.querySelector('.button_2').addEventListener('click', action2);
template.querySelector('.button_3').addEventListener('click', action3);
template.querySelector('.button_4').addEventListener('click', action4);
template.querySelector('.button_5').addEventListener('click', action5);

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
    await import('angularjs-app-2');
    appContainer.innerHTML = '<angularjs-app-2></angularjs-app-2>';
}

async function action5() {
    await Promise.all([import('angularjs-app-1'), import('angularjs-app-2')]);
    appContainer.innerHTML = `
        <angularjs-app-1></angularjs-app-1>
        <angularjs-app-2></angularjs-app-2>
    `;
}