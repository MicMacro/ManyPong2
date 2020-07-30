/**
 * @file             : index.js
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
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

let sketch = function (p) {
	let paddle;
	let score;
	let shorterDim;
	let balls;
	let dead;

	let ball_creation_count;

	p.setup = function () {
		p.createCanvas(p.windowWidth, p.windowHeight);
		p.noCursor();
		paddle = new Paddle(p);
		score = 0;
		dead = false;
		shorterDim = p.height > p.width ? p.height : p.width;
		balls = [];
		ball_creation_count = 0;
	};

	p.draw = function () {
		p.background(0, dead ? 200 : 255);

		if (dead) {
			p.strokeWeight(1);
			p.fill(255, 0, 0);
			p.stroke(255, 0, 0);
			p.textSize(shorterDim / 20);
			p.textAlign(p.CENTER, p.CENTER);
			p.text("Game Over", 0, 0, p.width, p.height / 2);
			p.textSize(shorterDim / 40);
			p.text(
				"Press R to Restart",
				0,
				0,
				p.width,
				p.height / 2 + (shorterDim / 20) * 1.5
			);
			p.cursor(p.ARROW);

			p.noLoop();
			return;
		}

		p.strokeWeight(1);
		p.fill(255, 100);
		p.stroke(255, 100);
		p.textSize(shorterDim / 40);
		p.textAlign(p.CENTER, p.CENTER);
		p.text(`Score: ${score}`, 0, 0, p.width, shorterDim / 14);

		balls.forEach((ball) => {
			ball.show();
			ball.update();
		});

		paddle.show();

		if (ball_creation_count >= p.frameRate()) {
			balls.push(
				new Ball(
					p,
					p.createVector(p.width / 2, p.height / 2),
					p.createVector(p.random(-1.5, -1), p.random(-1.5, 1.5)),
					{
						paddle: paddle,
						score: (amount) => (score += amount),
						die: () => (dead = true),
					}
				)
			);
			ball_creation_count = 0;
		} else {
			ball_creation_count++;
		}
	};

	p.mouseMoved = function () {
		paddle.update();
	};

	p.keyPressed = function () {
		if (p.keyCode == 82 && dead == true) {
			p.background(0);
			balls = [];
			dead = false;
			score = 0;
			p.loop();
			p.noCursor();
		}
	};
};

new p5(sketch);
