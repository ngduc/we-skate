import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
	render () {
		return (
			<header class={style.header}>
				<h1>
					<Link activeClassName={style.active} href="/">Aegean Skates</Link>
				</h1>
				<nav>
					<Link activeClassName={style.active} href="/boards">Boards</Link>
					<Link activeClassName={style.active} href="/accessories">
            Accessories
					</Link>
					<Link activeClassName={style.active} href="/community">
            Community
					</Link>
					<Link activeClassName={style.active} href="/support">Support</Link>
					<Link activeClassName={style.active} href="/sales">Sales</Link>
					<Link activeClassName={style.active} href="/admin">Admin</Link>
				</nav>
			</header>
		);
	}
}
