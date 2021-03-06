import UpdatedScene from "../template/scenes/UpdatedScene.js";

export default class Load extends UpdatedScene {
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
		this.load.spritesheet("house", "sprites/tileset/house.png", {
			frameWidth: 176,
			frameHeight: 160
		});
		this.load.spritesheet("bush", "sprites/tileset/static_bush.png", {
			frameWidth: 48
		});
		this.load.spritesheet("balloons", "sprites/tileset/balloons.png", {
			frameWidth: 32,
			frameHeight: 48
		});
		this.load.spritesheet("campfire", "sprites/tileset/fire.png", {
			frameWidth: 32
		});
		this.load.spritesheet("boom_box", "sprites/tileset/juke_box.png", {
			frameWidth: 16,
			frameHeight: 32
		});
		this.load.spritesheet(
			"party_balloons",
			"sprites/tileset/balloons_party.png",
			{
				frameWidth: 32,
				frameHeight: 48
			}
		);

		this.load.image("tileset", "sprites/tileset/tileset.png");
		this.load.image("control", "sprites/tileset/control.png");

		this.load.image("chat.no_sweater", "sprites/tileset/chat_no_sweater.png");

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

		this.load.image("menu.main", "scenes/title.png");

		this.load.spritesheet(
			"npc_cocoa_dude_left",
			"sprites/NPCs/npc_cocoa_dude_left.png",
			{ frameWidth: 32 }
		);
		this.load.spritesheet(
			"npc_cocoa_dude_right",
			"sprites/NPCs/npc_cocoa_dude_right.png",
			{ frameWidth: 32 }
		);
		this.load.spritesheet(
			"npc_cocoa_lady_right",
			"sprites/NPCs/npc_cocoa_lady_right.png",
			{ frameWidth: 32 }
		);
		this.load.spritesheet(
			"npc_dancing_dude_left",
			"sprites/NPCs/npc_dancing_dude_left.png",
			{ frameWidth: 32 }
		);
		this.load.spritesheet(
			"npc_dancing_dude_left",
			"sprites/NPCs/npc_dancing_dude_left.png",
			{ frameWidth: 32 }
		);
		this.load.spritesheet(
			"npc_dancing_dude_right",
			"sprites/NPCs/npc_dancing_dude_right.png",
			{ frameWidth: 32 }
		);
		this.load.spritesheet(
			"npc_dancing_lady_left",
			"sprites/NPCs/npc_dancing_lady_left.png",
			{ frameWidth: 32 }
		);
		this.load.spritesheet(
			"npc_dancing_lady_right",
			"sprites/NPCs/npc_dancing_lady_right.png",
			{ frameWidth: 32 }
		);
		this.load.spritesheet(
			"npc_idle_lady_left",
			"sprites/NPCs/npc_idle_lady_left.png",
			{ frameWidth: 16, frameHeight: 32 }
		);
		this.load.spritesheet("npc_bouncer", "sprites/NPCs/bouncer.png", {
			frameWidth: 16,
			frameHeight: 32
		});

		this.load.audio("music", "music/Loop-2-full.mp3");
	}

	create() {
		this.scene.start("MainMenu");
	}
}
