export default class Shrine extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "shrine");

		scene.add.existing(this);
		scene.physics.add.existing(this, true);
	}
}
