import Player from "./Player.js";

export default class TextBubble extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, text, noSweater = false) {
		super(scene, x, y, `chat.${text}`);

		scene.add.existing(this);
		scene.updateObj(this);

		this.setOrigin(1, 0.83).setDepth(2);
		this.noSweater = noSweater;
	}

	update() {
		if (!this.player) this.player = this.scene.player;

		this.setVisible(
			Phaser.Math.Distance.Between(
				this.x,
				this.y,
				this.player.x,
				this.player.y
			) <= 48 && (this.noSweater ? !Player.hasSweater : true)
		);
	}
}
