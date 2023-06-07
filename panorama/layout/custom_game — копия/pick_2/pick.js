var GridCategories = FindDotaHudElement('GridCategories');

function FindDotaHudElement(panel) {
	return $.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse(panel);
}

var init_pick = false

function InitHeroSelection(){
	if (!init_pick){
		 $.Schedule(0.1, function() {
			InitHeroSelection()
		});	
	}
	
	var i = 0;
	while (i < GridCategories.GetChildCount()) {
		for (var j = 0; j < GridCategories.GetChild(i).FindChildTraverse("HeroList").GetChildCount(); j++) {
			if (GridCategories.GetChild(i).FindChildTraverse("HeroList").GetChild(j)) {
				var hero_panel = GridCategories.GetChild(i).FindChildTraverse("HeroList").GetChild(j).GetChild(0).GetChild(0);
				var hero_panel2 = GridCategories.GetChild(i).FindChildTraverse("HeroList").GetChild(j);
				hero_panel2.style.width = '56px'
				hero_panel2.style.height = '82px'
				
				if (!check_hero().firstArray[hero_panel.heroname]) {
				//	hero_panel.GetParent().GetParent().AddClass('Banned')
					init_pick = true
				}
			}
		}
		i++;
	}
}


function check_hero(){
	var pid = Players.GetLocalPlayer();
	var hero_data = CustomNetTables.GetTableValue( "hero_pick", pid);
	const firstArray = {};
	const secondArray = {};

	for (const key in hero_data) {
	  const innerObject = hero_data[key];
	  for (const innerKey in innerObject) {
		const { hero, hero_short_name } = innerObject[innerKey];
		firstArray[hero.slice(14)] = true;
		secondArray[hero_short_name.toLowerCase()] = true;
	  }
	}
	
	g = {firstArray, secondArray}
	return g
}


function clickHero(t){
	const hHeroMoviePanel = FindDotaHudElement('HeroInspectHeroName').GetParent().GetParent().FindChildTraverse("HeroMovie");
	
	hPanel = FindDotaHudElement("skill_slots_1")
	hPanel.style.visibility = "visible";
	hPanel.abilityname = 'npc_dota_hero_'+hHeroMoviePanel.heroname+'_permanent_ability';
	hPanel.style.width = '150px'
	hPanel.style.height = '150px'
	hPanel.style.verticalAlign = 'bottom'
	hPanel.style.marginBottom = '70px'
	hPanel.style.marginLeft = '100px'
	hPanel.style.border = '2px solid black'
	
	hPanel.SetPanelEvent("onmouseover", AbilityTooltipOver(hPanel, hPanel.abilityname))
	hPanel.SetPanelEvent("onmouseout", function(){$.DispatchEvent( "DOTAHideAbilityTooltip");})
	
	if (!check_hero().secondArray[(FindDotaHudElement('HeroInspectHeroName').text).toLowerCase()]) {
		SelectButton = FindDotaHudElement("HeroPickControls")
		SelectButton.style.visibility = "visible";
	}else{
		SelectButton = FindDotaHudElement("HeroPickControls")
		SelectButton.style.visibility = "collapse";
	}
}

var AbilityTooltipOver = (function(pan,skill){
    return function(){
        $.DispatchEvent( "DOTAShowAbilityTooltip", pan, skill);
    }
});
var AbilityTooltipOut = (function(){
    return function(){
        $.DispatchEvent( "DOTAHideAbilityTooltip");
    }
});

function HideElements(){
	RandomButton = FindDotaHudElement("RandomButton")
	RandomButton.style.visibility = "collapse";
	
	Minimap = FindDotaHudElement("PreMinimapContainer")
	Minimap.style.visibility = "collapse";
	
	HeroSimpleDescription = FindDotaHudElement("HeroSimpleDescription")
	HeroSimpleDescription.style.visibility = "collapse";
	
	Footer = FindDotaHudElement("Footer")
	Footer.style.visibility = "collapse";
	
	
	FriendsAndFoes = FindDotaHudElement("FriendsAndFoes")
	FriendsAndFoes.style.visibility = "collapse";
	
	HeroGrid = FindDotaHudElement("HeroGrid")
	HeroGrid.style.height = '724px'
	HeroGrid.style.marginLeft = '0px'
	
	TipContainer = FindDotaHudElement("HeroInspect")
	var hPanel = $.CreatePanel("DOTAAbilityImage", TipContainer, "skill_slots_1")
	hPanel.style.visibility = "collapse";
}

(function() {
	// var PreGame = $.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse("PreGame")
	// PreGame.style.opacity = "1";
	// PreGame.style.transitionDuration = "0.0s";
	GameEvents.Subscribe('dota_player_hero_selection_dirty', clickHero);
	GameEvents.Subscribe('InitHeroSelection', InitHeroSelection);
	$.Schedule(0.5, InitHeroSelection); 
	$.Schedule(1.0, HideElements);
})();