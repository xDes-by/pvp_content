var playerID = Players.GetLocalPlayer(),
	steamID = GetUniverseSteamID32(playerID)
	
function GetUniverseSteamID32(PID)
{
    var steamID64 = Game.GetPlayerInfo(PID).player_steamid,
    steamIDPart = Number(steamID64.substring(3)),
    steamID32 = String(steamIDPart - 61197960265728);

    return steamID32;
}


(function()
{

	if($.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse("EditButton"))
		$.GetContextPanel().GetParent().GetParent().GetParent().FindChildTraverse("EditButton").visible = false;
})();