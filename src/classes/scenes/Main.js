import { getProperty } from "../../util.js";
import Cloud from "../objects/Cloud.js";
import Otis from "../objects/Otis.js";
import Player from "../objects/Player.js";
import Shrine from "../objects/Shrine.js";
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
		this.load.aseprite(
			"player_no_sweater",
			"sprites/player/player_no_sweater.png",
			"sprites/player/player_no_sweater.json"
		);
		this.load.aseprite(
			"otis_sweater",
			"sprites/otis/otis_sweater.png",
			"sprites/otis/otis_sweater.json"
		);
		this.load.spritesheet("player_death", "sprites/player/player_death.png", {
			frameWidth: 32,
			frameHeight: 48
		});

		this.load.spritesheet("cloud", "sprites/tileset/platform_cloud.png", {
			frameWidth: 48,
			frameHeight: 32
		});
		this.load.spritesheet("shrine", "sprites/tileset/shrine.png", {
			frameWidth: 32
		});

		this.load.image("tileset", "sprites/tileset/tileset.png");
		this.load.image("control", "sprites/tileset/control.png");

		this.load.tilemapTiledJSON("playground", "tilemap/playground.json");
	}

	create() {
		// Animations
		this.createAnimations();

		// Groups
		this.entities = this.add.group();

		// Tilemap
		const world = this.add.tilemap("playground");
		world.addTilesetImage("Level", "tileset");
		world.addTilesetImage("Control", "control");

		const { shrines, spawnPoints } = this.createTilemap(world);

		// Player
		const player = new Player(this, spawnPoints, "start");
		this.entities.add(player);

		// Otis
		let otis;
		setTimeout(() => {
			otis = new Otis(this, shrines.start.x, shrines.start.y, player, shrines);
			this.entities.add(otis);
		}, 2000);

		this.physics.add.collider(this.entities, this.level);

		this.cameras.main
			.setZoom(3)
			.startFollow(player)
			.setBounds(0, 0, world.widthInPixels, world.heightInPixels);
	}

	createAnimations() {
		this.anims.createFromAseprite("player");
		this.anims.createFromAseprite("otis");
		this.anims.createFromAseprite("player_no_sweater");
		this.anims.createFromAseprite("otis_sweater");
		this.anims.create({
			key: "shrine.summon",
			frames: this.anims.generateFrameNumbers("shrine", {
				frames: [1, 2, 3, 4, 5, 6, 7]
			}),
			frameRate: 10
		});
		this.anims.create({
			key: "player.death",
			frames: this.anims.generateFrameNumbers("player_death", {
				frames: [0, 2, 3, 4, 5, 6, 7]
			}),
			frameRate: 10
		});
	}

	/**
	 * Create Tilemap layers
	 *
	 * @param {Phaser.Tilemaps.Tilemap} world
	 * @return {*}
	 * @memberof Main
	 */
	createTilemap(world) {
		this.level = world
			.createLayer("level", "Level", 0, 0)
			.setCollisionByProperty({ collision: true })
			.setDepth(1);
		this.level.forEachTile((t) => {
			if (t.index >= 249 && t.index <= 251) t.collideDown = true;
		});

		const background = world.createLayer("background", "Level", 0, 0);

		this.jumps = world.createLayer("jumps", "Control", 0, 0).setVisible(false);

		const shrines = { start: null, end: null };
		const spawnPoints = { start: null, end: null };

		const objects = world.getObjectLayer("objects");
		objects.objects.forEach(
			({ type, x, y, width, height, properties, name }) => {
				switch (type) {
					case "cloud": {
						new Cloud(this, x + width / 2, y + height / 2);
						break;
					}
					case "shrine": {
						console.log(properties);
						shrines[getProperty(properties, "start") ? "start" : "end"] =
							new Shrine(this, x + width / 2, y + height / 2);
						break;
					}
					case "player-spawn": {
						spawnPoints[name] = { x, y: y - 16 };
					}
				}
			}
		);

		return { shrines, spawnPoints };
	}
}
