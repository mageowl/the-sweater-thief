import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	static SPEED = 125;
	static JUMP_HEIGHT = 200;

	hasSweater = true;

	/**
	 * Creates an instance of Player.
	 * @param {UpdatedScene} scene
	 * @param {number} x
	 * @param {number} y
	 * @memberof Player
	 */
	constructor(scene, x, y) {
		super(scene, x, y, "player");

		scene.add.existing(this);
		scene.physics.add.existing(this);
		scene.updateObj(this);

		this.keys = scene.input.keyboard.addKeys("W,A,S,D");
	}

	update() {
		const input = Object.fromEntries(
			Object.entries(this.keys).map(([name, { isDown }]) => [name, isDown])
		);

		// Movement
		this.setVelocityX((input.D - input.A) * Player.SPEED);
		if (input.W && this.body.onFloor()) {
			this.setVelocityY(-Player.JUMP_HEIGHT);
		}
	}
}
