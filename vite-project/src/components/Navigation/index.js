import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-container'>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>

			<li>
				<NavLink exact to="/profile">Inspect Player</NavLink>
			</li>
		</ul>
	);
}

export default Navigation;