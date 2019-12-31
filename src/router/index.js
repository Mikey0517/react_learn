import DefaultLayout from '../layout/defaultLayout';
import Login from '../page/login';
import Music from '../page/music';
import Backgammon from '../page/backgammon';
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
				path: '/backgammon',
				component: Backgammon
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