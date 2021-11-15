export default class Shrine extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "shrine");

		scene.add.existing(this);
		scene.physics.add.existing(this, true);
		this.play({ key: "shrine.summon", repeat: -1 });
		this.stop().setFrame(0);
	}
}
