import Main from "./classes/scenes/main.js";

const game = new Phaser.Game({
	type: Phaser.AUTO,
	scale: {
		autoCenter: true,
		mode: Phaser.Scale.FIT,
		width: 960,
		height: 528
	},
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 400 },
			debug: false
		}
	},
	loader: {
		baseURL: "assets"
	},
	render: {
		pixelArt: true
	},
	scene: Main,
	backgroundColor: "#db604c"
});
