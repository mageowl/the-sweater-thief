import Otis from "../objects/Otis.js";
import Main from "./main.js";

export default class House extends Main {
	tilemap = "house";
	parallax = "town";
	levels = {
		next: Town
	};
}
class Town extends Main {
	tilemap = "level_town";
	parallax = "town";
	levels = {
		prev: House,
		next: Woods
	};
}
class Woods extends Main {
	tilemap = "level_woods";
	parallax = "forest";
	levels = {
		prev: Town,
		next: Bridge
	};
}
class Bridge extends Main {
	tilemap = "level_bridge";
	parallax = "town";
	levels = {
		prev: Woods,
		next: PlatformingA
	};
}
class PlatformingA extends Main {
	tilemap = "level_2x_a";
	parallax = "town";
	levels = {
		prev: Bridge,
		next: PlatformingB
	};
}
class PlatformingB extends Main {
	tilemap = "level_2x_b";
	parallax = "town";
	levels = {
		prev: PlatformingA,
		next: Bouncer
	};
}
class Bouncer extends Main {
	tilemap = "level_bouncer";
	parallax = "town";
	levels = {
		prev: PlatformingB,
		next: Party
	};
}
class Party extends Main {
	tilemap = "party";
	parallax = "town";
	levels = {
		prev: Bouncer,
		next: null
	};
}

Otis.currentLevel = Woods;
