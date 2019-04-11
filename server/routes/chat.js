import Router from 'koa-router';
import chat from '../controller/chat';

const router = new Router();

router.get( '/', chat.openChat );

export default router;