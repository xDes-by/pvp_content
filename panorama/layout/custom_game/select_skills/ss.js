var mainPanel = $("#ability_select_main_con"),
    ability = [],
    key
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
var SkillClick = (function(SkillClass){
    return function(){
        let callback = {
            ui_secret : key,
            ability_name : SkillClass.getSkillName(),
            ability_name : SkillClass.getSkillName()
        }
        if(SkillClass.getAction() == 'add'){
            GameEvents.SendCustomGameEventToServer("AbilitySelection:ability_selected", callback)
			Game.EmitSound("ui.trophy_levelup")
			var particleID = Particles.CreateParticle("particles/generic_gameplay/screen_arcane_drop_d.vpcf", ParticleAttachment_t.PATTACH_EYES_FOLLOW, 0);
        }else if(SkillClass.getAction() == 'rep'){
            GameEvents.SendCustomGameEventToServer("RemoveAbility", callback)
        }
        
        mainPanel.visible = false
    }
})
class SingleSkill {
    constructor(place){
        this.place = place
        this.ability_name = null
        this.action = null
        this.ability_panel = $(`#ability_numb_${this.place}`)
        this.label_panel = $(`#ability_name_numb_${this.place}`)
        this.box = $(`#ability_select_box_${this.place}`)
    }
    update(ability_name, action){
        this.ability_name = ability_name
		
		$.Msg("abiity_name")
		$.Msg(this.ability_name)
		$.Msg("abiity_name")

        this.action = action
        if(this.ability_name == null){
            this.ability_panel.visible = false
            this.label_panel.visible = false
            this.box.visible = false
            return
        }
        if(this.ability_panel){
            this.ability_panel.abilityname = this.ability_name
            this.ability_panel.SetPanelEvent("onmouseover", AbilityTooltipOver( this.ability_panel, this.ability_name))
            this.ability_panel.SetPanelEvent("onmouseout", AbilityTooltipOut( "DOTAHideAbilityTooltip"))
            this.ability_panel.SetPanelEvent("onmouseactivate", SkillClick( this ))
            this.ability_panel.visible = true
			this.box.visible = true
        }
        if(this.label_panel){
            this.label_panel.text = $.Localize("#dota_tooltip_ability_"+this.ability_name)
            this.label_panel.visible = true
        }
    }
    getSkillName(){
        return this.ability_name
    }
    getSkillPlace(){
        return this.place
    }
    getAction(){
        return this.action
    }
}


// function show_ability_js(t){
    // $.Msg(t)
    // for ( var i in t )
    // {
        // let skill = t[i]
        // ability[i].update(skill, 'add')
    // }
    // mainPanel.visible = true
// }

function show_ability_js(tabl){
	$.Msg(tabl)
	Game.EmitSound("Item.TomeOfKnowledge")
	for (var i = 1; i <= 6; i++){
		$.Msg(i)
		box = $(`#ability_select_box_${i}`)
		box.visible = false
	}
	
	counter = 0
	for (const [key, value] of Object.entries(tabl)) {
			counter++;
		}

    for(var i = 1; i <= counter; i++){
        let skill, owner = null
        if(tabl[i]){
            skill = tabl[i]
        }
        ability[i].update(skill, 'add')
    }
    mainPanel.visible = true
}


function ShowRandomAbilitySelection(t){
    key = t.ui_secret
    for(var i = 1; i <= 6; i++){
        let skill = t.data_list[i].ability_name
        ability[i].update(skill, 'add')
    }
    mainPanel.visible = true
}

(function() {
    mainPanel.visible = false
    for(var i = 1; i <= 6; i++){
        ability[i] = new SingleSkill(i)
    }
    GameEvents.Subscribe("show_ability_js", show_ability_js);
    // GameEvents.Subscribe("replace_ability_js", replace_ability_js);
    GameEvents.Subscribe("ShowRandomAbilitySelection", ShowRandomAbilitySelection);
})();


