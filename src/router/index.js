import Music from '../page/music';
import Chat from '../page/chat';
import MineSweeping from '../page/mineSweeping';

const router = [ {
  path: '/',
  component: Music,
  exact: true
}, {
  path: '/music',
  component: Music
}, {
  path: '/chat',
  component: Chat
}, {
  path: '/mineSweeping',
  component: MineSweeping
} ]

export default router;