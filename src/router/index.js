import Music from '../page/music';
import Chat from '../page/chat';

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
} ]

export default router;