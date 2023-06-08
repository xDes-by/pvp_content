var can_use_spray = true;
var can_use_highfive = true;
var playerID = Players.GetLocalPlayer()

function FindDotaHudElement(panel) {
	return $.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse(panel);
}

function OnClickSpray(t) {
	$.Msg(t)
	if (t == "spray"){
		var spray = CustomNetTables.GetTableValue( "sprays", playerID);
		if (spray != null){
			if(can_use_spray) {
					GameEvents.SendCustomGameEventToServer( "CastSpray", {} )
					timer(15)	
				}
			can_use_spray = false
		}	
	}else{
		var spray = CustomNetTables.GetTableValue( "highfive", playerID);
		if (spray != null){
			if(can_use_highfive) {
					GameEvents.SendCustomGameEventToServer( "HighFive", {} )
					timer2(15)	
				}
			can_use_highfive = false
		}	
	}
}

function timer(i) {
	var pan = FindDotaHudElement("CustomAbility_spray_custom");
	text_timer = pan.FindChildTraverse("CosmeticAbility_text")
		if (i > 0) {
			text_timer.text = (i - 1)
		}
		if (i == 0 ) {
			text_timer.text = ""
			can_use_spray = true
			return	
		}
		 i--;
    $.Schedule(1, function() {
        timer(i)
    });
}

function timer2(i) {
	var pan = FindDotaHudElement("CustomAbility_highfive_custom");
	text_timer = pan.FindChildTraverse("CosmeticAbility_text")
		if (i > 0) {
			text_timer.text = (i - 1)
		}
		if (i == 0 ) {
			text_timer.text = ""
			can_use_highfive = true
			return	
		}
		 i--;
    $.Schedule(1, function() {
        timer2(i)
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(function () {
	const centerBlock = FindDotaHudElement("center_block");
	let cosmetics = centerBlock.FindChildTraverse("BarOverItems");

	if (cosmetics) {
		cosmetics.DeleteAsync(0);
	}

	const ability = $.CreatePanel("Button", FindDotaHudElement("BarOverItems"), "CustomAbility_spray_custom");
	ability.BLoadLayoutSnippet("CosmeticAbility");
	
	const ability2 = $.CreatePanel("Button", FindDotaHudElement("BarOverItems"), "CustomAbility_highfive_custom");
	ability2.BLoadLayoutSnippet("CosmeticAbility2");
	
	if (!cosmetics) {
		$("#BarOverItems").SetParent(centerBlock);
	}

	const spray = FindDotaHudElement("CustomAbility_spray_custom");
	spray
		.FindChildTraverse("CosmeticAbilityImage")
		.SetImage( "file://{images}/custom_game/spray_no_empty.png" );
	FindDotaHudElement("BuffContainer").style.marginBottom = "43px;";
	
	const highfive = FindDotaHudElement("CustomAbility_highfive_custom");
	highfive
		.FindChildTraverse("CosmeticAbilityImage")
		.SetImage( "file://{images}/custom_game/highfive.png" );
	FindDotaHudElement("BuffContainer").style.marginBottom = "43px;";
})();