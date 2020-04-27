/**
 * @file             : Ball.js
 * @author           : Michael M.
 * Date              : 27.04.2020
 * Last Modified Date: 27.04.2020
 * Last Modified By  : Michael M.
 */
// ManyPong (c) by The MicMacro Group
//
// ManyPong is licensed under a
// Creative Commons Attribution-ShareAlike 4.0 International License.
//
// You should have received a copy of the license along with this
// work. If not, see <http://creativecommons.org/licenses/by-sa/4.0/>.

import p5 from "p5";
export default class Ball {
	constructor(p, startPos, startVel, controllers){
		this.p = p;
		this.paddle = controllers.paddle;
		this.incScore = controllers.score;
		this.die = controllers.die;

		this.d = (p.height > p.width ? p.height : p.width)/50;

		this.pos = startPos;
		this.vel = startVel;
	}

	show(){
		this.p.strokeWeight(1);
		this.p.fill(255);
		this.p.stroke(255);
		this.p.ellipse(this.pos.x, this.pos.y, this.d);
	}

	update(){
		let newLoc = p5.Vector.add(this.pos, this.vel);
		let dist = this.p.dist(this.pos.x, this.pos.y, newLoc.x, newLoc.y);
		for(let i = 0; i < dist; i++){
			this.pos.add(this.vel);
			this.handleCollision();
		}
	}

	handleCollision(){
		let ballx = this.pos.x;
		let bally = this.pos.y;
		let r = this.d/2;

		if(ballx + r >= this.p.width){
			this.vel.x *= -1;
		} else if(this.paddle.checkCollision(this)){
			this.pos.x = this.paddle.width + r + 1;	// "Teleport" ball away from paddle to avoid points forever
			this.vel.x *= -1;
			this.incScore(1);
		} else if(ballx - r <= 0){
			this.die();
		} else if(bally + r >= this.p.height || bally - r <= 0) {
			this.vel.y *= -1;
		}
	}
}
