var customSpellsMenuPanel = $("#SpellsMenuContents");
var openSpellsMenu = $("#SpellsMenuOpen");
var spellsMenuCardPoints = $("#SpellsMenuCardIdPoints");
var swap_menu = FindDotaHudElement("SpellsMenuSpellsBlockSwap");
swap_menu.style.visibility = "collapse";
var spellSwapFirstSelected = null;
var spellSwapSecondSelected = null;

function FindDotaHudElement(panel) {
	return $.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse(panel);
}

deliver = FindDotaHudElement("DeliverItemsButton")
deliver.style.visibility = "collapse";

(function () {
	const centerBlock = FindDotaHudElement("center_block");
	let cosmetics = centerBlock.FindChildTraverse("SpellSwapButton");

	if (cosmetics) {
		cosmetics.DeleteAsync(0);
	}

	const ability = $.CreatePanel("Button", FindDotaHudElement("SpellSwapButton"), "SpellsMenuSwapSpellsButton");
	ability.BLoadLayoutSnippet("SpellsMenuSwapSpellsButton");
	
	if (!cosmetics) {
		$("#SpellSwapButton").SetParent(centerBlock);
	}
})();


var heroes = [
    [
        {"name_id": "npc_dota_hero_alchemist"},
        {"name_id": "npc_dota_hero_axe"},
        {"name_id": "npc_dota_hero_bristleback"},
        {"name_id": "npc_dota_hero_centaur"},
        {"name_id": "npc_dota_hero_chaos_knight"},
        {"name_id": "npc_dota_hero_dawnbreaker"},
        {"name_id": "npc_dota_hero_doom_bringer"},
        {"name_id": "npc_dota_hero_dragon_knight"},
        {"name_id": "npc_dota_hero_earth_spirit"},
        {"name_id": "npc_dota_hero_earthshaker"},
        {"name_id": "npc_dota_hero_elder_titan"},		
        {"name_id": "npc_dota_hero_huskar"},
        {"name_id": "npc_dota_hero_kunkka"},
        {"name_id": "npc_dota_hero_legion_commander"},
        {"name_id": "npc_dota_hero_life_stealer"},
        {"name_id": "npc_dota_hero_mars"},
        {"name_id": "npc_dota_hero_night_stalker"},
        {"name_id": "npc_dota_hero_ogre_magi"},
        {"name_id": "npc_dota_hero_omniknight"},
        {"name_id": "npc_dota_hero_primal_beast"},
        {"name_id": "npc_dota_hero_pudge"},
		{"name_id": "npc_dota_hero_slardar"},
        {"name_id": "npc_dota_hero_spirit_breaker"},		
		{"name_id": "npc_dota_hero_sven"},
        {"name_id": "npc_dota_hero_tidehunter"},
        {"name_id": "npc_dota_hero_tiny"},
        {"name_id": "npc_dota_hero_treant"},
        {"name_id": "npc_dota_hero_tusk"},
        {"name_id": "npc_dota_hero_abyssal_underlord"},
        {"name_id": "npc_dota_hero_undying"},
        {"name_id": "npc_dota_hero_skeleton_king"},
    ],
    [
        {"name_id": "npc_dota_hero_antimage"},
        {"name_id": "npc_dota_hero_arc_warden"},
        {"name_id": "npc_dota_hero_bloodseeker"},
        {"name_id": "npc_dota_hero_bounty_hunter"},
        {"name_id": "npc_dota_hero_clinkz"},
        {"name_id": "npc_dota_hero_drow_ranger"},
        {"name_id": "npc_dota_hero_ember_spirit"},
        {"name_id": "npc_dota_hero_faceless_void"},
        {"name_id": "npc_dota_hero_gyrocopter"},
        {"name_id": "npc_dota_hero_hoodwink"},
        {"name_id": "npc_dota_hero_juggernaut"},
        {"name_id": "npc_dota_hero_luna"},
        {"name_id": "npc_dota_hero_medusa"},
        {"name_id": "npc_dota_hero_meepo"},
        {"name_id": "npc_dota_hero_monkey_king"},
        {"name_id": "npc_dota_hero_morphling"},
        {"name_id": "npc_dota_hero_naga_siren"}, 
        {"name_id": "npc_dota_hero_phantom_assassin"},
        {"name_id": "npc_dota_hero_phantom_lancer"},
        {"name_id": "npc_dota_hero_razor"},
        {"name_id": "npc_dota_hero_riki"},
        {"name_id": "npc_dota_hero_nevermore"},
        {"name_id": "npc_dota_hero_slark"},
        {"name_id": "npc_dota_hero_sniper"},
        {"name_id": "npc_dota_hero_spectre"},
        {"name_id": "npc_dota_hero_templar_assassin"},
        {"name_id": "npc_dota_hero_terrorblade"},
        {"name_id": "npc_dota_hero_troll_warlord"},
        {"name_id": "npc_dota_hero_ursa"},
        {"name_id": "npc_dota_hero_viper"},
        {"name_id": "npc_dota_hero_weaver"},
    ],
    [
        {"name_id": "npc_dota_hero_ancient_apparition"},
        {"name_id": "npc_dota_hero_crystal_maiden"},
        {"name_id": "npc_dota_hero_death_prophet"},
        {"name_id": "npc_dota_hero_disruptor"},
        {"name_id": "npc_dota_hero_enchantress"},
        {"name_id": "npc_dota_hero_grimstroke"},
        {"name_id": "npc_dota_hero_invoker"},
        {"name_id": "npc_dota_hero_jakiro"},
        {"name_id": "npc_dota_hero_keeper_of_the_light"},
        {"name_id": "npc_dota_hero_leshrac"},
        {"name_id": "npc_dota_hero_lich"},
        {"name_id": "npc_dota_hero_lina"},
        {"name_id": "npc_dota_hero_lion"},
        {"name_id": "npc_dota_hero_muerta"},
        {"name_id": "npc_dota_hero_furion"},
        {"name_id": "npc_dota_hero_necrolyte"},
        {"name_id": "npc_dota_hero_oracle"},
        {"name_id": "npc_dota_hero_obsidian_destroyer"},
        {"name_id": "npc_dota_hero_puck"},
        {"name_id": "npc_dota_hero_pugna"},
        {"name_id": "npc_dota_hero_queenofpain"},
        {"name_id": "npc_dota_hero_rubick"},
        {"name_id": "npc_dota_hero_shadow_demon"},
        {"name_id": "npc_dota_hero_shadow_shaman"},
        {"name_id": "npc_dota_hero_silencer"},
        {"name_id": "npc_dota_hero_skywrath_mage"},
        {"name_id": "npc_dota_hero_storm_spirit"},
        {"name_id": "npc_dota_hero_tinker"},
        {"name_id": "npc_dota_hero_warlock"},
        {"name_id": "npc_dota_hero_witch_doctor"},
        {"name_id": "npc_dota_hero_zuus"},
    ],
    [
        {"name_id": "npc_dota_hero_abaddon"},
        {"name_id": "npc_dota_hero_bane"},
        {"name_id": "npc_dota_hero_batrider"},
        {"name_id": "npc_dota_hero_beastmaster"},
        {"name_id": "npc_dota_hero_brewmaster"},
        {"name_id": "npc_dota_hero_broodmother"},
        {"name_id": "npc_dota_hero_chen"},
        {"name_id": "npc_dota_hero_rattletrap"},
        {"name_id": "npc_dota_hero_dark_seer"},
        {"name_id": "npc_dota_hero_dark_willow"},
        {"name_id": "npc_dota_hero_dazzle"},
        {"name_id": "npc_dota_hero_enigma"},
        {"name_id": "npc_dota_hero_wisp"},
        {"name_id": "npc_dota_hero_lone_druid"},
        {"name_id": "npc_dota_hero_lycan"},
        {"name_id": "npc_dota_hero_magnataur"},
        {"name_id": "npc_dota_hero_marci"},
        {"name_id": "npc_dota_hero_mirana"},
        {"name_id": "npc_dota_hero_nyx_assassin"},
        {"name_id": "npc_dota_hero_pangolier"},
        {"name_id": "npc_dota_hero_phoenix"},
        {"name_id": "npc_dota_hero_sand_king"},
        {"name_id": "npc_dota_hero_snapfire"},
        {"name_id": "npc_dota_hero_techies"},
        {"name_id": "npc_dota_hero_shredder"},
        {"name_id": "npc_dota_hero_vengefulspirit"},
        {"name_id": "npc_dota_hero_venomancer"},
        {"name_id": "npc_dota_hero_visage"},
        {"name_id": "npc_dota_hero_void_spirit"},
        {"name_id": "npc_dota_hero_windrunner"},
        {"name_id": "npc_dota_hero_winter_wyvern"},
    ],
];


var spells = {
    "npc_dota_hero_elder_titan": [
	    {
            "spell_id": "elder_titan_echo_stomp",
            "cost": 5
        },
	    {
            "spell_id": "elder_titan_ancestral_spirit",
            "cost": 4,
				"additional_spells": [
                "elder_titan_return_spirit"
            ], 
        },		
        {
            "spell_id": "elder_titan_natural_order",
            "cost": 9
        },
        {
            "spell_id": "elder_titan_earth_splitter",
            "cost": 10
        },
    ],
    "npc_dota_hero_abaddon": [
        {
            "spell_id": "abaddon_death_coil",
            "cost": 7
        },
        {
            "spell_id": "abaddon_aphotic_shield",
            "cost": 3
        },
        {
            "spell_id": "abaddon_frostmourne",
            "cost": 9
        },
        {
            "spell_id": "abaddon_borrowed_time",
            "cost": 10
        },
    ],
    "npc_dota_hero_alchemist": [
        {
            "spell_id": "alchemist_acid_spray",
            "cost": 5
        },
        {
            "spell_id": "alchemist_unstable_concoction",
            "cost": 2,
            "additional_spells": [
                "alchemist_unstable_concoction_throw"
            ],            
        },
        {
            "spell_id": "alchemist_goblins_greed",
            "cost": 10
        },
        {
            "spell_id": "alchemist_chemical_rage",
            "cost": 9
        },
    ],
    "npc_dota_hero_axe": [
        {
            "spell_id": "axe_berserkers_call",
            "cost": 5
        },
        {
            "spell_id": "axe_battle_hunger",
            "cost": 5
        },
        {
            "spell_id": "axe_counter_helix",
            "cost": 8
        },
        {
            "spell_id": "axe_culling_blade",
            "cost": 8
        },
    ],
    "npc_dota_hero_beastmaster": [
        {
            "spell_id": "beastmaster_wild_axes",
            "cost": 8
        },
        {
            "spell_id": "beastmaster_call_of_the_wild_boar",
            "cost": 3,
            "additional_spells": [
                "beastmaster_call_of_the_wild_hawk"
            ],
        },
        {
            "spell_id": "beastmaster_inner_beast",
            "cost": 6
        },
        {
            "spell_id": "beastmaster_primal_roar",
            "cost": 5
        },
    ],
    "npc_dota_hero_brewmaster": [
        {
            "spell_id": "brewmaster_thunder_clap",
            "cost": 2
        },
        {
            "spell_id": "brewmaster_cinder_brew",
            "cost": 2
        },
        {
            "spell_id": "brewmaster_drunken_brawler",
            "cost": 8,
            "scepter_ability": [
                "brewmaster_primal_companion"
            ],
        },
        {
            "spell_id": "brewmaster_primal_split",
            "cost": 10
        },
    ],
    "npc_dota_hero_bristleback": [
        {
            "spell_id": "bristleback_viscous_nasal_goo",
            "cost": 5
        },
        {
            "spell_id": "bristleback_quill_spray",
            "cost": 8,
        },
        {
            "spell_id": "bristleback_bristleback",
            "cost": 9
        },
        {
            "spell_id": "bristleback_warpath",
            "cost": 6
        },
    ],
    "npc_dota_hero_centaur": [
        {
            "spell_id": "centaur_hoof_stomp",
            "cost": 3
        },
        {
            "spell_id": "centaur_double_edge",
            "cost": 8
        },
        {
            "spell_id": "centaur_return",
            "cost": 5
        },
        {
            "spell_id": "centaur_stampede",
            "cost": 6,
				"scepter_ability": [
					"centaur_mount"
            ],
        },
    ],
    "npc_dota_hero_chaos_knight": [
        {
            "spell_id": "chaos_knight_chaos_bolt",
            "cost": 3
        },
        {
            "spell_id": "chaos_knight_reality_rift",
            "cost": 5
        },
        {
            "spell_id": "chaos_knight_chaos_strike",
            "cost": 7
        },
		{
            "spell_id": "chaos_knight_phantasm",
            "cost": 9
        },
    ],
    "npc_dota_hero_rattletrap": [
        {
            "spell_id": "rattletrap_battery_assault",
            "cost": 4,
			"scepter_ability": [
                "rattletrap_overclocking"
            ],
        },
        {
            "spell_id": "rattletrap_power_cogs",
            "cost": 3
        },
        {
            "spell_id": "rattletrap_rocket_flare",
            "cost": 3
        },
        {
            "spell_id": "rattletrap_hookshot",
            "cost": 5
        },
    ],
    "npc_dota_hero_doom_bringer": [
        {
            "spell_id": "doom_bringer_devour",
            "cost": 4
        },
        {
            "spell_id": "doom_bringer_scorched_earth",
            "cost": 4
        },
        {
            "spell_id": "doom_bringer_infernal_blade",
            "cost": 8
        },
        {
            "spell_id": "doom_bringer_doom",
            "cost": 8
        },
    ],
    "npc_dota_hero_dragon_knight": [
        {
            "spell_id": "dragon_knight_breathe_fire",
            "cost": 3
        },
        {
            "spell_id": "dragon_knight_dragon_tail",
            "cost": 3
        },
        {
            "spell_id": "dragon_knight_dragon_blood",
            "cost": 4
        },
        {
            "spell_id": "dragon_knight_elder_dragon_form",
            "cost": 8
        },
    ],
    "npc_dota_hero_earthshaker": [
        {
            "spell_id": "earthshaker_fissure",
            "cost": 3
        },
        {
            "spell_id": "earthshaker_enchant_totem",
            "cost": 7
        },
        {
            "spell_id": "earthshaker_aftershock",
            "cost": 5
        },
        {
            "spell_id": "earthshaker_echo_slam",
            "cost": 7
        },
    ],
    "npc_dota_hero_huskar": [
        {
            "spell_id": "huskar_inner_fire",
            "cost": 3
        },
        {
            "spell_id": "huskar_burning_spear",
            "cost": 7
        },
        {
            "spell_id": "huskar_berserkers_blood",
            "cost": 6
        },
        {
            "spell_id": "huskar_life_break",
            "cost": 10
        },
    ],
    "npc_dota_hero_wisp": [
        {
            "spell_id": "wisp_tether",
            "cost": 7,
            "additional_spells": [
                "wisp_tether_break"
            ],
        },
        {
            "spell_id": "wisp_overcharge",
            "cost": 8
        },
        {
            "spell_id": "wisp_relocate",
            "cost": 4
        },
    ],
    "npc_dota_hero_kunkka": [
        {
            "spell_id": "kunkka_torrent",
            "cost": 4,
            "scepter_ability": [
                "kunkka_torrent_storm"
            ],
        },
        {
            "spell_id": "kunkka_tidebringer",
            "cost": 6
        },
        {
            "spell_id": "kunkka_x_marks_the_spot",
            "cost": 3,
            "additional_spells": [
                "kunkka_return"
            ],
        },
        {
            "spell_id": "kunkka_ghostship",
            "cost": 5
        },
    ],
    "npc_dota_hero_legion_commander": [
        {
            "spell_id": "legion_commander_overwhelming_odds",
            "cost": 4
        },
        {
            "spell_id": "legion_commander_press_the_attack",
            "cost": 5
        },
        {
            "spell_id": "legion_commander_moment_of_courage",
            "cost": 8
        },
        {
            "spell_id": "legion_commander_duel",
            "cost": 8
        },
    ],
    "npc_dota_hero_life_stealer": [
        {
            "spell_id": "life_stealer_rage",
            "cost": 8
        },
        {
            "spell_id": "life_stealer_feast",
            "cost": 5
        },
        {
            "spell_id": "life_stealer_ghoul_frenzy",
            "cost": 9
        },
        {
            "spell_id": "life_stealer_infest",
            "cost": 4
        },
    ],
    "npc_dota_hero_lycan": [
        {
            "spell_id": "lycan_summon_wolves",
            "cost": 3
        },
        {
            "spell_id": "lycan_howl",
            "cost": 4
        },
        {
            "spell_id": "lycan_feral_impulse",
            "cost": 8
        },
        {
            "spell_id": "lycan_shapeshift",
            "cost": 9
        },
    ],
    "npc_dota_hero_magnataur": [
        {
            "spell_id": "magnataur_shockwave",
            "cost": 3
        },
        {
            "spell_id": "magnataur_empower",
            "cost": 7
        },
        {
            "spell_id": "magnataur_skewer",
            "cost": 3,
            "additional_spells": [
                "magnataur_horn_toss"
            ],     
        },
        {
            "spell_id": "magnataur_reverse_polarity",
            "cost": 8
        },
    ],
    "npc_dota_hero_mars": [
        {
            "spell_id": "mars_spear",
            "cost": 5
        },
        {
            "spell_id": "mars_gods_rebuke",
            "cost": 8
        },
        {
            "spell_id": "mars_bulwark",
            "cost": 6
        },
        {
            "spell_id": "mars_arena_of_blood",
            "cost": 5
        },
    ],
    "npc_dota_hero_night_stalker": [
        {
            "spell_id": "night_stalker_void",
            "cost": 3
        },
        {
            "spell_id": "night_stalker_crippling_fear",
            "cost": 4
        },
        {
            "spell_id": "night_stalker_hunter_in_the_night",
            "cost": 6
        },
        {
            "spell_id": "night_stalker_darkness",
            "cost": 7
        },
    ],
    "npc_dota_hero_omniknight": [
        {
            "spell_id": "omniknight_purification",
            "cost": 5
        },
        {
            "spell_id": "omniknight_hammer_of_purity",
            "cost": 7
        },
        {
            "spell_id": "omniknight_degen_aura",
            "cost": 5
        },
        {
            "spell_id": "omniknight_guardian_angel",
            "cost": 8
        },
    ],
    "npc_dota_hero_phoenix": [
        {
            "spell_id": "phoenix_icarus_dive",
            "cost": 4,
            "additional_spells": [
                "phoenix_icarus_dive_stop"
            ],     
        },
        {
            "spell_id": "phoenix_fire_spirits",
            "cost": 4,
            "additional_spells": [
                "phoenix_launch_fire_spirit"
            ],                  
        },
		{
            "spell_id": "phoenix_sun_ray",
            "cost": 4,
            "additional_spells": [
                "phoenix_sun_ray_toggle_move"
            ],                  
        },
        {
            "spell_id": "phoenix_supernova",
            "cost": 10
        },
    ],
    "npc_dota_hero_pudge": [
        {
            "spell_id": "pudge_meat_hook",
            "cost": 7
        },
        {
            "spell_id": "pudge_rot",
            "cost": 7
        },
        {
            "spell_id": "pudge_flesh_heap",
            "cost": 6
        },
        {
            "spell_id": "pudge_dismember",
            "cost": 7,
            "scepter_ability": [
                "pudge_eject"
            ],  
        },        
    ],
    "npc_dota_hero_sand_king": [
        {
            "spell_id": "sandking_burrowstrike",
            "cost": 3
        },
        {
            "spell_id": "sandking_sand_storm",
            "cost": 6
        },
		{
            "spell_id": "sandking_caustic_finale",
            "cost": 6
        },
        {
            "spell_id": "sandking_epicenter",
            "cost": 7
        },
    ],
    "npc_dota_hero_sven": [
        {
            "spell_id": "sven_storm_bolt",
            "cost": 3
        },
        {
            "spell_id": "sven_great_cleave",
            "cost": 6
        },
        {
            "spell_id": "sven_warcry",
            "cost": 4
        },
        {
            "spell_id": "sven_gods_strength",
            "cost": 10
        },
    ],
    "npc_dota_hero_tidehunter": [
        {
            "spell_id": "tidehunter_gush",
            "cost": 4
        },
        {
            "spell_id": "tidehunter_kraken_shell",
            "cost": 5
        },
        {
            "spell_id": "tidehunter_anchor_smash",
            "cost": 7
        },
        {
            "spell_id": "tidehunter_ravage",
            "cost": 8,
            "scepter_ability": [
                "tidehunter_arm_of_the_deep"
            ],  
        },  
    ],
    "npc_dota_hero_shredder": [
        {
            "spell_id": "shredder_whirling_death",
            "cost": 5
        },
        {
            "spell_id": "shredder_timber_chain",
            "cost": 4
        },
        {
            "spell_id": "shredder_reactive_armor",
            "cost": 5
        },
        {
            "spell_id": "shredder_chakram",
            "cost": 2,
            "scepter_ability": [
                "shredder_chakram_2"
            ],   
        },
    ],
    "npc_dota_hero_tiny": [
        {
            "spell_id": "tiny_avalanche",
            "cost": 5
        },
        {
            "spell_id": "tiny_toss",
            "cost": 5
        },
        {
            "spell_id": "tiny_tree_grab",
            "cost": 8,
            "additional_spells": [
                "tiny_toss_tree"
            ],
        },
        {
            "spell_id": "tiny_grow",
            "cost": 8,
            "scepter_ability": [
                "tiny_tree_channel"
            ],   
        },
    ],
    "npc_dota_hero_treant": [
        {
            "spell_id": "treant_natures_grasp",
            "cost": 3
        },
        {
            "spell_id": "treant_leech_seed",
            "cost": 4
        },
        {
            "spell_id": "treant_living_armor",
            "cost": 4
        },
		{
            "spell_id": "treant_natures_guise",
            "cost": 3
        },
        {
            "spell_id": "treant_overgrowth",
            "cost": 6,
            "scepter_ability": [
                "treant_eyes_in_the_forest"
            ],   
        },
    ],
    "npc_dota_hero_tusk": [
        {
            "spell_id": "tusk_ice_shards",
            "cost": 3
        },
        {
            "spell_id": "tusk_snowball",
            "cost": 4,
            "additional_spells": [
                "tusk_launch_snowball"
            ],
        },
        {
            "spell_id": "tusk_tag_team",
            "cost": 6
        },
        {
            "spell_id": "tusk_walrus_punch",
            "cost": 10,
            "scepter_ability": [
                "tusk_walrus_kick"
            ],
        },
    ],
    "npc_dota_hero_abyssal_underlord": [
        {
            "spell_id": "abyssal_underlord_firestorm",
            "cost": 9
        },
        {
            "spell_id": "abyssal_underlord_pit_of_malice",
            "cost": 3
        },
        {
            "spell_id": "abyssal_underlord_atrophy_aura",
            "cost": 5
        },
        {
            "spell_id": "abyssal_underlord_dark_portal",
            "cost": 9
        },
    ],
    "npc_dota_hero_undying": [
        {
            "spell_id": "undying_decay",
            "cost": 9
        },
        {
            "spell_id": "undying_soul_rip",
            "cost": 3
        },
        {
            "spell_id": "undying_tombstone",
            "cost": 8
        },
        {
            "spell_id": "undying_flesh_golem",
            "cost": 10
        },
    ],
    "npc_dota_hero_skeleton_king": [
        {
            "spell_id": "skeleton_king_hellfire_blast",
            "cost": 3
        },
        {
            "spell_id": "skeleton_king_vampiric_aura",
            "cost": 8
        },
        {
            "spell_id": "skeleton_king_mortal_strike",
            "cost": 8
        },
        {
            "spell_id": "skeleton_king_reincarnation",
            "cost": 10
        },
    ],
    "npc_dota_hero_earth_spirit": [
        {
            "spell_id": "earth_spirit_boulder_smash",
            "cost": 3
        },
        {
            "spell_id": "earth_spirit_rolling_boulder",
            "cost": 3
        },
        {
            "spell_id": "earth_spirit_geomagnetic_grip",
            "cost": 3
        },
        {
            "spell_id": "earth_spirit_stone_caller",
            "cost": 1
        },
        {
            "spell_id": "earth_spirit_magnetize",
            "cost": 3
        },
    ],
	
    "npc_dota_hero_spirit_breaker": [
        {
            "spell_id": "spirit_breaker_charge_of_darkness",
            "cost": 5
        },
        {
            "spell_id": "spirit_breaker_bulldoze",
            "cost": 5
        },
        {
            "spell_id": "spirit_breaker_greater_bash",
            "cost": 8
        },
        {
            "spell_id": "spirit_breaker_nether_strike",
            "cost": 4
        },
    ],
    "npc_dota_hero_slardar": [
        {
            "spell_id": "slardar_sprint",
            "cost": 5
        },
        {
            "spell_id": "slardar_slithereen_crush",
            "cost": 4
        },
        {
            "spell_id": "slardar_bash",
            "cost": 8
        },
        {
            "spell_id": "slardar_amplify_damage",
            "cost": 7
        },
    ],
    "npc_dota_hero_snapfire": [
        {
            "spell_id": "snapfire_scatterblast",
            "cost": 3
        },
        {
            "spell_id": "snapfire_firesnap_cookie",
            "cost": 4,
            "scepter_ability": [
                "snapfire_gobble_up",
                "snapfire_spit_creep"
            ],
        },
        {
            "spell_id": "snapfire_lil_shredder",
            "cost": 9
        },
        {
            "spell_id": "snapfire_mortimer_kisses",
            "cost": 8
        },
    ],
    "npc_dota_hero_dawnbreaker": [
        {
            "spell_id": "dawnbreaker_fire_wreath",
            "cost": 8
        },
        {
            "spell_id": "dawnbreaker_celestial_hammer",
            "cost": 3,
            "additional_spells": [
                "dawnbreaker_converge"
            ],
        },
        // {
            // "spell_id": "dawnbreaker_luminosity",
            // "cost": 8
        // },
        {
            "spell_id": "dawnbreaker_solar_guardian",
            "cost": 4
        },
    ],
    "npc_dota_hero_marci": [
        {
            "spell_id": "marci_grapple",
            "cost": 3
        },
        {
            "spell_id": "marci_companion_run",
            "cost": 3
        },
        {
            "spell_id": "marci_guardian",
            "cost": 8
        },
        {
            "spell_id": "marci_unleash",
            "cost": 6
        },
    ],
    "npc_dota_hero_primal_beast": [
        {
            "spell_id": "primal_beast_onslaught",
            "cost": 8,
            "additional_spells": [
                "primal_beast_onslaught_release"
            ],
        },
        {
            "spell_id": "primal_beast_trample",
            "cost": 5
        },
        {
            "spell_id": "primal_beast_uproar",
            "cost": 5
        },
		{
            "spell_id": "primal_beast_pulverize",
            "cost": 5
        },
    ],

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    "npc_dota_hero_viper": [
        {
            "spell_id": "viper_poison_attack",
            "cost": 9
        },
        {
            "spell_id": "viper_nethertoxin",
            "cost": 5
        },
        {
            "spell_id": "viper_corrosive_skin",
            "cost": 5,
            "scepter_ability": [
                "viper_nose_dive"
            ],
        },
        {
            "spell_id": "viper_viper_strike",
            "cost": 5
        },
    ],
    "npc_dota_hero_antimage": [
        {
            "spell_id": "antimage_mana_break",
            "cost": 7
        },
        {
            "spell_id": "antimage_blink",
            "cost": 5,
            "scepter_ability": [
                "antimage_mana_overload"
            ],
        },
        {
            "spell_id": "antimage_counterspell",
            "cost": 6
        },
        {
            "spell_id": "antimage_mana_void",
            "cost": 3
        },
    ],
    "npc_dota_hero_arc_warden": [
        {
            "spell_id": "arc_warden_flux",
            "cost": 3
        },
        {
            "spell_id": "arc_warden_magnetic_field",
            "cost": 6
        },
        {
            "spell_id": "arc_warden_spark_wraith",
            "cost": 3
        },
		{
            "spell_id": "arc_warden_tempest_double",
            "cost": 10
        },
    ],
    "npc_dota_hero_bloodseeker": [
        {
            "spell_id": "bloodseeker_bloodrage",
            "cost": 8
        },
        {
            "spell_id": "bloodseeker_blood_bath",
            "cost": 5
        },
        {
            "spell_id": "bloodseeker_thirst",
            "cost": 8
        },
        {
            "spell_id": "bloodseeker_rupture",
            "cost": 10,
            "scepter_ability": [
                "bloodseeker_blood_mist"
            ],
        },
    ],
    "npc_dota_hero_bounty_hunter": [
        {
            "spell_id": "bounty_hunter_shuriken_toss",
            "cost": 3
        },
        {
            "spell_id": "bounty_hunter_jinada",
            "cost": 7
        },
        {
            "spell_id": "bounty_hunter_wind_walk",
            "cost": 4
        },
		{
            "spell_id": "bounty_hunter_track",
            "cost": 8
        },
    ],
    "npc_dota_hero_broodmother": [
        {
            "spell_id": "broodmother_insatiable_hunger",
            "cost": 6
        },
        {
            "spell_id": "broodmother_spin_web",
            "cost": 6,
            "scepter_ability": [
                "broodmother_sticky_snare"
            ],
        },
        {
            "spell_id": "broodmother_silken_bola",
            "cost": 3
        },
        {
            "spell_id": "broodmother_spawn_spiderlings",
            "cost": 9
        },
    ],
    "npc_dota_hero_clinkz": [
        {
            "spell_id": "clinkz_strafe",
            "cost": 6
        },
        {
            "spell_id": "clinkz_searing_arrows",
            "cost": 7
        },
        {
            "spell_id": "clinkz_wind_walk",
            "cost": 6
        },
        {
            "spell_id": "clinkz_death_pact",
            "cost": 7,
            "scepter_ability": [
                "clinkz_burning_army"
            ],
        },
    ],
    "npc_dota_hero_drow_ranger": [
        {
            "spell_id": "drow_ranger_frost_arrows",
            "cost": 5
        },
        {
            "spell_id": "drow_ranger_wave_of_silence",
            "cost": 3
        },
        {
            "spell_id": "drow_ranger_multishot",
            "cost": 3
        },
        {
            "spell_id": "drow_ranger_marksmanship",
            "cost": 10
        },
    ],
    "npc_dota_hero_ember_spirit": [
        {
            "spell_id": "ember_spirit_searing_chains",
            "cost": 5
        },
        {
            "spell_id": "ember_spirit_sleight_of_fist",
            "cost": 9
        },
        {
            "spell_id": "ember_spirit_flame_guard",
            "cost": 6
        },
        {        
            "spell_id": "ember_spirit_fire_remnant",
            "cost": 5,
            "additional_spells": [
                "ember_spirit_activate_fire_remnant"
            ],
        }
    ],
    "npc_dota_hero_faceless_void": [
        {
            "spell_id": "faceless_void_time_walk",
            "cost": 5,
            "additional_spells": [
                "faceless_void_time_walk_reverse"
            ],
        },
        {
            "spell_id": "faceless_void_time_dilation",
            "cost": 6
        },
        {
            "spell_id": "faceless_void_time_lock",
            "cost": 10
        },
        {
            "spell_id": "faceless_void_chronosphere",
            "cost": 8
        },
    ],
    "npc_dota_hero_gyrocopter": [
        {
            "spell_id": "gyrocopter_rocket_barrage",
            "cost": 8
        },
        {
            "spell_id": "gyrocopter_homing_missile",
            "cost": 3
        },
        {
            "spell_id": "gyrocopter_flak_cannon",
            "cost": 8
        },
        {
            "spell_id": "gyrocopter_call_down",
            "cost": 5
        },
    ],
    "npc_dota_hero_juggernaut": [
        {
            "spell_id": "juggernaut_blade_fury",
            "cost": 5
        },
        {
            "spell_id": "juggernaut_healing_ward",
            "cost": 4
        },
        {
            "spell_id": "juggernaut_blade_dance",
            "cost": 8
        },
        {
            "spell_id": "juggernaut_omni_slash",
            "cost": 10,
            "scepter_ability": [
                "juggernaut_swift_slash"
            ],
        },
    ],
    "npc_dota_hero_lone_druid": [
        {
            "spell_id": "lone_druid_spirit_bear",
            "cost": 10
        },
        {
            "spell_id": "lone_druid_spirit_link",
            "cost": 5
        },
        {
            "spell_id": "lone_druid_savage_roar",
            "cost": 5
        },
        {
            "spell_id": "lone_druid_true_form",
            "cost": 8
        },
    ],
    "npc_dota_hero_luna": [
        {
            "spell_id": "luna_lucent_beam",
            "cost": 6
        },
        {
            "spell_id": "luna_moon_glaive",
            "cost": 8
        },
        {
            "spell_id": "luna_lunar_blessing",
            "cost": 8
        },
        {
            "spell_id": "luna_eclipse",
            "cost": 8
        },
    ],
    "npc_dota_hero_medusa": [
        {
            "spell_id": "medusa_split_shot",
            "cost": 6
        },
        {
            "spell_id": "medusa_mystic_snake",
            "cost": 4
        },
        {
            "spell_id": "medusa_mana_shield",
            "cost": 10
        },
        {
            "spell_id": "medusa_stone_gaze",
            "cost": 6
        },
    ],
    "npc_dota_hero_meepo": [
        {
            "spell_id": "meepo_earthbind",
            "cost": 2
        },
        {
            "spell_id": "meepo_poof",
            "cost": 4
        },
        {
            "spell_id": "meepo_ransack",
            "cost": 6,
            "scepter_ability": [
                "meepo_petrify"
            ],
        },
    ],
    "npc_dota_hero_mirana": [
        {
            "spell_id": "mirana_starfall",
            "cost": 5
        },
        {
            "spell_id": "mirana_arrow",
            "cost": 7
        },
        {
            "spell_id": "mirana_leap",
            "cost": 5
        },
        {
            "spell_id": "mirana_invis",
            "cost": 6
        },
    ],
    "npc_dota_hero_monkey_king": [
        {
            "spell_id": "monkey_king_boundless_strike",
            "cost": 8
        },
        {
            "spell_id": "monkey_king_tree_dance",
            "cost": 3,
            "additional_spells": [
                "monkey_king_primal_spring",
                "monkey_king_primal_spring_early"
            ],
        },
        {
            "spell_id": "monkey_king_jingu_mastery",
            "cost": 8
        },
        {
            "spell_id": "monkey_king_wukongs_command",
            "cost": 10
        },
    ],

    "npc_dota_hero_morphling": [
        {
            "spell_id": "morphling_waveform",
            "cost": 4
        },
        {
            "spell_id": "morphling_adaptive_strike_agi",
            "cost": 5,
            "additional_spells": [
                "morphling_adaptive_strike_str"
            ],
        },
        {
            "spell_id": "morphling_adaptive_strike_str",
            "cost": 5,
            "additional_spells": [
                "morphling_adaptive_strike_agi"
            ],
        },
        {
            "spell_id": "morphling_morph_agi",
            "cost": 7,
            "additional_spells": [
                "morphling_morph_str"
            ],
        },
        {
            "spell_id": "morphling_morph_str",
            "cost": 7,
            "additional_spells": [
                "morphling_morph_agi"
            ],
        },
        {
            "spell_id": "morphling_replicate",
            "cost": 10,
            "additional_spells": [
                "morphling_morph_replicate",
                "morphling_morph"
            ],
        },
    ],
    "npc_dota_hero_naga_siren": [
        {
            "spell_id": "naga_siren_mirror_image",
            "cost": 8
        },
        {
            "spell_id": "naga_siren_ensnare",
            "cost": 4,
            "scepter_ability": [
                "naga_siren_reel_in"
            ],
        },
        {
            "spell_id": "naga_siren_rip_tide",
            "cost": 6
        },
        {
            "spell_id": "naga_siren_song_of_the_siren",
            "cost": 8,
            "additional_spells": [
                "naga_siren_song_of_the_siren_cancel",
            ],            
        },
    ],
    "npc_dota_hero_nyx_assassin": [
        {
            "spell_id": "nyx_assassin_impale",
            "cost": 3
        },
        {
            "spell_id": "nyx_assassin_mana_burn",
            "cost": 6
        },
        {
            "spell_id": "nyx_assassin_spiked_carapace",
            "cost": 6
        },
        {
            "spell_id": "nyx_assassin_vendetta",
            "cost": 5,
            "scepter_ability": [
                "nyx_assassin_burrow",
				"nyx_assassin_unburrow"
            ],
        },
    ],
    "npc_dota_hero_pangolier": [
        {
            "spell_id": "pangolier_swashbuckle",
            "cost": 8
        },
        {
            "spell_id": "pangolier_shield_crash",
            "cost": 4
        },
        {
            "spell_id": "pangolier_lucky_shot",
            "cost": 8
        },
        {
            "spell_id": "pangolier_gyroshell",
            "cost": 6,
            "additional_spells": [
                "pangolier_gyroshell_stop"
            ],
        },
    ],
    "npc_dota_hero_phantom_assassin": [
        {
            "spell_id": "phantom_assassin_stifling_dagger",
            "cost": 4
        },
        {
            "spell_id": "phantom_assassin_phantom_strike",
            "cost": 5
        },
        {
            "spell_id": "phantom_assassin_blur",
            "cost": 5
        },
        {
            "spell_id": "phantom_assassin_coup_de_grace",
            "cost": 10
        },
    ],
    "npc_dota_hero_phantom_lancer": [
        {
            "spell_id": "phantom_lancer_spirit_lance",
            "cost": 4
        },
        {
            "spell_id": "phantom_lancer_doppelwalk",
            "cost": 8
        },
        {
            "spell_id": "phantom_lancer_phantom_edge",
            "cost": 6
        },
        {
            "spell_id": "phantom_lancer_juxtapose",
            "cost": 10
        },
    ],
    "npc_dota_hero_razor": [
        {
            "spell_id": "razor_plasma_field",
            "cost": 3
        },
        {
            "spell_id": "razor_static_link",
            "cost": 7
        },
        {
            "spell_id": "razor_unstable_current",
            "cost": 7
        },
        {
            "spell_id": "razor_eye_of_the_storm",
            "cost": 9
        },
    ],
    "npc_dota_hero_nevermore": [
        {
            "spell_id": "nevermore_shadowraze1",
            "cost": 5,
            "additional_spells": [
                "nevermore_shadowraze2",
                "nevermore_shadowraze3"
            ],
        },
        {
            "spell_id": "nevermore_shadowraze2",
            "cost": 5,
            "additional_spells": [
                "nevermore_shadowraze1",
                "nevermore_shadowraze3"
            ],
        },
        {
            "spell_id": "nevermore_shadowraze3",
            "cost": 5,
            "additional_spells": [
                "nevermore_shadowraze1",
                "nevermore_shadowraze2"
            ],
        },
        {
            "spell_id": "nevermore_necromastery",
            "cost": 7
        },
        {
            "spell_id": "nevermore_dark_lord",
            "cost": 3
        },
        {
            "spell_id": "nevermore_requiem",
            "cost": 8
        },
    ],
    "npc_dota_hero_terrorblade": [
        {
            "spell_id": "terrorblade_reflection",
            "cost": 6
        },
        {
            "spell_id": "terrorblade_conjure_image",
            "cost": 8
        },
        {
            "spell_id": "terrorblade_metamorphosis",
            "cost": 10,
            "scepter_ability": [
                "terrorblade_terror_wave"
            ],
        },
        {
            "spell_id": "terrorblade_sunder",
            "cost": 10
        },
    ],
    "npc_dota_hero_troll_warlord": [
        {
            "spell_id": "troll_warlord_berserkers_rage",
            "cost": 8
        },
        {
            "spell_id": "troll_warlord_whirling_axes_ranged",
            "cost": 4,
            "scepter_ability": [
                "troll_warlord_whirling_axes_melee"
            ],
        },
        {
            "spell_id": "troll_warlord_whirling_axes_melee",
            "cost": 4,
            "scepter_ability": [
                "troll_warlord_whirling_axes_ranged"
            ],
        },
        {
            "spell_id": "troll_warlord_fervor",
            "cost": 8
        },
        {
            "spell_id": "troll_warlord_battle_trance",
            "cost": 10
        },
    ],
    "npc_dota_hero_ursa": [
        {
            "spell_id": "ursa_earthshock",
            "cost": 3
        },
        {
            "spell_id": "ursa_overpower",
            "cost": 8
        },
        {
            "spell_id": "ursa_fury_swipes",
            "cost": 10
        },
        {
            "spell_id": "ursa_enrage",
            "cost": 6
        },
    ],
    "npc_dota_hero_vengefulspirit": [
        {
            "spell_id": "vengefulspirit_magic_missile",
            "cost": 3
        },
        {
            "spell_id": "vengefulspirit_wave_of_terror",
            "cost": 5
        },
        {
            "spell_id": "vengefulspirit_command_aura",
            "cost": 8
        },
        {
            "spell_id": "vengefulspirit_nether_swap",
            "cost": 4
        },
    ],
    "npc_dota_hero_venomancer": [
        {
            "spell_id": "venomancer_venomous_gale",
            "cost": 4
        },
        {
            "spell_id": "venomancer_poison_sting",
            "cost": 4
        },
        {
            "spell_id": "venomancer_plague_ward",
            "cost": 5
        },
        {
            "spell_id": "venomancer_poison_nova",
            "cost": 8
        },
    ],
    "npc_dota_hero_weaver": [
        {
            "spell_id": "weaver_the_swarm",
            "cost": 5
        },
        {
            "spell_id": "weaver_shukuchi",
            "cost": 6
        },
        {
            "spell_id": "weaver_geminate_attack",
            "cost": 9
        },
        {
            "spell_id": "weaver_time_lapse",
            "cost": 8
        },
    ],
    "npc_dota_hero_riki": [
        {
            "spell_id": "riki_smoke_screen",
            "cost": 6
        },
        {
            "spell_id": "riki_blink_strike",
            "cost": 4
        },
        {
            "spell_id": "riki_tricks_of_the_trade",
            "cost": 6
        },
        {
            "spell_id": "riki_backstab",
            "cost": 8
        },
    ],
    "npc_dota_hero_templar_assassin": [
        {
            "spell_id": "templar_assassin_refraction",
            "cost": 7
        },
        {
            "spell_id": "templar_assassin_meld",
            "cost": 5
        },
        {
            "spell_id": "templar_assassin_psi_blades",
            "cost": 7
        },
        {
            "spell_id": "templar_assassin_psionic_trap",
            "cost": 6,
			"additional_spells": [
                "templar_assassin_trap"
            ],
            "scepter_ability": [
                "templar_assassin_trap_teleport"
            ],
        },
    ],
    "npc_dota_hero_spectre": [
        {
            "spell_id": "spectre_spectral_dagger",
            "cost": 3
        },
        {
            "spell_id": "spectre_desolate",
            "cost": 6
        },
        {
            "spell_id": "spectre_dispersion",
            "cost": 9
        },
        {
            "spell_id": "additional_spells",
            "cost": 10,
			"scepter_ability": [
                "spectre_haunt_single"
            ],
            "additional_spells": [
                "spectre_reality"
            ],
        },
    ],
    "npc_dota_hero_slark": [
        {
            "spell_id": "slark_dark_pact",
            "cost": 4
        },
        {
            "spell_id": "slark_pounce",
            "cost": 3
        },
        {
            "spell_id": "slark_essence_shift",
            "cost": 8
        },
        {
            "spell_id": "slark_shadow_dance",
            "cost": 6
        },
    ],
    "npc_dota_hero_sniper": [
        {
            "spell_id": "sniper_shrapnel",
            "cost": 5
        },
        {
            "spell_id": "sniper_headshot",
            "cost": 5
        },
        {
            "spell_id": "sniper_take_aim",
            "cost": 7
        },
        {
            "spell_id": "sniper_assassinate",
            "cost": 8
        },
    ],
    "npc_dota_hero_hoodwink": [
        {
            "spell_id": "hoodwink_acorn_shot",
            "cost": 3
        },
        {
            "spell_id": "hoodwink_bushwhack",
            "cost": 3
        },
        {
            "spell_id": "hoodwink_scurry",
            "cost": 5,
			"scepter_ability": [
                "hoodwink_decoy"
            ],
        },
        {
            "spell_id": "hoodwink_sharpshooter",
            "cost": 8,
			"additional_spells": [
                "hoodwink_sharpshooter_release"
            ],
        },
    ],
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
    "npc_dota_hero_bane": [
        {
            "spell_id": "bane_enfeeble",
            "cost": 4
        },
		{
            "spell_id": "bane_brain_sap",
            "cost": 6
        },
		{
            "spell_id": "bane_nightmare",
            "cost": 3,
            "additional_spells": [
                "bane_nightmare_end"
            ],
        },
        {
            "spell_id": "bane_fiends_grip",
            "cost": 8
        },
    ],
    "npc_dota_hero_ancient_apparition": [
        {
            "spell_id": "ancient_apparition_cold_feet",
            "cost": 3
        },
        {
            "spell_id": "ancient_apparition_ice_vortex",
            "cost": 5
        },
        {
            "spell_id": "ancient_apparition_chilling_touch",
            "cost": 8
        },
        {
            "spell_id": "ancient_apparition_ice_blast",
            "cost": 8,
            "additional_spells": [
                "ancient_apparition_ice_blast_release"
            ],
        },
    ],
    "npc_dota_hero_batrider": [
        {
            "spell_id": "batrider_sticky_napalm",
            "cost": 8
        },
        {
            "spell_id": "batrider_flamebreak",
            "cost": 4
        },
        {
            "spell_id": "batrider_firefly",
            "cost": 5
        },
        {
            "spell_id": "batrider_flaming_lasso",
            "cost": 5
        },
    ],
    "npc_dota_hero_chen": [
        {
            "spell_id": "chen_penitence",
            "cost": 3
        },
        {
            "spell_id": "chen_holy_persuasion",
            "cost": 4
        },
        {
            "spell_id": "chen_divine_favor",
            "cost": 4
        },
        {
            "spell_id": "chen_hand_of_god",
            "cost": 4
        },
    ],
    "npc_dota_hero_dark_seer": [
        {
            "spell_id": "dark_seer_vacuum",
            "cost": 5
        },
        {
            "spell_id": "dark_seer_ion_shell",
            "cost": 4
        },
        {
            "spell_id": "dark_seer_surge",
            "cost": 5,
            "scepter_ability": [
                "dark_seer_normal_punch"
            ],
        },
        {
            "spell_id": "dark_seer_wall_of_replica",
            "cost": 8
        },
    ],
    "npc_dota_hero_dark_willow": [
        {
            "spell_id": "dark_willow_bramble_maze",
            "cost": 3
        },
        {
            "spell_id": "dark_willow_shadow_realm",
            "cost": 10
        },
        {
            "spell_id": "dark_willow_cursed_crown",
            "cost": 3
        },
        {
            "spell_id": "dark_willow_terrorize",
            "cost": 6,
            "additional_spells": [
                "dark_willow_bedlam"
            ],
        },
    ],
    "npc_dota_hero_dazzle": [
        {
            "spell_id": "dazzle_poison_touch",
            "cost": 3
        },
        {
            "spell_id": "dazzle_shallow_grave",
            "cost": 6
        },
        {
            "spell_id": "dazzle_shadow_wave",
            "cost": 4
        },
		{
            "spell_id": "dazzle_good_juju",
            "cost": 10
        },
        {
            "spell_id": "dazzle_bad_juju",
            "cost": 8
        },
    ],
    "npc_dota_hero_death_prophet": [
        {
            "spell_id": "death_prophet_carrion_swarm",
            "cost": 8
        },
        {
            "spell_id": "death_prophet_silence",
            "cost": 5
        },
        {
            "spell_id": "death_prophet_spirit_siphon",
            "cost": 9
        },
        {
            "spell_id": "death_prophet_exorcism",
            "cost": 6
        },
    ],
    "npc_dota_hero_disruptor": [
        {
            "spell_id": "disruptor_thunder_strike",
            "cost": 4
        },
        {
            "spell_id": "disruptor_glimpse",
            "cost": 3
        },
        {
            "spell_id": "disruptor_kinetic_field",
            "cost": 3
        },
        {
            "spell_id": "disruptor_static_storm",
            "cost": 8
        },
    ],
    "npc_dota_hero_enchantress": [
        {
            "spell_id": "enchantress_impetus",
            "cost": 8,
			"scepter_ability": [
                "enchantress_bunny_hop"
            ],
        },
        {
            "spell_id": "enchantress_enchant",
            "cost": 5
        },
        {
            "spell_id": "enchantress_natures_attendants",
            "cost": 6
        },
		{
            "spell_id": "enchantress_untouchable",
            "cost": 8
        },
    ],
    "npc_dota_hero_enigma": [
        {
            "spell_id": "enigma_malefice",
            "cost": 3
        },
        {
            "spell_id": "enigma_demonic_conversion",
            "cost": 4
        },
        {
            "spell_id": "enigma_midnight_pulse",
            "cost": 7
        },
        {
            "spell_id": "enigma_black_hole",
            "cost": 10
        },
    ],
    "npc_dota_hero_grimstroke": [
        {
            "spell_id": "grimstroke_dark_artistry",
            "cost": 7
        },
        {
            "spell_id": "grimstroke_ink_creature",
            "cost": 4
        },
        {
            "spell_id": "grimstroke_spirit_walk",
            "cost": 4
        },
        {
            "spell_id": "grimstroke_soul_chain",
            "cost": 8,
			"scepter_ability": [
                "grimstroke_dark_portrait"
            ],
        },
    ],
    "npc_dota_hero_invoker": [
        {
            "spell_id": "invoker_chaos_meteor_ad",
            "cost": 3
        },
        {
            "spell_id": "invoker_deafening_blast_ad",
            "cost": 3
        },
        {
            "spell_id": "invoker_tornado_ad",
            "cost": 3
        },
        {
            "spell_id": "invoker_emp_ad",
            "cost": 3
        },
        {
            "spell_id": "invoker_alacrity_ad",
            "cost": 3
        },
        {
            "spell_id": "invoker_cold_snap_ad",
            "cost": 3
        },
        {
            "spell_id": "invoker_sun_strike_ad",
            "cost": 3
        },
        {
            "spell_id": "invoker_forge_spirit_ad",
            "cost": 6
        },
        {
            "spell_id": "invoker_ice_wall_ad",
            "cost": 3
        },
        {
            "spell_id": "invoker_ghost_walk_ad",
            "cost": 3
        },
    ],
    "npc_dota_hero_jakiro": [
        {
            "spell_id": "jakiro_dual_breath",
            "cost": 4
        },
        {
            "spell_id": "jakiro_ice_path",
            "cost": 4
        },
        {
            "spell_id": "jakiro_liquid_fire",
            "cost": 6
        },
        {
            "spell_id": "jakiro_macropyre",
            "cost": 8
        },
    ],
    "npc_dota_hero_keeper_of_the_light": [
        {
            "spell_id": "keeper_of_the_light_illuminate",
            "cost": 5,
            "additional_spells": [
                "keeper_of_the_light_illuminate_end",
                "keeper_of_the_light_spirit_form_illuminate",
                "keeper_of_the_light_spirit_form_illuminate_end",
            ],
        },
        {
            "spell_id": "keeper_of_the_light_radiant_bind",
            "cost": 5
        },
        {
            "spell_id": "keeper_of_the_light_blinding_light",
            "cost": 3
        },
        {
            "spell_id": "keeper_of_the_light_chakra_magic",
            "cost": 7
        },
        {
            "spell_id": "keeper_of_the_light_spirit_form",
            "cost": 8,
			"scepter_ability": [
                "keeper_of_the_light_will_o_wisp"
            ],
        },
    ],
    "npc_dota_hero_leshrac": [
        {
            "spell_id": "leshrac_split_earth",
            "cost": 5
        },
        {
            "spell_id": "leshrac_diabolic_edict",
            "cost": 5
        },
        {
            "spell_id": "leshrac_lightning_storm",
            "cost": 7
        },
        {
            "spell_id": "leshrac_pulse_nova",
            "cost": 8,
			"scepter_ability": [
                "leshrac_greater_lightning_storm"
            ],
        },
    ],
    "npc_dota_hero_lich": [
        {
            "spell_id": "lich_frost_nova",
            "cost": 3
        },
        {
            "spell_id": "lich_frost_shield",
            "cost": 3
        },
        {
            "spell_id": "lich_frost_shield",
            "cost": 5
        },
        {
            "spell_id": "lich_chain_frost",
            "cost": 8
        },
    ],
    "npc_dota_hero_lina": [
        {
            "spell_id": "lina_dragon_slave",
            "cost": 4
        },
        {
            "spell_id": "lina_light_strike_array",
            "cost": 3
        },
        {
            "spell_id": "lina_fiery_soul",
            "cost": 8,
			"scepter_ability": [
                "lina_flame_cloak"
            ],
        },
        {
            "spell_id": "lina_laguna_blade",
            "cost": 8
        },
    ],
    "npc_dota_hero_lion": [
        {
            "spell_id": "lion_impale",
            "cost": 4
        },
        {
            "spell_id": "lion_voodoo",
            "cost": 3
        },
        {
            "spell_id": "lion_mana_drain",
            "cost": 3
        },
        {
            "spell_id": "lion_custom_finger_of_death",
            "cost": 10
        },
    ],
    "npc_dota_hero_furion": [
        {
            "spell_id": "furion_sprout",
            "cost": 4
        },
        {
            "spell_id": "furion_teleportation",
            "cost": 4
        },
        {
            "spell_id": "furion_force_of_nature",
            "cost": 4
        },
        {
            "spell_id": "furion_wrath_of_nature",
            "cost": 5
        },
    ],
    "npc_dota_hero_necrolyte": [
        {
            "spell_id": "necrolyte_death_pulse",
            "cost": 5
        },
        {
            "spell_id": "necrolyte_sadist",
            "cost": 6
        },
        {
            "spell_id": "necrolyte_sadist",
            "cost": 8
        },
        {
            "spell_id": "necrolyte_reapers_scythe",
            "cost": 10
        },
    ],
    "npc_dota_hero_ogre_magi": [
        {
            "spell_id": "ogre_magi_fireblast",
            "cost": 6,
            "scepter_ability": [
                "ogre_magi_unrefined_fireblast"
            ],
        },
        {
            "spell_id": "ogre_magi_ignite",
            "cost": 3
        },
        {
            "spell_id": "ogre_magi_bloodlust",
            "cost": 3
        },
        {
            "spell_id": "ogre_magi_multicast",
            "cost": 10
        },
    ],
    "npc_dota_hero_oracle": [
        {
            "spell_id": "oracle_fortunes_end",
            "cost": 3
        },
        {
            "spell_id": "oracle_fates_edict",
            "cost": 5
        },
        {
            "spell_id": "oracle_purifying_flames",
            "cost": 8,
            "scepter_ability": [
                "oracle_rain_of_destiny"
            ],
        },
        {
            "spell_id": "oracle_false_promise",
            "cost": 10
        },
    ],
    "npc_dota_hero_obsidian_destroyer": [
        {
            "spell_id": "obsidian_destroyer_arcane_orb",
            "cost": 8
        },
        {
            "spell_id": "obsidian_destroyer_astral_imprisonment",
            "cost": 5
        },
        {
            "spell_id": "obsidian_destroyer_equilibrium",
            "cost": 8
        },
        {
            "spell_id": "obsidian_destroyer_sanity_eclipse",
            "cost": 10
        },
    ],
    "npc_dota_hero_puck": [
        {
            "spell_id": "puck_illusory_orb",
            "cost": 4,
            "additional_spells": [
                "puck_ethereal_jaunt"
            ],
        },
        {
            "spell_id": "puck_waning_rift",
            "cost": 4
        },
        {
            "spell_id": "puck_phase_shift",
            "cost": 6
        },
        {
            "spell_id": "puck_dream_coil",
            "cost": 8
        },
    ],
    "npc_dota_hero_pugna": [
        {
            "spell_id": "pugna_nether_blast",
            "cost": 4
        },
        {
            "spell_id": "pugna_decrepify",
            "cost": 6
        },
		{
            "spell_id": "pugna_nether_ward",
            "cost": 8
        },
        {
            "spell_id": "pugna_life_drain",
            "cost": 8
        },
    ],
    "npc_dota_hero_shadow_shaman": [
        {
            "spell_id": "shadow_shaman_ether_shock",
            "cost": 4
        },
        {
            "spell_id": "shadow_shaman_voodoo",
            "cost": 5
        },
        {
            "spell_id": "shadow_shaman_shackles",
            "cost": 4
        },
        {
            "spell_id": "shadow_shaman_mass_serpent_ward",
            "cost": 10
        },
    ],
    "npc_dota_hero_silencer": [
        {
            "spell_id": "silencer_curse_of_the_silent",
            "cost": 3
        },
        {
            "spell_id": "silencer_glaives_of_wisdom",
            "cost": 9
        },
        {
            "spell_id": "silencer_last_word",
            "cost": 4
        },
        {
            "spell_id": "silencer_global_silence",
            "cost": 8
        },
    ],
    "npc_dota_hero_skywrath_mage": [
        {
            "spell_id": "skywrath_mage_arcane_bolt",
            "cost": 6
        },
        {
            "spell_id": "skywrath_mage_concussive_shot",
            "cost": 4
        },
        {
            "spell_id": "skywrath_mage_ancient_seal",
            "cost": 6
        },
        {
            "spell_id": "skywrath_mage_mystic_flare",
            "cost": 10
        },
    ],
    "npc_dota_hero_storm_spirit": [
        {
            "spell_id": "storm_spirit_static_remnant",
            "cost": 3
        },
        {
            "spell_id": "storm_spirit_electric_vortex",
            "cost": 5
        },
        {
            "spell_id": "storm_spirit_overload",
            "cost": 5
        },
        {
            "spell_id": "storm_spirit_ball_lightning",
            "cost": 10
        },
    ],
    "npc_dota_hero_techies": [
        {
            "spell_id": "techies_sticky_bomb",
            "cost": 5
        },
        {
            "spell_id": "techies_reactive_tazer",
            "cost": 4
        },
        {
            "spell_id": "techies_suicide",
            "cost": 4
        },
        {
            "spell_id": "techies_land_mines",
            "cost": 6
        },
    ],
    "npc_dota_hero_tinker": [
        {
            "spell_id": "tinker_laser",
            "cost": 6
        },
        {
            "spell_id": "tinker_heat_seeking_missile",
            "cost": 8
        },
        {
            "spell_id": "tinker_defense_matrix",
            "cost": 6
        },
        {
            "spell_id": "tinker_rearm",
            "cost": 10
        },
    ],
    "npc_dota_hero_visage": [
        {
            "spell_id": "visage_grave_chill",
            "cost": 3
        },
        {
            "spell_id": "visage_soul_assumption",
            "cost": 4
        },
        {
            "spell_id": "visage_gravekeepers_cloak",
            "cost": 5
        },
        {
            "spell_id": "visage_summon_familiars",
            "cost": 10,
            "scepter_ability": [
                "visage_silent_as_the_grave"
            ],
        },
    ],
    "npc_dota_hero_void_spirit": [
        {
            "spell_id": "void_spirit_aether_remnant",
            "cost": 3
        },
        {
            "spell_id": "void_spirit_dissimilate",
            "cost": 4
        },
        {
            "spell_id": "void_spirit_resonant_pulse",
            "cost": 4
        },
        {
            "spell_id": "void_spirit_astral_step",
            "cost": 8
        },
    ],
    "npc_dota_hero_warlock": [
        {
            "spell_id": "warlock_fatal_bonds",
            "cost": 7
        },
        {
            "spell_id": "warlock_shadow_word",
            "cost": 3
        },
        {
            "spell_id": "warlock_upheaval",
            "cost": 2
        },
        {
            "spell_id": "warlock_rain_of_chaos",
            "cost": 10
        },
    ],
    "npc_dota_hero_windrunner": [
        {
            "spell_id": "windrunner_shackleshot",
            "cost": 3
        },
        {
            "spell_id": "windrunner_powershot",
            "cost": 4
        },
        {
            "spell_id": "windrunner_windrun",
            "cost": 6
        },
        {
            "spell_id": "windrunner_focusfire",
            "cost": 8 
        },
    ],
    "npc_dota_hero_winter_wyvern": [
        {
            "spell_id": "winter_wyvern_arctic_burn",
            "cost": 10
        },
        {
            "spell_id": "winter_wyvern_splinter_blast",
            "cost": 3
        },
        {
            "spell_id": "winter_wyvern_cold_embrace",
            "cost": 3
        },
        {
            "spell_id": "winter_wyvern_winters_curse",
            "cost": 8
        },
    ],
    "npc_dota_hero_witch_doctor": [
        {
            "spell_id": "witch_doctor_paralyzing_cask",
            "cost": 4
        },
        {
            "spell_id": "witch_doctor_voodoo_restoration",
            "cost": 6
        },
        {
            "spell_id": "witch_doctor_maledict",
            "cost": 8
        },
        {
            "spell_id": "witch_doctor_death_ward",
            "cost": 10
        },
    ],
    "npc_dota_hero_zuus": [
        {
            "spell_id": "zuus_arc_lightning",
            "cost": 4
        },
        {
            "spell_id": "zuus_lightning_bolt",
            "cost": 6,
            "scepter_ability": [
                "zuus_cloud"
            ],
        },
        {
            "spell_id": "zuus_heavenly_jump",
            "cost": 3
        },
        {
            "spell_id": "zuus_thundergods_wrath",
            "cost": 10
        },
    ],
    "npc_dota_hero_crystal_maiden": [
        {
            "spell_id": "crystal_maiden_crystal_nova",
            "cost": 5
        },
        {
            "spell_id": "crystal_maiden_frostbite",
            "cost": 3
        },
        {
            "spell_id": "crystal_maiden_brilliance_aura",
            "cost": 5
        },
        {
            "spell_id": "crystal_maiden_freezing_field",
            "cost": 8,
            "additional_spells": [
                "crystal_maiden_freezing_field_stop"
            ],
        },
    ],
    "npc_dota_hero_shadow_demon": [
        {
            "spell_id": "shadow_demon_disruption",
            "cost": 8
        },
        {
            "spell_id": "shadow_demon_disseminate",
            "cost": 4
        },
        {
            "spell_id": "shadow_demon_shadow_poison",
            "cost": 6,
            "additional_spells": [
                "shadow_demon_shadow_poison_release"
            ],
        },
        {
            "spell_id": "shadow_demon_demonic_purge",
            "cost": 10
        },
    ],
    "npc_dota_hero_queenofpain": [
        {
            "spell_id": "queenofpain_shadow_strike",
            "cost": 4
        },
        {
            "spell_id": "queenofpain_blink",
            "cost": 4
        },
        {
            "spell_id": "queenofpain_scream_of_pain",
            "cost": 5
        },
        {
            "spell_id": "queenofpain_sonic_wave",
            "cost": 9
        },
    ],
    "npc_dota_hero_rubick": [
        {
            "spell_id": "rubick_telekinesis",
            "cost": 3,
            "additional_spells": [
                "rubick_telekinesis_land"
            ],
        },
        {
            "spell_id": "rubick_fade_bolt",
            "cost": 4
        },
		{
			"spell_id": "rubick_arcane_supremacy",
			"cost": 6
		},
    ],
};


function CreateHeroesListingForAll() {
    var heroesContainer;
    var heroPanel;
    for (var category = 0; category < heroes.length; category++) {
        if (category === 0) {
            // Strength
            heroesContainer = customSpellsMenuPanel.FindChildTraverse("SpellsMenuHeroesStrengthBlock");
            customSpellsMenuPanel.FindChildTraverse("SpellsMenuHeroesStrengthBlock").text = "STRENGTH";
        } 
        else if (category === 1) {
            // Agility
            heroesContainer = customSpellsMenuPanel.FindChildTraverse("SpellsMenuHeroesAgilityBlock");
            customSpellsMenuPanel.FindChildTraverse("SpellsMenuHeroesAgilityBlock").text = "AGILITY";
        } 
        else if (category === 2) {
            // Intelligence
            heroesContainer = customSpellsMenuPanel.FindChildTraverse("SpellsMenuHeroesIntelligenceBlock");
            customSpellsMenuPanel.FindChildTraverse("SpellsMenuHeroesIntelligenceBlock").text = "INTELLECT";
        }
		else if (category === 3) {
            // ALL
            heroesContainer = customSpellsMenuPanel.FindChildTraverse("SpellsMenuHeroesAllBlock");
            customSpellsMenuPanel.FindChildTraverse("SpellsMenuHeroesAllBlock").text = "ALL";
        }
        for (var i = 0; i < heroes[category].length; i++) {
            heroPanel = $.CreatePanel("Panel", heroesContainer, "heroPanel" + i);
            CreateHeroesListing(heroPanel, heroes[category][i]);
        }
    }
}

function CreateHeroesListing(heroPanel, hero) {
    heroPanel.BLoadLayoutSnippet("hero");
    var heroData = hero.name_id;
    var image = heroPanel.FindChildInLayoutFile("HeroPictureImage");
    image.heroname = heroData;
    var heroButton = heroPanel.FindChildInLayoutFile("HeroPanelButton");
	heroButton.SetPanelEvent("onactivate", CreateSpellsListingForHero(heroData));
}

var CreateSpellsListingForHero = (function CreateSpellsListingForHero(heroID) {
	return function(){
		var spellsContainer = customSpellsMenuPanel.FindChildTraverse("SpellsMenuSpellsBlock");
		$.Msg(spellsContainer)
		CloseSpellsListingForHero();

		var heroSpells = spells[heroID];
		var spellPanel;
		for (var i = 0; i < heroSpells.length; i++) {
			var individualHeroSpell = heroSpells[i];
			spellPanel = $.CreatePanel("Panel", spellsContainer, "spellPanel" + i);
			spellPanel.BLoadLayoutSnippet("spell");

			var image = spellPanel.FindChildInLayoutFile("SingleSpellPictureImage");

			image.abilityname = individualHeroSpell.spell_id;
			var spellCost = spellPanel.FindChildInLayoutFile("SpellCost");
			spellCost.text = $.Localize("#DOTA_HUD_SPELL_MENU_SPELL_PRICE_DES") + individualHeroSpell.cost;

			var spellButton = spellPanel.FindChildInLayoutFile("SingleSpellPanelButton");
			var spellStringified = JSON.stringify(individualHeroSpell);

			spellButton.SetPanelEvent("onactivate", BuySpell(spellStringified));
			spellButton.SetPanelEvent("onmouseover", AbilityTooltipOver(spellButton, image.abilityname))
			spellButton.SetPanelEvent("onmouseout", function(){$.DispatchEvent( "DOTAHideAbilityTooltip");})
		}
	}
});

var AbilityTooltipOver = (function(pan,skill){
    return function(){
        $.DispatchEvent( "DOTAShowAbilityTooltip", pan, skill);
    }
});

var isOpenSpellMenu = false;

function OpenSpellShopF7() {
    if (isOpenSpellMenu == false) {
        OpenSpellsMenu()
    } else {
        CloseSpellsMenu()
    }
}

const commandf7 = `On${"F7"}${Date.now()}`;
    Game.CreateCustomKeyBind("F7", `+${commandf7}`);
    Game.AddCommand(`+${commandf7}`, () => { OpenSpellShopF7() }, "", 0 );
	

function OpenSpellsMenu() {
	isOpenSwapMenu = true
	OpenSpellsListingForPlayerHero()
    customSpellsMenuPanel.SetHasClass("Visible", true);
    openSpellsMenu.SetHasClass("Visible", false);
    isOpenSpellMenu = true;
}

function CloseSpellsMenu() {
    customSpellsMenuPanel.SetHasClass("Visible", false);
    openSpellsMenu.SetHasClass("Visible", true);
    isOpenSpellMenu = false;
    CloseSpellsListingForHero();
}

function OpenSpellsListForHero(heroID) {
    CreateSpellsListingForHero(heroID);
}

function CloseSpellsListingForHero() {
    var spellsContainer = customSpellsMenuPanel.FindChildTraverse("SpellsMenuSpellsBlock");
    spellsContainer.RemoveAndDeleteChildren();
}

var BuySpell = (function BuySpell(spellJson) {
	return function(){
	$.Msg("buy")
    var spellObj = JSON.parse(spellJson);
    spellObj.player_id = Game.GetLocalPlayerID();
    GameEvents.SendCustomGameEventToServer("spells_menu_buy_spell", spellObj);
	}
});

function BuySpellFeedback(event_data) {
    var nNewValue = event_data.new_card_points;
    spellsMenuCardPoints.text = nNewValue;
    spellsMenuCardPoints.SetAttributeInt("value", nNewValue);
}

function BuyCardpointsFeedback(event_data) {
    var nNewValue = event_data.new_card_points;
    spellsMenuCardPoints.text = nNewValue;
    spellsMenuCardPoints.SetAttributeInt("value", nNewValue);
}

function OpenSellSpellsListing() {
    var event_data = {
        player_id: Game.GetLocalPlayerID()
    }
    GameEvents.SendCustomGameEventToServer("spells_menu_sell_spells", event_data);
}

var isOpenSwapMenu = false;

function OpenSpellsListingForPlayerHero() {
	CloseSpellsMenu()
	if(isOpenSwapMenu == true){
		$.Msg("close")
		swap_menu.style.visibility = "collapse";
		isOpenSwapMenu = false;
		swap_menu.RemoveAndDeleteChildren();
		spellSwapFirstSelected = null
		return
	}else{
		$.Msg("open")
		swap_menu.style.visibility = "Visible";
		isOpenSwapMenu = true;
		   var event_data = {
        player_id: Game.GetLocalPlayerID()
		}
		GameEvents.SendCustomGameEventToServer("spells_menu_get_player_spells", event_data);
	}
}


function SellSpellsSelect(spellName) {
    var spellObj = JSON.parse(spellJson);
    spellObj.player_id = Game.GetLocalPlayerID();
    GameEvents.SendCustomGameEventToServer("spells_menu_buy_spell", spellObj);
}

function GetPlayerSpellsFeedback(event_data) {
    CloseSpellsListingForHero();
    var heroSpells = event_data.player_abilities;
    var spellPanel;
    for (var key in heroSpells) {
        if (heroSpells.hasOwnProperty(key)) {
            var individualHeroSpellName = heroSpells[key];
            spellPanel = $.CreatePanel("Panel", swap_menu, "spellPanel" + key);
            spellPanel.BLoadLayoutSnippet("spell_swap");

            var image = spellPanel.FindChildInLayoutFile("SingleSpellPictureImage");
            image.abilityname = individualHeroSpellName;
            var spellButton = spellPanel.FindChildInLayoutFile("SingleSpellPanelButton");

            spellButton.SetPanelEvent("onactivate", SpellSwapSelect(individualHeroSpellName, spellButton))
            spellButton.SetPanelEvent("onmouseover", AbilityTooltipOver(spellButton, image.abilityname))
			spellButton.SetPanelEvent("onmouseout", function(){$.DispatchEvent( "DOTAHideAbilityTooltip");})
        }
    }
}

var SpellSwapSelect = (function(pan,skill){ return function(){
        $.DispatchEvent( "DOTAShowAbilityTooltip", pan, skill);
    }
});

var SpellSwapSelect = (function (spellName, spellButton) {return function(){
	$.Msg(spellName)
	$.Msg(spellButton)
    if (spellSwapFirstSelected != null) {
        spellSwapSecondSelected = spellName;
        var playerID = Game.GetLocalPlayerID();
        var event_data = {
            player_id: playerID,
            first_ability_name: spellSwapFirstSelected,
            second_ability_name: spellSwapSecondSelected
        };
        GameEvents.SendCustomGameEventToServer("spells_menu_swap_player_spells", event_data);
		
		OpenSpellsListingForPlayerHero()
		OpenSpellsListingForPlayerHero()
		
        spellSwapFirstSelected = null;
        spellSwapSecondSelected = null;
    } else {
		spellButton.GetParent().style.visibility = "collapse";
		// spellButton.style.width = "110%";
        spellSwapFirstSelected = spellName;
    }
	}
});

function SwapPlayerSpellsFeedback() {
    CloseSpellsMenu();
}

(function () {
    CreateHeroesListingForAll();

    GameEvents.Subscribe("spells_menu_buy_spell_feedback", BuySpellFeedback);
    GameEvents.Subscribe("spells_menu_buy_cardpoints_feedback", BuyCardpointsFeedback);
    GameEvents.Subscribe("spells_menu_get_player_spells_feedback", GetPlayerSpellsFeedback);
    GameEvents.Subscribe("spells_menu_swap_player_spells_feedback", SwapPlayerSpellsFeedback);
})();