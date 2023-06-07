$("#openShop").visible = false

var PlayerCount = 0,
	rating,
	commented = [],
	LocalPlayer,
	turn = -1,
	shop = CustomNetTables.GetAllTableValues( "shop" ),
	shopCout,
	playerID = Players.GetLocalPlayer(),
	steamID = GetUniverseSteamID32(playerID),
	isopen = false,
	windowName,
	shopinfo,
	isRatingOpen = false,
	isShopOpen = false

var shopnumber = 0
var specialAltOpenBut = false;
$('#loot').visible = false

//---------------------------------------------------------------------------

var open = false;
var state = false;

function openShopButton()
{
	state = true
	if(open == true){
		closeShop()
		return
	}else{
		openShop(shopnumber)
	}
}

//---------------------------------------------------------------------------
function closeShop(){	
	open = false
	if(IsSelected){
		IsSelected = false;
		$('#donateShop').hittest = false
	}

	$('#DonateShopPanel').RemoveClass('open_shop')
	$('#DonateShopPanel').AddClass('close_shop')
	$.Schedule(0.2, function(){
		$('#DonateShopPanel').RemoveClass('close_shop')
		visibleOff("DonateShopPanel")
	})
	$('#donateShop').SetFocus(false)
	$('#BuyControl').visible = false
	$('#accept_shadow').visible = false
}

function openShop(n){
	open = true
	windowName = "shop"
	visibleOn("DonateShopPanel")
	for(var i = 1; i <= Object.keys( shopinfo ).length; i++){
		if(i == n){
			$('#TabPanel_' + i).AddClass('selected_bd')
			$('#TabPanel_' + i).RemoveClass('TabPanelOnServ')
			$('#TabLabel_' + i).AddClass('selected_text')
			$('#TabLabel_' + i).RemoveClass('TabLabelOnServ')
			visibleOn("DonateShopContentPanel_" + i)
		}else{
			if($('#TabPanel_' + i)){
				$('#TabPanel_' + i).AddClass('TabPanelOnServ')
				$('#TabPanel_' + i).RemoveClass('selected_bd')
			}
			if($('#TabLabel_' + i)){
				$('#TabLabel_' + i).AddClass('TabLabelOnServ')
				$('#TabLabel_' + i).RemoveClass('selected_text')
			}
			visibleOff("DonateShopContentPanel_" + i)
		}
	}
}

var opn = (function(n)
{
	return function()
	{
		Game.EmitSound("ui_team_select_pick_team")
		shopnumber = n
		openShop(shopnumber)
		
	}
});

var acceptBuy = (function(i, n, pan, consumabl, currency)
{
	return function()
	{
		//$.Msg($('#ShopItem4_2'))
		
		$('#BuyControl').visible = false;
		$('#accept_shadow').visible = false
		GameEvents.SendCustomGameEventToServer("buyItem", {i,n, amountBuy,currency})
		if(consumabl){
			var numb = Number(Number(shopinfo[i][n].now) + amountBuy)
			pan.FindChildTraverse('DonateShopItemButtonLabelStock').text = numb
			shopinfo[i][n].now = numb
		}else if(shopinfo[i][n].type == 'pet'){
			var numb = Number(Number(shopinfo[i][n].now) + 1)
			pan.FindChildTraverse('UpgradePetText').text = $.Localize('#levelpet') + ": " + numb
			shopinfo[i][n].now = numb
			pan.FindChildTraverse('UpgradePet').visible = true
			pan.FindChildTraverse('DonateShopItemButtonBuy').visible = false
			pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
			pan.FindChildTraverse('UpgradePetText').visible = true
			pan.FindChildTraverse('UpgradePetText').text = $.Localize('#levelpet') + ": " + numb
			pan.FindChildTraverse('UpgradePet').SetPanelEvent("onmouseactivate",upgrade(i, n, pan, false, false ))
		}else if(shopinfo[i][n].type == 'box') {		
			pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
			pan.FindChildTraverse('DonateShopItemButtonBuy').visible = false
			pan.FindChildTraverse('DonateShopItemButtonLabel').text = $.Localize('#open_this_box')
		}else if(shopinfo[i][n].type == 'unlock') {		
			pan.FindChildTraverse('DonateShopItemButtonHas').visible = false
			pan.FindChildTraverse('DonateShopItemButtonBuy').visible = false
			pan.FindChildTraverse('DonateShopItemButtonActive').visible = true
			pan.FindChildTraverse('DonateShopItemButtonLabelActive').text = $.Localize('#unlocked')
		}else{
			pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
			pan.FindChildTraverse('DonateShopItemButtonBuy').visible = false
			pan.FindChildTraverse('DonateShopItemButtonLabel').text = $.Localize('#taik')
		}
		if(currency){
			shopinfo.mmrpoints = Number(Number(shopinfo.mmrpoints) - Number(shopinfo[i][n]['price']['rp']))
		}else{
			shopinfo.coins = Number(Number(shopinfo.coins) - Number(shopinfo[i][n]['price']['don']))
		}
		$('#DonateMoneyLabel').text = shopinfo.coins
		// $('#MMMRPointsLabel').text = shopinfo.mmrpoints
		if (numb != null){
			if (numb == 6){
				pan.FindChildTraverse('UpgradePet').visible = false	
			}
		}	
 	}
});

var amountBuy = 0;
var priceBuy = 0;
var buy = (function(i, n, pan, consumabl, currency)
{
	return function()
	{	
		if((shopinfo[i][n]['price']['don'] <= shopinfo.coins && !currency)
		|| (shopinfo[i][n]['price']['rp'] <= shopinfo.mmrpoints && currency)){
			Game.EmitSound("ui_team_select_shuffle")
			$('#BuyControlTextLine1').text = $.Localize('#buy_item')
			$('#BuyControlTextLine2').text = $.Localize("#"+shopinfo[i][n]['panorama_name'])
			amountBuy = 1
			let dropdown = $('#BuyControlDrop')
			if(currency){
				$('#BuyControlCurDon').visible = false
				$('#BuyControlCurRp').visible = true
				$('#BuyControlTextLine3').text = shopinfo[i][n]['price']['rp']
				priceBuy = shopinfo[i][n]['price']['rp']
			}else{
				$('#BuyControlCurDon').visible = true
				$('#BuyControlCurRp').visible = false
				$('#BuyControlTextLine3').text = shopinfo[i][n]['price']['don']
				priceBuy = shopinfo[i][n]['price']['don']
			}
			$('#BuyControl').visible = true;
			$('#accept_shadow').visible = true;
			$('#acceptButton').SetPanelEvent("onmouseactivate",acceptBuy(i, n, pan, consumabl, currency))
		}
	}
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var upgrade = (function(i, n, pan, consumabl, currency)
{
	return function()
	{	
		Game.EmitSound("ui_team_select_shuffle")
			if((shopinfo[i][n]['price']['don'] <= shopinfo.coins && !currency)){
				$('#BuyControlTextLine1').text = $.Localize('#UpgradePet')
				$('#BuyControlTextLine2').text = $.Localize("#"+shopinfo[i][n]['panorama_name'])
				amountBuy = 1
				let dropdown = $('#BuyControlDrop')
				if(!currency){
					$('#BuyControlCurRp').visible = false
					$('#BuyControlCurDon').visible = true
					$('#BuyControlTextLine3').text = shopinfo[i][n]['price']['don']
					priceBuy = shopinfo[i][n]['price']['don']
				}
				$('#BuyControl').visible = true;
				$('#accept_shadow').visible = true;
				$('#acceptButton').SetPanelEvent("onmouseactivate",acceptBuy(i, n, pan, consumabl, currency))
			}
		}
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var returnItem = (function(pan, i, n){
    return function(){
        GameEvents.SendCustomGameEventToServer("return_item", {i : i, n : n})
    }
})
function return_item_js(t){
    let pan = $("#ShopItem" + t.i + '_' + t.n)
    if(shopinfo[t.i][t.n].consumabl == true){
        shopinfo[t.i][t.n]['now'] += t.car
		if ( pan.FindChildTraverse('DonateShopItemButtonLabelStock') != null){
			pan.FindChildTraverse('DonateShopItemButtonLabelStock').text = shopinfo[t.i][t.n]['now']
		}
    }else{
        pan.FindChildTraverse('DonateShopItemButtonGived').visible = false
	    pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
    }  
}

var give = (function(i, n, pan, consumabl)
{
	return function()
	{	
		Game.EmitSound("ui_team_select_shuffle")
		var type = shopinfo[i][n].type
	// != issued

		// consumabl
			if(consumabl){
				var numb = Number(Number(shopinfo[i][n].now) - Number(1))
				if(Number(shopinfo[i][n].now) > 0){
					pan.FindChildTraverse('DonateShopItemButtonLabelStock').text = numb
				}
				$.Msg(numb)
				$.Msg(shopinfo[i][n].now)
				if(numb <= 0){
					shopinfo[i][n].now = 0
				}else{
					shopinfo[i][n].now = numb
				}
				
			}else{
		//else
				var c = shopinfo[i][n].now
				pan.FindChildTraverse('DonateShopItemButtonGived').visible = true
				pan.FindChildTraverse('DonateShopItemButtonHas').visible = false
			//effect
				// if(type == 'effect'){
					// pan.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#takeoff')
					// pan.FindChildTraverse('DonateShopItemButtonGived').SetPanelEvent("onmouseactivate",takeoff(pan, i, n))
				// }
				if(type == 'effect'){
					$.Msg("taik")
					var shopPanel = $("#DonateShopContentPanel")
					for (const [categoryKey, categoryValue] of Object.entries(shopinfo)) {
						if(typeof(categoryValue) == 'object'){
							for (const [productKey, productValue] of Object.entries(categoryValue)) {
								if(typeof(productValue) == 'object' && productValue.type == "effect"){
									$.Msg("panels")
									singl = shopPanel.FindChildTraverse("ShopItem" + categoryKey + '_' + productKey)
									if (shopinfo[categoryKey][productKey].now > 0){
										singl.FindChildTraverse('DonateShopItemButtonHas').visible = true
										singl.FindChildTraverse('DonateShopItemButtonGived').visible = false
										//singl.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('taik')
									}
								}
							}
						}
					}
					pan.FindChildTraverse('DonateShopItemButtonGived').visible = true
					pan.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#used')	
					pan.FindChildTraverse('DonateShopItemButtonGived').SetPanelEvent("onmouseactivate",takeoff(pan, i, n))
				}
				else{
			//item
					pan.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#issued')
                    if(shopinfo[i][n].type == 'item'){
                        pan.FindChildTraverse('DonateShopItemButtonGived').SetPanelEvent("onmouseactivate",returnItem(pan, i, n))
                    }
				}
			//box
				if(type == 'box'){
					$.Msg("box")
					let box = shopinfo[i][n].itemname
					pan.FindChildTraverse('DonateShopItemButtonHas').visible = false
					pan.FindChildTraverse('DonateShopItemButtonGived').visible = false
					pan.FindChildTraverse('DonateShopItemButtonBuy').visible = true	
					GameEvents.SendCustomGameEventToServer("eventopenbox", {box})
					closeShop()	
				}
			//pets	
				if(type == 'pet'){
					$.Msg("asd")
					var shopPanel = $("#DonateShopContentPanel")
					for (const [categoryKey, categoryValue] of Object.entries(shopinfo)) {
						if(typeof(categoryValue) == 'object'){
							for (const [productKey, productValue] of Object.entries(categoryValue)) {
								if(typeof(productValue) == 'object' && productValue.type == "pet"){
									singl = shopPanel.FindChildTraverse("ShopItem" + categoryKey + '_' + productKey)
									singl.FindChildTraverse('DonateShopItemButtonHas').visible = false
									singl.FindChildTraverse('DonateShopItemButtonGived').visible = true
									singl.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#pet_use')
								}
							}
						}
					}
				}
				if(type == 'spray'){
					$.Msg("taik")
					var shopPanel = $("#DonateShopContentPanel")
					for (const [categoryKey, categoryValue] of Object.entries(shopinfo)) {
						if(typeof(categoryValue) == 'object'){
							for (const [productKey, productValue] of Object.entries(categoryValue)) {
								if(typeof(productValue) == 'object' && productValue.type == "spray"){
									$.Msg("panels")
									singl = shopPanel.FindChildTraverse("ShopItem" + categoryKey + '_' + productKey)
									singl.FindChildTraverse('DonateShopItemButtonHas').visible = true
									singl.FindChildTraverse('DonateShopItemButtonGived').visible = false
									//singl.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('taik')
								}
							}
						}
					}
					pan.FindChildTraverse('DonateShopItemButtonGived').visible = true
					pan.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#used')	
					pan.FindChildTraverse('DonateShopItemButtonGived').SetPanelEvent("onmouseactivate",takeoff(pan, i, n))
				}
			}
			GameEvents.SendCustomGameEventToServer("giveItem", {i : i, n : n})
	}
});

var takeoff = (function(pan, i, n)
{
	return function()
	{	
		Game.EmitSound("ui_team_select_shuffle")
		$.Msg("take off")
		$.Msg(shopinfo[i][n].type)
		
		if (shopinfo[i][n].type == "effect" || shopinfo[i][n].type == "spray" ){
		}else{
		pan.FindChildTraverse('DonateShopItemButtonGived').visible = false
		pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
		}
	//	GameEvents.SendCustomGameEventToServer("takeOffEffect", {i : i, n : n})
	}
});


function initShop(tab){
	$("#openShop").visible = true
	shopinfo = tab
	// деньги
	if($('#DonateMoneyLabel')){
		$('#DonateMoneyLabel').text = shopinfo.coins
		//$('#MMMRPointsLabel').text = shopinfo.mmrpoints
	}

	for (const [key, value] of Object.entries(tab)) {
		if(typeof(value) == 'object'){
			if($("#DonateShopTabsPanel")){
				var TabPanel = $.CreatePanel("Panel", $("#DonateShopTabsPanel"), "TabPanel_" + key);
				TabPanel.AddClass("TabPanel");
				TabPanel.SetPanelEvent("onmouseactivate",opn(key));
				var TabPanelLabel = $.CreatePanel("Label", TabPanel, "TabLabel_" + key);
				TabPanelLabel.AddClass('TabLabel');
				TabPanelLabel.text = $.Localize("#"+value.name);
			}
			var TabContent
			if($("#DonateShopContentPanel")){
				TabContent = $.CreatePanel("Panel", $("#DonateShopContentPanel"), "DonateShopContentPanel_" + key);
				TabContent.AddClass('TabContent');
			}
			var n = 0
			var horizontal_panel = 0
			var hPanel
			for (const [tovarKey, tovarValue] of Object.entries(value)) {
				if(typeof(tovarValue) == 'object'){
					if( n % 6 == 0 ){
						horizontal_panel += 1
						if(TabContent){
							var hPanel = $.CreatePanel("Panel", TabContent, "")
							hPanel.AddClass('horizontal_panel')
						}
					}
					if(hPanel){
						// blocks building
						var currency = tovarValue['price']['rp'];
						var pan = $.CreatePanel("Panel", hPanel, "ShopItem" + key + '_' + tovarKey)
						if(tovarValue.type && tovarValue.consumabl == true){
							pan.BLoadLayout("file://{resources}/layout/custom_game/boss_shop/DonateShopItem2.xml", false, false)
							pan.FindChildTraverse('DonateShopItemButtonLabelStock').text = tovarValue.now
                            pan.FindChildTraverse('DonateShopItemButtonBuyCon').SetPanelEvent("onmouseactivate",give(key, tovarKey, pan, true))
                            pan.FindChildTraverse('shopButtonImgAndText1').SetPanelEvent("onmouseactivate",buy(key, tovarKey, pan, true, false))
                            pan.FindChildTraverse('shopButtonImgAndText2').SetPanelEvent("onmouseactivate",buy(key, tovarKey, pan, true, true))
                            pan.FindChildTraverse('DonateShopReturnItemBtn').SetPanelEvent("onmouseactivate",returnItem(pan, key, tovarKey))
						}
						// else if (tovarValue.can_buy == false){
							// $.Msg("asd")
						// }
						else
						{
							pan.BLoadLayout("file://{resources}/layout/custom_game/boss_shop/DonateShopItem1.xml", false, false)		
							pan.FindChildTraverse('DonateShopItemButtonBuy').visible = false
							pan.FindChildTraverse('DonateShopItemButtonHas').visible = false
							pan.FindChildTraverse('DonateShopItemButtonGived').visible = false
							pan.FindChildTraverse('DonateShopItemButtonActive').visible = false
							pan.FindChildTraverse('UpgradePet').visible = false
							pan.FindChildTraverse('UpgradePetText').visible = false
							
							if(tovarValue.status == 'taik' && tovarValue.type != 'gem' ){
								pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
								pan.FindChildTraverse('DonateShopItemButtonLabel').text = $.Localize('#taik')
								if(tovarValue.type == 'unlock') {		
									pan.FindChildTraverse('DonateShopItemButtonHas').visible = false
									pan.FindChildTraverse('DonateShopItemButtonActive').visible = true
									pan.FindChildTraverse('DonateShopItemButtonLabelActive').text = $.Localize('#unlocked')								
									}
							}else if(tovarValue.status == 'buy' || tovarValue.type == 'gem' ){
								pan.FindChildTraverse('DonateShopItemButtonBuy').visible = true
							}else if(tovarValue.status == 'issued'){
								pan.FindChildTraverse('DonateShopItemButtonGived').visible = true
								pan.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#issued')
							}else if(tovarValue.status == 'takeoff'){
								pan.FindChildTraverse('DonateShopItemButtonGived').visible = true
								pan.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#takeoff')
							}else if(tovarValue.status == 'only_box'){
								pan.FindChildTraverse('DonateShopItemButtonActive').visible = true
								pan.FindChildTraverse('DonateShopItemButtonLabelActive').text = $.Localize('#only_box')
							}
							if(tovarValue.type == 'pet'){
								if (tovarValue.now > 0 && tovarValue.now < 6){ 
								pan.FindChildTraverse('UpgradePet').visible = true
								pan.FindChildTraverse('UpgradePet').SetPanelEvent("onmouseactivate",upgrade(key, tovarKey, pan, false, false ))
								}
								if (tovarValue.now > 0){
									pan.FindChildTraverse('UpgradePetText').visible = true
									pan.FindChildTraverse('UpgradePetText').text = $.Localize('#levelpet') + ": " + tovarValue.now	
								}		
							}
							
							if(tovarValue.type == 'spray' || tovarValue.type == 'effect'){
								pan.FindChildTraverse('DonateShopImg').style.height = "160px";
								pan.FindChildTraverse('DonateShopItem').style.height = "160px";
								pan.FindChildTraverse('DonateShopItemLabel').visible = false;
							}
							
							if(tovarValue.type == 'box'){
								pan.FindChildTraverse('DonateShopImg').style.height = "160px";
								pan.FindChildTraverse('DonateShopItem').style.height = "160px";
								pan.FindChildTraverse('DonateShopItemLabel').visible = false;
								pan.FindChildTraverse('DonateShopItemButtonLabel').text = $.Localize('#open_this_box')
							}	

							

							pan.FindChildTraverse('DonateShopItemButtonHas').SetPanelEvent("onmouseactivate",give(key, tovarKey, pan, false))
							pan.FindChildTraverse('shopButtonImgAndText1').SetPanelEvent("onmouseactivate",buy(key, tovarKey, pan, false, false))
							pan.FindChildTraverse('shopButtonImgAndText2').SetPanelEvent("onmouseactivate",buy(key, tovarKey, pan, false, true))
						}
                        
						pan.AddClass('DonateShopItemPanel')
						// img
						if( tovarValue.image ){
							pan.FindChildTraverse('DonateShopImg').SetImage('file://{resources}/' + tovarValue.image);
						}else{
							pan.FindChildTraverse('DonateShopItem').itemname = tovarValue.itemname
						}
						 // ===========================DESCRIPTION======================
						if (tovarValue.desc){
							pan.FindChildTraverse('DonateShopImg').SetPanelEvent("onmouseover", AbilityTooltipOver(pan.FindChildTraverse('DonateShopImg'), tovarValue))
							pan.FindChildTraverse('DonateShopImg').SetPanelEvent("onmouseout", function(){$.DispatchEvent("UIHideCustomLayoutTooltip", pan, "ChcItemTooltip");})
							
							
							// pan.FindChildTraverse('DonateShopImg').SetPanelEvent("onmouseover", AbilityTooltipOver(pan.FindChildTraverse('DonateShopImg'), tovarValue.desc))
							// pan.FindChildTraverse('DonateShopImg').SetPanelEvent("onmouseout", function(){$.DispatchEvent( "DOTAHideTextTooltip");})
						}
						// mmrpoints
						if(currency == "mmrpoints"){
							pan.FindChildTraverse('shopButtonImg').SetImage('file://{resources}/images/custom_game/DonateShop/bonus_coins.png')
							pan.FindChildTraverse('shopButtonImg').style.height ="20px";
							pan.FindChildTraverse('shopButtonImg').style.width = "23px";
						}
						// rarity
						pan.FindChildTraverse('DonateShopItem').style.borderColor = tovarValue.rarity
						pan.FindChildTraverse('DonateShopItemLabel').style.color = 'white'
						// name 
						pan.FindChildTraverse('DonateShopItemLabel').text = $.Localize("#"+tovarValue.panorama_name)
						if(tovarValue.text_color){
							pan.FindChildTraverse('DonateShopItemLabel').style.color = tovarValue.text_color;
						}
						// price
						if(tovarValue['price']['don'] && tovarValue['price']['rp']){
                            pan.FindChildTraverse('DonateShopItemButtonLabelNotAlign1').text = tovarValue['price']['don']
                            pan.FindChildTraverse('DonateShopItemButtonLabelNotAlign2').text = tovarValue['price']['rp']
                            pan.FindChildTraverse('shop_button_price_container_don').AddClass('shop_button_2_params')
                            pan.FindChildTraverse('shop_button_price_container_rp').AddClass('shop_button_2_params')  
                        }else if(tovarValue['price']['don']){
                            pan.FindChildTraverse('DonateShopItemButtonLabelNotAlign1').text = tovarValue['price']['don']
                            pan.FindChildTraverse('shop_button_price_container_don').AddClass('shop_button_1_params')
                            pan.FindChildTraverse('shop_button_price_container_rp').visible = false
                        }else if(tovarValue['price']['rp']){
                            pan.FindChildTraverse('DonateShopItemButtonLabelNotAlign2').text = tovarValue['price']['rp']
                            pan.FindChildTraverse('shop_button_price_container_rp').AddClass('shop_button_1_params')
                            pan.FindChildTraverse('shop_button_price_container_don').visible = false
                        }
					}
					n += 1
				}
			}
		}
	}


	for(var i = 1; i <= Object.keys( shopinfo ).length; i++){
		if(typeof(shopinfo[i] == 'object')){
			if($('#TabPanel_' + i)){
				$('#TabPanel_' + i).AddClass('TabPanelOnServ')
				$('#TabLabel_' + i).AddClass('TabLabelOnServ')
			}
			if($("#DonateShopContentPanel_" + i)){
				$("#DonateShopContentPanel_" + i).visible = false
			}
		}	
	}
	var i = 1;
	while(shopinfo[i]){
		if($('#TabPanel_' + i)){
			shopnumber = i
			break;
		}
		i++;
	}
}

var AbilityTooltipOver = (function(pan,skill){
    return function(){
        // $.DispatchEvent( "DOTAShowTextTooltip", pan, $.Localize("#"+skill));
		let params =
			`itemName=` +
			skill.panorama_name +
			"&itemCategory=" +
			skill.type +
			"&itemRariry=" +
			skill.rare +
			"&sourceName=" +
			skill.rare +
			"&boxnumber=" +
			skill.box +
			"&description=" +
			skill.itemname;								
		$.DispatchEvent( "UIShowCustomLayoutParametersTooltip", pan, "ChcItemTooltip", "file://{resources}/layout/custom_game/custom_tooltip/custom_tooltip.xml", params, );
    }
});

var AbilityTooltipOut = (function(){
    return function(){
        $.DispatchEvent( "DOTAHideAbilityTooltip");
    }
});

function visibleOff(pan){
	if($('#' + pan)){
		$('#' + pan).visible = false
	}
}

function visibleOn(pan){
	if($('#' + pan)){
		$('#' + pan).visible = true
	}
}

function GetUniverseSteamID32(PID)
{
    var steamID64 = Game.GetPlayerInfo(PID).player_steamid,
    steamIDPart = Number(steamID64.substring(3)),
    steamID32 = String(steamIDPart - 61197960265728);

    return steamID32;
}

function TipsOver(message, pos)
{
	if(pos == "openRating"){
		isRatingOpen = true;
	}else if(pos == "openShop"){
		isShopOpen = true;
	}
	

    if ($("#"+pos) != undefined)
    {
       $.DispatchEvent( "DOTAShowTextTooltip", $("#"+pos), $.Localize("#"+message));
    }
}
function TipsOut()
{
    $.DispatchEvent( "DOTAHideTitleTextTooltip");
    $.DispatchEvent( "DOTAHideTextTooltip");
}

var IsSelected = false
var lastCursorPosition;

function UpdateButtonInWorld(name) {
	var pan = "#"+name+"buttonhud"
	if(shops[name])
		pan = "#shopbuttonhud"
	pan = $(pan)
	var vec = Entities.GetAbsOrigin(Number(sellers[name])),
		uix_offset = -50,
		uiy_offset = 20,
		scrx = Game.WorldToScreenX(vec[0], vec[1], vec[2]),
		scry = Game.WorldToScreenY(vec[0], vec[1], vec[2]),
		uix = scrx + uix_offset,
		uiy = scry + uiy_offset,
		uiw = context.actuallayoutwidth,
		uih = context.actuallayoutheight
	if(uiw!=0 && uih!=0 && scrx != -1 && scry != -1){
		var uixp = uix / uiw * 100,
			uiyp = uiy / uih * 100 
		pan.style.position = uixp + '% ' + uiyp + '% 0'
		pan.SetHasClass("shopbuttonvisible",true)
	}
	else{
		pan.SetHasClass("shopbuttonvisible",false)
	}
	if(butupdate[name] == true)
		$.Schedule(0,function(){UpdateButtonInWorld(name)})
	else
		pan.SetHasClass("shopbuttonvisible",false)
}

click = false

var trymove = (function()
{
	return function()
	{
		click = true;
		clickingloop();
	}
});

var x = 0;
var y = 0;
function clickingloop(){
	if(click == false && GameUI.IsMouseDown(0) == false){
		return
	}
	if(GameUI.IsMouseDown(0)){
		var cursor = GameUI.GetCursorPosition()
		width = $('#DonateShopPanel').actuallayoutwidth;
		height = $('#DonateShopPanel').actuallayoutheight;
		x += cursor[0] - lastCursorPosition[0];
		y += cursor[1] - lastCursorPosition[1];
		lastCursorPosition = cursor
		$('#DonateShopPanel').style.position = x + 'px ' + y + 'px 0'
		$('#openShopPanelLabel').style.position = x + 'px ' + y + 'px 0'
	}else{
		lastCursorPosition = GameUI.GetCursorPosition()
	}
	$.Schedule(1/20,function(){
		clickingloop()
	})
}

function getRandomFloat (min, max) {
    return Math.random() * (max - min) + min;
}

function puls_bg_shop(){
	var c = getRandomFloat(1,3);
	if($("#openShop")){
		$("#openShop").style.brightness = c;
	}
	$.Schedule(1/10,function(){
		if(isShopOpen == false){
			puls_bg_shop()
		}else if($("#openShop")){
			$("#openShop").style.brightness = 1;
		}
	})
}

function shopinfoed(table_name, key, data){
    if(key == Players.GetLocalPlayer() && shopinfo != null){
		if(shopinfo.coins)
			shopinfo.coins = data["coins"]
		if(shopinfo.mmrpoints)
			shopinfo.mmrpoints = data["mmrpoints"]
		if($('#DonateMoneyLabel'))
        	$('#DonateMoneyLabel').text = shopinfo.coins
		if($('#MMMRPointsLabel'))
			$('#MMMRPointsLabel').text = shopinfo.mmrpoints
		if($('#RatingTeamPlayer'+key))
			if($('#RatingTeamPlayer'+key).FindChildTraverse("RatingPlayerReports2"))
				$('#RatingTeamPlayer'+key).FindChildTraverse("RatingPlayerReports2").text = data['reports'];
		if($('#RatingTeamPlayer'+key))
			if($('#RatingTeamPlayer'+key).FindChildTraverse("RatingPlayerLikes2"))
				$('#RatingTeamPlayer'+key).FindChildTraverse("RatingPlayerLikes2").text = data['likes'];
    }
}
// ===============================================================================================================================================
function openbox(tab){
	$('#loot').visible = true
	var particleID = Particles.CreateParticle("particles/generic_gameplay/screen_arcane_drop_d.vpcf", ParticleAttachment_t.PATTACH_EYES_FOLLOW, 0);
	Game.EmitSound('ui.treasure_01')
	
	// $.Msg(tab[1][1])
	// $.Msg(tab[1][1].type)
	
	for (const [key, value] of Object.entries(tab[1])) {
		if(typeof(value) == 'object'){
			if (value.type == 'effect'){
			$('#loot'+key).visible = false
			$('#lootimg'+key).visible = true				
			$('#lootimg'+key).SetImage('file://{resources}/' + value.image);
			$('#loottext'+key).text = $.Localize('#effect')
			}
			else if (value.type == 'pet'){
			$('#loot'+key).visible = false
			$('#lootimg'+key).visible = true				
			$('#lootimg'+key).SetImage('file://{resources}/' + value.image);
			$('#loottext'+key).text = $.Localize('#'+ value.panorama_name)
			
			}			
			else if (value.type == 'spray'){
			$('#loot'+key).visible = false
			$('#lootimg'+key).visible = true				
			$('#lootimg'+key).SetImage('file://{resources}/' + value.image);
			$('#loottext'+key).text = $.Localize('#spray')
			}
			else if (value.type == 'item'){
			$('#lootimg'+key).visible = false
			$('#loot'+key).visible = true
			$('#loot'+key).itemname = value.itemname
			$('#loottext'+key).text = $.Localize('#DOTA_Tooltip_ability_'+ value.itemname)
			}
			else
			{
			$('#loot'+key).visible = false
			$('#lootimg'+key).visible = true
			$('#loottext'+key).text = 'EXP: '+ value.exp_reward
			$('#lootimg'+key).SetImage('file://{resources}/images/custom_game/exp.png');
			}
		}
	}

	for(var i = 1; i <= 5; i++){
		var key = tab[2][i]
		var value = tab[3][i]
		$.Msg(key)
		$.Msg(value)
			
		var pan = $('#ShopItem'+key+"_"+value)	
		if (shopinfo[key][value].consumabl == null ){
		shopinfo[key][value].now = Number(shopinfo[key][value].now) + 1	
		if (shopinfo[key][value].status == "only_box"){
			pan.FindChildTraverse('DonateShopItemButtonActive').visible = false
			pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
			
			if (shopinfo[key][value].type == "pet"){
				$.Msg("petinit_onlybox")
				if(shopinfo[key][value].now < 6){
				pan.FindChildTraverse('UpgradePet').visible = true
				pan.FindChildTraverse('UpgradePet').SetPanelEvent("onmouseactivate",upgrade(key, value, pan, false, false ))
				}
				pan.FindChildTraverse('UpgradePetText').visible = true		
				pan.FindChildTraverse('UpgradePetText').text = $.Localize('#levelpet') + ": " + shopinfo[key][value].now
				
				}
			
		}else{
			
			
		pan.FindChildTraverse('DonateShopItemButtonBuy').visible = false
		pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
		shopinfo[key][value].now = Number(shopinfo[key][value].now) + 1
		if (shopinfo[key][value].type == "pet"){
			$.Msg("petinit_common")
				if(shopinfo[key][value].now < 6){
				pan.FindChildTraverse('UpgradePet').visible = true
				}
			pan.FindChildTraverse('UpgradePetText').visible = true		
			pan.FindChildTraverse('UpgradePetText').text = $.Localize('#levelpet') + ": " + shopinfo[key][value].now
			}
		}
	}
		else{							
		shopinfo[key][value].now = Number(shopinfo[key][value].now) + 1
		pan.FindChildTraverse('DonateShopItemButtonLabelStock').text = shopinfo[key][value].now
		}
	}	
}

function Close(){
	$.Msg("as")
	$('#loot').visible = false
}

// ==========================================================================================================================================================================

(function(){
	
	GameEvents.Subscribe( "openbox", openbox)
	GameEvents.Subscribe( "initShop", initShop)
	GameEvents.Subscribe( "return_item_js", return_item_js)
    CustomNetTables.SubscribeNetTableListener( "shopinfo", shopinfoed );
	puls_bg_shop()
	visibleOff("DonateShopPanel")
	visibleOff("openShopLabel")
	visibleOff("BuyControl")
	visibleOff("RatingPanel")
	visibleOff("accept_shadow")
	if($.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse("EditButton"))
		$.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse("EditButton").visible = false;

	// $.Schedule(5,function(){
	// 	$("#cat").RemoveAndDeleteChildren();
	// })
})();