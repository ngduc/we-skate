import { h, Component } from 'preact';
import style from './style';

export default class Accessories extends Component {
	render () {
		return (
			<main class={style.main}>
				<h3>Accessories</h3>
				<div>
          Skateboarding is a fun, challenging, and healthy sport that we would like to see incorporated into young people’s lives (and the young at heart’s) as much as possible.  SF Skate Club currently offers four different programs catered to meet the varying schedules and needs of children and families throughout the year.  Summer Skate Camp and Saturday Program are for children ages 8-13, Teen Summer Camp is for youth age 12-15, private lessons and parties are open to ages 5 and older.  We hope you find something that works for you, and if not, give us a call anyways to see what we can do!
				</div>
			</main>
		);
	}
}
