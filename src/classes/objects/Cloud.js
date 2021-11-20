import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Cloud extends Phaser.Physics.Arcade.Sprite {
	strength = 20;
	xPos = 0;

	/**
	 * Creates an instance of Cloud.
	 * @param {UpdatedScene} scene
	 * @param {number} x
	 * @param {number} y
	 * @memberof Cloud
	 */
	constructor(scene, x, y) {
		super(scene, x, y, "cloud");

		this.xPos = x;

		scene.add.existing(this);
		scene.physics.add.existing(this, true);

		scene.physics.add.collider(scene.entities, this, this.fall);

		this.setOffset(0, 17);
		this.body.checkCollision.down = false;
		this.body.checkCollision.left = false;
		this.body.checkCollision.right = false;
	}

	/**
	 * @param {Phaser.Physics.Arcade.Sprite} entity
	 */
	fall = (entity) => {
		if (
			entity.y + entity.height / 2 - 5 < this.y &&
			entity.constructor.hasSweater
		) {
			this.strength -= 1;
			this.x = this.xPos + Math.sin(this.strength / 1.5) * 2.5;
			setTimeout(() => {
				if (!this.body.touching.up) {
					this.strength = 20;
					this.x = this.xPos;
				}
			}, 100);
			if (this.strength === 0) {
				this.body.checkCollision.none = true;
				setTimeout(() => {
					this.strength = 20;
					this.body.checkCollision.none = false;
				}, 1000);
			}
		}
	};
}
