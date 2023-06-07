function FindDotaHudElement(id){  
	var hudRoot;
	for(panel=$.GetContextPanel();panel!=null;panel=panel.GetParent()){
		hudRoot = panel;
	}
	var comp = hudRoot.FindChildTraverse(id);
	return comp;
}

(
    function() {
        init()
    })()

function FindDotaHudElement(panel) {
	return $.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse(panel);
}

function init() {
    updateEndGamePanelData()
	
	$.Schedule(0.2, function() {
	var panel = FindDotaHudElement("WinLabelContainer");
	if (panel != null) {
		panel.visible = false
	}
	return 0.2
    });
	
	$.Schedule(0.2, function() {
	var panel = FindDotaHudElement("ContinueButton");
	if (panel != null) {
		panel.visible = false
	}
	return 0.2
    });
	
	
	//$('#VictoryLabel').style['opacity'] = '1';
//	$('#VictoryBackgroundScene').style['opacity'] = '1';
//	$('#WinLabelContainer').style['opacity'] = '1';
//	$('#EndGame').visible = false
}
function endGameEventRegister(){
    $.Msg("making sure this part exed-----------------")
    var winnerTeam = CustomNetTables.GetTableValue( "GameStatesInfo", "WinnerTeam");
    $.Msg(test.winnerTeam)
    $.Msg("making sure this part exed---------------------")
} 

function updateEndGamePanelData() {
    var count = CustomNetTables.GetTableValue( "count", "count");
	if (count.count != 4 ){
		 $("#player_team_container1").style.height = "50%";
		 $("#player_team_container2").style.height = "50%";
		 $("#main_sorceboard1").style.height = "50%";
		 $("#main_sorceboard2").style.height = "50%";
	}
	
	
    var winnerTeam = CustomNetTables.GetTableValue( "GameStatesInfo", "WinnerTeam");
    var winnerTeamID = winnerTeam.winnerTeamID
    $("#endscreen_container").style['transform'] = 'scale3d( 1, 1, 1);'
    $('#endscreen_container').style['opacity'] = '1';

    if(winnerTeam.winnerTeam == "#goodguyswin") {
        $("#winner_team_text").style["text-shadow"] = "0px 0px 6px 1.0 green;"
    }
	
	if(winnerTeam.winnerTeam == "#badguyswin") {
        $("#winner_team_text").style["text-shadow"] = "0px 0px 6px 1.0 yellow;"
    }
	
	if(winnerTeam.winnerTeam == "#team1guyswin") {
        $("#winner_team_text").style["text-shadow"] = "0px 0px 6px 1.0 purple;"
    }
	
	if(winnerTeam.winnerTeam == "#team2guyswin") {
        $("#winner_team_text").style["text-shadow"] = "0px 0px 6px 1.0 orange;"
    }

    $("#winner_team_text").text = $.Localize(winnerTeam.winnerTeam)

    var radiantParent = $("#radiant_player_details")
    radiantParent.RemoveAndDeleteChildren()
    var direParent = $("#dire_player_details")
    direParent.RemoveAndDeleteChildren()
	var team1Parent = $("#team1_player_details")
    team1Parent.RemoveAndDeleteChildren()
	var team2Parent = $("#team2_player_details")
    team2Parent.RemoveAndDeleteChildren()
	
    var radiantDetails = $("#radiant_team_scoreboard")
    radiantDetails.RemoveAndDeleteChildren()
    var direDetails = $("#dire_team_scoreboard")
    direDetails.RemoveAndDeleteChildren()
	var team1Details = $("#team1_team_scoreboard")
    team1Details.RemoveAndDeleteChildren()
	var team2Details = $("#team2_team_scoreboard")
    team2Details.RemoveAndDeleteChildren()
	
    for (var PlayerID = 0; PlayerID <= 11; PlayerID++) {
        var data = CustomNetTables.GetTableValue( "PlayerScoreBoard", "PlayerID_"+PlayerID)
        if (data && data.team && Players.IsValidPlayerID( PlayerID)){
            if(data.team == 2){
                var panel1 = $.CreatePanel("Panel", radiantParent, "playerScore_"+PlayerID)
                panel1.BLoadLayoutSnippet("playerDetails")
                panel1.FindChildTraverse("AvatarImage").steamid = data.steamID != null ? data.steamID : ""
                panel1.FindChildTraverse("HeroImage").heroname = data.playerHero != null ? data.playerHero : ""
                panel1.FindChildTraverse("player_steamID_text").steamid = data.steamID!= null ? data.steamID : ""
                panel1.FindChildTraverse("player_heroname_text").text =data.playerHero  != null ? $.Localize("#"+data.playerHero) : ""
                panel2=$.CreatePanel("Panel", radiantDetails, "playerScore_"+PlayerID)
                panel2.BLoadLayoutSnippet("teamSorceBoard")
                panel2.FindChildTraverse("player_info_kda_text").text = data.total_kills !=null ? data.total_kills + "/" +data.total_deaths+"/"+data.total_assists : "0/0/0"
                panel2.FindChildTraverse("player_info_gold_text").text = data.total_gold != null ? data.total_gold : "0"
                panel2.FindChildTraverse("player_info_damage_text").text = data.total_damage != null ? data.total_damage : "0"
                panel2.FindChildTraverse("player_info_damageTaken_text").text = data.total_damage_taken != null ? data.total_damage_taken : "0"
                panel2.FindChildTraverse("player_info_heal_text").text = data.total_healing != null ? data.total_healing : "0"
				panel2.FindChildTraverse("player_info_get_exp_text").text = data.total_exp != null ? data.total_exp : "0"
				if (data.winner == "true"){
					panel2.FindChildTraverse("player_info_rank_text").text = data.total_rank != null ? (data.total_rank - 25) + " +25" : "0"
				}else if (data.winner == "false") {
					panel2.FindChildTraverse("player_info_rank_text").text = data.total_rank != null ? (data.total_rank + 24) + " -24" : "0"
				}
                    var itemContainer = panel2.FindChildTraverse("player_items_container")
                    var itemsPanel = $.CreatePanel("Panel", itemContainer, "playeritems_"+PlayerID)
                    itemsPanel.BLoadLayoutSnippet("playerItems");

                    itemsPanel.FindChildTraverse("ItemImage0").itemname = data.item_slots[0] != null ? data.item_slots[0] : ""
                    itemsPanel.FindChildTraverse("ItemImage1").itemname = data.item_slots[1] != null ? data.item_slots[1] : ""
                    itemsPanel.FindChildTraverse("ItemImage2").itemname = data.item_slots[2] != null ? data.item_slots[2] : ""
                    itemsPanel.FindChildTraverse("ItemImage3").itemname = data.item_slots[3] != null ? data.item_slots[3] : ""
                    itemsPanel.FindChildTraverse("ItemImage4").itemname = data.item_slots[4] != null ? data.item_slots[4] : ""
                    itemsPanel.FindChildTraverse("ItemImage5").itemname = data.item_slots[5] != null ? data.item_slots[5] : ""
                    itemsPanel.FindChildTraverse("ItemImage6").itemname = data.items_neutral != null ? data.items_neutral : ""
                    
            }else if (data.team == 3){
                var panel1 = $.CreatePanel("Panel", direParent, "playerScore_"+PlayerID)
                panel1.BLoadLayoutSnippet("playerDetails")
                panel1.FindChildTraverse("AvatarImage").steamid = data.steamID != null ? data.steamID : ""
                panel1.FindChildTraverse("HeroImage").heroname = data.playerHero != null ? data.playerHero : ""
                panel1.FindChildTraverse("player_steamID_text").steamid = data.steamID!= null ? data.steamID : ""
                panel1.FindChildTraverse("player_heroname_text").text =data.playerHero  != null ? $.Localize("#"+data.playerHero) : ""
                panel2=$.CreatePanel("Panel", direDetails, "playerScore_"+PlayerID)
                panel2.BLoadLayoutSnippet("teamSorceBoard")
                panel2.FindChildTraverse("player_info_kda_text").text = data.total_kills !=null ? data.total_kills + "/" +data.total_deaths+"/"+data.total_assists : "0/0/0"
                panel2.FindChildTraverse("player_info_gold_text").text = data.total_gold != null ? data.total_gold : "0"
                panel2.FindChildTraverse("player_info_damage_text").text = data.total_damage != null ? data.total_damage : "0"
                panel2.FindChildTraverse("player_info_damageTaken_text").text = data.total_damage_taken != null ? data.total_damage_taken : "0"
                panel2.FindChildTraverse("player_info_heal_text").text = data.total_healing != null ? data.total_healing : "0"
                panel2.FindChildTraverse("player_info_get_exp_text").text = data.total_exp != null ? data.total_exp : "0"
				if (data.winner == "true"){
					panel2.FindChildTraverse("player_info_rank_text").text = data.total_rank != null ? (data.total_rank - 25) + " +25" : "0"
				}else if (data.winner == "false") {
					panel2.FindChildTraverse("player_info_rank_text").text = data.total_rank != null ? (data.total_rank + 24) + " -24" : "0"
				}


                    var itemContainer = panel2.FindChildTraverse("player_items_container")
                    var itemsPanel = $.CreatePanel("Panel", itemContainer, "playeritems_"+PlayerID)
                    itemsPanel.BLoadLayoutSnippet("playerItems");

                    itemsPanel.FindChildTraverse("ItemImage0").itemname = data.item_slots[0] != null ? data.item_slots[0] : ""
                    itemsPanel.FindChildTraverse("ItemImage1").itemname = data.item_slots[1] != null ? data.item_slots[1] : ""
                    itemsPanel.FindChildTraverse("ItemImage2").itemname = data.item_slots[2] != null ? data.item_slots[2] : ""
                    itemsPanel.FindChildTraverse("ItemImage3").itemname = data.item_slots[3] != null ? data.item_slots[3] : ""
                    itemsPanel.FindChildTraverse("ItemImage4").itemname = data.item_slots[4] != null ? data.item_slots[4] : ""
                    itemsPanel.FindChildTraverse("ItemImage5").itemname = data.item_slots[5] != null ? data.item_slots[5] : ""
                    itemsPanel.FindChildTraverse("ItemImage6").itemname = data.items_neutral != null ? data.items_neutral : ""
                    
			}else if (data.team == 6){
                var panel1 = $.CreatePanel("Panel", team1Parent, "playerScore_"+PlayerID)
                panel1.BLoadLayoutSnippet("playerDetails")
                panel1.FindChildTraverse("AvatarImage").steamid = data.steamID != null ? data.steamID : ""
                panel1.FindChildTraverse("HeroImage").heroname = data.playerHero != null ? data.playerHero : ""
                panel1.FindChildTraverse("player_steamID_text").steamid = data.steamID!= null ? data.steamID : ""
                panel1.FindChildTraverse("player_heroname_text").text =data.playerHero  != null ? $.Localize("#"+data.playerHero) : ""
                panel2=$.CreatePanel("Panel", team1Details, "playerScore_"+PlayerID)
                panel2.BLoadLayoutSnippet("teamSorceBoard")
                panel2.FindChildTraverse("player_info_kda_text").text = data.total_kills !=null ? data.total_kills + "/" +data.total_deaths+"/"+data.total_assists : "0/0/0"
                panel2.FindChildTraverse("player_info_gold_text").text = data.total_gold != null ? data.total_gold : "0"
                panel2.FindChildTraverse("player_info_damage_text").text = data.total_damage != null ? data.total_damage : "0"
                panel2.FindChildTraverse("player_info_damageTaken_text").text = data.total_damage_taken != null ? data.total_damage_taken : "0"
                panel2.FindChildTraverse("player_info_heal_text").text = data.total_healing != null ? data.total_healing : "0"
                panel2.FindChildTraverse("player_info_get_exp_text").text = data.total_exp != null ? data.total_exp : "0"
				if (data.winner == "true"){
					panel2.FindChildTraverse("player_info_rank_text").text = data.total_rank != null ? (data.total_rank - 25) + " +25" : "0"
				}else if (data.winner == "false") {
					panel2.FindChildTraverse("player_info_rank_text").text = data.total_rank != null ? (data.total_rank + 24) + " -24" : "0"
				}

                    var itemContainer = panel2.FindChildTraverse("player_items_container")
                    var itemsPanel = $.CreatePanel("Panel", itemContainer, "playeritems_"+PlayerID)
                    itemsPanel.BLoadLayoutSnippet("playerItems");

                    itemsPanel.FindChildTraverse("ItemImage0").itemname = data.item_slots[0] != null ? data.item_slots[0] : ""
                    itemsPanel.FindChildTraverse("ItemImage1").itemname = data.item_slots[1] != null ? data.item_slots[1] : ""
                    itemsPanel.FindChildTraverse("ItemImage2").itemname = data.item_slots[2] != null ? data.item_slots[2] : ""
                    itemsPanel.FindChildTraverse("ItemImage3").itemname = data.item_slots[3] != null ? data.item_slots[3] : ""
                    itemsPanel.FindChildTraverse("ItemImage4").itemname = data.item_slots[4] != null ? data.item_slots[4] : ""
                    itemsPanel.FindChildTraverse("ItemImage5").itemname = data.item_slots[5] != null ? data.item_slots[5] : ""
                    itemsPanel.FindChildTraverse("ItemImage6").itemname = data.items_neutral != null ? data.items_neutral : ""
                    
			}else if (data.team == 7){
                var panel1 = $.CreatePanel("Panel", team2Parent, "playerScore_"+PlayerID)
                panel1.BLoadLayoutSnippet("playerDetails")
                panel1.FindChildTraverse("AvatarImage").steamid = data.steamID != null ? data.steamID : ""
                panel1.FindChildTraverse("HeroImage").heroname = data.playerHero != null ? data.playerHero : ""
                panel1.FindChildTraverse("player_steamID_text").steamid = data.steamID!= null ? data.steamID : ""
                panel1.FindChildTraverse("player_heroname_text").text =data.playerHero  != null ? $.Localize("#"+data.playerHero) : ""
                panel2=$.CreatePanel("Panel", team2Details, "playerScore_"+PlayerID)
                panel2.BLoadLayoutSnippet("teamSorceBoard")
                panel2.FindChildTraverse("player_info_kda_text").text = data.total_kills !=null ? data.total_kills + "/" +data.total_deaths+"/"+data.total_assists : "0/0/0"
                panel2.FindChildTraverse("player_info_gold_text").text = data.total_gold != null ? data.total_gold : "0"
                panel2.FindChildTraverse("player_info_damage_text").text = data.total_damage != null ? data.total_damage : "0"
                panel2.FindChildTraverse("player_info_damageTaken_text").text = data.total_damage_taken != null ? data.total_damage_taken : "0"
                panel2.FindChildTraverse("player_info_heal_text").text = data.total_healing != null ? data.total_healing : "0"
                panel2.FindChildTraverse("player_info_get_exp_text").text = data.total_exp != null ? data.total_exp : "0"
				if (data.winner == "true"){
					panel2.FindChildTraverse("player_info_rank_text").text = data.total_rank != null ? (data.total_rank - 25) + " +25" : "0"
				}else if (data.winner == "false") {
					panel2.FindChildTraverse("player_info_rank_text").text = data.total_rank != null ? (data.total_rank + 24) + " -24" : "0"
				}				

                    var itemContainer = panel2.FindChildTraverse("player_items_container")
                    var itemsPanel = $.CreatePanel("Panel", itemContainer, "playeritems_"+PlayerID)
                    itemsPanel.BLoadLayoutSnippet("playerItems");

                    itemsPanel.FindChildTraverse("ItemImage0").itemname = data.item_slots[0] != null ? data.item_slots[0] : ""
                    itemsPanel.FindChildTraverse("ItemImage1").itemname = data.item_slots[1] != null ? data.item_slots[1] : ""
                    itemsPanel.FindChildTraverse("ItemImage2").itemname = data.item_slots[2] != null ? data.item_slots[2] : ""
                    itemsPanel.FindChildTraverse("ItemImage3").itemname = data.item_slots[3] != null ? data.item_slots[3] : ""
                    itemsPanel.FindChildTraverse("ItemImage4").itemname = data.item_slots[4] != null ? data.item_slots[4] : ""
                    itemsPanel.FindChildTraverse("ItemImage5").itemname = data.item_slots[5] != null ? data.item_slots[5] : ""
                    itemsPanel.FindChildTraverse("ItemImage6").itemname = data.items_neutral != null ? data.items_neutral : ""
                    				
            }
        }
    }
}

function HideDefaultHud(){
    var panelScene = FindDotaHudElement("PausedInfo")
    if(panelScene){
        panelScene.style.opacity = "0";
    }
}