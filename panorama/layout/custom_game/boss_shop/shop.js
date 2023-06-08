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

function openShopButton(){
	isShopOpen = true
	$('#DonateShopPanel').AddClass('open_shop')
	if(isopen == true){
		if(windowName == "rating"){
			closeRaiting()
			openShop(shopnumber)
		}else if(windowName == "shop"){
			closeShop()
		}
		return
	}else{
		openShop(shopnumber)
	}
}
 
function closeShop(){
	
	isopen = false
	if(IsSelected){
		IsSelected = false;
		$('#donateShop').hittest = false
		$('#DonateShopPanel').style.position = x + 'px ' + y + 'px 0'
	}
	if(GameUI.IsAltDown() && specialAltOpenBut == false){
		specialAltOpenBut = true;
	}else if(GameUI.IsAltDown() && specialAltOpenBut == true){
		specialAltOpenBut = false;
	}
	if(specialAltOpenBut){
		$.Schedule(0.2, function(){
			$('#openShopLabel').visible = true;
		})
	}

	$('#DonateShopPanel').RemoveClass('open_shop')
	$('#DonateShopPanel').AddClass('close_shop')
	$.Schedule(0.2, function(){
		$('#DonateShopPanel').RemoveClass('close_shop')
		visibleOff("DonateShopPanel")
	})
	$('#donateShop').SetFocus(false)
	$('#BuyControl').visible = false

}
function specialOpnBut(){
	
	if(GameUI.IsAltDown() && specialAltOpenBut == true){
		specialAltOpenBut = false;
	}
	$('#openShopLabel').visible = false;
	openShopButton()
}

function openShop(n){
	isopen = true
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
		$.Msg("accept buy 1")
		$('#BuyControl').visible = false;
	
		GameEvents.SendCustomGameEventToServer("buyItem", {i, n, currency})
		if(consumabl){
			var numb = Number(Number(shopinfo[i][n].now) + 1)
			pan.FindChildTraverse('DonateShopItemButtonLabelStock').text = numb
			shopinfo[i][n].now = numb
		}else if(shopinfo[i][n].can_upgrade){
			shopinfo[i][n].now = Number(Number(shopinfo[i][n].now) + 1)
			if (shopinfo[i][n].now > 1){
				pan.FindChildTraverse('DonateShopItemLabel').text = $.Localize("#DOTA_Tooltip_ability_"+shopinfo[i][n].itemname+shopinfo[i][n].now)
			}
			if(shopinfo[i][n].now == 5){
				pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
				pan.FindChildTraverse('DonateShopItemButtonLabel').text = $.Localize('#taik')
				pan.FindChildTraverse('DonateShopItemButtonBuy').visible = false
			}
			if(shopinfo[i][n].now == 1){
				pan.style.height = '250px'
				pan.FindChildTraverse('DonateShopItemButtonBuy').visible = true
				pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
				pan.FindChildTraverse('DonateShopItemButtonLabel').text = $.Localize('#taik')
				pan.FindChildTraverse('DonateShopItemButtonHas').style.marginTop = "205px"
			}	
		}else if(shopinfo[i][n].type == 'effect'){
				pan.FindChildTraverse('DonateShopItemButtonBuy').visible = false
				pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
				pan.FindChildTraverse('DonateShopItemButtonLabel').text = $.Localize('#taik')
				pan.FindChildTraverse('smart_toggle').visible = true
				item = pan.FindChildTraverse('smart_toggle')
				item.SetPanelEvent("onmouseactivate",check(i, n, pan, item, shopinfo[i][n].type))
		}else if(!shopinfo[i][n].can_upgrade){
				pan.FindChildTraverse('DonateShopItemButtonBuy').visible = false
				pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
				pan.FindChildTraverse('DonateShopItemButtonLabel').text = $.Localize('#taik')
		}
		if(currency){
			shopinfo.mmrpoints = Number(Number(shopinfo.mmrpoints) - Number(shopinfo[i][n]['price']['rp']))
		}else{
			shopinfo.coins = Number(Number(shopinfo.coins) - Number(shopinfo[i][n]['price']['don']))
		}
		$('#DonateMoneyLabel').text = shopinfo.coins
		$('#MMMRPointsLabel').text = shopinfo.mmrpoints
	}
});

function updatemmr(t){
	// $.Msg(t[1])
	shopinfo.mmrpoints = t[1]
	$('#MMMRPointsLabel').text = shopinfo.mmrpoints
}

var priceBuy = 0;
var buy = (function(i, n, pan, consumabl, currency)
{
	return function()
	{
		$.Msg("buy 1")
		Game.EmitSound("ui_team_select_shuffle")
		if((shopinfo[i][n]['price']['don'] <= shopinfo.coins && !currency)
		|| (shopinfo[i][n]['price']['rp'] <= shopinfo.mmrpoints && currency)){
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
		
			$('#acceptButton').SetPanelEvent("onmouseactivate",acceptBuy(i, n, pan, consumabl, currency))
		}
	}
});

var returnItem = (function(pan, i, n){
    return function(){
        GameEvents.SendCustomGameEventToServer("return_item", {i : i, n : n})
    }
})
function return_item_js(t){
    let pan = $("#ShopItem" + t.i + '_' + t.n)
    if(shopinfo[t.i][t.n].type == 'consumable'){
        shopinfo[t.i][t.n]['now'] += t.car
        pan.FindChildTraverse('DonateShopItemButtonLabelStock').text = shopinfo[t.i][t.n]['now']
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
			
			if(shopinfo[i][n].type == 'consumable' && GameUI.IsShiftDown()){
				shopinfo[i][n].now = 0
				pan.FindChildTraverse('DonateShopItemButtonLabelStock').text = 0
				GameEvents.SendCustomGameEventToServer("giveItem", {i : i, n : n, all : "all"})
				return
			}
			$.Msg("!!!!!!!!!!!!!!!!!!!!!")
			
			if(consumabl){
				var numb = Number(Number(shopinfo[i][n].now) - Number(1))
				if(Number(shopinfo[i][n].now) > 0){
					pan.FindChildTraverse('DonateShopItemButtonLabelStock').text = numb
				}
				if(numb <= 0){
					shopinfo[i][n].now = 0
				}else{
					shopinfo[i][n].now = numb
				}
				
			}else{
				var c = shopinfo[i][n].now
				pan.FindChildTraverse('DonateShopItemButtonGived').visible = true
				pan.FindChildTraverse('DonateShopItemButtonHas').visible = false
				if(type == 'effect'){
					pan.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#issued')
					pan.FindChildTraverse('DonateShopItemButtonGived').SetPanelEvent("onmouseactivate",takeoff(pan, i, n))
				}else if(type == 'spray'){
					var shopPanel = $("#DonateShopContentPanel")
					for (const [categoryKey, categoryValue] of Object.entries(shopinfo)) {
						if(typeof(categoryValue) == 'object'){
							for (const [productKey, productValue] of Object.entries(categoryValue)) {
								if(typeof(productValue) == 'object' && productValue.type == "spray" && productValue.now > 0){
									singl = shopPanel.FindChildTraverse("ShopItem" + categoryKey + '_' + productKey)
									singl.FindChildTraverse('DonateShopItemButtonHas').visible = true
									singl.FindChildTraverse('DonateShopItemButtonGived').visible = false
								}
							}
						}
					}
					pan.FindChildTraverse('DonateShopItemButtonGived').visible = true
					pan.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#issued')	
					pan.FindChildTraverse('DonateShopItemButtonGived').SetPanelEvent("onmouseactivate",takeoff(pan, i, n))
				}else if(type == 'highfive'){
					var shopPanel = $("#DonateShopContentPanel")
					for (const [categoryKey, categoryValue] of Object.entries(shopinfo)) {
						if(typeof(categoryValue) == 'object'){
							for (const [productKey, productValue] of Object.entries(categoryValue)) {
								if(typeof(productValue) == 'object' && productValue.type == "highfive" && productValue.now > 0){
									singl = shopPanel.FindChildTraverse("ShopItem" + categoryKey + '_' + productKey)
									singl.FindChildTraverse('DonateShopItemButtonHas').visible = true
									singl.FindChildTraverse('DonateShopItemButtonGived').visible = false
								}
							}
						}
					}
					pan.FindChildTraverse('DonateShopItemButtonGived').visible = true
					pan.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#issued')	
					pan.FindChildTraverse('DonateShopItemButtonGived').SetPanelEvent("onmouseactivate",takeoff(pan, i, n))
				}else if (type == 'pet'){
					$.Msg("!pet!")
					var shopPanel = $("#DonateShopContentPanel")
					for (const [categoryKey, categoryValue] of Object.entries(shopinfo)) {
						if(typeof(categoryValue) == 'object'){
							for (const [productKey, productValue] of Object.entries(categoryValue)) {
								if(typeof(productValue) == 'object' && productValue.type == "pet"){
									singl = shopPanel.FindChildTraverse("ShopItem" + categoryKey + '_' + productKey)
									singl.FindChildTraverse('DonateShopItemButtonHas').visible = false
									singl.FindChildTraverse('DonateShopItemButtonGived').visible = true
									singl.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#pet_issued')
								}
							}
						}
					}
				}else{
					pan.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#issued')
					if(shopinfo[i][n].type == 'item'){
					pan.FindChildTraverse('DonateShopItemButtonLabelGived').SetPanelEvent("onmouseactivate",returnItem(pan, i, n))
				}
			}
			
		}
		GameEvents.SendCustomGameEventToServer("giveItem", {i : i, n : n, all : null})
	}
});

var takeoff = (function(pan, i, n)
{
	return function()
	{	
		Game.EmitSound("ui_team_select_shuffle")
		
		$.Msg("take off")
		pan.FindChildTraverse('DonateShopItemButtonGived').visible = false
		pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
		GameEvents.SendCustomGameEventToServer("takeOffEffect", {i : i, n : n})
	}
});

var check = (function(i, n, pan, item, type)
{
	return function()
	{	

		if (!item.checked){
			$.Msg("off")	
			GameEvents.SendCustomGameEventToServer("defaultCosmetic", {i : i, n : n, status : false, type : type})
		}else{
			$.Msg("on")
			var shopPanel = $("#DonateShopContentPanel")
			for (const [categoryKey, categoryValue] of Object.entries(shopinfo)) {
				if(typeof(categoryValue) == 'object'){
					for (const [productKey, productValue] of Object.entries(categoryValue)) {
						if(typeof(productValue) == 'object' && productValue.type == type){
							pan = shopPanel.FindChildTraverse("ShopItem" + categoryKey + '_' + productKey)
							other = pan.FindChildTraverse('smart_toggle')
							if (other != item){
								other.checked = false
							}
						}
					}
				}
			}
			GameEvents.SendCustomGameEventToServer("defaultCosmetic", {i : i, n : n, status : true, type : type})
		}
	}
});	


function initShop(tab){
	shopinfo = tab
	// $.Msg(tab)
	if($('#DonateMoneyLabel')){
		$('#DonateMoneyLabel').text = shopinfo.coins
		$('#MMMRPointsLabel').text = shopinfo.mmrpoints
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
			var GGG = 7
			var width = "160px"//"13.7%"
			// for (const [tovarKey, tovarValue] of Object.entries(value)) {	
				// if(typeof(tovarValue) == 'object'){
					// if( n % 7 == 0 ){
						// horizontal_panel += 1
						// if(TabContent){
							// var hPanel = $.CreatePanel("Panel", TabContent, "")
							// hPanel.AddClass('horizontal_panel')
						// }
					// }
					
			for (const [tovarKey, tovarValue] of Object.entries(value)) {
				if (typeof(tovarValue) == 'object') {
					if (tovarValue.type == 'pet' || tovarValue.type == 'consumable' || !tovarValue.can_upgrade) {
						GGG = 6;
						width = "190px"//16%"
					}
				if (n % GGG == 0) {
					horizontal_panel += 1
					if (TabContent) {
						var hPanel = $.CreatePanel("Panel", TabContent, "")
						hPanel.AddClass('horizontal_panel')
					}
				}			
					if(hPanel){
						// blocks building
						var currency = tovarValue['price']['rp'];
						var pan = $.CreatePanel("Panel", hPanel, "ShopItem" + key + '_' + tovarKey)
						pan.style.width = width
						if(tovarValue.type == 'consumable'){
							pan.BLoadLayout("file://{resources}/layout/custom_game/boss_shop/DonateShopItem2.xml", false, false)
							pan.FindChildTraverse('DonateShopItemButtonLabelStock').text = tovarValue.now
                            pan.FindChildTraverse('DonateShopItemButtonBuyCon').SetPanelEvent("onmouseactivate",give(key, tovarKey, pan, true))
                            pan.FindChildTraverse('shopButtonImgAndText1').SetPanelEvent("onmouseactivate",buy(key, tovarKey, pan, true, false))
                            pan.FindChildTraverse('shopButtonImgAndText2').SetPanelEvent("onmouseactivate",buy(key, tovarKey, pan, true, true))
                            pan.FindChildTraverse('DonateShopItemButtonLabelGived').SetPanelEvent("onmouseactivate",returnItem(pan, key, tovarKey))
						}else{
							pan.BLoadLayout("file://{resources}/layout/custom_game/boss_shop/DonateShopItem1.xml", false, false)
							pan.FindChildTraverse('DonateShopItemButtonBuy').visible = false
							pan.FindChildTraverse('DonateShopItemButtonHas').visible = false
							pan.FindChildTraverse('DonateShopItemButtonGived').visible = false
							pan.FindChildTraverse('DonateShopItemButtonActive').visible = false
							pan.FindChildTraverse('DonateShopItemButtonNeedMore').visible = false
							
							pan.FindChildTraverse('smart_toggle').visible = false
							
							if(tovarValue.type == 'effect' && tovarValue.now > 0){
								pan.FindChildTraverse('smart_toggle').visible = true
								item = pan.FindChildTraverse('smart_toggle')
								item.SetPanelEvent("onmouseactivate",check(key, tovarKey, pan, item, tovarValue.type))
								if (tovarValue.active){
									item.checked = true
								}
							}
							
							if(tovarValue.type == 'spray' && tovarValue.now > 0){
								pan.FindChildTraverse('smart_toggle').visible = true
								item = pan.FindChildTraverse('smart_toggle')
								item.SetPanelEvent("onmouseactivate",check(key, tovarKey, pan, item, tovarValue.type))
								if (tovarValue.active){
									item.checked = true
								}
							}
							
							if(tovarValue.type == 'highfive' && tovarValue.now > 0){
								pan.FindChildTraverse('smart_toggle').visible = true
								item = pan.FindChildTraverse('smart_toggle')
								item.SetPanelEvent("onmouseactivate",check(key, tovarKey, pan, item, tovarValue.type))
								if (tovarValue.active){
									item.checked = true
								}
							}
							
							if (tovarValue.can_upgrade && tovarValue.now >0 && tovarValue.now < 5){
								pan.style.height = '250px'
								pan.FindChildTraverse('DonateShopItemButtonBuy').visible = true
								pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
								pan.FindChildTraverse('DonateShopItemButtonLabel').text = $.Localize('#taik')
								pan.FindChildTraverse('DonateShopItemButtonHas').style.marginTop = "205px"
							}
											
							if(tovarValue.status == 'take_item'){
								pan.FindChildTraverse('DonateShopItemButtonHas').visible = true
								pan.FindChildTraverse('DonateShopItemButtonLabel').text = $.Localize('#taik')
							}else if(tovarValue.status == 'buy'){
								pan.FindChildTraverse('DonateShopItemButtonBuy').visible = true
							}else if(tovarValue.status == 'issued'){
								pan.FindChildTraverse('DonateShopItemButtonGived').visible = true
								pan.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#issued')
							}else if(tovarValue.status == 'takeoff'){
								pan.FindChildTraverse('DonateShopItemButtonGived').visible = true
								pan.FindChildTraverse('DonateShopItemButtonLabelGived').text = $.Localize('#issued')
								pan.FindChildTraverse('DonateShopItemButtonGived').SetPanelEvent("onmouseactivate",takeoff(pan, key, tovarKey))
							}else if(tovarValue.status == 'active'){
								pan.FindChildTraverse('DonateShopItemButtonActive').visible = true
								pan.FindChildTraverse('DonateShopItemButtonLabelActive').text = $.Localize('#active')
							}else if(tovarValue.status == 'need_more'){
								pan.FindChildTraverse('DonateShopItemButtonNeedMore').visible = true
								pan.FindChildTraverse('DonateShopItemButtonLabelNeedMore').text = $.Localize('#need_more') + " " + tovarValue['price']['don']
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
						// mmrpoints
						if(currency == "mmrpoints"){
							pan.FindChildTraverse('shopButtonImg').SetImage('file://{resources}/images/custom_game/DonateShop/protection.png')
							pan.FindChildTraverse('shopButtonImg').style.height ="20px";
							pan.FindChildTraverse('shopButtonImg').style.width = "23px";
						}
						
						if (tovarValue.can_upgrade && tovarValue.now > 1){
							pan.FindChildTraverse('DonateShopItemLabel').text = $.Localize("#DOTA_Tooltip_ability_"+tovarValue.itemname+tovarValue.now)
						}else{
							pan.FindChildTraverse('DonateShopItemLabel').text = $.Localize("#DOTA_Tooltip_ability_"+tovarValue.itemname)
						}
						if (tovarValue.type == "pet"){
							pan.FindChildTraverse('DonateShopItemLabel').text = $.Localize("#DOTA_Tooltip_ability_"+tovarValue.itemname)
						} 
						
						if (tovarValue.type == "effect"){
							pan.FindChildTraverse('DonateShopItemLabel').text = $.Localize("#effect")
						} 
						
						if (tovarValue.type == "spray"){
							pan.FindChildTraverse('DonateShopItemLabel').text = $.Localize("#spray")
						} 
						
						if (tovarValue.type == "highfive"){
							pan.FindChildTraverse('DonateShopItemLabel').text = $.Localize("#highfive")
						} 
						
						if(tovarValue.text_color){
							pan.FindChildTraverse('DonateShopItemLabel').style.color = tovarValue.text_color;
						}
			
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

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
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

(function(){
	// rakurzia(0)
	// if($("#shop_selection_panel")){
		// $("#shop_selection_panel").SetPanelEvent("onmouseover",trymove())
		// $("#shop_selection_panel").SetPanelEvent("onmouseout",function(){click = false})
	// }
	GameEvents.Subscribe( "initShop", initShop)
	GameEvents.Subscribe( "updatemmr", updatemmr)
	GameEvents.Subscribe( "return_item_shop", return_item_js)
    CustomNetTables.SubscribeNetTableListener( "shopinfo", shopinfoed );
	visibleOff("DonateShopPanel")
	visibleOff("openShopLabel")
	visibleOff("BuyControl")
	visibleOff("RatingPanel")

	if($.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse("EditButton"))
		$.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse("EditButton").visible = false;

	// $.Schedule(5,function(){
	// 	$("#cat").RemoveAndDeleteChildren();
	// })
})();