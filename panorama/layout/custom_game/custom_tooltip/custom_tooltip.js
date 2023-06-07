const CONTEXT = $.GetContextPanel();

function setTooltip() {
	const itemName = CONTEXT.GetAttributeString(`itemName`, undefined);  		//name
	const itemCategory = CONTEXT.GetAttributeString(`itemCategory`, undefined);	//pet
	const itemRariry = CONTEXT.GetAttributeString(`itemRariry`, undefined);		//color
	const sourceName = CONTEXT.GetAttributeString(`sourceName`, undefined);		//
	const boxnumber = CONTEXT.GetAttributeString(`boxnumber`, undefined);
	const description = CONTEXT.GetAttributeString(`description`, undefined);
	
	if (boxnumber == "treasure1"){
		rare = "#rare1"
	}
	else if (boxnumber == "treasure2"){
		rare = "#rare2"
	}
	else{
		rare = "#rare0"
	}

	
	
	//bShowSource = (bShowSource || 1) == 1;
	const rarityColor = itemRariry;
	$("#SourceValue").text = $.Localize("#" + boxnumber)
	$("#SourceValue").text.fontcolor = rarityColor;
	$("#TooltipName").text = $.Localize("#"+itemName);
	$("#CategoryText").text = $.Localize("#class") +  " " + $.Localize("#"+itemCategory);
	$("#RarityText").text = $.Localize("#rare") +  " " + $.Localize(rare);
	$("#SourceImage").SetImage("file://{images}/custom_game/"+boxnumber+".png");
	$("#SourceBorder").visible = true;
	$("#SourceName").visible = true;
	$("#SourceValueWrap").visible = true;
	$("#Description").text =  $.Localize("#"+description);
	
	$("#MainInfo").style.backgroundColor = "gradient(linear, 0% 0%, 100% 0%, from(" + rarityColor + "33), to(transparent));";
	$("#TooltipName").style.backgroundColor = " gradient(linear, 0% 0%, 100% 0%, from(transparent), color-stop(0.25, " + rarityColor + "), color-stop(0.75, " + rarityColor + "), to(transparent));";
	
	if(itemCategory == "box"){
		if (itemName == "reset"){
			$("#CategoryText").text = $.Localize("#class") +  " " + $.Localize("#"+itemName);	
			$("#Description").text =  $.Localize("#reset_1");
		}
	}
	if(itemCategory == "spray"){
		$("#Description").text =  $.Localize("#spray_shop_desc");
	}
	if(itemCategory == "effect"){
		$("#Description").text =  $.Localize("#effect_shop_desc");
	}
}
