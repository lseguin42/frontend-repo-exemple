const libc = require('library-c');

function loadComponent1() {
    import('mif-a');
}

function loadComponent2() {
    import('mif-b');
}

libc.action();

const b1 = document.createElement('button');
b1.textContent = 'load component 1';
b1.onclick = loadComponent1;

const b2 = document.createElement('button');
b2.textContent = 'load component 2';
b2.onclick = loadComponent2;

document.body.appendChild(b1);
document.body.appendChild(b2);