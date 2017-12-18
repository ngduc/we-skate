import { h, Component } from 'preact';
import style from './style';

export default class Boards extends Component {
	render () {
		return (
			<main class={style.main}>
				<h3>Boards</h3>
				<div>
          San Francisco Skate Club was created when long-time skateboarder, Shawn Connolly and educator, Thuy Nguyen realized the need for a positive skateboarding program for youth. The two skateboard enthusiasts combined their skills, experiences, and ideas to create a program where budding skaters can pursue their love of skateboarding in a safe, guided, and supervised environment.

          Shawn has over twenty years of skateboarding knowledge. He has appeared in Slap, Thrasher and Transworld magazines and his sponsors include Circle-A Skateboards, Venture Trucks, Roughneck Hardware, Rock Star Bearings and FTC Skate shop. Originally from the northeast state of Maine, where good skate spots are hard to find, Shawn loves and appreciates the abundance of skate spots the Bay Area has to offer.  Shawn enjoys sharing the art of skateboarding and believes that it is one of the few “sports” that teaches real patience and determination, allows for limitless growth, and nurtures individuality at the same time.

          Thuy Nguyen is a multiple-subject credentialed teacher with a Master’s Degree in Education.  Since 1998, she has worked with children and youth in San Francisco in many different capacities, including as an Elementary School Teacher, Resource Specialist, Professional Mentor for a national non-profit, and as the Director of a community-based youth development organization.  Throughout all of her teaching and mentoring experiences, Thuy has recognized the importance of helping children identify and pursue their interests and passions, which she often refers to as “sparks.”  She believes that every person has an inner spark that motivates them to “rise and shine” in the world.  Thuy and her partner, Shawn are grateful and fortunate to have discovered their mutual spark for finding creative ways through skateboarding to nurture children's strengths.
				</div>
			</main>
		);
	}
}
