var invopened = false;
var GameTime = false;	



function OpenInv() {
	$.Msg("!")
	clickingloop()
	invopened = !invopened
	$("#CreepsMenu").SetHasClass("equipmentopened",invopened)
	
	
	if (!invopened) {
		$("#CreepsOpenButton").style.animationName = 'rotate2'
	}else{
		$("#CreepsOpenButton").style.animationName = 'rotate'
	}
}

function ErrorMessage(t) {
	GameEvents.SendEventClientSide( "dota_hud_error_message",{reason: 80, message: t.message} )
}


var OnMouseOverItem = (function(pan, type){
    return function(){
        if(GameTime &&  Game.Time() - GameTime  < 0.25){
			let item = pan.FindChildTraverse('inv_'+type).itemname
			if (!item == ''){
				ErrorMessage("#xyitam")
				return
			}
            let event = {
                slot : ItemNumber,
                type : type,
            }
            GameEvents.SendCustomGameEventToServer("put_item_lua", event)
        }
    }
})


var ReturnItemBack = (function(k, v){
    return function(){	
		let item = k.FindChildTraverse('inv_'+v).itemname
		
    }
})

var yes = (function(item, k, v){
	return function()
	{
		let event = {
            type : v,
            item : item,
        }
        GameEvents.SendCustomGameEventToServer("return_item_lua", event)
	}
})	

var no = (function(item, k, v){
	return function()
	{
		$.Msg("no")
	}
})	

function FindDotaHudElement(panel) {
	return $.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse(panel);
}


var lastLoop = false;
function clickingloop(){
    var dragg = false
	for(var i = 0; i < 9;i++){
        if(FindDotaHudElement("inventory_slot_"+i).BHasClass("dragging_from")){
            ItemNumber = i
            GameTime = Game.Time()
            if(GameUI.IsShiftDown()){
                dragg = true
            }
        }
    }
    lastLoop = dragg
	$.Schedule(1/20,function(){
        if(invopened){
            clickingloop()
        } 
	})
}

function put_item_js(t){
	$('#inv_'+t.slot).itemname = t.item_name
	$('#inv_'+t.slot).visible = true
}

function return_item_js(t){
	$('#inv_'+t.slot).itemname = ''
	$('#inv_'+t.slot).visible = false
	$('#inv_'+t.slot).visible = true
}

function update_hero_inv(t){
	for (const [key, value] of Object.entries(t)) {
	   	$('#inv_'+key).itemname = value
		$('#inv_'+key).visible = true
	}
}

function button_inv(){
    // FindDotaHudElement("AghsStatusContainer").visible = false;
    // var inv = FindDotaHudElement("AghsStatusContainer");
    // invbtn = $.CreatePanel('Panel',inv.GetParent(),'inventorywrap')  
	// invbtn.style.marginTop = "94px"
	// invbtn.style.marginLeft = "5px"
	// invbtn.style.width = "64px"
	// invbtn.style.height = "64px"
	// invbtn.style.backgroundColor = "gradient( linear, 0% 0%, 0% 100%, from( #25282a ), color-stop( .5, #25282a), to( #000000 ) );"
	// invbtn.style.backgroundImage = "url('s2r://panorama/images/topbar/armory_icon_off_png.vtex')";
	// invbtn.style.backgroundPosition = "57% center";
	// invbtn.style.backgroundRepeat = "no-repeat";
	// invbtn.style.backgroundSize = "75px 75px";
	// invbtn.style.borderTop = "1px solid #ffffff04";
	// invbtn.style.borderRight = "1px solid #ffffff04";
	// invbtn.style.opacity = 0.75;
	// invbtn.style.transitionProperty = "background-image, background-color, opacity";
	// invbtn.style.transitionDuration = "0.2s";
	// invbtn.style.transitionTimingFunction = "ease-in-out";
	
	// invbtn.SetPanelEvent("onmouseover", function() {
	// invbtn.style.opacity = 1;
	// invbtn.style.backgroundColor = "gradient(linear, 0% 0%, 100% 0%, from(#000000), to(#25282a));"
	// invbtn.style.backgroundImage = "url('s2r://panorama/images/topbar/armory_icon_on_png.vtex')";
	// });

	// invbtn.SetPanelEvent("onmouseout", function() {
	// invbtn.style.opacity = 0.75;
	// invbtn.style.backgroundColor = "gradient( linear, 0% 0%, 0% 100%, from( #25282a ), color-stop( .5, #25282a), to( #000000 ) );"
	// invbtn.style.backgroundImage = "url('s2r://panorama/images/topbar/armory_icon_off_png.vtex')";
	// });
	
	// invbtn.SetPanelEvent("onmouseactivate",function(){ OpenInv()});
}

(function()
{
	button_inv()
	GameEvents.Subscribe("CustomError",ErrorMessage);

	GameEvents.Subscribe( "put_item_js", put_item_js )
	GameEvents.Subscribe( "return_item_js", return_item_js )
	GameEvents.Subscribe( "update_hero_inv", update_hero_inv )
	
    if($("#equipmentItems")){
		$("#head").SetPanelEvent("onmouseover", OnMouseOverItem($("#head"), "head"))
		$("#head").SetPanelEvent("onmouseactivate", ReturnItemBack($("#head"), "head"))

        $("#armor").SetPanelEvent("onmouseover", OnMouseOverItem($("#armor"), "armor"))
		$("#armor").SetPanelEvent("onmouseactivate", ReturnItemBack($("#armor"), "armor"))
		
        $("#glovers").SetPanelEvent("onmouseover", OnMouseOverItem($("#glovers"), "glovers"))
		$("#glovers").SetPanelEvent("onmouseactivate", ReturnItemBack($("#glovers"), "glovers"))
		
        $("#weapon").SetPanelEvent("onmouseover", OnMouseOverItem($("#weapon"), "weapon"))
		$("#weapon").SetPanelEvent("onmouseactivate", ReturnItemBack($("#weapon"), "weapon"))
		
        $("#pants").SetPanelEvent("onmouseover", OnMouseOverItem($("#pants"), "pants"))
		$("#pants").SetPanelEvent("onmouseactivate", ReturnItemBack($("#pants"), "pants"))
		
        $("#boots").SetPanelEvent("onmouseover", OnMouseOverItem($("#boots"), "boots"))
		$("#boots").SetPanelEvent("onmouseactivate", ReturnItemBack($("#boots"), "boots"))
		}
})()


