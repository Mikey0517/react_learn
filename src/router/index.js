import Music from '../page/music';
import Chat from '../page/chat';
import MineSweeping from '../page/mineSweeping';
import TetrisPage from '../page/tetrisPage';
import TankBattlePage from  '../page/tankBattlePage'

const router = [
	{
		path: '/',
		component: Music,
		exact: true
	},
	{
		path: '/music',
		component: Music
	},
	{
		path: '/chat',
		component: Chat
	},
	{
		path: '/mineSweeping',
		component: MineSweeping
	},
  {
    path: '/tetrisPage',
    component: TetrisPage
  },
	{
		path: '/tankBattlePage',
		component: TankBattlePage
	}
];

export default router;