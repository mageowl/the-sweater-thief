import Cloud from "../objects/Cloud.js";
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
		this.load.aseprite(
			"otis",
			"sprites/otis/otis.png",
			"sprites/otis/otis.json"
		);

		this.load.image("cloud", "sprites/tileset/platform_cloud.png");

		this.load.image("tileset", "sprites/tileset/tileset.png");
		this.load.image("control", "sprites/tileset/control.png");

		this.load.tilemapTiledJSON("playground", "tilemap/playground.json");
	}

	create() {
		// Animations
		this.anims.createFromAseprite("player");
		this.anims.createFromAseprite("otis");

		// Groups
		this.entities = this.add.group();

		// Tilemap
		const world = this.add.tilemap("playground");
		world.addTilesetImage("Level", "tileset");
		world.addTilesetImage("Control", "control");
		this.level = world
			.createLayer("level", "Level", 0, 0)
			.setCollisionByProperty({ collision: true });

		const background = world.createLayer("background", "Level", 0, 0);

		this.jumps = world.createLayer("jumps", "Control", 0, 0).setVisible(false);

		const platforms = world.getObjectLayer("objects");
		platforms.objects.forEach(({ type, x, y, width, height }) => {
			switch (type) {
				case "cloud":
					new Cloud(this, x + width / 2, y + height / 2);
			}
		});

		// Player
		const player = new Player(this, 0, 0);
		this.entities.add(player);

		// Otis
		let otis;
		setTimeout(() => {
			otis = new Otis(this, 0, 0, player);
			this.entities.add(otis);
		}, 2000);

		this.physics.add.collider(this.entities, this.level);

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
