import { h, Component } from 'preact';
import axios from 'axios';
import style from './style';

const API_URL = 'http://35.203.152.72:3000';

export default class Admin extends Component {
  state = {
  	signedIn: !!window.localStorage.getItem('token'),
  	email: '',
  	notes: '',
  	data: []
  }

  componentWillMount () {
  	this.loadData();
  }

  loadData = () => {
  	axios.get(API_URL + '/people').then(res => {
  		const data = res.data;
  		this.setState({ data });
  	});
  }

  onSubmitClick = () => {
  	const { email, notes } = this.state;
  	axios
  		.post(API_URL + '/notes', {
  			email,
  			notes
  		})
  		.then(res => {
  			console.log('res: ', res);
  			this.setState({ email: '', notes: '' });
  			this.loadData();
  		});
  }

  renderAdminContent () {
  	const { email, notes, data } = this.state;
  	return (
  		<div class={style.form}>
  			<label>Email</label>
  			<input
  				value={email}
  				onChange={ev => this.setState({ email: ev.target.value })}
  			/>
  			<label>Add Your Notes</label>
  			<input
  				value={notes}
  				onChange={ev => this.setState({ notes: ev.target.value })}
  			/>
  			<button type="button" onClick={this.onSubmitClick}>Submit</button>

  			<div>
  				{data.map(item => {
  					if (!item.notes) {
  						return null;
  					}
  					return (
  						<div class={style.row}>
  							<h5>{item.Email}</h5>
  							<span>{item.notes}</span>
  						</div>
  					);
  				})}
  			</div>
  		</div>
  	);
  }

  render () {
  	const { signedIn } = this.state;
  	return (
  		<main class={style.main}>
  			<h3>Admin</h3>
  			<div>Logged in user can Post some notes here.</div>
  			{signedIn ? this.renderAdminContent() : <div>Not Authorized.</div>}
  		</main>
  	);
  }
}
