var can_use = true;
var playerID = Players.GetLocalPlayer()

function FindDotaHudElement(panel) {
	return $.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse(panel);
}

function OnClickSpray() {
	var spray = CustomNetTables.GetTableValue( "sprays", playerID);
	if (spray != null){
		if(can_use) {
				GameEvents.SendCustomGameEventToServer( "CastSpray", {} )
				timer(15)	
			}
		can_use = false
	}	
}

function timer(i) {
	var text_timer = FindDotaHudElement("CosmeticAbility_text");
		if (i > 0) {
			text_timer.text = (i - 1)
		}
		if (i == 0 ) {
			text_timer.text = ""
			can_use = true
			return	
		}
		 i--;
    $.Schedule(1, function() {
        timer(i)
    });
}

(function () {
	$.Msg("Qwerty");
	Game.AddCommand( "UseSpray", OnClickSpray, "", 0 );
	$.Msg("Qwerty");
	
	const centerBlock = FindDotaHudElement("center_block");
	let cosmetics = centerBlock.FindChildTraverse("BarOverItems");

	if (cosmetics) {
		cosmetics.DeleteAsync(0);
	}


	const ability = $.CreatePanel("Button", FindDotaHudElement("BarOverItems"), "CustomAbility_spray_custom");
	ability.BLoadLayoutSnippet("CosmeticAbility");
	
	if (!cosmetics) {
		$("#BarOverItems").SetParent(centerBlock);
	}

	const spray = FindDotaHudElement("CustomAbility_spray_custom");
	spray
		.FindChildTraverse("CosmeticAbilityImage")
		.SetImage( "file://{images}/custom_game/spray_no_empty.png" );
	FindDotaHudElement("BuffContainer").style.marginBottom = "43px;";
})();