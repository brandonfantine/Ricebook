import { HashLink } from 'react-router-hash-link';

import AXIOS from '../Axios';

export default function Menu(props) {
	return (
		<nav id="menu">
			<div className='menu-left'>
				<HashLink to="/main" id="logo" onClick={() => window.scrollTo(0, 0)}><p id="logo-home">Home</p></HashLink>
			</div>
			<div className='menu-right'>
				<HashLink to="/profile" onClick={() => window.scrollTo(0, 0)}><button className='action'>My Profile</button></HashLink>
				<HashLink to="/" onClick={() => {AXIOS.put('/logout'); sessionStorage.clear() }}><button className='action-blank'>Log Out</button></HashLink>
			</div>
		</nav>
	)
}