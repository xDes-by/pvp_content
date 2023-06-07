var GridCategories = FindDotaHudElement('GridCategories');

function FindDotaHudElement(panel) {
	return $.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse(panel);
}

var init_pick = false

function InitHeroSelection() {
	if (!init_pick) {
		$.Schedule(0.3, function() {
			InitHeroSelection();
		});
	}
	
	if (Game.GetState() == 8){
		init_pick = true
	}
	
	var heroData = checkHero();
	var firstArray = heroData.firstArray;

	var i = 0;
	while (i < GridCategories.GetChildCount()) {
		var heroList = GridCategories.GetChild(i).FindChildTraverse("HeroList");
		for (var j = 0; j < heroList.GetChildCount(); j++) {
			var heroPanel = heroList.GetChild(j).GetChild(0).GetChild(0);
			if (!firstArray.includes(heroPanel.heroname)) {
				heroPanel.GetParent().GetParent().AddClass('AlreadyPicked');
			}
		}
		i++;
	}
}

function checkHero() {
	var pid = Players.GetLocalPlayer();
	var heroData = CustomNetTables.GetTableValue("hero_pick", pid);

	var firstArray = [];
	var secondArray = [];

	for (var key in heroData[1]) {
		var hero = Object.keys(heroData[1][key])[0];
		var shortName = heroData[1][key][hero];
		firstArray.push(hero.slice(14));
		secondArray.push(shortName.toLowerCase());
	}

	return {
		firstArray: firstArray,
		secondArray: secondArray
	};
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
	
	var heroData = checkHero();
	var secondArray = heroData.secondArray;
	
	var hero_name = FindDotaHudElement('HeroInspectHeroName').text.toLowerCase()
	if (secondArray.includes(hero_name)) {
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
	GameEvents.Subscribe('dota_player_hero_selection_dirty', clickHero);
	GameEvents.Subscribe('InitHeroSelection', InitHeroSelection);
	$.Schedule(0.5, InitHeroSelection); 
	$.Schedule(1.0, HideElements);
})();