import { Woods, House, Town, Bridge } from "./classes/scenes/Levels.js";
import Load from "./classes/scenes/Load.js";
import Transition from "./classes/scenes/Transition.js";

const game = new Phaser.Game({
	type: Phaser.CANVAS,
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
		pixelArt: true,
		antialias: false
	},
	scene: [Load, House, Town, Woods, Bridge, Transition],
	backgroundColor: "#db604c"
});

game.scene.start("Transition");
