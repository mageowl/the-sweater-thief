import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	static SPEED = 125;
	static JUMP_HEIGHT = 200;
	static hasSweater = true;

	stun = 0;
	dead = false;

	/**
	 * Creates an instance of Player.
	 * @param {UpdatedScene} scene
	 * @param {number} x
	 * @param {number} y
	 * @memberof Player
	 */
	constructor(scene, spawnPoints, side) {
		super(scene, spawnPoints[side].x, spawnPoints[side].y, "player");

		scene.add.existing(this);
		scene.physics.add.existing(this);
		scene.updateObj(this);

		this.keys = scene.input.keyboard.addKeys("W,A,S,D");

		this.setSize(12, 23).setOffset(2, 9);
		this.spawn = spawnPoints;
		if (side === "end") this.setFlipX(true);
	}

	update() {
		const input = Object.fromEntries(
			Object.entries(this.keys).map(([name, { isDown }]) => [name, isDown])
		);

		if (this.stun > 0) {
			this.stun--;
			this.play("player.nosweater.stunned", true);
			if (this.body.onFloor()) this.setVelocityX(0);
			return;
		} else if (!this.dead) {
			// Movement
			this.setVelocityX((input.D - input.A) * Player.SPEED);
			if (input.W && this.body.onFloor()) {
				this.setVelocityY(-Player.JUMP_HEIGHT);
			}

			// Hazards
			const currentTile = this.scene.level.getTileAtWorldXY(
				this.x,
				this.y + this.height / 2 - 3
			);
			if (currentTile?.properties?.hazard) {
				// DIE!
				this.play("player.death").once("animationcomplete", () => {
					const respawn = this.spawn[Player.hasSweater ? "start" : "end"];
					this.setPosition(respawn.x, respawn.y);
					this.dead = false;
					this.setVelocity(0).setDepth(0).body.setAllowGravity(true);
				});
				this.dead = true;
				this.setVelocity(0).setDepth(2).body.setAllowGravity(false);

				return;
			}

			// Animation
			if (this.body.onFloor()) {
				if (input.D)
					this.play(
						`player.${Player.hasSweater ? "sweater" : "nosweater"}.run`,
						true
					);
				else if (input.A)
					this.play(
						`player.${Player.hasSweater ? "sweater" : "nosweater"}.run`,
						true
					);
				else
					this.play(
						`player.${Player.hasSweater ? "sweater" : "nosweater"}.idle`,
						true
					);
			} else {
				if (this.body.velocity.y < 0)
					this.play(
						`player.${Player.hasSweater ? "sweater" : "nosweater"}.jump.up`
					);
				else
					this.play(
						`player.${Player.hasSweater ? "sweater" : "nosweater"}.jump.down`
					);
			}

			if (input.D) this.setFlipX(false);
			else if (input.A) this.setFlipX(true);
		}

		// Change level
		if (this.x > this.scene.level.tilemap.widthInPixels) {
			this.scene.nextLevel();
		}
		if (this.x < 0) {
			this.scene.prevLevel();
		}
	}
}
