/*:
 * @plugindesc V1.0 Compatibility patch for DreamX's random eprefixes and suffixes
 * @author Poryg
 * 
 * @help
 * Compatibility patch for DreamX's random prefixes and suffixes.
 * Correct order: POR_SaveCore - this patch - Random p&s
 * credits: Poryg, DreamX
 */

Window_SavefileList.prototype.drawPartyEquips = function (info, x, y) {
    var params = PORParams.saveCore || PORParams.saveCoreMin;
    if (info.partyEquips) {
        for (var i in info.partyEquips) {
            for (var j in info.partyEquips[i]) {
                var ix = x + (Math.floor(j / params.peRows) * 32 + params.pePadding);
                var iy = y + (Math.floor(j % params.peRows) * 32 + params.pePadding);
                if (params.partyHorz) ix += params.partySpread * i;
                else iy += params.partySpread * i;
                this.drawIcon(info, info.partyEquips[i][j], ix, iy);
            };
        };
    };
};

Window_SavefileList.prototype.drawIcon = function (info, iconIndex, x, y) {
	      var paramCombIconStarting = PluginManager.parameters('DreamX_RandomPrefixesSuffixes')['Icon Combination Starting Index'] || 6000;
        if (iconIndex >= paramCombIconStarting) {
            var overlayArrayIndex = iconIndex - paramCombIconStarting;
            var overlayIcons = info.overlayIcons[overlayArrayIndex];
            for (var i = 0; i < overlayIcons.length; i++) {
                var iconId = overlayIcons[i].index;
                Window_Selectable.prototype.drawIcon.call(this, iconId, x, y);
            }
            return;
        }
        Window_Selectable.prototype.drawIcon.call(this, iconIndex, x, y);
    };
    
DataManager.makeSavefileInfo = function() {
    var info = {};
    info.globalId   = this._globalId;
    info.title      = $dataSystem.gameTitle;
    info.characters = $gameParty.charactersForSavefile();
    info.faces      = $gameParty.facesForSavefile();
    info.playtime   = $gameSystem.playtimeText();
    info.partyEquips = $gameParty.partyEquipsForSavefile();
    info.leaderName = $gameParty.battleMembers()[0].name();
    info.customSaveData = $gameParty.customSavefileData();
    info.timestamp  = Date.now();
    info.overlayIcons =  $gameSystem.overlayIcons;
    return info;
};
