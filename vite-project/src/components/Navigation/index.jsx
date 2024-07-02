import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authCodeParam } from '../HomePage';
import './Navigation.css';

function Navigation({ isLoaded }) {
	//const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-root'>

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

			<ul className='nav-login'>

				{/* <li>
					<Link className='nav-option' to={`https://www.bungie.net/en/OAuth/Authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code`} >Sign In</Link>
				</li> */}

				{ (authCodeParam === null) ? (
					<li>
						<Link className='nav-option' to={`https://www.bungie.net/en/OAuth/Authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code`} >Sign In</Link>
					</li>
				) : (
					<li>
						<NavLink className='nav-option' to="/account" >Account</NavLink>
					</li>
				)}

			</ul>

		</div>
	);
}

export default Navigation;