import { getProperty } from "../../util.js";
import Cloud from "../objects/Cloud.js";
import Otis from "../objects/Otis.js";
import Player from "../objects/Player.js";
import Shrine from "../objects/Shrine.js";
import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Main extends UpdatedScene {
	tilemap = "playground";
	parallax = "town";
	levels = {
		next: "house"
	};

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

		this.load.image("paralax.clouds.1", "sprites/parallax/clouds_1.png");
		this.load.image("paralax.clouds.2", "sprites/parallax/clouds_2.png");
		this.load.image("paralax.sky", "sprites/parallax/sky_gradient.png");
		this.load.image("paralax.sun", "sprites/parallax/sun.png");
		this.load.image("paralax.town", "sprites/parallax/town_background.png");
		this.load.image("paralax.woods", "sprites/parallax/forest_background.png");
		this.load.image(
			"paralax.forest.foreground",
			"sprites/parallax/trees_foreground.png"
		);
		this.load.image(
			"paralax.forest.midground",
			"sprites/parallax/trees_midground.png"
		);
		this.load.image(
			"paralax.forest.background",
			"sprites/parallax/trees_background.png"
		);

		this.load.tilemapTiledJSON("tilemap", `tilemap/${this.tilemap}.json`);
	}

	create() {
		// Animations
		this.createAnimations();

		// Groups
		this.entities = this.add.group();

		// Tilemap
		const world = this.add.tilemap("tilemap");
		world.addTilesetImage("Level", "tileset");
		world.addTilesetImage("Control", "control");

		const { shrines, spawnPoints } = this.createTilemap(world);

		// Paralax
		this.createParalax();

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
			.startFollow(player, false, 0.15, 0.15)
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
			.setCollisionByProperty({ collision: true });
		this.level.forEachTile((t) => {
			if (t.index >= 254 && t.index <= 256) {
				t.collideUp = true;
				t.faceTop = true;
			}
		});

		const background1 = world
			.createLayer("background1", "Level", 0, 0)
			.setDepth(-1);
		const background2 = world
			.createLayer("background2", "Level", 0, 0)
			.setDepth(-2);

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

	createParalax() {
		if (this.parallax === "town") {
			this.add
				.tileSprite(
					160,
					0,
					this.level.tilemap.widthInPixels,
					32,
					"paralax.clouds.1"
				)
				.setOrigin(0)
				.setDepth(-3)
				.setScrollFactor(0.5, 1);
			this.add
				.tileSprite(
					192,
					0,
					this.level.tilemap.widthInPixels,
					48,
					"paralax.clouds.2"
				)
				.setOrigin(0)
				.setDepth(-4)
				.setScrollFactor(0.4, 1);
			this.add
				.tileSprite(320, 0, this.level.tilemap.widthInPixels, 64, "paralax.sky")
				.setOrigin(0)
				.setDepth(-6)
				.setScrollFactor(0, 1);
			this.add
				.image(550, 30, "paralax.sun")
				.setScrollFactor(0.1, 1)
				.setDepth(-5);
			this.add
				.tileSprite(
					192,
					this.level.tilemap.heightInPixels - 48,
					this.level.tilemap.widthInPixels,
					64,
					"paralax.town"
				)
				.setOrigin(0, 1)
				.setDepth(-4)
				.setScrollFactor(0.4, 1);
			this.add
				.tileSprite(
					160,
					this.level.tilemap.heightInPixels,
					this.level.tilemap.widthInPixels,
					80,
					"paralax.woods"
				)
				.setOrigin(0, 1)
				.setDepth(-4)
				.setScrollFactor(0.5, 1);
		} else if (this.parallax === "forest") {
			this.add
				.tileSprite(
					0,
					this.level.tilemap.heightInPixels - 48,
					this.level.tilemap.widthInPixels,
					160,
					"paralax.forest.foreground"
				)
				.setOrigin(0, 1)
				.setDepth(-3);
			this.add
				.tileSprite(
					80,
					this.level.tilemap.heightInPixels - 48,
					this.level.tilemap.widthInPixels,
					160,
					"paralax.forest.midground"
				)
				.setOrigin(0, 1)
				.setScrollFactor(0.75, 1)
				.setDepth(-4);
			this.add
				.tileSprite(
					160,
					this.level.tilemap.heightInPixels - 48,
					this.level.tilemap.widthInPixels,
					160,
					"paralax.forest.background"
				)
				.setOrigin(0, 1)
				.setScrollFactor(0.6, 1)
				.setDepth(-5);
		}
	}
}
