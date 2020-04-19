// ManyPong (c) by The MicMacro Group
//
// ManyPong is licensed under a
// Creative Commons Attribution-ShareAlike 4.0 International License.
//
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-sa/4.0/>.

export default class Paddle {
	constructor(p){
		this.p = p;

		this.width = (this.p.width / 100) * 3;
		this.height = this.p.height / 4;
		this.pos = 0;
	}

	show(){
		// this.p.rect(0, this.pos, this.width, this.height);
		this.p.strokeWeight(5);
		this.p.stroke(0, 255, 0);
		this.p.line(this.width, this.pos, this.width, this.pos + this.height);
	}

	update(){
		this.pos = this.p.mouseY - (this.height/2);
	}

	checkCollision(ball){
		let ballx = ball.pos.x;
		let bally = ball.pos.y;
		let r = ball.d/2;

		if(ballx - r <= this.width && bally + r >= this.pos && bally - r <= this.pos + this.height){
			return true;
		} else {
			return false;
		}
	}
}