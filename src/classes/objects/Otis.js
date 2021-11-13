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

		this.player = player;
		this.setSize(8, 16).setOffset(4, 16);
	}

	update() {
		const dir = { right: false, left: false };

		if (!this.hasSweater) {
			// Movement
			const diff = this.player.x - this.x;
			if (Math.abs(diff) > 30 || Math.abs(this.player.y - this.y) < 10) {
				this.setVelocityX(Math.sign(diff) * Otis.SPEED);
				dir[diff > 0 ? "right" : "left"] = true;
			} else if (Math.abs(diff) > 20) {
				this.setVelocityX(Math.sign(diff) * (Otis.SPEED / 2));
				dir[diff > 0 ? "right" : "left"] = true;
			}

			const jumpTile = this.scene.jumps.getTileAtWorldXY(this.x, this.y)?.index;
			if (
				(((jumpTile === 1 || jumpTile === 3) && this.x < this.player.x) ||
					((jumpTile === 2 || jumpTile === 4) && this.x > this.player.x)) &&
				(jumpTile === 3 || jumpTile === 4
					? this.player.y + 25 < this.y
					: true) &&
				this.body.onFloor()
			) {
				this.setVelocityY(-Otis.JUMP_HEIGHT);
			}

			// Steal Sweater
			if (this.scene.physics.collide(this, this.player) && !this.hasSweater) {
				this.hasSweater = true;
				this.player.hasSweater = false;
				console.log("Otis: I GOT UR SWEATER BRUH");
			}
		} else {
			this.setVelocityX(0);
		}

		// Animation
		if (this.body.onFloor()) {
			if (dir.right) this.play("otis.run", true);
			else if (dir.left) this.play("otis.run", true);
			else this.play("otis.idle", true);
		} else {
			if (this.body.velocity.y < 0) this.play("otis.jump.up");
			else this.play("otis.jump.down");
		}

		if (dir.right) this.setFlipX(false);
		else if (dir.left) this.setFlipX(true);

		this.setTint(this.hasSweater ? 0xaa0000 : 0xffffff);
	}
}
