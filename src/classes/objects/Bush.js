import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Bush extends Phaser.Physics.Arcade.Sprite {
	/**
	 * Creates an instance of Bush.
	 * @param {UpdatedScene} scene
	 * @param {number} x
	 * @param {number} y
	 * @memberof Bush
	 */
	constructor(scene, x, y) {
		super(scene, x, y, "bush");

		scene.add.existing(this);
		scene.physics.add.existing(this, true);

		scene.physics.add.overlap(scene.entities, this, (obj) => {
			if (
				Math.abs(obj.body.velocity.x) > 10 ||
				Math.abs(obj.body.velocity.y) > 10
			)
				this.play("bush.push", true);
		});

		this.setSize(24, 32).setOffset(12, 16).setDepth(1);
	}
}
