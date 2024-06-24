import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';

function Navigation({ isLoaded }){
	//const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-container'>
			<li>
				<NavLink className={"nav-option"} to="/">Home</NavLink>
			</li>

			<li>
				<NavLink className={"nav-option"} to="/search/player">Search Player</NavLink>
			</li>

			<li>
				<NavLink className={"nav-option"} to="/search/item">Search Item</NavLink>
			</li>
		</ul>
	);
}

export default Navigation;