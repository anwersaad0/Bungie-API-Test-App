import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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

			{/* <li>
				<Link className='nav-option' to="https://www.bungie.net/en/OAuth/Authorization" >Sign In</Link>
			</li> */}
		</ul>
	);
}

export default Navigation;