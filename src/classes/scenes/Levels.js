import Main from "./main.js";

class House extends Main {
	tilemap = "house";
	parallax = "town";
	levels = {
		next: "Town"
	};
}
class Town extends Main {
	tilemap = "level_town";
	parallax = "town";
	levels = {
		prev: "House",
		next: "Woods"
	};
}
class Woods extends Main {
	tilemap = "level_woods";
	parallax = "forest";
	levels = {
		prev: "Town",
		next: "Bridge"
	};
}
class Bridge extends Main {
	tilemap = "level_bridge";
	parallax = "town";
	levels = {
		prev: "Woods",
		next: "PlatformingA"
	};
}

export { House, Town, Woods, Bridge };
