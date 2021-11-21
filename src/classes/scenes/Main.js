import { getProperty } from "../../util.js";
import Bush from "../objects/Bush.js";
import Cloud from "../objects/Cloud.js";
import Otis from "../objects/Otis.js";
import Player from "../objects/Player.js";
import Shrine from "../objects/Shrine.js";
import UpdatedScene from "../template/scenes/UpdatedScene.js";
import Transition from "./Transition.js";
import TextBubble from "../objects/TextBubble.js";

export default class Main extends UpdatedScene {
	tilemap = "playground";
	parallax = "none";
	levels = {
		prev: null,
		next: null
	};
	started = false;

	preload() {
		this.load.tilemapTiledJSON(this.tilemap, `tilemap/${this.tilemap}.json`);
	}

	create() {
		// Animations
		this.createAnimations();

		// Groups
		this.entities = this.add.group();

		// Tilemap
		const world = this.add.tilemap(this.tilemap);
		world.addTilesetImage("Level", "tileset");
		world.addTilesetImage("Control", "control");

		const { shrines, spawnPoints } = this.createTilemap(world);

		// Paralax
		this.createParalax();

		// Player
		this.player = new Player(this, spawnPoints, this.scene.settings.data.side);
		this.entities.add(this.player);

		// Otis
		if (Otis.currentLevel.name === this.constructor.name) {
			let otis;
			setTimeout(() => {
				otis = new Otis(
					this,
					shrines[this.scene.settings.data.side].x,
					shrines[this.scene.settings.data.side].y,
					this.player,
					shrines
				);
				this.entities.add(otis);
			}, 2000);
		}

		// COLLISION
		this.physics.add.collider(this.entities, this.level);

		// Camera
		this.cameras.main
			.setZoom(3)
			.startFollow(this.player, false, 0.15, 0.15)
			.setBounds(0, 0, world.widthInPixels, world.heightInPixels);

		// Bounds
		this.physics.world.setBounds(
			0,
			0,
			world.widthInPixels,
			world.heightInPixels
		);
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
			frames: "player_death",
			frameRate: 10
		});
		this.anims.create({
			key: "house",
			frames: "house",
			frameRate: 10
		});
		this.anims.create({
			key: "bush.push",
			frames: "bush",
			frameRate: 10
		});
		this.anims.create({
			key: "balloons",
			frames: this.anims.generateFrameNumbers("balloons", {
				frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			}),
			frameRate: 10
		});
		this.anims.create({
			key: "campfire",
			frames: "campfire",
			frameRate: 10
		});
		this.anims.create({
			key: "boom_box",
			frames: "boom_box",
			frameRate: 10
		});
		this.anims.create({
			key: "party_balloons",
			frames: "party_balloons",
			frameRate: 10
		});

		this.anims.create({
			key: "npc_cocoa_dude_left",
			frames: "npc_cocoa_dude_left",
			frameRate: 10
		});
		this.anims.create({
			key: "npc_cocoa_dude_right",
			frames: "npc_cocoa_dude_right",
			frameRate: 10
		});
		this.anims.create({
			key: "npc_cocoa_lady_right",
			frames: "npc_cocoa_lady_right",
			frameRate: 10
		});
		this.anims.create({
			key: "npc_dancing_dude_left",
			frames: "npc_dancing_dude_left",
			frameRate: 10
		});
		this.anims.create({
			key: "npc_dancing_dude_right",
			frames: "npc_dancing_dude_right",
			frameRate: 10
		});
		this.anims.create({
			key: "npc_dancing_lady_left",
			frames: "npc_dancing_lady_left",
			frameRate: 10
		});
		this.anims.create({
			key: "npc_dancing_lady_right",
			frames: "npc_dancing_lady_right",
			frameRate: 10
		});
		this.anims.create({
			key: "npc_idle_lady_left",
			frames: "npc_idle_lady_left",
			frameRate: 10
		});
		this.anims.create({
			key: "npc_bouncer",
			frames: "npc_bouncer",
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
			if (t.properties.oneWay) {
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
						break;
					}
					case "house": {
						this.add
							.sprite(x, y, "house")
							.setOrigin(0, 0)
							.play({ key: "house", repeat: -1 })
							.setDepth(-1);
						break;
					}
					case "bush": {
						new Bush(this, x + width / 2, y + height / 2);
						break;
					}
					case "balloons": {
						this.add
							.sprite(x, y, "balloons")
							.setOrigin(0)
							.play({ key: "balloons", repeat: -1 });
						break;
					}
					case "npc": {
						this.add
							.sprite(x, y, "npc")
							.setOrigin(0)
							.play({ key: getProperty(properties, "sprite"), repeat: -1 });
						if (getProperty(properties, "bouncer")) {
							new TextBubble(this, x, y, "no_sweater");
						}
						break;
					}
					case "fire": {
						this.add
							.sprite(x, y, "campfire")
							.setOrigin(0)
							.play({ key: "campfire", repeat: -1 });
						break;
					}
					case "boom_box": {
						this.add
							.sprite(x, y, "boom_box")
							.setOrigin(0)
							.play({ key: "boom_box", repeat: -1 });
						break;
					}
					case "party_balloons": {
						this.add
							.sprite(x, y, "party_balloons")
							.setOrigin(0)
							.play({ key: "party_balloons", repeat: -1 });
						break;
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
					this.level.tilemap.heightInPixels - 176,
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
					this.level.tilemap.heightInPixels - 176,
					this.level.tilemap.widthInPixels,
					48,
					"paralax.clouds.2"
				)
				.setOrigin(0)
				.setDepth(-4)
				.setScrollFactor(0.4, 1);
			this.add
				.tileSprite(
					320,
					this.level.tilemap.heightInPixels - 176,
					this.level.tilemap.widthInPixels,
					64,
					"paralax.sky"
				)
				.setOrigin(0)
				.setDepth(-6)
				.setScrollFactor(0, 1);
			this.add
				.image(550, this.level.tilemap.heightInPixels - 146, "paralax.sun")
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
			if (this.level.tilemap.heightInPixels > 176) {
				this.add
					.rectangle(
						0,
						0,
						this.level.tilemap.widthInPixels,
						this.level.tilemap.heightInPixels - 175,
						0x5e2052
					)
					.setOrigin(0)
					.setDepth(-3);
			}
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
			if (this.level.tilemap.heightInPixels > 176) {
				this.add
					.rectangle(
						0,
						0,
						this.level.tilemap.widthInPixels,
						this.level.tilemap.heightInPixels - 175,
						0x271854
					)
					.setOrigin(0)
					.setDepth(-3);
			}
		}
	}

	nextLevel() {
		this.scene.pause(this.constructor.name);
		if (Otis.currentLevel.name === this.constructor.name) {
			Otis.currentLevel = this.levels.next;
		}
		Transition.right().then(() => {
			this.scene
				.add(this.levels.next.constructor.name, this.levels.next, true, {
					side: "start"
				})
				.scene.sendToBack();
			this.scene.remove(this.constructor.name);
		});
	}

	prevLevel() {
		this.scene.pause(this.constructor.name);
		if (Otis.currentLevel.name === this.constructor.name) {
			Otis.currentLevel = this.levels.prev;
		}
		Transition.left().then(() => {
			this.scene
				.add(this.levels.prev.constructor.name, this.levels.prev, true, {
					side: "end"
				})
				.scene.sendToBack();
			this.scene.remove(this.constructor.name);
		});
	}
}
