import { Router } from './router';
import { routes } from './routes';

const router = new Router(routes, document.body.querySelector('#container'));
router.bootstrap();