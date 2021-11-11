import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Cloud extends Phaser.Physics.Arcade.Sprite {
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

		scene.physics.add.collider(scene.entities, this);

		this.setImmovable(true).setOffset(0, 17).body.setAllowGravity(false);
		this.body.checkCollision.down = false;
		this.body.checkCollision.left = false;
		this.body.checkCollision.right = false;
	}
}
