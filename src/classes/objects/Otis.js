import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Otis extends Phaser.Physics.Arcade.Sprite {
	static SPEED = 75;
	static JUMP_HEIGHT = 200;

	hasSweater = false;

	/**
	 * Creates an instance of Otis.
	 * @param {UpdatedScene} scene
	 * @param {number} x
	 * @param {number} y
	 * @memberof Otis
	 */
	constructor(scene, x, y, player) {
		super(scene, x, y, "otis");

		scene.add.existing(this);
		scene.physics.add.existing(this);
		scene.updateObj(this);

		this.setScale(0.5);
		this.player = player;
	}

	update() {
		if (!this.hasSweater) {
			// Movement
			const diff = this.player.x - this.x;
			if (Math.abs(diff) > 30 || Math.abs(this.player.y - this.y) < 10)
				this.setVelocityX(Math.sign(diff) * Otis.SPEED);
			else if (Math.abs(diff) > 20)
				this.setVelocityX(Math.sign(diff) * (Otis.SPEED / 2));
			if (
				((this.scene.jumps.getTileAtWorldXY(this.x, this.y)?.index === 7 &&
					this.player.x > this.x) ||
					(this.scene.jumps.getTileAtWorldXY(this.x, this.y)?.index === 6 &&
						this.player.x < this.x)) &&
				this.player.y < this.y &&
				this.body.onFloor()
			) {
				this.setVelocityY(-Otis.JUMP_HEIGHT);
			}

			// Steal Sweater
			if (this.scene.physics.collide(this, this.player)) {
				this.hasSweater = true;
				this.player.hasSweater = false;
				console.log("Otis: I GOT UR SWEATER BRUH");
			}
		} else {
			this.setVelocityX(0);
		}
	}
}
