import { Router } from './router';
import { routes } from './routes';

const appContainer: HTMLElement = document.body.querySelector('#container');
const router = new Router(routes, appContainer);

router.bootstrap();