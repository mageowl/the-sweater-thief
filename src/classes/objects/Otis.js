import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Otis extends Phaser.Physics.Arcade.Sprite {
	static SPEED = 100;
	static JUMP_HEIGHT = 200;
	static currentLevel = null;

	hasSweater = false;
	stun = 0;
	teleporting = false;

	/**
	 * Creates an instance of Otis.
	 * @param {UpdatedScene} scene
	 * @param {number} x
	 * @param {number} y
	 * @memberof Otis
	 */
	constructor(scene, x, y, player, shrines) {
		super(scene, x, y, "otis");

		scene.add.existing(this);
		scene.physics.add.existing(this);
		scene.updateObj(this);

		this.player = player;
		this.shrines = shrines;
		this.setSize(8, 16).setOffset(4, 16);
	}

	update() {
		if (this.stun > 0) {
			this.stun--;
			this.setVelocityX(0);
			this.play("otis.nosweater.stunned", true);
			return;
		} else if (!this.teleporting) {
			if (!this.hasSweater) {
				// Movement
				const diff = this.player.x - this.x;
				if (Math.abs(diff) > 30 || Math.abs(this.player.y - this.y) < 10) {
					this.setVelocityX(Math.sign(diff) * Otis.SPEED);
				} else if (Math.abs(diff) > 20) {
					this.setVelocityX(Math.sign(diff) * (Otis.SPEED / 2));
				}

				const jumpTile = this.scene.jumps.getTileAtWorldXY(
					this.x,
					this.y
				)?.index;
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
				if (this.scene.physics.overlap(this, this.player)) {
					this.hasSweater = true;
					this.player.hasSweater = false;
					this.player.stun = 45;
					this.setTexture("otis_sweater");
					this.player.setTexture("player_no_sweater");
				}
			} else {
				// Movement
				const diff = this.shrines.start.x - this.x;
				if (
					Math.abs(diff) > 30 ||
					Math.abs(this.shrines.start.y - this.y) < 10
				) {
					this.setVelocityX(Math.sign(diff) * Otis.SPEED);
				} else if (Math.abs(diff) > 20) {
					this.setVelocityX(Math.sign(diff) * (Otis.SPEED / 2));
				}

				const jumpTile = this.scene.jumps.getTileAtWorldXY(
					this.x,
					this.y
				)?.index;
				if (
					(((jumpTile === 1 || jumpTile === 3) &&
						this.x < this.shrines.start.x) ||
						((jumpTile === 2 || jumpTile === 4) &&
							this.x > this.shrines.start.x)) &&
					(jumpTile === 3 || jumpTile === 4
						? this.shrines.start.y + 25 < this.y
						: true) &&
					this.body.onFloor()
				) {
					this.setVelocityY(-Otis.JUMP_HEIGHT);
				}

				// Steal Sweater
				if (
					this.scene.physics.overlap(this, this.player) &&
					!this.player.stun > 0
				) {
					this.hasSweater = false;
					this.player.hasSweater = true;
					this.setTexture("otis");
					this.player.setTexture("player");
					this.stun = 60;
				}

				// Exit level
				if (
					this.scene.physics.overlap(this, this.shrines.start) &&
					Math.abs(this.shrines.start.x - this.x) < 10
				) {
					this.teleporting = true;
					this.setVelocity(0).play("otis.sweater.idle");
					this.shrines.start
						.play("shrine.summon", true)
						.once("animationcomplete", () => {
							this.currentLevel = new Otis.currentLevel().levels.prev;
							this.shrines.start.setFrame(0);
							this.scene.removeUpdate(this);
							this.destroy();
						});
				}
			}

			// Animation
			const xDir = Math.sign(this.body.velocity.x);

			if (this.body.onFloor()) {
				if (xDir !== 0)
					this.play(
						`otis.${this.hasSweater ? "sweater" : "nosweater"}.run`,
						true
					);
			} else {
				if (this.body.velocity.y < 0)
					this.play(
						`otis.${this.hasSweater ? "sweater" : "nosweater"}.jump.up`
					);
				else
					this.play(
						`otis.${this.hasSweater ? "sweater" : "nosweater"}.jump.down`
					);
			}

			if (xDir === 1) this.setFlipX(false);
			else if (xDir === -1) this.setFlipX(true);
		}
	}
}
