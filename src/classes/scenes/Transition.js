import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Transition extends UpdatedScene {
	/** @type {Transition} */
	static instance;

	/** @type {Phaser.GameObjects.Rectangle[]} */
	blocks = [];

	constructor() {
		super();
		Transition.instance = this;
	}

	create() {
		this.blocks = [];

		for (let y = 0; y < 11; y++) {
			for (let x = 0; x < 20; x++) {
				this.blocks.push(
					this.add
						.rectangle(x * 48 + 24, y * 48 + 24, 0, 0, 0x000000)
						.setOrigin(0.5)
				);
			}
		}
	}

	static right() {
		return new Promise((resolve) => {
			this.instance.blocks.forEach((block, i) => {
				block.setSize(1, 1);
				this.instance.tweens.add({
					targets: block,
					delay: (i % 20) * 50,
					duration: 100,
					scale: 48,
					x: block.x - 24,
					y: block.y - 24
				});
			});
			setTimeout(() => {
				resolve();
				setTimeout(() => {
					this.instance.blocks.forEach((block, i) => {
						this.instance.tweens.add({
							targets: block,
							delay: (i % 20) * 50,
							duration: 100,
							scale: 1,
							x: block.x + 24,
							y: block.y + 24,
							onComplete() {
								block.setSize(0, 0);
							}
						});
					});
				}, 100);
			}, 1080);
		});
	}
}
