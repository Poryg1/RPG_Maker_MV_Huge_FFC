/*:
 * @plugindesc V1.1 Save core.
 * @author Poryg
 *
 * @help
 * ////////////////////////////////////////////////////////////////////////////
 * //Introduction
 * ////////////////////////////////////////////////////////////////////////////
 * In short it is a very powerful save core plugin aimed at as much versatility
 * as possible for as little cost of performance as possible. Commissioned by
 * ZServ with a special request that I release it to public, I took his
 * request and upgraded it to make it more versatile.
 * 
 * Terms of use:
 * Free for commercial and non-commercial use.
 * Credit is required, but just Poryg somewhere in the credit section
 * is fine.
 * Free to edit as you see fit, but don't upload this plugin as your own.
 * Sharing the plugin or its edits requires written permission and proper
 * credit. I'm not trying to be restrictive, I just want to see where
 * my plugins are.
 * For full official terms of use see  
 * https://github.com/Poryg1/RPG_Maker_MV_Huge_FFC
 *
 * The plugin contains only two plugin commands:
 * setsavebgm name pitch pan volume
 * sets a certain song as a special Save menu song. One of the features 
 * requested by ZServ.
 * clearsavebgm - no arguments. Clears the special bgm.
 *
 * If you need to call a load scene via event script, use
 * SceneManager.push(Scene_Load)
 *
 * Plugin now supports YEP_X_NewGamePlus plugin. However, it doesn't support
 * it natively. You have to edit YEP_X_NewGamePlus and delete the entire
 * Window_SaveAction section. Also, make sure this plugin is ABOVE
 * YEP_X_NewGamePlus or else it will NOT function correctly!!!
 *
 * ////////////////////////////////////////////////////////////////////////////
 * //Plugin parameters
 * ////////////////////////////////////////////////////////////////////////////
 * Most of this plugin's power is hidden inside them. Some of them are pretty
 * self explanatory and those that are not will be explained here.
 * They are set to allow as much customizability as possible and many of 
 * them are capable of executing custom code. Of yourse many times you 
 * don't need that, however it is there as a possibility.
 *
 * New game mode 
 * Doesn't allow custom code, only numbers with values as follows:
 * 0 - don't allow new game from save menu 
 * 1 - allow new game from empty saves
 * 2 - allow new game from all saves
 *
 * Save menu BGM variable
 * One of the commission's requests - to be able to save custom bgm in a 
 * variable. If you don't intend to use it, empty it or use 0.
 *
 * Empty savefile name
 * Accepts only a string. By default the MV code autocreates a space for it, 
 * but since some people don't want to use it, I removed the space so it 
 * doesn't waste time in that case. If you want to have a space there, you 
 * can just add it in. Instead of "Empty slot" you can type in "Empty slot ".
 *
 * Party scale
 * It was requested that the plugin shows faces and that they should be 
 * scaleable. Apart from the fact that it was necessary to rework how faces 
 * were drawn, it also means that this is relevant only to faces. For 
 * character sprites it is currently irrelevant.
 *
 * Party spread
 * This variable doesn't count the specific sizes of whatever you're using.
 * For example if you have a face 144 pixels wide, you need to set party spread
 * at least 144 pixels to avoid overlap of faces. The reason why this is like
 * that is simply to enfore equal distances between character sprites or 
 * character faces and character equips, because due to the fact that you can 
 * scale faces it is impossible to count a decent equation calculating distance 
 * from A to B other than raw distance.
 * Of course if you want the menu separated to four parts of the screen for
 * each character, you can just set 0 and the plugin will take care of 
 * everything.
 *
 * Horizontal mode
 * Useful especially with bigger menus. Instead of a horizontal mode you can 
 * have a vertical mode. Vertical mode doesn't do anything with rows or 
 * columns, but it makes the faces and equip icons go vertically instead 
 * of horizontally.
 * 
 *
 * ////////////////////////////////////////////////////////////////////////////
 * //General tips
 * ////////////////////////////////////////////////////////////////////////////
 * -- Feel free to use many pictures at once. But don't keep them cached. I
 * recommend only the first background picture to be cached and the first
 * foreground picture to be cached.
 * -- Feel free to type anything you want in the texts. If you don't want 
 * particular preceding texts however, you need to empty them. They are 
 * set to be completely independent of standard texts.
 * -- Custom and preceding texts allow for escape codes. You can therefore
 * go crazy.
 * -- Since description texts are completely independent of normal texts,
 * you can use them for completely whatever you want, even for things they
 * "are not supposed to serve for"!
 *
 *
 * ////////////////////////////////////////////////////////////////////////////
 * //Coding tips
 * ////////////////////////////////////////////////////////////////////////////
 * General:
 * -- Huge customizability has been achieved by abuse of eval commands.
 * If you know about coding and don't want to have so many of them
 * present in the code, feel free to edit them to something more
 * fitting.
 * -- If you need more custom texts or background/foreground images,
 * simply copy all last one's parameters, paste them underneath and
 * increase the number in them by one. If you don't need as many,
 * feel free to delete them.
 * -- if there's an exclam mark at the end of the parameter's name,
 * you can use escape tags (e.g. new game name!)
 * -- You need to make new lines by yourself, there are no word wrapping 
 * functions present. To create a new line use <n> escape tag.
 * -- If you want to use a string of text, surround it in "" or ''. The
 * exception to this are parameters that don't accept code (e.g.
 * preceding texts) where '' and "" are unnecessary.
 *
 * !! group:
 * -- Group of parameters where you can use all variables including
 * in-game variables without issues. You can use multiple statements 
 * separated by a semicolon, but the end result/last statement should
 * be either a string or something that can be turned to it.
 * -- examples of texts you can use:
 * $gameVariables.value(1)
 * $gameParty.members()[0].name();
 * $gameVariables.value(1) + " out of " + $gameVariables.value(2)
 * "\c[3]Bombs: \c[0]" + $gameParty._items[30]
 * "Defeated spiders.<n>Now they need to kill the dragon."
 * 
 * ! group:
 * -- Group of parameters that allows use of code. but not recommended 
 * for game code or otherwise not always accessible code. 
 * You can use multiple statements separated by a semicolon,
 * but the end result/last statement should be either a string or 
 * something that can be turned to it.
 * -- You can use the same variables as in _ group, but I don't see
 * any reason as to why would you want to transform them into a string
 * of text.
 *
 * : group:
 * -- Group of parameters that can access all code, but is not involved
 * in strings or locations. In case of the appearance conditions 
 * the resulting code should be either a truthy or a falsey value 
 * (falsey values: 0, false, '', null, undefined, NaN) 
 * examples of truthy values: 1, 30, "f",... Anything that has value.
 * Note that "false" returns true, because "false" is a string!
 * In rest of the cases it should be fairly intuitive as to what kind
 * of a value belongs there.
 *
 * _ group:
 * -- Group of parameters involved in setting things related to location.
 * Not recommended to use with not always accessible variables with
 * the exception of notable variables. You can make multiple statements
 * separated by a semicolon (;), but the end result/last statement should
 * always return a number.
 * -- Notable variables:
 * Graphics - screen. Width of the screen is Graphics.boxWidth.
 * -- Usable only for save contents section:
 * valid - Boolean that determines whether the savefile contains info.
 * Not too useful normally, but may be handy for those that want to
 * edit this plugin so that empty saveslots contain more stuff.
 * this - this window. You can use anything about it, including methods.
 * rect - the rectangle dedicated to window information. For example if you 
 * want to place something in the middle of the rectangle, you'll do 
 * rect.width / 2. Note that every element begins in at least rect.x and 
 * rect.y by default to be in sync with the savefile's rectangles and is 
 * not necessary
 * bottom - the bottom of a rect
 *
 * Other:
 * If you want to choose different X for file index compared to Empty
 * slot, use valid ? rect.width - 80 : rect.width / 2
 * of course substitute 80 and / 2 by whatever you want
 * If you want to choose different X for file index compared to New game+
 * index, use 
 * DataManager.loadSavefileInfo(id).newGamePlus ? 80 : 150
 * (if it's new game+, X is 80 pixels, if not, it's 150 pixels.)
 *
 *
 * ////////////////////////////////////////////////////////////////////////////
 * //Changelog:
 * ////////////////////////////////////////////////////////////////////////////
 * 1.1.1 - 13th May 2018
 * -- Fixed bug in x and y positions in custom save data, they were badly written
 *
 * 1.1 - 3rd April 2018
 * -- Default MV encryption is now supported
 * -- Added compatibility with Yanfly's save core
 *
 * @param sys
 * @text Basic data
 *
 * @param newGame
 * @parent sys
 * @text New game start mode
 * @desc 
 * @type number
 * @default 1
 * 
 * @param maxSaves
 * @parent sys
 * @text Max save files
 * @desc Sets the max amount of saves (default: 20)
 * @type number
 * @default 20
 *
 * @param savemenuBGMVariable
 * @parent sys
 * @text Save menu BGM variable
 * @type number
 * @desc Sets the ID of variable where the soundtrack gets saved
 * @default 1
 *
 * @param recacheImages
 * @parent sys
 * @text Recache images
 * @desc Sets the amount of frames to wait until the game checks the cache for images.
 * @type number
 * @default 3600
 *
 * @param e9
 * @text ----------------
 *
 * @param swCont
 * @text Save contents
 *
 * @param indexX
 * @parent swCont
 * @text _Index X
 * @desc Sets the X position of the File index text
 * @default 0
 *
 * @param indexY
 * @parent swCont
 * @text _Index Y
 * @desc Sets the Y position of the File index text
 * @default 0
 *
 * @param newGamePlusIndex
 * @parent swCont
 * @text New game+ text 
 * @desc Sets the text of a New game+ slot.
 * @default New game+ 
 *
 * @param showSave
 * @parent swCont
 * @text Show save button
 * @desc If saves are disabled, show save button (has no effect if saves are enabled). Default: true
 * @type boolean
 * @default true
 *
 * @param emptyId
 * @parent swCont
 * @text Visible empty slot ID
 * @desc Decides whether empty slots' IDs are visible or not (default: true)
 * @type boolean
 * @default true
 * 
 * @param slotId
 * @parent swCont
 * @text Visible save slot ID
 * @desc Decides whether occupied save slots' IDs are visible or not (default: true)
 * @type boolean
 * @default true
 *
 * @param emptySaveName
 * @parent swCont
 * @text Empty savefile name
 * @desc Sets the name for empty slots (default: Empty slot) - space not included
 * @default Empty slot 
 *
 * @param newGameText
 * @parent swCont
 * @text New game text
 * @desc Sets how will the New game command look (default: New game)
 * @default New game
 *
 * @param saveGameText
 * @parent swCont
 * @text Save game text
 * @desc Sets how will the Save game command look (default: Save game)
 * @default Save game
 *
 * @param loadGameText
 * @parent swCont
 * @text Load game text
 * @desc Sets how will the Load game command look (default: Load game)
 * @default Load game
 *
 * @param newGamePlusText
 * @parent swCont
 * @text New game + text
 * @desc Sets how will the New game+ command look (requires YEP_NewGamePlus plugin)
 * @default New game +
 *
 * @param deleteGameText
 * @parent swCont
 * @text Delete game text
 * @desc Sets how will the Delete game command look (default: Delete game)
 * @default Delete game
 *
 * @param backText
 * @parent swCont
 * @text Back text
 * @desc Sets how will the Back command look (default: Back)
 * @default Back
 *
 * @param party
 * @parent swCont
 * @text Party
 *
 * @param partyShow
 * @parent party
 * @text Party show mode
 * @type number
 * @desc Shows how party is shown: 0 off, 1: sprites, 2: faces (default: 2)
 * @default 2
 *
 * @param partyMembers
 * @parent party
 * @text Party members
 * @type number
 * @desc Shows up to first X party members
 * @default 4
 *
 * @param partyScale
 * @parent party
 * @text Party scale
 * @desc Sets the X and Y scale of party members (default: 1)
 * @default 1
 *
 * @param partyX
 * @parent party
 * @text _Party X
 * @desc Sets the X of party characters (default: 50)
 * @default 50
 *
 * @param partyY
 * @parent party
 * @text _Party Y
 * @desc Sets the Y of party characters (default: 0)
 * @default 0
 *
 * @param partySpread
 * @parent party
 * @text _Party spread
 * @desc Sets the distance in pixels between two party faces
 * @default 0
 *
 * @param partyHorz
 * @parent party
 * @text Horizontal mode
 * @desc Sets if you want the party spread to be horizontal or vertical
 * @type boolean
 * @default true
 *
 * @param partyEquips
 * @parent party
 * @text :Party equips
 * @desc Show party's equip icons (number of party members)
 * @default $gameParty.battleMembers().length
 *
 * @param peRows
 * @parent partyEquips
 * @text Rows
 * @desc Sets the amount of icon rows
 * @type number
 * @default 1
 *
 * @param pePadding
 * @parent partyEquips
 * @text Padding
 * @desc Sets the amount of empty pixels between two icons
 * @type number
 * @default 5
 *
 * @param peX
 * @parent partyEquips
 * @text _X
 * @desc Sets the X coord of the first icon (default: 0)
 * @default 0
 *
 * @param peY
 * @parent partyEquips
 * @text _Y
 * @desc Sets the Y coord of the first icon (default: 0)
 * @default 0
 *
 * @param peText
 * @parent partyEquips
 * @text Preceding text!
 * @desc Describes the party equips (default: Gear)
 * @default Gear
 *
 * @param peTextX
 * @parent peText
 * @text _X
 * @desc Sets the X of the equips description text (default: 0)
 * @default 0
 *
 * @param peTextY
 * @parent peText
 * @text _Y
 * @desc Sets the Y of the equips description text (default: 0)
 * @default 0
 *
 * @param leaderName
 * @parent party
 * @text Show leader name
 * @desc Shows or hides leader's name (default: true)
 * @type Boolean
 * @default true
 *
 * @param lnX
 * @parent leaderName
 * @text _X
 * @desc Sets the X of leader's name (default: 0)
 * @default 0
 *
 * @param lnY
 * @parent leaderName
 * @text _Y
 * @desc Sets the Y of leader's name (default: 0)
 * @default 0
 *
 * @param lnDesc
 * @parent leaderName
 * @text Preceding text!
 * @desc Shows the description of leader's name (default: Leader)
 * @default Leader
 *
 * @param lnDescX
 * @parent lnDesc
 * @text _X
 * @desc Sets the X of leader's name description (default: 0)
 * @default 0
 *
 * @param lnDescY
 * @parent lnDesc
 * @text _Y
 * @desc Sets the Y of leader's name description (default: 0)
 * @default 0
 * 
 * @param playTime
 * @parent swCont
 * @text Play time
 * @type Boolean
 * @desc Show Playtime (default: true)
 * @default true
 *
 * @param playTimeX
 * @parent playTime
 * @text _X
 * @desc Sets the X of the playtime (default: 0)
 * @default 0
 *
 * @param playTimeY
 * @parent playTime
 * @text _Y
 * @desc Sets the Y of the playtime (default: rect.height - this.lineHeight())
 * @default rect.height - this.lineHeight()
 *
 * @param e1
 * @text ----------------
 *
 * @param titleBGM
 * @text Title BGM
 * @desc Sets the pre/title screen load menu BGM (default: Native)
 * @default Native
 *
 * @param titleBGMPan
 * @parent titleBGM
 * @text Pan
 * @type number
 * @desc Sets the pan of the title music (default: 0)
 * @default 0
 *
 * @param titleBGMPitch
 * @parent titleBGM
 * @text Pitch
 * @type number
 * desc Sets the pitch of the title music (default: 100)
 * @default 100
 *
 * @param titleBGMVolume
 * @parent titleBGM
 * @text Volume
 * @type number
 * @desc Sets the volume of Title BGM (default: 90)
 * @default 90
 *
 * @param e2
 * @text ----------------
 * 
 * @param sw
 * @text Save window
 *
 * @param swWidth
 * @parent sw
 * @text _Width
 * @desc Sets width of the save window (default: Graphics.boxWidth)
 * @default Graphics.boxWidth
 * 
 * @param swHeight
 * @parent sw
 * @text _Height
 * @desc Sets height of the save window (default: Graphics.boxHeight / 2)
 * @default Graphics.boxHeight / 2
 * 
 * @param swX
 * @parent sw
 * @text _X
 * @desc Sets the X location of the save window (default: 0)
 * @default 0
 * 
 * @param swY
 * @parent sw
 * @text _Y
 * @desc Sets the Y location of the save window (default: Graphics.boxHeight / 4)
 * @default Graphics.boxHeight / 4
 *
 * @param swAlpha
 * @parent sw
 * @text Opacity
 * @desc Sets the opacity of the save window (default: 255)
 * @type number
 * @default 255
 *
 * @param swRows
 * @parent sw
 * @type number
 * @text Visible rows
 * @desc Sets the amouht of visible rows (default: 3)
 * @default 3
 * 
 * @param swTopRow
 * @parent sw
 * @type number
 * @text Top most row
 * @desc Sets the amount of visible rows above the cursor when scrolling up (default: 1)
 * @default 1
 *
 * @param swBottomRow
 * @parent sw
 * @type number
 * @text Bottom most row
 * @desc Sets the amount of visible rows below the cursor upon scrolling down (default: 1)
 * @default 1
 *
 * @param swBlinking
 * @parent sw
 * @type boolean
 * @text Blinking
 * @desc Sets whether the cursor blinks when it's active or not
 * @default true
 *
 * @param ow
 * @text Options window
 *
 * @param owWidth
 * @parent ow
 * @text _Width
 * @desc Sets the width of the option window (pops up when you click on a savefile) (default: 300)
 * @default 300
 *
 * @param owX
 * @parent ow
 * @text _X
 * @desc Sets the X of the option window (default: (Graphics.boxWidth - this._optionsWindow.width) / 2)
 * @default (Graphics.boxWidth - this._optionsWindow.width) / 2
 *
 * @param owY
 * @parent ow
 * @text _Y
 * @desc Sets the Y of the option window (default: (Graphics.boxHeight - this._optionsWindow.height) / 2)
 * @default (Graphics.boxHeight - this._optionsWindow.height) / 2
 *
 * @param owAlpha
 * @parent ow
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the option window (default: 255)
 * @default 255
 *
 * @param owBlinking
 * @parent ow
 * @text Blinking
 * @type boolean
 * @desc Toggles the blinking of currently selected option in the menu
 * @default true
 *
 * @param e3
 * @text ----------------
 *
 * @param ngw
 * @text New game window
 *
 * @param ngwWidth
 * @parent ngw
 * @text _Width
 * @desc Sets the width of the New game window (pops up when you select an empty slot) (default: 300)
 * @default 300
 *
 * @param ngwX
 * @parent ngw
 * @text _X
 * @desc Sets the X of the New game window (default: (Graphics.boxWidth - this._newgameWindow.width) / 2)
 * @default (Graphics.boxWidth - this._newgameWindow.width) / 2 
 *
 * @param ngwY
 * @parent ngw
 * @text _Y
 * @desc Sets the Y of the New game window (default: (Graphics.boxHeight - this._newgameWindow.height) / 2)
 * @default (Graphics.boxHeight - this._newgameWindow.height) / 2
 *
 * @param ngwAlpha
 * @parent ngw
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the New game window (default: 255)
 * @default 255
 *
 * @param ngwBlinking
 * @parent ngw
 * @text Blinking
 * @type boolean
 * @desc Toggles the blinking of currently selected option in the menu
 * @default true 
 *
 * @param e10
 * @text ----------------
 *
 * @param customTexts
 * @text Custom texts
 *
 * @param ct1
 * @parent customTexts
 * @text !!Custom text 1!
 * @desc Contents of text 1. If you don't want any, leave empty.
 *
 * @param ct1X
 * @parent ct1
 * @text _X
 * @desc Sets X of custom text.
 * @default 0
 *
 * @param ct1Y
 * @parent ct1
 * @text _Y
 * @desc Sets Y of custom text.
 * @default 0
 *
 * @param ct1ac
 * @parent ct1
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct1Desc
 * @parent ct1
 * @text Preceding text!
 * @desc Sets the text preceding the custom text
 *
 * @param ct1DescX
 * @parent ct1Desc
 * @text _X
 * @desc Sets the X of the preceding text
 * @default 0
 *
 * @param ct1DescY
 * @parent ct1Desc
 * @text _Y
 * @desc Sets the Y of the preceding text
 * @default 0
 *
 * @param ct1DescAc
 * @parent ct1Desc
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct2
 * @parent customTexts
 * @text !!Custom text 2!
 * @desc Contents of text 2. If you don't want any, leave empty.
 *
 * @param ct2X
 * @parent ct2
 * @text _X
 * @desc Sets X of custom text.
 * @default 0
 *
 * @param ct2Y
 * @parent ct2
 * @text _Y
 * @desc Sets Y of custom text.
 * @default 0
 *
 * @param ct2ac
 * @parent ct2
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct2Desc
 * @parent ct2
 * @text Preceding text!
 * @desc Sets the text preceding the custom text
 *
 * @param ct2DescX
 * @parent ct2Desc
 * @text _X
 * @desc Sets the X of the preceding text
 * @default 0
 *
 * @param ct2DescY
 * @parent ct2Desc
 * @text _Y
 * @desc Sets the Y of the preceding text
 * @default 0
 *
 * @param ct2DescAc
 * @parent ct2Desc
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct3
 * @parent customTexts
 * @text !!Custom text 3!
 * @desc Contents of text 3. If you don't want any, leave empty.
 *
 * @param ct3X
 * @parent ct3
 * @text _X
 * @desc Sets X of custom text.
 * @default 0
 *
 * @param ct3Y
 * @parent ct3
 * @text _Y
 * @desc Sets Y of custom text.
 * @default 0
 *
 * @param ct3ac
 * @parent ct3
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct3Desc
 * @parent ct3
 * @text Preceding text!
 * @desc Sets the text preceding the custom text
 *
 * @param ct3DescX
 * @parent ct3Desc
 * @text _X
 * @desc Sets the X of the preceding text
 * @default 0
 *
 * @param ct3DescY
 * @parent ct3Desc
 * @text _Y
 * @desc Sets the Y of the preceding text
 * @default 0
 *
 * @param ct3DescAc
 * @parent ct3Desc
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct4
 * @parent customTexts
 * @text !!Custom text 4!
 * @desc Contents of text 4. If you don't want any, leave empty.
 *
 * @param ct4X
 * @parent ct4
 * @text _X
 * @desc Sets X of custom text.
 * @default 0
 *
 * @param ct4Y
 * @parent ct4
 * @text _Y
 * @desc Sets Y of custom text.
 * @default 0
 *
 * @param ct4ac
 * @parent ct4
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct4Desc
 * @parent ct4
 * @text Preceding text!
 * @desc Sets the text preceding the custom text
 *
 * @param ct4DescX
 * @parent ct4Desc
 * @text _X
 * @desc Sets the X of the preceding text
 * @default 0
 *
 * @param ct4DescY
 * @parent ct4Desc
 * @text _Y
 * @desc Sets the Y of the preceding text
 * @default 0
 *
 * @param ct4DescAc
 * @parent ct4Desc
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct5
 * @parent customTexts
 * @text !!Custom text 5!
 * @desc Contents of text 5. If you don't want any, leave empty.
 *
 * @param ct5X
 * @parent ct5
 * @text _X
 * @desc Sets X of custom text.
 * @default 0
 *
 * @param ct5Y
 * @parent ct5
 * @text _Y
 * @desc Sets Y of custom text.
 * @default 0
 *
 * @param ct5ac
 * @parent ct5
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct5Desc
 * @parent ct5
 * @text Preceding text!
 * @desc Sets the text preceding the custom text
 *
 * @param ct5DescX
 * @parent ct5Desc
 * @text _X
 * @desc Sets the X of the preceding text
 * @default 0
 *
 * @param ct5DescY
 * @parent ct5Desc
 * @text _Y
 * @desc Sets the Y of the preceding text
 * @default 0
 *
 * @param ct5DescAc
 * @parent ct5Desc
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct6
 * @parent customTexts
 * @text !!Custom text 6!
 * @desc Contents of text 6. If you don't want any, leave empty.
 *
 * @param ct6X
 * @parent ct6
 * @text _X
 * @desc Sets X of custom text.
 * @default 0
 *
 * @param ct6Y
 * @parent ct6
 * @text _Y
 * @desc Sets Y of custom text.
 * @default 0
 *
 * @param ct6ac
 * @parent ct6
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct6Desc
 * @parent ct6
 * @text Preceding text!
 * @desc Sets the text preceding the custom text
 *
 * @param ct6DescX
 * @parent ct6Desc
 * @text _X
 * @desc Sets the X of the preceding text
 * @default 0
 *
 * @param ct6DescY
 * @parent ct6Desc
 * @text _Y
 * @desc Sets the Y of the preceding text
 * @default 0
 *
 * @param ct7
 * @parent customTexts
 * @text !!Custom text 7!
 * @desc Contents of text 7. If you don't want any, leave empty.
 *
 * @param ct7X
 * @parent ct7
 * @text _X
 * @desc Sets X of custom text.
 * @default 0
 *
 * @param ct7Y
 * @parent ct7
 * @text _Y
 * @desc Sets Y of custom text.
 * @default 0
 *
 * @param ct7ac
 * @parent ct7
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct7Desc
 * @parent ct7
 * @text Preceding text!
 * @desc Sets the text preceding the custom text
 *
 * @param ct7DescX
 * @parent ct7Desc
 * @text _X
 * @desc Sets the X of the preceding text
 * @default 0
 *
 * @param ct7DescY
 * @parent ct7Desc
 * @text _Y
 * @desc Sets the Y of the preceding text
 * @default 0
 *
 * @param ct7DescAc
 * @parent ct7Desc
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct8
 * @parent customTexts
 * @text !!Custom text 8!
 * @desc Contents of text 8. If you don't want any, leave empty.
 *
 * @param ct8X
 * @parent ct8
 * @text _X
 * @desc Sets X of custom text.
 * @default 0
 *
 * @param ct8Y
 * @parent ct8
 * @text _Y
 * @desc Sets Y of custom text.
 * @default 0
 *
 * @param ct8ac
 * @parent ct8
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct8Desc
 * @parent ct8
 * @text Preceding text!
 * @desc Sets the text preceding the custom text
 *
 * @param ct8DescX
 * @parent ct8Desc
 * @text _X
 * @desc Sets the X of the preceding text
 * @default 0
 *
 * @param ct8DescY
 * @parent ct8Desc
 * @text _Y
 * @desc Sets the Y of the preceding text
 * @default 0
 *
 * @param ct8DescAc
 * @parent ct8Desc
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct9
 * @parent customTexts
 * @text !!Custom text 9!
 * @desc Contents of text 9. If you don't want any, leave empty.
 *
 * @param ct9X
 * @parent ct9
 * @text _X
 * @desc Sets X of custom text.
 * @default 0
 *
 * @param ct9Y
 * @parent ct9
 * @text _Y
 * @desc Sets Y of custom text.
 * @default 0
 *
 * @param ct9ac
 * @parent ct9
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct9Desc
 * @parent ct9
 * @text Preceding text!
 * @desc Sets the text preceding the custom text
 *
 * @param ct9DescX
 * @parent ct9Desc
 * @text _X
 * @desc Sets the X of the preceding text
 * @default 0
 *
 * @param ct9DescY
 * @parent ct9Desc
 * @text _Y
 * @desc Sets the Y of the preceding text
 * @default 0
 *
 * @param ct9DescAc
 * @parent ct9Desc
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct10
 * @parent customTexts
 * @text !!Custom text 10!
 * @desc Contents of text 10. If you don't want any, leave empty.
 *
 * @param ct10X
 * @parent ct10
 * @text _X
 * @desc Sets X of custom text.
 * @default 0
 *
 * @param ct10Y
 * @parent ct10
 * @text _Y
 * @desc Sets Y of custom text.
 * @default 0
 *
 * @param ct10ac
 * @parent ct10
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param ct10Desc
 * @parent ct10
 * @text Preceding text!
 * @desc Sets the text preceding the custom text
 *
 * @param ct10DescX
 * @parent ct10Desc
 * @text _X
 * @desc Sets the X of the preceding text
 * @default 0
 *
 * @param ct10DescY
 * @parent ct10Desc
 * @text _Y
 * @desc Sets the Y of the preceding text
 * @default 0
 *
 * @param ct10DescAc
 * @parent ct10Desc
 * @text :Appearance condition
 * @desc Sets the condition that must be fulfilled for this to show to player (default: true)
 * @default true
 *
 * @param e4
 * @text ----------------
 *
 * @param bg
 * @text Background images
 * 
 * @param bg1
 * @text Background 1
 * @parent bg
 *
 * @param bg1Filename
 * @parent bg1
 * @text Filename
 * @desc Sets the filename of the background. No defaults obviously.
 *
 * @param bg1AlwaysLoaded
 * @parent bg1
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default true
 *
 * @param bg1Width
 * @parent bg1
 * @text _Background width
 * @desc Sets the width of the background (default: Graphics.boxWidth)
 * @default Graphics.boxWidth
 *
 * @param bg1Height
 * @parent bg1
 * @text _Background height
 * @desc Sets the height of the background (default: Graphics.boxHeight)
 * @default Graphics.boxHeight
 *
 * @param bg1X
 * @parent bg1
 * @text _Background X
 * @desc Sets the x of the background (default: 0)
 * @default 0
 *
 * @param bg1Y
 * @parent bg1
 * @text _Background Y
 * @desc Sets the y of the background (default: 0)
 * @default 0
 *
 * @param bg1Rotation
 * @parent bg1
 * @text _Rotation (rad)
 * @desc Sets the rotation of the background in radians (default: 0)
 * @default 0 
 *
 * @param bg1Alpha
 * @parent bg1
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the background (default: 255)
 * @default 255
 *
 * @param bg2
 * @text Background 2
 * @parent bg
 *
 * @param bg2Filename
 * @parent bg2
 * @text Filename
 * @desc Sets the filename of the background. No defaults obviously.
 *
 * @param bg2AlwaysLoaded
 * @parent bg2
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param bg2Width
 * @parent bg2
 * @text _Background width
 * @desc Sets the width of the background (default: 0)
 * @default 0
 *
 * @param bg2Height
 * @parent bg2
 * @text _Background height
 * @desc Sets the height of the background (default: 0)
 * @default 0
 *
 * @param bg2X
 * @parent bg2
 * @text _Background X
 * @desc Sets the x of the background (default: 0)
 * @default 0
 *
 * @param bg2Y
 * @parent bg2
 * @text _Background Y
 * @desc Sets the y of the background (default: 0)
 * @default 0
 *
 * @param bg2Rotation
 * @parent bg2
 * @text _Rotation (rad)
 * @desc Sets the rotation of the background in radians (default: 0)
 * @default 0 
 *
 * @param bg2Alpha
 * @parent bg2
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the background (default: 255)
 * @default 255
 *
 * @param bg3
 * @parent bg
 * @text Background 3
 *
 * @param bg3Filename
 * @parent bg3
 * @text Filename
 * @desc Sets the filename of the background. No defaults obviously.
 *
 * @param bg3AlwaysLoaded
 * @parent bg3
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param bg3Width
 * @parent bg3
 * @text _Background width
 * @desc Sets the width of the background (default: 0)
 * @default 0
 *
 * @param bg3Height
 * @parent bg3
 * @text _Background height
 * @desc Sets the height of the background (default: 0)
 * @default 0
 *
 * @param bg3X
 * @parent bg3
 * @text _Background X
 * @desc Sets the x of the background (default: 0)
 * @default 0
 *
 * @param bg3Y
 * @parent bg3
 * @text _Background Y
 * @desc Sets the y of the background (default: 0)
 * @default 0
 *
 * @param bg3Rotation
 * @parent bg3
 * @text _Rotation (rad)
 * @desc Sets the rotation of the background in radians (default: 0)
 * @default 0 
 *
 * @param bg3Alpha
 * @parent bg3
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the background (default: 255)
 * @default 255
 *
 * @param bg4
 * @parent bg
 * @text Background 4
 *
 * @param bg4Filename
 * @parent bg4
 * @text Filename
 * @desc Sets the filename of the background. No defaults obviously.
 *
 * @param bg4AlwaysLoaded
 * @parent bg4
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param bg4Width
 * @parent bg4
 * @text _Background width
 * @desc Sets the width of the background (default: 0)
 * @default 0
 *
 * @param bg4Height
 * @parent bg4
 * @text _Background height
 * @desc Sets the height of the background (default: 0)
 * @default 0
 *
 * @param bg4X
 * @parent bg4
 * @text _Background X
 * @desc Sets the x of the background (default: 0)
 * @default 0
 *
 * @param bg4Y
 * @parent bg4
 * @text _Background Y
 * @desc Sets the y of the background (default: 0)
 * @default 0
 *
 * @param bg4Rotation
 * @parent bg4
 * @text _Rotation (rad)
 * @desc Sets the rotation of the background in radians (default: 0)
 * @default 0 
 *
 * @param bg4Alpha
 * @parent bg4
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the background (default: 255)
 * @default 255
 *
 * @param bg5
 * @parent bg
 * @text Background 5
 *
 * @param bg5Filename
 * @parent bg5
 * @text Filename
 * @desc Sets the filename of the background. No defaults obviously.
 *
 * @param bg5AlwaysLoaded
 * @parent bg5
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param bg5Width
 * @parent bg5
 * @text _Background width
 * @desc Sets the width of the background (default: 0)
 * @default 0
 *
 * @param bg5Height
 * @parent bg5
 * @text _Background height
 * @desc Sets the height of the background (default: 0)
 * @default 0
 *
 * @param bg5X
 * @parent bg5
 * @text _Background X
 * @desc Sets the x of the background (default: 0)
 * @default 0
 *
 * @param bg5Y
 * @parent bg5
 * @text _Background Y
 * @desc Sets the y of the background (default: 0)
 * @default 0
 *
 * @param bg5Rotation
 * @parent bg5
 * @text _Rotation (rad)
 * @desc Sets the rotation of the background in radians (default: 0)
 * @default 0 
 *
 * @param bg5Alpha
 * @parent bg5
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the background (default: 255)
 * @default 255
 *
 * @param e5
 * @text ----------------
 *
 * @param fg
 * @text Foreground images
 *
 * @param fg1
 * @parent fg
 * @text Foreground 1
 *
 * @param fg1Filename
 * @parent fg1
 * @text Filename
 * @desc Sets the filename of the foreground. No defaults obviously.
 *
 * @param fg1AlwaysLoaded
 * @parent fg1
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default true
 *
 * @param fg1Width
 * @parent fg1
 * @text _Foreground width
 * @desc Sets the width of the foreground (default: Graphics.boxWidth)
 * @default Graphics.boxWidth
 *
 * @param fg1Height
 * @parent fg1
 * @text _Foreground height
 * @desc Sets the height of the foreground (default: Graphics.boxHeight)
 * @default Graphics.boxHeight
 *
 * @param fg1X
 * @parent fg1
 * @text _Foreground X
 * @desc Sets the x of the foreground (default: 0)
 * @default 0
 *
 * @param fg1Y
 * @parent fg1
 * @text _Foreground Y
 * @desc Sets the y of the foreground (default: 0)
 * @default 0
 *
 * @param fg1Rotation
 * @parent fg1
 * @text _Rotation (rad)
 * @desc Sets the rotation of the foreground in radians (default: 0)
 * @default 0 
 *
 * @param fg1Alpha
 * @parent fg1
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the foreground (default: 255)
 * @default 255
 *
 * @param fg2
 * @parent fg
 * @text Foreground 2
 *
 * @param fg2Filename
 * @parent fg2
 * @text Filename
 * @desc Sets the filename of the foreground. No defaults obviously.
 *
 * @param fg2AlwaysLoaded
 * @parent fg2
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param fg2Width
 * @parent fg2
 * @text _Foreground width
 * @desc Sets the width of the foreground (default: 0)
 * @default 0
 *
 * @param fg2Height
 * @parent fg2
 * @text _Foreground height
 * @desc Sets the height of the foreground (default: 0)
 * @default 0
 *
 * @param fg2X
 * @parent fg2
 * @text _Foreground X
 * @desc Sets the x of the foreground (default: 0)
 * @default 0
 *
 * @param fg2Y
 * @parent fg2
 * @text _Foreground Y
 * @desc Sets the y of the foreground (default: 0)
 * @default 0
 *
 * @param fg2Rotation
 * @parent fg2
 * @text _Rotation (rad)
 * @desc Sets the rotation of the foreground in radians (default: 0)
 * @default 0 
 *
 * @param fg2Alpha
 * @parent fg2
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the foreground (default: 255)
 * @default 255
 *
 * @param fg3
 * @parent fg
 * @text Foreground 3
 *
 * @param fg3Filename
 * @parent fg3
 * @text Filename
 * @desc Sets the filename of the foreground. No defaults obviously.
 *
 * @param fg3AlwaysLoaded
 * @parent fg3
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param fg3Width
 * @parent fg3
 * @text _Foreground width
 * @desc Sets the width of the foreground (default: 0)
 * @default 0
 *
 * @param fg3Height
 * @parent fg3
 * @text _Foreground height
 * @desc Sets the height of the foreground (default: 0)
 * @default 0
 *
 * @param fg3X
 * @parent fg3
 * @text _Foreground X
 * @desc Sets the x of the foreground (default: 0)
 * @default 0
 *
 * @param fg3Y
 * @parent fg3
 * @text _Foreground Y
 * @desc Sets the y of the foreground (default: 0)
 * @default 0
 *
 * @param fg3Rotation
 * @parent fg3
 * @text _Rotation (rad)
 * @desc Sets the rotation of the foreground in radians (default: 0)
 * @default 0 
 *
 * @param fg3Alpha
 * @parent fg3
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the foreground (default: 255)
 * @default 255
 *
 * @param fg4
 * @parent fg
 * @text Foreground 4
 *
 * @param fg4Filename
 * @parent fg4
 * @text Filename
 * @desc Sets the filename of the foreground. No defaults obviously.
 *
 * @param fg4AlwaysLoaded
 * @parent fg4
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param fg4Width
 * @parent fg4
 * @text _Foreground width
 * @desc Sets the width of the foreground (default: 0)
 * @default 0
 *
 * @param fg4Height
 * @parent fg4
 * @text _Foreground height
 * @desc Sets the height of the foreground (default: 0)
 * @default 0
 *
 * @param fg4X
 * @parent fg4
 * @text _Foreground X
 * @desc Sets the x of the foreground (default: 0)
 * @default 0
 *
 * @param fg4Y
 * @parent fg4
 * @text _Foreground Y
 * @desc Sets the y of the foreground (default: 0)
 * @default 0
 *
 * @param fg4Rotation
 * @parent fg4
 * @text _Rotation (rad)
 * @desc Sets the rotation of the foreground in radians (default: 0)
 * @default 0 
 *
 * @param fg4Alpha
 * @parent fg4
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the foreground (default: 255)
 * @default 255
 *
 * @param fg5
 * @parent fg
 * @text Foreground 5
 *
 * @param fg5Filename
 * @parent fg5
 * @text Filename
 * @desc Sets the filename of the foreground. No defaults obviously.
 *
 * @param fg5AlwaysLoaded
 * @parent fg5
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param fg5Width
 * @parent fg5
 * @text _Foreground width
 * @desc Sets the width of the foreground (default: 0)
 * @default 0
 *
 * @param fg5Height
 * @parent fg5
 * @text _Foreground height
 * @desc Sets the height of the foreground (default: 0)
 * @default 0
 *
 * @param fg5X
 * @parent fg5
 * @text _Foreground X
 * @desc Sets the x of the foreground (default: 0)
 * @default 0
 *
 * @param fg5Y
 * @parent fg5
 * @text _Foreground Y
 * @desc Sets the y of the foreground (default: 0)
 * @default 0
 *
 * @param fg5Rotation
 * @parent fg5
 * @text _Rotation (rad)
 * @desc Sets the rotation of the foreground in radians (default: 0)
 * @default 0 
 *
 * @param fg5Alpha
 * @parent fg5
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the foreground (default: 255)
 * @default 255
 *
 * @param fg6
 * @parent fg
 * @text Foreground 6
 *
 * @param fg6Filename
 * @parent fg6
 * @text Filename
 * @desc Sets the filename of the foreground. No defaults obviously.
 *
 * @param fg6AlwaysLoaded
 * @parent fg6
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param fg6Width
 * @parent fg6
 * @text _Foreground width
 * @desc Sets the width of the foreground (default: 0)
 * @default 0
 *
 * @param fg6Height
 * @parent fg6
 * @text _Foreground height
 * @desc Sets the height of the foreground (default: 0)
 * @default 0
 *
 * @param fg6X
 * @parent fg6
 * @text _Foreground X
 * @desc Sets the x of the foreground (default: 0)
 * @default 0
 *
 * @param fg6Y
 * @parent fg6
 * @text _Foreground Y
 * @desc Sets the y of the foreground (default: 0)
 * @default 0
 *
 * @param fg6Rotation
 * @parent fg6
 * @text _Rotation (rad)
 * @desc Sets the rotation of the foreground in radians (default: 0)
 * @default 0 
 *
 * @param fg6Alpha
 * @parent fg6
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the foreground (default: 255)
 * @default 255
 *
 * @param fg7
 * @parent fg
 * @text Foreground 7
 *
 * @param fg7Filename
 * @parent fg7
 * @text Filename
 * @desc Sets the filename of the foreground. No defaults obviously.
 *
 * @param fg7AlwaysLoaded
 * @parent fg7
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param fg7Width
 * @parent fg7
 * @text _Foreground width
 * @desc Sets the width of the foreground (default: 0)
 * @default 0
 *
 * @param fg7Height
 * @parent fg7
 * @text _Foreground height
 * @desc Sets the height of the foreground (default: 0)
 * @default 0
 *
 * @param fg7X
 * @parent fg7
 * @text _Foreground X
 * @desc Sets the x of the foreground (default: 0)
 * @default 0
 *
 * @param fg7Y
 * @parent fg7
 * @text _Foreground Y
 * @desc Sets the y of the foreground (default: 0)
 * @default 0
 *
 * @param fg7Rotation
 * @parent fg7
 * @text _Rotation (rad)
 * @desc Sets the rotation of the foreground in radians (default: 0)
 * @default 0 
 *
 * @param fg7Alpha
 * @parent fg7
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the foreground (default: 255)
 * @default 255
 *
 * @param fg8
 * @parent fg
 * @text Foreground 8
 *
 * @param fg8Filename
 * @parent fg8
 * @text Filename
 * @desc Sets the filename of the foreground. No defaults obviously.
 *
 * @param fg8AlwaysLoaded
 * @parent fg8
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param fg8Width
 * @parent fg8
 * @text _Foreground width
 * @desc Sets the width of the foreground (default: 0)
 * @default 0
 *
 * @param fg8Height
 * @parent fg8
 * @text _Foreground height
 * @desc Sets the height of the foreground (default: 0)
 * @default 0
 *
 * @param fg8X
 * @parent fg8
 * @text _Foreground X
 * @desc Sets the x of the foreground (default: 0)
 * @default 0
 *
 * @param fg8Y
 * @parent fg8
 * @text _Foreground Y
 * @desc Sets the y of the foreground (default: 0)
 * @default 0
 *
 * @param fg8Rotation
 * @parent fg8
 * @text _Rotation (rad)
 * @desc Sets the rotation of the foreground in radians (default: 0)
 * @default 0 
 *
 * @param fg8Alpha
 * @parent fg8
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the foreground (default: 255)
 * @default 255
 *
 * @param fg9
 * @parent fg
 * @text Foreground 9
 *
 * @param fg9Filename
 * @parent fg9
 * @text Filename
 * @desc Sets the filename of the foreground. No defaults obviously.
 *
 * @param fg9AlwaysLoaded
 * @parent fg9
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param fg9Width
 * @parent fg9
 * @text _Foreground width
 * @desc Sets the width of the foreground (default: 0)
 * @default 0
 *
 * @param fg9Height
 * @parent fg9
 * @text _Foreground height
 * @desc Sets the height of the foreground (default: 0)
 * @default 0
 *
 * @param fg9X
 * @parent fg9
 * @text _Foreground X
 * @desc Sets the x of the foreground (default: 0)
 * @default 0
 *
 * @param fg9Y
 * @parent fg9
 * @text _Foreground Y
 * @desc Sets the y of the foreground (default: 0)
 * @default 0
 *
 * @param fg9Rotation
 * @parent fg9
 * @text _Rotation (rad)
 * @desc Sets the rotation of the foreground in radians (default: 0)
 * @default 0 
 *
 * @param fg9Alpha
 * @parent fg9
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the foreground (default: 255)
 * @default 255
 *
 * @param fg10
 * @parent fg
 * @text Foreground 10
 *
 * @param fg10Filename
 * @parent fg10
 * @text Filename
 * @desc Sets the filename of the foreground. No defaults obviously.
 *
 * @param fg10AlwaysLoaded
 * @parent fg10
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param fg10Width
 * @parent fg10
 * @text _Foreground width
 * @desc Sets the width of the foreground (default: 0)
 * @default 0
 *
 * @param fg10Height
 * @parent fg10
 * @text _Foreground height
 * @desc Sets the height of the foreground (default: 0)
 * @default 0
 *
 * @param fg10X
 * @parent fg10
 * @text _Foreground X
 * @desc Sets the x of the foreground (default: 0)
 * @default 0
 *
 * @param fg10Y
 * @parent fg10
 * @text _Foreground Y
 * @desc Sets the y of the foreground (default: 0)
 * @default 0
 *
 * @param fg10Rotation
 * @parent fg10
 * @text _Rotation (rad)
 * @desc Sets the rotation of the foreground in radians (default: 0)
 * @default 0 
 *
 * @param fg10Alpha
 * @parent fg10
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the foreground (default: 255)
 * @default 255
 *
 * @param fg11
 * @parent fg
 * @text Foreground 11
 *
 * @param fg11Filename
 * @parent fg11
 * @text Filename
 * @desc Sets the filename of the foreground. No defaults obviously.
 *
 * @param fg11AlwaysLoaded
 * @parent fg11
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param fg11Width
 * @parent fg11
 * @text _Foreground width
 * @desc Sets the width of the foreground (default: 0)
 * @default 0
 *
 * @param fg11Height
 * @parent fg11
 * @text _Foreground height
 * @desc Sets the height of the foreground (default: 0)
 * @default 0
 *
 * @param fg11X
 * @parent fg11
 * @text _Foreground X
 * @desc Sets the x of the foreground (default: 0)
 * @default 0
 *
 * @param fg11Y
 * @parent fg11
 * @text _Foreground Y
 * @desc Sets the y of the foreground (default: 0)
 * @default 0
 *
 * @param fg11Rotation
 * @parent fg11
 * @text _Rotation (rad)
 * @desc Sets the rotation of the foreground in radians (default: 0)
 * @default 0 
 *
 * @param fg11Alpha
 * @parent fg11
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the foreground (default: 255)
 * @default 255
 *
 * @param fg12
 * @parent fg
 * @text Foreground 12
 *
 * @param fg12Filename
 * @parent fg12
 * @text Filename
 * @desc Sets the filename of the foreground. No defaults obviously.
 *
 * @param fg12AlwaysLoaded
 * @parent fg12
 * @text Always loaded
 * @type boolean
 * @desc Decides if this file should always be loaded (reduces lag, increases RAM usage a bit)
 * @default false
 *
 * @param fg12Width
 * @parent fg12
 * @text _Foreground width
 * @desc Sets the width of the foreground (default: 0)
 * @default 0
 *
 * @param fg12Height
 * @parent fg12
 * @text _Foreground height
 * @desc Sets the height of the foreground (default: 0)
 * @default 0
 *
 * @param fg12X
 * @parent fg12
 * @text _Foreground X
 * @desc Sets the x of the foreground (default: 0)
 * @default 0
 *
 * @param fg12Y
 * @parent fg12
 * @text _Foreground Y
 * @desc Sets the y of the foreground (default: 0)
 * @default 0
 *
 * @param fg12Rotation
 * @parent fg12
 * @text _Rotation (rad)
 * @desc Sets the rotation of the foreground in radians (default: 0)
 * @default 0 
 *
 * @param fg12Alpha
 * @parent fg12
 * @text Opacity
 * @type number
 * @desc Sets the opacity of the foreground (default: 255)
 * @default 255
 */

var Imported = Imported || {};
Imported.POR_SaveCore = true;
Imported.YEP_SaveCore = "Not really, but NewGamePlus requires this plugin."

////////////////////////////////////////////////////////////////////////
//PORParams
////////////////////////////////////////////////////////////////////////
PORParameters = PluginManager.parameters("POR_SaveCore");
var PORParams = PORParams || {};
PORParams.saveCore = {};

PORParams.saveCore.newGame = Number(PORParameters.newGame);
PORParams.saveCore.maxSaves = Number(PORParameters.maxSaves);
PORParams.saveCore.savemenuBGMVariable = Number(PORParameters.savemenuBGMVariable);
PORParams.saveCore.recacheImages = Number(PORParameters.recacheImages);
PORParams.saveCore.indexX = PORParameters.indexX;
PORParams.saveCore.indexY = PORParameters.indexY;
PORParams.saveCore.newGamePlusIndex = PORParameters.newGamePlusIndex;
PORParams.saveCore.showSave = eval(PORParameters.showSave);
PORParams.saveCore.emptyId = eval(PORParameters.emptyId);
PORParams.saveCore.slotId = eval(PORParameters.slotId);
PORParams.saveCore.emptySaveName = PORParameters.emptySaveName;
PORParams.saveCore.newGameText = PORParameters.newGameText;
PORParams.saveCore.saveGameText = PORParameters.saveGameText;
PORParams.saveCore.loadGameText = PORParameters.loadGameText;
PORParams.saveCore.newGamePlusText = PORParameters.newGamePlusText;
PORParams.saveCore.deleteGameText = PORParameters.deleteGameText;
PORParams.saveCore.backText = PORParameters.backText;
PORParams.saveCore.partyShow = Number(PORParameters.partyShow);
PORParams.saveCore.partyMembers = Number(PORParameters.partyMembers);
PORParams.saveCore.partyScale = Number(PORParameters.partyScale);
PORParams.saveCore.partyX = PORParameters.partyX;
PORParams.saveCore.partyY = PORParameters.partyY;
PORParams.saveCore.partySpread = PORParameters.partySpread;
PORParams.saveCore.partyHorz = eval(PORParameters.partyHorz);
PORParams.saveCore.partyEquips = PORParameters.partyEquips;
PORParams.saveCore.peRows = Number(PORParameters.peRows);
PORParams.saveCore.pePadding = Number(PORParameters.pePadding);
PORParams.saveCore.peX = PORParameters.peX;
PORParams.saveCore.peY = PORParameters.peY;
PORParams.saveCore.peText = PORParameters.peText;
PORParams.saveCore.peTextX = PORParameters.peTextX;
PORParams.saveCore.peTextY = PORParameters.peTextY;
PORParams.saveCore.leaderName = eval(PORParameters.leaderName);
PORParams.saveCore.lnX = PORParameters.lnX;
PORParams.saveCore.lnY = PORParameters.lnY;
PORParams.saveCore.lnDesc = PORParameters.lnDesc;
PORParams.saveCore.lnDescX = PORParameters.lnDescX;
PORParams.saveCore.lnDescY = PORParameters.lnDescY;
PORParams.saveCore.playTime = eval(PORParameters.playTime);
PORParams.saveCore.playTimeX = PORParameters.playTimeX;
PORParams.saveCore.playTimeY = PORParameters.playTimeY;
PORParams.saveCore.titleBGM = PORParameters.titleBGM;
PORParams.saveCore.titleBGMPan = Number(PORParameters.titleBGMPan);
PORParams.saveCore.titleBGMPitch = Number(PORParameters.titleBGMPitch);
PORParams.saveCore.titleBGMVolume = Number(PORParameters.titleBGMVolume);
PORParams.saveCore.swWidth = PORParameters.swWidth;
PORParams.saveCore.swHeight = PORParameters.swHeight;
PORParams.saveCore.swX = PORParameters.swX;
PORParams.saveCore.swY = PORParameters.swY;
PORParams.saveCore.swAlpha = Number(PORParameters.swAlpha);
PORParams.saveCore.swRows = Number(PORParameters.swRows);
PORParams.saveCore.swTopRow = Number(PORParameters.swTopRow);
PORParams.saveCore.swBottomRow = Number(PORParameters.swBottomRow);
PORParams.saveCore.swBlinking = eval(PORParameters.swBlinking);
PORParams.saveCore.owWidth = PORParameters.owWidth;
PORParams.saveCore.owX = PORParameters.owX;
PORParams.saveCore.owY = PORParameters.owY;
PORParams.saveCore.owAlpha = Number(PORParameters.owAlpha);
PORParams.saveCore.owBlinking = eval(PORParameters.owBlinking);
PORParams.saveCore.ngwWidth = PORParameters.ngwWidth;
PORParams.saveCore.ngwX = PORParameters.ngwX;
PORParams.saveCore.ngwY = PORParameters.ngwY;
PORParams.saveCore.ngwAlpha = Number(PORParameters.ngwAlpha);
PORParams.saveCore.ngwBlinking = eval(PORParameters.ngwBlinking);
PORParams.saveCore.customSaveData = [[[],[]], [[], []]];
for (var i = 1; i < 999999999; i++) {
    if (typeof PORParameters["ct" + i] == "undefined") break;
    if (PORParameters["ct" + i + "Desc"]) {
        PORParams.saveCore.customSaveData[0][0].push(PORParameters["ct" + i + "Desc"]);
    };
    var text = [PORParameters["ct" + i + "DescX"] || 0, PORParameters["ct" + i + "DescY"] ||0, PORParameters["ct" + i + "DescAc"] || false];
    PORParams.saveCore.customSaveData[0][1].push(text);
    // Necessary to separate data from X and Y to prevent crashes in case someone deletes their custom text
    if (PORParameters["ct" + i]) {
        PORParams.saveCore.customSaveData[1][0].push (PORParameters["ct" + i]);
    };
    var text = [PORParameters["ct" + i + "X"] || 0, PORParameters["ct" + i + "Y"] || 0, PORParameters["ct" + i + "ac"] || false];
    PORParams.saveCore.customSaveData[1][1].push(text);
};
PORParams.saveCore.bgs = [];
for (var i = 1; i < 999999999; i++) {
    if (typeof PORParameters["bg" + i] == "undefined") break;
    if (PORParameters["bg" + i + "Filename"]) {
        var bg = {};
        bg.Filename = PORParameters["bg" + i + "Filename"];
        bg.alwaysLoaded = eval(PORParameters["bg" + i + "AlwaysLoaded"]);
        bg.width = PORParameters["bg" + i + "Width"];
        bg.height = PORParameters["bg" + i + "Height"];
        bg.x = PORParameters["bg" + i + "X"];
        bg.y = PORParameters["bg" + i + "Y"];
        bg.rotation = PORParameters["bg" + i + "Rotation"];
        bg.alpha = Number(PORParameters["bg" + i + "Alpha"]) / 255;
        PORParams.saveCore.bgs.push(bg);
    }; 
};
PORParams.saveCore.fgs = [];
for (var i = 1; i < 999999999; i++) {
    if (typeof PORParameters["fg" + i] == "undefined") break;
    if (PORParameters["fg" + i + "Filename"]) {
        var fg = {};
        fg.Filename = PORParameters["fg" + i + "Filename"];
        fg.alwaysLoaded = eval(PORParameters["fg" + i + "AlwaysLoaded"]);
        fg.width = PORParameters["fg" + i + "Width"];
        fg.height = PORParameters["fg" + i + "Height"];
        fg.x = PORParameters["fg" + i + "X"];
        fg.y = PORParameters["fg" + i + "Y"];
        fg.rotation = PORParameters["fg" + i + "Rotation"];
        fg.alpha = Number(PORParameters["fg" + i + "Alpha"]) / 255;
        PORParams.saveCore.fgs.push(fg);
    }; 
};


////////////////////////////////////////////////////////////////////////
//DataManager
////////////////////////////////////////////////////////////////////////
//Adding extra information to the savefiles
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
    return info;
};


////////////////////////////////////////////////////////////////////////
//Game_Party
////////////////////////////////////////////////////////////////////////
//Responsible for adding extra information to savefiles
Game_Party.prototype.partyEquipsForSavefile = function () {
    var temp = [];
    for (var i = 0; i <= eval(PORParams.saveCore.partyEquips); i++) {
        if (!$gameParty.battleMembers()[i]) return temp;
        temp[i] = [];
        for (var j in $gameParty.battleMembers()[i].equips()) {
            if ($gameParty.battleMembers()[i].equips()[j]) temp[i].push($gameParty.battleMembers()[i].equips()[j].iconIndex);
        };
    };
    return temp;
};

Game_Party.prototype.customSavefileData = function() {
    //temp[0] = evaled data that the player wants to save.
    //temp[1] = evaled conditions for the data, to see if it can or can't be shown on the savefile
    //temp[2] = evaled conditions for the descriptors, to see if it can or can't be shown on the savefile
    var temp = [[], [], []];
    var por = PORParams.saveCore.customSaveData;
    if (!por[1][0].length) return null;
    for (var i in por[1][0]) {
        temp[0].push(eval(por[1][0][i]));
       	temp[1].push(eval(por[1][1][i][2]) || false);
    };
    for (var i in por[0][0]) {
        temp[2].push(eval(por[0][0][i][2]) || false);
    };
    return temp; 
};


////////////////////////////////////////////////////////////////////////
//Game_System
////////////////////////////////////////////////////////////////////////
//Upgraded so it doesn't crash upon creating the first autosave upon pressing the new game button.
//One would say that the function could be much simpler. Theoretically it could, but in practice I
//still experienced crashes, so I kept it like this. Under normal conditions though the if condition
//is not necessary and you can just use the else handler normally.
Game_System.prototype.onBeforeSave = function() {
    this._saveCount++;
    this._versionId = $dataSystem.versionId;
    this._framesOnSave = Graphics.frameCount;
    if (SceneManager._firstAutoSaveId) {
        this._bgmOnSave = $dataMap.bgm;
        this._bgsOnSave = $dataMap.bgs;
    }else {
        this._bgmOnSave = SceneManager._scene._savedBgm ? SceneManager._scene._savedBgm : AudioManager.saveBgm();
        this._bgsOnSave = SceneManager._scene._savedBgs ? SceneManager._scene._savedBgs : AudioManager.saveBgs();
    };
};





////////////////////////////////////////////////////////////////////////
//Game_Interpreter
////////////////////////////////////////////////////////////////////////
//plugin command caretaker
POR_SaveCore_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    POR_SaveCore_pluginCommand.call(this, command, args);
    if (command === "setsavebgm") $gameVariables.setValue(PORParams.saveCore.savemenuBGMVariable, {name: args[0], pan: (Number(args[1]) ? args[1] : 0), pitch: (Number(args[2]) ? args[2] : 100), volume: (Number(args[3]) ? args[3] : 90)});
    if (command === "clearsavebgm") $gameVariables.setValue(PORParams.saveCore.savemenuBGMVariable, 0);
};


////////////////////////////////////////////////////////////////////////
//Scene_Map
////////////////////////////////////////////////////////////////////////
//Function upgraded with a responsibility upon pressing New game via load.
Scene_Map.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    if (this._transfer) {
        this.fadeInForTransfer();
        this._mapNameWindow.open();
        $gameMap.autoplay();
    } else if (this.needsFadeIn()) {
        this.startFadeIn(this.fadeSpeed(), false);
    }
    this.menuCalling = false;
    if (SceneManager._firstAutoSaveId) {
        $gameSystem.onBeforeSave();
        DataManager.saveGame (SceneManager._firstAutoSaveId);
        SceneManager._firstAutoSaveId = undefined;
    };
};

//Responsible for recaching pictures. Slows down the performance slightly, but unless you overload the 
//game with pictures, it should be no big deal (more frequent, but minor (to 54 fps at most) frame drops
//on a quad-core 1.6GHz cpu - a 3 GHz cpu will not feel it at all)
POR_SaveCore_SMUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    POR_SaveCore_SMUpdate.call(this);
    this.recacheMenuTextures();
};

Scene_Map.prototype.recacheMenuTextures = function () {
    var por = PORParams.saveCore;
    if (this._menuImageChecker >= por.recacheImages) {
        this._menuImageChecker = 0;
        if (!Decrypter.hasEncryptedImages) {
	        for (var i in por.bgs) if (por.bgs[i].alwaysLoaded) var tex = PIXI.Texture.fromImage("img/pictures/" + PORParams.saveCore.bgs[i].Filename + ".png");
    	    for (var i in por.fgs) if (por.fgs[i].alwaysLoaded) var tex = PIXI.Texture.fromImage("img/pictures/" + PORParams.saveCore.fgs[i].Filename + ".png");
    	}else {
    		for (var i in por.bgs) if (por.bgs[i].alwaysLoaded) var tex = Bitmap.load("img/pictures/" + PORParams.saveCore.bgs[i].Filename + ".rpgmvp");
    		for (var i in por.fgs) if (por.fgs[i].alwaysLoaded) var tex = Bitmap.load("img/pictures/" + PORParams.saveCore.fgs[i].Filename + ".rpgmvp");
    	}
    }else {
        this._menuImageChecker ? this._menuImageChecker++ : this._menuImageChecker = 1;
    };
};

////////////////////////////////////////////////////////////////////////
//Scene_File
////////////////////////////////////////////////////////////////////////
//Scene responsible for saving and loading. Normally Scene_File serves as a base for individual scene_Save and load,
//but since in this case they both do the same, I unified them under Scene_File. 
Scene_File.prototype.initialize = function() {  
    Scene_MenuBase.prototype.initialize.call(this);
    if (SceneManager._stack[0] != Scene_Map && PORParams.saveCore.titleBGM.toLowerCase() != "Native".toLowerCase()) {
        var st = {
            name: PORParams.saveCore.titleBGM,
            pan: PORParams.saveCore.titleBGMPan,
            pitch: PORParams.saveCore.titleBGMPitch,
            volume: PORParams.saveCore.titleBGMVolume
        };
        AudioManager.playBgm (st);
    };
    if (SceneManager._stack[0] == Scene_Map && $gameSystem._saveMenuBgm) {
        this._savedBgm = AudioManager.saveBgm();
        this._savedBgs = AudioManager.saveBgs();
        AudioManager.playBgm ($gameSystem._saveMenuBgm);
    };
};

Scene_File.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    DataManager.loadAllSavefileImages();
    this.createListWindow();
    this.createOptionsWindow();
    this.createNewgameWindow();
    if (PORParams.saveCore.bgs.length) this.createBackgroundImages();
    if (PORParams.saveCore.fgs.length) this.createForegroundImages();
};

//Creating images via PIXI, because it's significantly faster than default Javascript loading.
Scene_File.prototype.createBackgroundImages = function () {
	if (!Decrypter.hasEncryptedImages) this._backgroundBase = PIXI.Sprite.fromImage ("img/pictures/" + PORParams.saveCore.bgs[0].Filename + ".png");
    else this._backgroundBase = new Sprite (Bitmap.load("img/pictures/" + PORParams.saveCore.bgs[0].Filename + ".rpgmvp"));
    if (eval(PORParams.saveCore.bgs[0].width) !== 0) this._backgroundBase.width = eval(PORParams.saveCore.bgs[0].width);
    if (eval(PORParams.saveCore.bgs[0].height) !== 0) this._backgroundBase.height = eval(PORParams.saveCore.bgs[0].height);
    if (eval(PORParams.saveCore.bgs[0].x) !== 0) this._backgroundBase.x = eval(PORParams.saveCore.bgs[0].x);
    if (eval(PORParams.saveCore.bgs[0].y) !== 0) this._backgroundBase.y = eval(PORParams.saveCore.bgs[0].y);
    if (eval(PORParams.saveCore.bgs[0].rotation) !== 0) this._backgroundBase.rotation = eval(PORParams.saveCore.bgs[0].rotation);
    this._backgroundBase.alpha = PORParams.saveCore.bgs[0].alpha;
    this._backgroundSprite.addChild(this._backgroundBase)
    if (!PORParams.saveCore.bgs[1]) return;
    for (var i = 1; i < PORParams.saveCore.bgs.length; i++) {
        if (!Decrypter.hasEncryptedImages) var img = PIXI.Sprite.fromImage ("img/pictures/" + PORParams.saveCore.bgs[i].Filename + ".png");
        else var img = new Sprite (Bitmap.load("img/pictures/" + PORParams.saveCore.bgs[i].Filename + ".rpgmvp"));
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
    if (!Decrypter.hasEncryptedImages) this._foregroundBase = PIXI.Sprite.fromImage ("img/pictures/" + PORParams.saveCore.fgs[0].Filename + ".png");
    else this._foregroundBase = new Sprite (Bitmap.load("img/pictures/" + PORParams.saveCore.fgs[0].Filename + ".rpgmvp"));
    if (eval(PORParams.saveCore.fgs[0].width) !== 0) this._foregroundBase.width = eval(PORParams.saveCore.fgs[0].width);
    if (eval(PORParams.saveCore.fgs[0].height) !== 0) this._foregroundBase.height = eval(PORParams.saveCore.fgs[0].height);
    if (eval(PORParams.saveCore.fgs[0].x) !== 0) this._foregroundBase.x = eval(PORParams.saveCore.fgs[0].x);
    if (eval(PORParams.saveCore.fgs[0].y) !== 0) this._foregroundBase.y = eval(PORParams.saveCore.fgs[0].y);
    if (eval(PORParams.saveCore.fgs[0].rotation) !== 0) this._foregroundBase.rotation = eval(PORParams.saveCore.fgs[0].rotation);
    this._foregroundBase.alpha = PORParams.saveCore.fgs[0].alpha;
    this.addChild(this._foregroundBase)
    if (!PORParams.saveCore.fgs[1]) return;
    for (var i = 1; i < PORParams.saveCore.fgs.length; i++) {
        if (!Decrypter.hasEncryptedImages) var img = PIXI.Sprite.fromImage ("img/pictures/" + PORParams.saveCore.fgs[i].Filename + ".png");
        else var img = new Sprite (Bitmap.load("img/pictures/" + PORParams.saveCore.fgs[i].Filename + ".rpgmvp"));
        if (eval(PORParams.saveCore.fgs[i].width) !== 0) img.width = eval(PORParams.saveCore.fgs[i].width);
        if (eval(PORParams.saveCore.fgs[i].height) !== 0) img.height = eval(PORParams.saveCore.fgs[i].height);
        if (eval(PORParams.saveCore.fgs[i].x) !== 0) img.x = eval(PORParams.saveCore.fgs[i].x);
        if (eval(PORParams.saveCore.fgs[i].y) !== 0) img.y = eval(PORParams.saveCore.fgs[i].y);
        if (eval(PORParams.saveCore.fgs[i].rotation) !== 0) img.rotation = eval(PORParams.saveCore.fgs[i].rotation);
        img.alpha = Number(PORParams.fgs[0].alpha);
        this._foregroundBase.addChild(img);
    };
};


Scene_File.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._listWindow.refresh();
};

Scene_File.prototype.savefileId = function() {
    return this._listWindow.index() + 1;
};

Scene_File.prototype.createListWindow = function() {
    var x = eval(PORParams.saveCore.swX);
    var y = eval(PORParams.saveCore.swY);
    var width = eval(PORParams.saveCore.swWidth);
    var height = eval(PORParams.saveCore.swHeight);
    this._listWindow = new Window_SavefileList(x, y, width, height);
    this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
    this._listWindow.setHandler('cancel', this.popScene.bind(this));
    this._listWindow.select(this.firstSavefileIndex());
    this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
    this._listWindow.refresh();
    this.addWindow(this._listWindow);
};

Scene_File.prototype.createOptionsWindow = function () {
    var width = eval(PORParams.saveCore.owWidth);
    var showSave = PORParams.saveCore.showSave;
    this._optionsWindow = new Window_SavefileOptions (0, 0, width);
    this._optionsWindow.x = eval(PORParams.saveCore.owX);
    this._optionsWindow.y = eval(PORParams.saveCore.owY);
    if (SceneManager._stack[0] == Scene_Map) this._optionsWindow.setHandler ('save', this.onSave.bind (this));
    this._optionsWindow.setHandler ('load', this.onOptionLoad.bind (this));
    this._optionsWindow.setHandler ('newGamePlus', this.onOptionLoad.bind(this));
    this._optionsWindow.setHandler ('delete', this.onOptionDelete.bind (this));
    this._optionsWindow.setHandler ('newGame', this.onNewgame.bind (this));
    this._optionsWindow.setHandler ('back', this.activateListWindow.bind (this));
    this._optionsWindow.setHandler ('cancel', this.onCancel.bind (this));
    this._optionsWindow.setTopRow(0);
    this._optionsWindow.refresh();
    this.addWindow(this._optionsWindow);
};


Scene_File.prototype.createNewgameWindow = function () {
    var width = eval(PORParams.saveCore.ngwWidth);
    var showSave = PORParams.saveCore.showSave;
    this._newgameWindow = new Window_NewgameOptions (0, 0, width);
    this._newgameWindow.x = eval(PORParams.saveCore.ngwX);
    this._newgameWindow.y = eval(PORParams.saveCore.ngwY);
    if (SceneManager._stack[0] == Scene_Map) this._newgameWindow.setHandler ('save', this.onSave.bind(this));
    this._newgameWindow.setHandler ('newGame', this.onNewgame.bind(this));
    this._newgameWindow.setHandler ('back', this.activateListWindow.bind(this));
    this._newgameWindow.setHandler ('cancel', this.onCancel.bind(this));
    this._newgameWindow.setTopRow (0);
    this._newgameWindow.refresh();
    this.addWindow(this._newgameWindow);
};

Scene_File.prototype.activateListWindow = function() {
    this._optionsWindow.close();
    this._optionsWindow.deactivate();
    if (this._newgameWindow) {
        this._newgameWindow.close();
        this._newgameWindow.deactivate();
    };
    this._listWindow.refresh();
    this._listWindow.activate();
};

Scene_File.prototype.activateOptionsWindow = function () {
    this._listWindow.deactivate();
    this._optionsWindow.activate();
    this._optionsWindow.select(0);
    this._optionsWindow.setTopRow(0);
    this._optionsWindow.open();
    this._optionsWindow.refresh();
};

Scene_File.prototype.activateNewgameWindow = function () {
    this._listWindow.deactivate();
    this._newgameWindow.activate();
    this._newgameWindow.select(0);
    this._newgameWindow.setTopRow(0);
    this._newgameWindow.open();
    this._newgameWindow.refresh();
};

Scene_File.prototype.firstSavefileIndex = function() {
    return 0;
};

Scene_File.prototype.onSavefileOk = function() {
    if (PORParams.saveCore.newGame || SceneManager._stack[0] == Scene_Map) {
        DataManager.isThisGameFile(this.savefileId()) ? this.activateOptionsWindow() : this.activateNewgameWindow();
    }else {
        if (DataManager.isThisGameFile(this.savefileId())) {
            this.activateOptionsWindow();
        }else {
            SoundManager.playBuzzer();
            this._listWindow.activate();
        };
    };
};

Scene_File.prototype.onSave = function () {
    $gameSystem.onBeforeSave();
    if (DataManager.saveGame(this.savefileId())) {
        StorageManager.cleanBackup(this.savefileId());
    } else {
        SoundManager.playBuzzer();
    }
    this.activateListWindow();
};

Scene_File.prototype.onOptionLoad = function () {
	var id = this.savefileId();
    if (DataManager.loadGame(id)) {
    	if (DataManager.loadSavefileInfo(id).newGamePlus) {
    		try {
    			this.startNewGamePlus();
    		}catch (e){
    			throw new Error("Yanfly's New game+ not present.")
    		};
    	}else {
    		SceneManager._scene.fadeOutAll();
	        if ($gameSystem.versionId() !== $dataSystem.versionId) {
	            $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
	            $gamePlayer.requestMapReload();
	        }
	        SceneManager.goto(Scene_Map);
	        $gameSystem.onAfterLoad();
    	}
    } else {
        this.onLoadFailure();
    }
};

Scene_File.prototype.onOptionDelete = function () {
    StorageManager.remove(this.savefileId());
    SoundManager.playOk();
    this.activateListWindow();
};

Scene_File.prototype.onNewgame = function () {
    DataManager.setupNewGame();
    this._listWindow.close();
    this._optionsWindow.close();
    if (this._newgameWindow) this._newgameWindow.close();
    this.fadeOutAll();
    SceneManager._firstAutoSaveId = this.savefileId();
    SceneManager.goto(Scene_Map);
};

Scene_File.prototype.onCancel = function () {
    SoundManager.playCancel();
    this.activateListWindow();
};

Scene_File.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);
};

Scene_File.prototype.terminate = function () {
    Scene_MenuBase.prototype.terminate.call(this);
    if (this._savedBgm) AudioManager.playBgm (this._savedBgm);
    if (this._savedBgs) AudioManager.playBgs (this._savedBgs);
};


////////////////////////////////////////////////////////////////////////
//Window_SavefileList
////////////////////////////////////////////////////////////////////////
//The list window handling saving and loading
function Window_SavefileList() {
    this.initialize.apply(this, arguments);
}

Window_SavefileList.prototype = Object.create(Window_Selectable.prototype);
Window_SavefileList.prototype.constructor = Window_SavefileList;

Window_SavefileList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.activate();
    this.opacity = PORParams.saveCore.swAlpha;
};


Window_SavefileList.prototype.maxItems = function() {
    return PORParams.saveCore.maxSaves;
};

Window_SavefileList.prototype.maxVisibleItems = function() {
    return PORParams.saveCore.swRows;
};

Window_SavefileList.prototype.itemHeight = function() {
    var innerHeight = this.height - this.padding * 2;
    return Math.floor(innerHeight / this.maxVisibleItems());
};

Window_SavefileList.prototype.drawItem = function(index) {
    var id = index + 1;
    var valid = DataManager.isThisGameFile(id);
    var info = DataManager.loadSavefileInfo(id);
    var rect = this.itemRectForText(index);
    if (!eval(PORParams.saveCore.partySpread)) {
        if (PORParams.saveCore.partyHorz) PORParams.saveCore.partySpread = Math.round (rect.width / PORParams.saveCore.partyMembers);
        else PORParams.saveCore.partySpread = Math.round (rect.height / PORParams.saveCore.partyMembers);
    }else {
    	PORParams.saveCore.partySpread = Math.round(eval(PORParams.saveCore.partySpread));
    };
    this.resetTextColor();
    this.drawFileId(id, rect.x + eval(PORParams.saveCore.indexX), rect.y + eval(PORParams.saveCore.indexY), valid);
    if (info) {
        this.drawContents(info, rect, valid);
        this.changePaintOpacity(true);
    }
    if (PORParams.saveCore.partyShow == 2) this.drawPartyFaces(info, rect, index - this.topIndex());
};

Window_SavefileList.prototype.drawFileId = function(id, x, y, valid) {
    if (valid) {
        if (!DataManager.loadSavefileInfo(id).newGamePlus) this.drawText(TextManager.file + (PORParams.saveCore.slotId ? id : ""), x, y, 180);
    	else this.drawText(PORParams.saveCore.newGamePlusIndex + (PORParams.saveCore.slotId ? id : ""), x, y, 180);
    }else {
        this.drawText (PORParams.saveCore.emptySaveName + (PORParams.saveCore.emptyId ? id : ""), x, y, 180);
    }
};

Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
    if (valid) {
        if (PORParams.saveCore.partyShow == 1) this.drawPartyCharacters (info, rect);
        if (PORParams.saveCore.playTime) this.drawPlaytime(info, rect.x + eval(PORParams.saveCore.playTimeX), rect.y + eval(PORParams.saveCore.playTimeY));
        if (PORParams.saveCore.partyEquips) this.drawPartyEquips (info, rect.x + eval(PORParams.saveCore.peX), rect.y + eval(PORParams.saveCore.peY));
        if (PORParams.saveCore.leaderName) this.drawLeaderName (info, rect.x + eval(PORParams.saveCore.lnX), rect.y + eval(PORParams.saveCore.lnY));
        this.drawCustomTexts(info, rect);
        this.drawDescriptionTexts(info, rect);
    };
};

Window_SavefileList.prototype.drawPartyCharacters = function(info, rect) {
    if (info.characters) {
        for (var i = 0; i < info.characters.length; i++) {
        	if (i >= PORParams.saveCore.partyMembers) break;
            var data = info.characters[i];
            if (PORParams.saveCore.partyHorz) {
                var x = this.padding + eval(PORParams.saveCore.partyX) + (PORParams.saveCore.partySpread * i);
                var y = rect.y + 48 + eval(PORParams.saveCore.partyY);
            }else {
                var x = this.padding + eval(PORParams.saveCore.partyX);
                var y = rect.y + 48 + eval(PORParams.saveCore.partyY) + (PORParams.saveCore.partySpread * i);
            }
            this.drawCharacter(data[0], data[1], x, y);
        }
    }
};

Window_SavefileList.prototype.drawPartyFaces = function(info, rect, index) {
    if (!this._faceSprites) {
        this._faceSprites = [];
        for (var i = 0; i < PORParams.saveCore.swRows; i++) {
            this._faceSprites[i] = [];
            for (var j = 0; j < PORParams.saveCore.partyMembers; j++) {
                var spr = new Sprite ();
                if (PORParams.saveCore.partyHorz) {
                    spr.x = this.padding + eval(PORParams.saveCore.partyX) + (PORParams.saveCore.partySpread * j);
                    spr.y = this.padding + eval(PORParams.saveCore.partyY) + rect.height * i;
                }else{
                    spr.x = this.padding + eval(PORParams.saveCore.partyX)
                    spr.y = this.padding + eval(PORParams.saveCore.partyY) + (PORParams.saveCore.partySpread * j) + rect.height * i ;
                }
                spr.scale.set(PORParams.saveCore.partyScale);
                this._faceSprites[i].push (spr);
                this.addChild(spr);
            }
        }
    };
    if (!info) {
        this.clearFaces(index);
    }else if (info.faces) {
        for (var i = 0; i < info.faces.length; i++) {
        	if (i >= PORParams.saveCore.partyMembers) break;
            var data = info.faces[i];
            this.drawFace(index, i, data[0], data[1]);            
        }
    }
};

Window_SavefileList.prototype.clearFaces = function (index) {
    for (var i in this._faceSprites[index]) this._faceSprites[index][i].renderable = false;
};

Window_SavefileList.prototype.drawFace = function(saveSlotIndex, i, faceName, faceIndex) {
	if (!Decrypter.hasEncryptedImages) {
		var bitmap = PIXI.Texture.fromImage ("img/faces/" + faceName + ".png");
	    this._faceSprites[saveSlotIndex][i].texture = new PIXI.Texture (bitmap, new Rectangle(144 * (faceIndex % 4), 144 * Math.floor(faceIndex / 4), 144, 144))
	    this._faceSprites[saveSlotIndex][i].renderable = true;
	}else {
		//Necessary to handle it like this due to MV encryption loading
		var bitmap = Bitmap.load("img/faces/" + faceName + ".rpgmvp");
		this._faceSprites[saveSlotIndex][i]._bitmap = bitmap;
		this._faceSprites[saveSlotIndex][i]._texture.baseTexture = this._faceSprites[saveSlotIndex][i]._bitmap._baseTexture;
		this._faceSprites[saveSlotIndex][i].setFrame(new Rectangle(144 * (faceIndex % 4), 144 * Math.floor(faceIndex / 4), 144, 144))
		this._faceSprites[saveSlotIndex][i].renderable = true;
	}
};

Window_SavefileList.prototype.drawPlaytime = function(info, x, y) {
    if (info.playtime) {
        this.drawText(info.playtime, x, y);
    };
};

Window_SavefileList.prototype.drawLeaderName = function (info, x, y) {
    if (info.leaderName) {
        this.drawText(info.leaderName, x, y);
    };
};

Window_SavefileList.prototype.drawPartyEquips = function (info, x, y) {
    if (info.partyEquips) {
        for (var i in info.partyEquips) {
            for (var j in info.partyEquips[i]) {
                var ix = x + (Math.floor(j / PORParams.saveCore.peRows) * 32 + PORParams.saveCore.pePadding);
                var iy = y + (Math.floor(j % PORParams.saveCore.peRows) * 32 + PORParams.saveCore.pePadding);
                if (PORParams.saveCore.partyHorz) ix += PORParams.saveCore.partySpread * i;
                else iy += PORParams.saveCore.partySpread * i;
                this.drawIcon(info.partyEquips[i][j], ix, iy);
            };
        };
    };
};

Window_SavefileList.prototype.drawCustomTexts = function (info, rect) {
    if (info.customSaveData) {
        var por = PORParams.saveCore.customSaveData[1];
        for (var i in info.customSaveData[0]) if (info.customSaveData[1][i]) this.drawTextEx(info.customSaveData[0][i], rect.x + eval(por[1][i][0]), rect.y + eval(por[1][i][1]));
    };
};

Window_SavefileList.prototype.drawDescriptionTexts = function(info, rect) {
    this.drawTextEx(PORParams.saveCore.lnDesc, rect.x + eval(PORParams.saveCore.lnDescX), rect.y + eval(PORParams.saveCore.lnDescY));
    this.drawTextEx(PORParams.saveCore.peText, rect.x + eval(PORParams.saveCore.peTextX), rect.y + eval(PORParams.saveCore.peTextY));
    if (info.customSaveData) {
        var por = PORParams.saveCore.customSaveData[0];
        for (var i in por) if (info.customSaveData[2][i]) this.drawTextEx(por[0][i], rect.x + eval(por[1][i][0]), rect.y + eval(por[1][i][1]));
    }
};

Window_SavefileList.prototype.ensureCursorVisible = function() {
    var row = this.row();
    if (row - PORParams.saveCore.swTopRow < this.topRow()) {
        this.setTopRow(row - PORParams.saveCore.swTopRow);
    } else if (row + PORParams.saveCore.swBottomRow > this.bottomRow()) {
        this.setBottomRow(row + PORParams.saveCore.swBottomRow);
    }
};

Window_SavefileList.prototype.onTouch = function(triggered) {
    var lastIndex = this.index();
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    var hitIndex = this.hitTest(x, y);
    if (hitIndex >= 0) {
        if (hitIndex === this.index()) {
            if (triggered && this.isTouchOkEnabled()) {
                this.processOk();
            }
        } else if (this.isCursorMovable() && this._stayCount >= 10) {
        	if (y < this.padding) {
            	this.cursorUp();
        	} else if (y >= this.height - this.padding) {
            	this.cursorDown();
        	}else {
        		 this.select(hitIndex);
        	}
        }
    }
    if (this.index() !== lastIndex) {
        SoundManager.playCursor();
    }
};

Window_SavefileList.prototype.convertEscapeCharacters = function(text) {
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    text = text.replace(/<n>/g, '\n');
    return text;
};

Window_SavefileList.prototype.isCursorVisible = function() {
	if (!PORParams.saveCore.swBlinking) return false;
    var row = this.row();
    return row >= this.topRow() && row <= this.bottomRow();
};

////////////////////////////////////////////////////////////////////////
//Window_SavefileOptions
////////////////////////////////////////////////////////////////////////
//The window that shows up when you click Ok on a valid savefile
function Window_SavefileOptions() {
    this.initialize.apply(this, arguments);
}

Window_SavefileOptions.prototype = Object.create(Window_Command.prototype);
Window_SavefileOptions.prototype.constructor = Window_SavefileOptions;

Window_SavefileOptions.prototype.initialize = function(x, y, width, height) {
    Window_Command.prototype.initialize.call(this, x, y, width, height);
    this.openness = 0;
    this.opacity = PORParams.saveCore.owAlpha;
};

Window_SavefileOptions.prototype.makeCommandList = function () {
    if (SceneManager._stack[0] == Scene_Map && PORParams.saveCore.showSave) this.addCommand (PORParams.saveCore.saveGameText, 'save', $gameSystem.isSaveEnabled());
    var id = SceneManager._scene.savefileId();
    var info = DataManager.loadSavefileInfo(id);
    if (info) {
    	if (!info.newGamePlus) this.addCommand (PORParams.saveCore.loadGameText, 'load');
    	else this.addCommand (PORParams.saveCore.newGamePlusText, 'newGamePlus');
    };
    this.addCommand (PORParams.saveCore.deleteGameText, 'delete');
    if (PORParams.saveCore.newGame == 2) this.addCommand (PORParams.saveCore.newGameText, 'newGame');
    this.addCommand (PORParams.saveCore.backText, 'back');
};

Window_SavefileOptions.prototype.isCursorVisible = function() {
	if (!PORParams.saveCore.owBlinking) return false;
    var row = this.row();
    return row >= this.topRow() && row <= this.bottomRow();
};


////////////////////////////////////////////////////////////////////////
//Window_NewgameOptions
////////////////////////////////////////////////////////////////////////
//The window that shows up when you click on an empty slot. 
function Window_NewgameOptions () {
    this.initialize.apply(this, arguments);
};

Window_NewgameOptions.prototype = Object.create(Window_Command.prototype);
Window_NewgameOptions.prototype.constructor = Window_NewgameOptions;

Window_NewgameOptions.prototype.initialize = function(x, y, width, height) {
    Window_Command.prototype.initialize.call(this, x, y, width, height);
    this.openness = 0;
    this.opacity = PORParams.saveCore.ngwAlpha
};

Window_NewgameOptions.prototype.makeCommandList = function () {
    if (SceneManager._stack[0] == Scene_Map && PORParams.saveCore.showSave) this.addCommand (PORParams.saveCore.saveGameText, 'save', $gameSystem.isSaveEnabled());
    this.addCommand (PORParams.saveCore.newGameText, 'newGame');
    this.addCommand (PORParams.saveCore.backText, 'back');
};

Window_NewgameOptions.prototype.isCursorVisible = function() {
	if (!PORParams.saveCore.ngwBlinking) return false;
    var row = this.row();
    return row >= this.topRow() && row <= this.bottomRow();
};

Scene_Save.prototype = Object.create (Scene_File.prototype);
Scene_Save.prototype.constructor = Scene_Save;
Scene_Load.prototype = Object.create (Scene_File.prototype);
Scene_Load.prototype.constructor = Scene_Load;
