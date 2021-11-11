import Otis from "../objects/Otis.js";
import Player from "../objects/Player.js";
import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Main extends UpdatedScene {
	preload() {
		this.load.aseprite(
			"player",
			"sprites/player/player.png",
			"sprites/player/player.json"
		);

		this.load.image("tileset", "sprites/tileset/tileset.png");
		this.load.image("control", "sprites/tileset/control.png");

		this.load.tilemapTiledJSON("playground", "tilemap/playground.json");
	}

	create() {
		// Animations
		this.anims.createFromAseprite("player");

		// Create stuff
		const entities = this.add.group();

		const world = this.add.tilemap("playground");
		world.addTilesetImage("Level", "tileset");
		world.addTilesetImage("Control", "control");
		this.level = world
			.createLayer("ground", "Level", 0, 0)
			.setCollisionByProperty({ collision: true });
		const background = world.createLayer("background", "Level", 0, 0);
		this.jumps = world.createLayer("jumps", "Control", 0, 0).setVisible(false);

		const player = new Player(this, 0, 0);
		let otis;
		setTimeout(() => {
			otis = new Otis(this, 0, 0, player);
			entities.add(otis);
		}, 2000);

		entities.add(player);

		this.physics.add.collider(entities, this.level);

		console.log(Math.max(world.heightInPixels - 10, 0));
		this.cameras.main
			.setZoom(3)
			.startFollow(player)
			.setBounds(
				0,
				Math.max(world.heightInPixels - 240),
				world.widthInPixels,
				world.heightInPixels
			);
	}
}
