Object.values = function (object) {
	return Object.keys(object).map(function (key) {
		return object[key];
	});
};

Array.prototype.includes = function (searchElement, fromIndex) {
	return this.indexOf(searchElement, fromIndex) !== -1;
};

String.prototype.includes = function (searchString, position) {
	return this.indexOf(searchString, position) !== -1;
};

function createEventRequestCreator(eventName) {
	var idCounter = 0;
	return function (data, callback) {
		var id = ++idCounter;
		data.id = id;
		GameEvents.SendCustomGameEventToServer(eventName, data);
		var listener = GameEvents.Subscribe(eventName, function (data) {
			if (data.id !== id) return;
			GameEvents.Unsubscribe(listener);
			callback(data);
		});

		return listener;
	};
}

function SubscribeToNetTableKey(tableName, key, callback) {
	var immediateValue = CustomNetTables.GetTableValue(tableName, key) || {};
	if (immediateValue != null) callback(immediateValue);
	CustomNetTables.SubscribeNetTableListener(tableName, function (_tableName, currentKey, value) {
		if (currentKey === key && value != null) callback(value);
	});
}

const FindDotaHudElement = (id) => dotaHud.FindChildTraverse(id);
const dotaHud = (() => {
	let panel = $.GetContextPanel();
	while (panel) {
		if (panel.id === "DotaHud") return panel;
		panel = panel.GetParent();
	}
})();

var useChineseDateFormat = $.Language() === "schinese" || $.Language() === "tchinese";
/** @param {Date} date */
function formatDate(date) {
	return useChineseDateFormat
		? date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
		: date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
}

function _GetVarFromUniquePortraitsData(player_id, hero_name, path) {
	if (player_id == null || player_id === -1) {
		return `${path}${hero_name}.png`;
	}

	const unique_portraits = CustomNetTables.GetTableValue("game_state", "portraits");
	if (unique_portraits && unique_portraits[player_id]) {
		return `${path}${unique_portraits[player_id]}.png`;
	} else {
		return `${path}${hero_name}.png`;
	}
}

function GetPortraitImage(player_id, hero_name) {
	return _GetVarFromUniquePortraitsData(player_id, hero_name, "file://{images}/heroes/");
}
function GetPortraitIcon(player_id, hero_name) {
	return _GetVarFromUniquePortraitsData(player_id, hero_name, "file://{images}/heroes/icons/");
}

function GetHEXPlayerColor(player_id) {
	if (player_id == null || player_id === -1) {
		return "#000000";
	}

	var player_color = Players.GetPlayerColor(player_id).toString(16);
	return player_color == null
		? "#000000"
		: "#" +
				player_color.substring(6, 8) +
				player_color.substring(4, 6) +
				player_color.substring(2, 4) +
				player_color.substring(0, 2);
}

function LocalizeWithValues(line, kv) {
	let result = $.Localize(line);
	Object.entries(kv).forEach(([k, v]) => {
		result = result.replace(`%%${k}%%`, v);
	});
	return result;
}

function Stacktrace(name) {
	$.Msg(new Error(name).stack);
}
function FormatBigNumber(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GetModifierStackCount(unit_index, m_name) {
	for (var i = 0; i < Entities.GetNumBuffs(unit_index); i++) {
		var buff_name = Buffs.GetName(unit_index, Entities.GetBuff(unit_index, i));
		if (buff_name == m_name) {
			return Buffs.GetStackCount(unit_index, Entities.GetBuff(unit_index, i));
		}
	}
}

JSON.print = function (object) {
	let result_string;
	try {
		result_string = JSON.stringify(
			object,
			(key, value) => {
				return value;
			},
			"	",
		);
	} catch (e) {
		$.Msg(e);
	}
	let result_array = result_string.split("\n");
	while (result_array.length) {
		$.Msg(result_array.splice(0, 50).join("\n"));
	}
};

Math.clamp = function (num, min, max) {
	return this.min(this.max(num, min), max);
};
function GetTeamColor(team_id) {
	const team_color = GameUI.CustomUIConfig().team_colors[team_id];
	if (team_color != undefined) {
		return team_color;
	}
	return "#000;";
}

const heroes_ids = {
	npc_dota_hero_antimage: 1,
	npc_dota_hero_axe: 2,
	npc_dota_hero_bane: 3,
	npc_dota_hero_bloodseeker: 4,
	npc_dota_hero_crystal_maiden: 5,
	npc_dota_hero_drow_ranger: 6,
	npc_dota_hero_earthshaker: 7,
	npc_dota_hero_juggernaut: 8,
	npc_dota_hero_mirana: 9,
	npc_dota_hero_nevermore: 11,
	npc_dota_hero_morphling: 10,
	npc_dota_hero_phantom_lancer: 12,
	npc_dota_hero_puck: 13,
	npc_dota_hero_pudge: 14,
	npc_dota_hero_razor: 15,
	npc_dota_hero_sand_king: 16,
	npc_dota_hero_storm_spirit: 17,
	npc_dota_hero_sven: 18,
	npc_dota_hero_tiny: 19,
	npc_dota_hero_vengefulspirit: 20,
	npc_dota_hero_windrunner: 21,
	npc_dota_hero_zuus: 22,
	npc_dota_hero_kunkka: 23,
	npc_dota_hero_lina: 25,
	npc_dota_hero_lich: 31,
	npc_dota_hero_lion: 26,
	npc_dota_hero_shadow_shaman: 27,
	npc_dota_hero_slardar: 28,
	npc_dota_hero_tidehunter: 29,
	npc_dota_hero_witch_doctor: 30,
	npc_dota_hero_riki: 32,
	npc_dota_hero_enigma: 33,
	npc_dota_hero_tinker: 34,
	npc_dota_hero_sniper: 35,
	npc_dota_hero_necrolyte: 36,
	npc_dota_hero_warlock: 37,
	npc_dota_hero_beastmaster: 38,
	npc_dota_hero_queenofpain: 39,
	npc_dota_hero_venomancer: 40,
	npc_dota_hero_faceless_void: 41,
	npc_dota_hero_skeleton_king: 42,
	npc_dota_hero_death_prophet: 43,
	npc_dota_hero_phantom_assassin: 44,
	npc_dota_hero_pugna: 45,
	npc_dota_hero_templar_assassin: 46,
	npc_dota_hero_viper: 47,
	npc_dota_hero_luna: 48,
	npc_dota_hero_dragon_knight: 49,
	npc_dota_hero_dazzle: 50,
	npc_dota_hero_rattletrap: 51,
	npc_dota_hero_leshrac: 52,
	npc_dota_hero_furion: 53,
	npc_dota_hero_life_stealer: 54,
	npc_dota_hero_dark_seer: 55,
	npc_dota_hero_clinkz: 56,
	npc_dota_hero_omniknight: 57,
	npc_dota_hero_enchantress: 58,
	npc_dota_hero_huskar: 59,
	npc_dota_hero_night_stalker: 60,
	npc_dota_hero_broodmother: 61,
	npc_dota_hero_bounty_hunter: 62,
	npc_dota_hero_weaver: 63,
	npc_dota_hero_jakiro: 64,
	npc_dota_hero_batrider: 65,
	npc_dota_hero_chen: 66,
	npc_dota_hero_spectre: 67,
	npc_dota_hero_doom_bringer: 69,
	npc_dota_hero_ancient_apparition: 68,
	npc_dota_hero_ursa: 70,
	npc_dota_hero_spirit_breaker: 71,
	npc_dota_hero_gyrocopter: 72,
	npc_dota_hero_alchemist: 73,
	npc_dota_hero_invoker: 74,
	npc_dota_hero_silencer: 75,
	npc_dota_hero_obsidian_destroyer: 76,
	npc_dota_hero_lycan: 77,
	npc_dota_hero_brewmaster: 78,
	npc_dota_hero_shadow_demon: 79,
	npc_dota_hero_lone_druid: 80,
	npc_dota_hero_chaos_knight: 81,
	npc_dota_hero_meepo: 82,
	npc_dota_hero_treant: 83,
	npc_dota_hero_ogre_magi: 84,
	npc_dota_hero_undying: 85,
	npc_dota_hero_rubick: 86,
	npc_dota_hero_disruptor: 87,
	npc_dota_hero_nyx_assassin: 88,
	npc_dota_hero_naga_siren: 89,
	npc_dota_hero_keeper_of_the_light: 90,
	npc_dota_hero_wisp: 91,
	npc_dota_hero_visage: 92,
	npc_dota_hero_slark: 93,
	npc_dota_hero_medusa: 94,
	npc_dota_hero_troll_warlord: 95,
	npc_dota_hero_centaur: 96,
	npc_dota_hero_magnataur: 97,
	npc_dota_hero_shredder: 98,
	npc_dota_hero_bristleback: 99,
	npc_dota_hero_tusk: 100,
	npc_dota_hero_skywrath_mage: 101,
	npc_dota_hero_abaddon: 102,
	npc_dota_hero_elder_titan: 103,
	npc_dota_hero_legion_commander: 104,
	npc_dota_hero_ember_spirit: 106,
	npc_dota_hero_earth_spirit: 107,
	npc_dota_hero_abyssal_underlord: 108,
	npc_dota_hero_terrorblade: 109,
	npc_dota_hero_phoenix: 110,
	npc_dota_hero_techies: 105,
	npc_dota_hero_oracle: 111,
	npc_dota_hero_winter_wyvern: 112,
	npc_dota_hero_arc_warden: 113,
	npc_dota_hero_monkey_king: 114,
	npc_dota_hero_dark_willow: 119,
	npc_dota_hero_pangolier: 120,
	npc_dota_hero_grimstroke: 121,
	npc_dota_hero_hoodwink: 123,
	npc_dota_hero_void_spirit: 126,
	npc_dota_hero_snapfire: 128,
	npc_dota_hero_mars: 129,
	npc_dota_hero_dawnbreaker: 135,
	npc_dota_hero_marci: 136,
};

function GetHeroID(hero_name) {
	var result = heroes_ids[hero_name];
	if (result == null) return -1;
	return result;
}

function FormatSeconds(v, b_skip_h) {
	let line = "";
	if (!b_skip_h) {
		const hours = Math.floor(v / 3600);
		v = v - 3600 * hours;
		line += `${hours.toString()}:`;
	}
	const minutes = Math.floor(v / 60);
	v = v - 60 * minutes;
	return `${line}${minutes.toString().padStart(2, "0")}:${Math.floor(v).toString().padStart(2, "0")}`;
}

const DOTA_SHOP = FindDotaHudElement("shop");

const LOCAL_TIME_LAYOUT = /%%localTime_.*%%/;
const TIME_FORMAT_24_CLIENTS = ["russian"];
const CONTENT_PARAMS = ["marginTop", "marginBottom", "marginRight", "marginLeft"];

const _ICON_LAYOUT = /%%(icon_.*)%%/;
const _URL_LAYOUT = /<url='(.*)'>(.*)<\/url>/;
const _FONT_HTML_BLOCK = /<font.+?<\/font>/g;
const _FONT_HTML_SPACE_FILLER = "!!!!!!!!!!!!!";

function AddFormatedTextToPanel(localize_key, content_block) {
	content_block.RemoveAndDeleteChildren();
	const lines = $.Localize(localize_key).split("<br>");
	var line;

	lines.forEach((t) => {
		if (t.match(LOCAL_TIME_LAYOUT)) {
			let time = t.match(LOCAL_TIME_LAYOUT)[0];
			let date = new Date(time.replace(/%%localTime_(.*)%%/g, "$1"));
			let hours = date.getHours();
			let b_24_format = TIME_FORMAT_24_CLIENTS.indexOf($.Language()) > -1;
			t = t.replace(
				time,
				LocalizeWithValues("custom_date_default", {
					t_day_name: $.Localize(`UI_day_${date.getDay() + 1}`),
					t_month: $.Localize(`UI_month_${date.getMonth()}`),
					t_day: date.getDate(),
					t_year: date.getFullYear(),
					t_hour: `0${b_24_format ? hours : hours > 12 ? hours - 12 : hours}`.slice(-2),
					t_min: `0${date.getMinutes()}`.slice(-2),
					ampm: b_24_format ? "" : hours >= 12 ? "PM" : "AM",
				}),
			);
		}

		const content_params = {};
		CONTENT_PARAMS.forEach((p_name) => {
			const v = t.match(new RegExp("<" + p_name + ":\\d*>"));
			if (v != null) {
				t = t.replace(v[0], "");
				content_params[p_name] = v[0];
			}
		});
		if (t.match(_ICON_LAYOUT) || t.match(_URL_LAYOUT)) {
			line = $.CreatePanel("Panel", content_block, "");
			line.style.flowChildren = "right-wrap";

			t = t.replace(_FONT_HTML_BLOCK, (match) => {
				return match.replace(/ /g, _FONT_HTML_SPACE_FILLER);
			});

			t.split(" ").forEach((_t, index) => {
				_t = _t.replace(new RegExp(_FONT_HTML_SPACE_FILLER, "g"), " ");
				const icon_match = _t.match(_ICON_LAYOUT);
				const url_match = _t.match(_URL_LAYOUT);

				if (icon_match) {
					const i = $.CreatePanel("Image", line, "");
					i.SetImage(`file://{images}/custom_game/${icon_match[1]}.png`);
				} else {
					const _line = $.CreatePanel("Label", line, "");
					_line.html = true;
					_line.text = `${index == 0 ? "" : "\u00A0"}${_t}`;

					if (url_match) {
						_line.AddClass("UrlLink");
						_line.text = url_match[2];
						_line.SetPanelEvent("onactivate", function () {
							$.DispatchEvent("ExternalBrowserGoToURL", url_match[1]);
						});
					}
				}
			});
		} else {
			line = $.CreatePanel("Label", content_block, "");
			line.html = true;
			line.text = t;
		}

		Object.entries(content_params).forEach(([p_name, v]) => {
			line.style[p_name] = `${v.replace(/\D/g, "")}px`;
		});
	});
}
