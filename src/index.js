import Main from "./classes/scenes/main.js";

const game = new Phaser.Game({
	type: Phaser.AUTO,
	scale: {
		autoCenter: true,
		mode: Phaser.Scale.FIT,
		width: 1280,
		height: 720
	},
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 400 },
			debug: true
		}
	},
	loader: {
		baseURL: "assets"
	},
	render: {
		pixelArt: true
	},
	scene: Main,
	backgroundColor: "#333333"
});
