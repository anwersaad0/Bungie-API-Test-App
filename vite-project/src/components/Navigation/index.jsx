import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';

function Navigation({ isLoaded }){
	//const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-container'>
			<li>
				<NavLink to="/">Home</NavLink>
			</li>

			<li>
				<NavLink to="/search/player">Search Player</NavLink>
			</li>
		</ul>
	);
}

export default Navigation;