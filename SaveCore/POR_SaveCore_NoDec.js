Scene_Map.prototype.recacheMenuTextures = function () {
    var por = PORParams.saveCore;
    if (this._menuImageChecker >= por.recacheImages) {
        this._menuImageChecker = 0;    
	        for (var i in por.bgs) if (por.bgs[i].alwaysLoaded) var tex = PIXI.Texture.fromImage("img/pictures/" + PORParams.saveCore.bgs[i].Filename + ".png");
    	    for (var i in por.fgs) if (por.fgs[i].alwaysLoaded) var tex = PIXI.Texture.fromImage("img/pictures/" + PORParams.saveCore.fgs[i].Filename + ".png");
    }else {
        this._menuImageChecker ? this._menuImageChecker++ : this._menuImageChecker = 1;
    };
};

Scene_File.prototype.createBackgroundImages = function () {
	this._backgroundBase = PIXI.Sprite.fromImage ("img/pictures/" + PORParams.saveCore.bgs[0].Filename + ".png");
    if (eval(PORParams.saveCore.bgs[0].width) !== 0) this._backgroundBase.width = eval(PORParams.saveCore.bgs[0].width);
    if (eval(PORParams.saveCore.bgs[0].height) !== 0) this._backgroundBase.height = eval(PORParams.saveCore.bgs[0].height);
    if (eval(PORParams.saveCore.bgs[0].x) !== 0) this._backgroundBase.x = eval(PORParams.saveCore.bgs[0].x);
    if (eval(PORParams.saveCore.bgs[0].y) !== 0) this._backgroundBase.y = eval(PORParams.saveCore.bgs[0].y);
    if (eval(PORParams.saveCore.bgs[0].rotation) !== 0) this._backgroundBase.rotation = eval(PORParams.saveCore.bgs[0].rotation);
    this._backgroundBase.alpha = PORParams.saveCore.bgs[0].alpha;
    this._backgroundSprite.addChild(this._backgroundBase)
    if (!PORParams.saveCore.bgs[1]) return;
    this._backgroundBase.cacheAsBitmap = PORParams.saveCore.bgCache;
    for (var i = 1; i < PORParams.saveCore.bgs.length; i++) {
        var img = PIXI.Sprite.fromImage ("img/pictures/" + PORParams.saveCore.bgs[i].Filename + ".png");
        if (eval(PORParams.saveCore.bgs[i].width) !== 0) img.width = eval(PORParams.saveCore.bgs[i].width);
        if (eval(PORParams.saveCore.bgs[i].height) !== 0) img.height = eval(PORParams.saveCore.bgs[i].height);
        if (eval(PORParams.saveCore.bgs[i].x) !== 0) img.x = eval(PORParams.saveCore.bgs[i].x);
        if (eval(PORParams.saveCore.bgs[i].y) !== 0) img.y = eval(PORParams.saveCore.bgs[i].y);
        if (eval(PORParams.saveCore.bgs[i].rotation) !== 0) img.rotation = eval(PORParams.saveCore.bgs[i].rotation);
        img.alpha = Number(PORParams.saveCore.bgs[i].alpha);
        this._backgroundBase.addChild(img);
    };
};

Scene_File.prototype.createForegroundImages = function () {
    this._foregroundBase = PIXI.Sprite.fromImage ("img/pictures/" + PORParams.saveCore.fgs[0].Filename + ".png");
    if (eval(PORParams.saveCore.fgs[0].width) !== 0) this._foregroundBase.width = eval(PORParams.saveCore.fgs[0].width);
    if (eval(PORParams.saveCore.fgs[0].height) !== 0) this._foregroundBase.height = eval(PORParams.saveCore.fgs[0].height);
    if (eval(PORParams.saveCore.fgs[0].x) !== 0) this._foregroundBase.x = eval(PORParams.saveCore.fgs[0].x);
    if (eval(PORParams.saveCore.fgs[0].y) !== 0) this._foregroundBase.y = eval(PORParams.saveCore.fgs[0].y);
    if (eval(PORParams.saveCore.fgs[0].rotation) !== 0) this._foregroundBase.rotation = eval(PORParams.saveCore.fgs[0].rotation);
    this._foregroundBase.alpha = PORParams.saveCore.fgs[0].alpha;
    this.addChild(this._foregroundBase)
    if (!PORParams.saveCore.fgs[1]) return;
    this._foregroundBase.cacheAsBitmap = PORParams.saveCore.fgCache;
    for (var i = 1; i < PORParams.saveCore.fgs.length; i++) {
        var img = PIXI.Sprite.fromImage ("img/pictures/" + PORParams.saveCore.fgs[i].Filename + ".png");
        if (eval(PORParams.saveCore.fgs[i].width) !== 0) img.width = eval(PORParams.saveCore.fgs[i].width);
        if (eval(PORParams.saveCore.fgs[i].height) !== 0) img.height = eval(PORParams.saveCore.fgs[i].height);
        if (eval(PORParams.saveCore.fgs[i].x) !== 0) img.x = eval(PORParams.saveCore.fgs[i].x);
        if (eval(PORParams.saveCore.fgs[i].y) !== 0) img.y = eval(PORParams.saveCore.fgs[i].y);
        if (eval(PORParams.saveCore.fgs[i].rotation) !== 0) img.rotation = eval(PORParams.saveCore.fgs[i].rotation);
        img.alpha = Number(PORParams.fgs[0].alpha);
        this._foregroundBase.addChild(img);
    };
};

Window_SavefileList.prototype.drawFace = function(saveSlotIndex, i, faceName, faceIndex) {
		var bitmap = PIXI.Texture.fromImage ("img/faces/" + faceName + ".png");
	    this._faceSprites[saveSlotIndex][i].texture = new PIXI.Texture (bitmap, new Rectangle(144 * (faceIndex % 4), 144 * Math.floor(faceIndex / 4), 144, 144))
	    this._faceSprites[saveSlotIndex][i].renderable = true;
};