import UpdatedScene from "../template/scenes/UpdatedScene.js";
import Transition from "./Transition.js";

export default class MainMenu extends UpdatedScene {
	/** @type {Phaser.Sound.BaseSound} */
	static music = null;

	create() {
		this.add.image(0, 0, "menu.main").setOrigin(0).setScale(3);
		MainMenu.music = this.sound.add("music");
		MainMenu.music.play({ loop: true });
		this.input.keyboard.on("keydown", () => {
			Transition.down().then(() => {
				this.scene.start("House", { side: "start" });
			});
		});
	}
}
