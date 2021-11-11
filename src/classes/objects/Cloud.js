import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Cloud extends Phaser.Physics.Arcade.Sprite {
	strength = 20;

	/**
	 * Creates an instance of Cloud.
	 * @param {UpdatedScene} scene
	 * @param {number} x
	 * @param {number} y
	 * @memberof Cloud
	 */
	constructor(scene, x, y) {
		super(scene, x, y, "cloud");

		scene.add.existing(this);
		scene.physics.add.existing(this);

		scene.physics.add.collider(scene.entities, this, this.fall);

		this.setImmovable(true).setOffset(0, 17).body.setAllowGravity(false);
		this.body.checkCollision.down = false;
		this.body.checkCollision.left = false;
		this.body.checkCollision.right = false;
	}

	fall = (entity) => {
		if (this.body.touching.up) {
			this.strength -= 1;
			setTimeout(() => {
				if (!this.body.touching.up) this.strength = 20;
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
