import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken, refreshAuthToken } from '../../store/bungie_oauth_routes';
//import { authCodeParam } from '../HomePage';
import './Navigation.css';

const authCodeQuery = window.location.search;
const urlParams = new URLSearchParams(authCodeQuery);
export const authCodeParam = urlParams.get('code');

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();

	const token = useSelector((state) => state.auth["[object Object]"]);

	useEffect(() => {
        dispatch(getAuthToken(authCodeParam));

		if (token) {
			dispatch(refreshAuthToken(token?.refresh_token));
		} else if (localStorage.getItem("token")) {
			dispatch(refreshAuthToken(JSON.parse(localStorage.getItem("token")).refresh_token));
		}
    }, [authCodeParam, /*token,*/ dispatch]);

	if (token && token !== undefined) {
		localStorage.setItem("token", JSON.stringify(token));
	}

	if (localStorage.getItem("token")) {
		console.log('token', localStorage.getItem("token"));
	}

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

				{ (authCodeParam === null && !localStorage.getItem("token")) ? (
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