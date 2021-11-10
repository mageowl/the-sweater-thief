import Otis from "../objects/Otis.js";
import Player from "../objects/Player.js";
import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Main extends UpdatedScene {
	preload() {
		this.load.image("player", "sprites/player.png");

		this.load.image("ground", "sprites/tileset/ground_tile.png");
		this.load.image("control", "sprites/tileset/control.png");

		this.load.tilemapTiledJSON("playground", "tilemap/playground.json");
	}

	create() {
		const entities = this.add.group();

		const world = this.add.tilemap("playground");
		world.addTilesetImage("Ground", "ground");
		world.addTilesetImage("Control", "control");
		this.level = world
			.createLayer("ground", "Ground", 0, 0)
			.setCollisionByProperty({ collision: true });
		this.jumps = world
			.createLayer("jumps", "Control", 0, 0)
			.setCollisionByProperty({ collision: true })
			.setVisible(false);

		const player = new Player(this, 0, 0);
		let otis;
		setTimeout(() => {
			otis = new Otis(this, 0, 0, player);
			entities.add(otis);
		}, 2000);

		entities.add(player);

		this.physics.add.collider(entities, this.level);

		this.cameras.main.setZoom(3).startFollow(player);
	}
}
