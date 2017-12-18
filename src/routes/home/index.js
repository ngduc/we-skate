import { h, Component } from 'preact';
import axios from 'axios';
import style from './style';

const API_URL = 'http://35.203.152.72:3000';

export default class Home extends Component {
  state = {
  	email: '',
  	password: '',
  	signedIn: !!window.localStorage.getItem('token'),
  	err: ''
  }

  onLoginClick = () => {
  	// #TODO: separate this out to a Service class to keep this file clean.
  	const { email, password } = this.state;
  	axios
  		.post(API_URL + '/login', {
  			email,
  			password
  		})
  		.then(res => {
  			console.log('res: ', res);
  			if (res && res.data) {
  				// #TODO: use Auth0 and get a real auth token.
  				window.localStorage.setItem('token', 'random!@#$%');
  				this.setState({ signedIn: true });
  			}
  			if (!res || res.data === '') {
  				this.setState({ err: 'Invalid Email or Password. Please try again.' });
  			}
  		});
  }

  onSignOutClick () {
  	window.localStorage.clear();
  	window.location.reload(true);
  }

  // #TODO: create SignIn component to keep this file clean.
  renderForm () {
  	const { signedIn, err } = this.state;
  	if (signedIn) {
  		return (
  			<div>
  				<button onClick={this.onSignOutClick}>Sign Out</button>
  			</div>
  		);
  	}
  	return (
  		<div class={style.form}>
  			<h4>Login</h4>
  			<label>Email</label>
  			<input onChange={ev => this.setState({ email: ev.target.value })} />
  			<label>Password</label>
  			<input
  				type="password"
  				onChange={ev => this.setState({ password: ev.target.value })}
  			/>
  			<button type="button" onClick={this.onLoginClick}>Login</button>

  			<form-error>{err}</form-error>
  		</div>
  	);
  }

  render () {
  	return (
  		<main class={style.main}>
  			<div class={style.cover}>
  				<h3>We Skate</h3>
  			</div>
  			<div class={style.content}>
  				<h4>Welcome</h4>
  				<p>
            San Francisco Skate Club strives to provide a safe, positive, and fun environment for youth of diverse backgrounds to pursue their passion or desire to skateboard, meet and form friendships with other young skaters, and learn from experienced skateboarders who are role models in the community.  We believe in children’s creativity, individuality, and openness to learn new things.  We nurture the ability to set goals and take risks in a safe environment.  Above all else, we strive to ensure that everyone in our community feels accepted, respected, and appreciated.
  				</p>

  				{this.renderForm()}
  			</div>
  			<footer>
  				<div>Company - Footer</div>
  				<div>Contact Us</div>
  			</footer>
  		</main>
  	);
  }
}
