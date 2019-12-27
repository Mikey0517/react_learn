import DefaultLayout from '../layout/defaultLayout';
import Login from '../page/login';
import Music from '../page/music';
import Chat from '../page/chat';
import MineSweeping from '../page/mineSweeping';
import TetrisPage from '../page/tetrisPage';
import TankBattlePage from  '../page/tankBattlePage'

const router = [
	{
		path: '/login',
		exact: true,
		component: Login,
	},
	{
		path: '/',
		component: DefaultLayout,
		children: [
			{
				path: '/',
				exact: true,
				component: Music,
			},
			{
				path: '/music',
				component: Music,
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
				path: '/tankBattle',
				component: TankBattlePage
			}
		]
	}
];

export default router;