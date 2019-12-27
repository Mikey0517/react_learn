import React, { PureComponent } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import routes from './router';

const supportsHistory = 'pushState' in window.history;

class App extends PureComponent {
	recursiveRoute ( routes ) {
		return (
			<Switch>
				{
					routes.map( ( route, index ) => {
						return (
							route.children ?
								<Route
									key={ index }
									path={ route.path }
									render={ () => {
										return (
											<route.component>
												{ this.recursiveRoute( route.children ) }
											</route.component>
										)
									} }
								/>
								:
								<Route
									key={ index }
									exact={ route.exact }
									path={ route.path }
									render={ props => {
										let token = localStorage.getItem( 'token' );
										if ( token || route.path === '/login' ) {
											return <route.component { ...props } />
										} else {
											return (
												<Redirect
													to={ {
														pathname: '/login',
														state: { from: props.location }
													} }
												/>
											)
										}
									} }
								/>
						)
					} )
				}
			</Switch>
		)
	}

	render () {
		return (
			<Router
				basename={ '/' }
				forceRefresh={ !supportsHistory }
				keyLength={ 12 }
			>
				{ this.recursiveRoute( routes ) }
			</Router>
		)
	}
}

export default App;