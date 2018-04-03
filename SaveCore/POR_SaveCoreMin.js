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
 * This is the minuscule version of the plugin, missing background and
 * foreground images and related code.
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
 * 1.1 - 3th April 2018
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
 */

var Imported = Imported || {};
Imported.POR_SaveCoreMin = true;
Imported.YEP_SaveCore = "Not really, but NewGamePlus requires this plugin."

////////////////////////////////////////////////////////////////////////
//PORParams
////////////////////////////////////////////////////////////////////////
PORParameters = PluginManager.parameters("POR_SaveCoreMin");
var PORParams = PORParams || {};
PORParams.saveCoreMin = {};

PORParams.saveCoreMin.newGame = Number(PORParameters.newGame);
PORParams.saveCoreMin.maxSaves = Number(PORParameters.maxSaves);
PORParams.saveCoreMin.savemenuBGMVariable = Number(PORParameters.savemenuBGMVariable);
PORParams.saveCoreMin.indexX = PORParameters.indexX;
PORParams.saveCoreMin.indexY = PORParameters.indexY;
PORParams.saveCoreMin.newGamePlusIndex = PORParameters.newGamePlusIndex;
PORParams.saveCoreMin.showSave = eval(PORParameters.showSave);
PORParams.saveCoreMin.emptyId = eval(PORParameters.emptyId);
PORParams.saveCoreMin.slotId = eval(PORParameters.slotId);
PORParams.saveCoreMin.emptySaveName = PORParameters.emptySaveName;
PORParams.saveCoreMin.newGameText = PORParameters.newGameText;
PORParams.saveCoreMin.saveGameText = PORParameters.saveGameText;
PORParams.saveCoreMin.loadGameText = PORParameters.loadGameText;
PORParams.saveCoreMin.newGamePlusText = PORParameters.newGamePlusText;
PORParams.saveCoreMin.deleteGameText = PORParameters.deleteGameText;
PORParams.saveCoreMin.backText = PORParameters.backText;
PORParams.saveCoreMin.partyShow = Number(PORParameters.partyShow);
PORParams.saveCoreMin.partyMembers = Number(PORParameters.partyMembers);
PORParams.saveCoreMin.partyScale = Number(PORParameters.partyScale);
PORParams.saveCoreMin.partyX = PORParameters.partyX;
PORParams.saveCoreMin.partyY = PORParameters.partyY;
PORParams.saveCoreMin.partySpread = PORParameters.partySpread;
PORParams.saveCoreMin.partyHorz = eval(PORParameters.partyHorz);
PORParams.saveCoreMin.partyEquips = PORParameters.partyEquips;
PORParams.saveCoreMin.peRows = Number(PORParameters.peRows);
PORParams.saveCoreMin.pePadding = Number(PORParameters.pePadding);
PORParams.saveCoreMin.peX = PORParameters.peX;
PORParams.saveCoreMin.peY = PORParameters.peY;
PORParams.saveCoreMin.peText = PORParameters.peText;
PORParams.saveCoreMin.peTextX = PORParameters.peTextX;
PORParams.saveCoreMin.peTextY = PORParameters.peTextY;
PORParams.saveCoreMin.leaderName = eval(PORParameters.leaderName);
PORParams.saveCoreMin.lnX = PORParameters.lnX;
PORParams.saveCoreMin.lnY = PORParameters.lnY;
PORParams.saveCoreMin.lnDesc = PORParameters.lnDesc;
PORParams.saveCoreMin.lnDescX = PORParameters.lnDescX;
PORParams.saveCoreMin.lnDescY = PORParameters.lnDescY;
PORParams.saveCoreMin.playTime = eval(PORParameters.playTime);
PORParams.saveCoreMin.playTimeX = PORParameters.playTimeX;
PORParams.saveCoreMin.playTimeY = PORParameters.playTimeY;
PORParams.saveCoreMin.titleBGM = PORParameters.titleBGM;
PORParams.saveCoreMin.titleBGMPan = Number(PORParameters.titleBGMPan);
PORParams.saveCoreMin.titleBGMPitch = Number(PORParameters.titleBGMPitch);
PORParams.saveCoreMin.titleBGMVolume = Number(PORParameters.titleBGMVolume);
PORParams.saveCoreMin.swWidth = PORParameters.swWidth;
PORParams.saveCoreMin.swHeight = PORParameters.swHeight;
PORParams.saveCoreMin.swX = PORParameters.swX;
PORParams.saveCoreMin.swY = PORParameters.swY;
PORParams.saveCoreMin.swAlpha = Number(PORParameters.swAlpha);
PORParams.saveCoreMin.swRows = Number(PORParameters.swRows);
PORParams.saveCoreMin.swTopRow = Number(PORParameters.swTopRow);
PORParams.saveCoreMin.swBottomRow = Number(PORParameters.swBottomRow);
PORParams.saveCoreMin.swBlinking = eval(PORParameters.swBlinking);
PORParams.saveCoreMin.owWidth = PORParameters.owWidth;
PORParams.saveCoreMin.owX = PORParameters.owX;
PORParams.saveCoreMin.owY = PORParameters.owY;
PORParams.saveCoreMin.owAlpha = Number(PORParameters.owAlpha);
PORParams.saveCoreMin.owBlinking = eval(PORParameters.owBlinking);
PORParams.saveCoreMin.ngwWidth = PORParameters.ngwWidth;
PORParams.saveCoreMin.ngwX = PORParameters.ngwX;
PORParams.saveCoreMin.ngwY = PORParameters.ngwY;
PORParams.saveCoreMin.ngwAlpha = Number(PORParameters.ngwAlpha);
PORParams.saveCoreMin.ngwBlinking = eval(PORParameters.ngwBlinking);
PORParams.saveCoreMin.customSaveData = [[[],[]], [[], []]];
for (var i = 1; i < 999999999; i++) {
    if (typeof PORParameters["ct" + i] == "undefined") break;
    if (PORParameters["ct" + i + "Desc"]) {
        PORParams.saveCoreMin.customSaveData[0][0].push(PORParameters["ct" + i + "Desc"]);
    };
    var text = [PORParameters["ct" + i + "DescX"] || 0, PORParameters["ct" + i + "DescY"] ||0, PORParameters["ct" + i + "DescAc"] || false];
    PORParams.saveCoreMin.customSaveData[0][1].push(text);
    // Necessary to separate data from X and Y to prevent crashes in case someone deletes their custom text
    if (PORParameters["ct" + i]) {
        PORParams.saveCoreMin.customSaveData[1][0].push (PORParameters["ct" + i]);
    };
    var text = [PORParameters["ct" + i + "X"] || 0, PORParameters["ct" + i + "Y"] || 0, PORParameters["ct" + i + "ac"] || false];
    PORParams.saveCoreMin.customSaveData[1][1].push(text);
};


////////////////////////////////////////////////////////////////////////
//DataManager
////////////////////////////////////////////////////////////////////////
//Adding extra information to the savefiles
DataManager.makeSavefileInfo = function() {
    var info = {};
    info.globalId   = this._globalId;
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
    for (var i = 0; i <= eval(PORParams.saveCoreMin.partyEquips); i++) {
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
    var por = PORParams.saveCoreMin.customSaveData;
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
POR_saveCoreMin_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    POR_saveCoreMin_pluginCommand.call(this, command, args);
    if (command === "setsavebgm") $gameVariables.setValue(PORParams.saveCoreMin.savemenuBGMVariable, {name: args[0], pan: (Number(args[1]) ? args[1] : 0), pitch: (Number(args[2]) ? args[2] : 100), volume: (Number(args[3]) ? args[3] : 90)});
    if (command === "clearsavebgm") $gameVariables.setValue(PORParams.saveCoreMin.savemenuBGMVariable, 0);
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

////////////////////////////////////////////////////////////////////////
//Scene_File
////////////////////////////////////////////////////////////////////////
//Scene responsible for saving and loading. Normally Scene_File serves as a base for individual scene_Save and load,
//but since in this case they both do the same, I unified them under Scene_File. 
Scene_File.prototype.initialize = function() {  
    Scene_MenuBase.prototype.initialize.call(this);
    if (SceneManager._stack[0] != Scene_Map && PORParams.saveCoreMin.titleBGM.toLowerCase() != "Native".toLowerCase()) {
        var st = {
            name: PORParams.saveCoreMin.titleBGM,
            pan: PORParams.saveCoreMin.titleBGMPan,
            pitch: PORParams.saveCoreMin.titleBGMPitch,
            volume: PORParams.saveCoreMin.titleBGMVolume
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
    if (PORParams.saveCoreMin.newGame) this.createNewgameWindow();
};


Scene_File.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._listWindow.refresh();
};

Scene_File.prototype.savefileId = function() {
    return this._listWindow.index() + 1;
};

Scene_File.prototype.createListWindow = function() {
    var x = eval(PORParams.saveCoreMin.swX);
    var y = eval(PORParams.saveCoreMin.swY);
    var width = eval(PORParams.saveCoreMin.swWidth);
    var height = eval(PORParams.saveCoreMin.swHeight);
    this._listWindow = new Window_SavefileList(x, y, width, height);
    this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
    this._listWindow.setHandler('cancel', this.popScene.bind(this));
    this._listWindow.select(this.firstSavefileIndex());
    this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
    this._listWindow.refresh();
    this.addWindow(this._listWindow);
};

Scene_File.prototype.createOptionsWindow = function () {
    var width = eval(PORParams.saveCoreMin.owWidth);
    var showSave = PORParams.saveCoreMin.showSave;
    this._optionsWindow = new Window_SavefileOptions (0, 0, width);
    this._optionsWindow.x = eval(PORParams.saveCoreMin.owX);
    this._optionsWindow.y = eval(PORParams.saveCoreMin.owY);
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
    var width = eval(PORParams.saveCoreMin.ngwWidth);
    var showSave = PORParams.saveCoreMin.showSave;
    this._newgameWindow = new Window_NewgameOptions (0, 0, width);
    this._newgameWindow.x = eval(PORParams.saveCoreMin.ngwX);
    this._newgameWindow.y = eval(PORParams.saveCoreMin.ngwY);
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
    if (PORParams.saveCoreMin.newGame || SceneManager._stack[0] == Scene_Map) {
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
    this.opacity = PORParams.saveCoreMin.swAlpha;
};


Window_SavefileList.prototype.maxItems = function() {
    return PORParams.saveCoreMin.maxSaves;
};

Window_SavefileList.prototype.maxVisibleItems = function() {
    return PORParams.saveCoreMin.swRows;
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
    if (!eval(PORParams.saveCoreMin.partySpread)) {
        if (PORParams.saveCoreMin.partyHorz) PORParams.saveCoreMin.partySpread = Math.round (rect.width / PORParams.saveCoreMin.partyMembers);
        else PORParams.saveCoreMin.partySpread = Math.round (rect.height / PORParams.saveCoreMin.partyMembers);
    }else {
    	PORParams.saveCoreMin.partySpread = Math.round(eval(PORParams.saveCoreMin.partySpread));
    };
    this.resetTextColor();
    this.drawFileId(id, rect.x + eval(PORParams.saveCoreMin.indexX), rect.y + eval(PORParams.saveCoreMin.indexY), valid);
    if (info) {
        this.drawContents(info, rect, valid);
        this.changePaintOpacity(true);
    }
    if (PORParams.saveCoreMin.partyShow == 2) this.drawPartyFaces(info, rect, index - this.topIndex());
};

Window_SavefileList.prototype.drawFileId = function(id, x, y, valid) {
    if (valid) {
        if (!DataManager.loadSavefileInfo(id).newGamePlus) this.drawText(TextManager.file + (PORParams.saveCoreMin.slotId ? id : ""), x, y, 180);
    	else this.drawText(PORParams.saveCoreMin.newGamePlusIndex + (PORParams.saveCoreMin.slotId ? id : ""), x, y, 180);
    }else {
        this.drawText (PORParams.saveCoreMin.emptySaveName + (PORParams.saveCoreMin.emptyId ? id : ""), x, y, 180);
    }
};

Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
    if (valid) {
        if (PORParams.saveCoreMin.partyShow == 1) this.drawPartyCharacters (info, rect);
        if (PORParams.saveCoreMin.playTime) this.drawPlaytime(info, rect.x + eval(PORParams.saveCoreMin.playTimeX), rect.y + eval(PORParams.saveCoreMin.playTimeY));
        if (PORParams.saveCoreMin.partyEquips) this.drawPartyEquips (info, rect.x + eval(PORParams.saveCoreMin.peX), rect.y + eval(PORParams.saveCoreMin.peY));
        if (PORParams.saveCoreMin.leaderName) this.drawLeaderName (info, rect.x + eval(PORParams.saveCoreMin.lnX), rect.y + eval(PORParams.saveCoreMin.lnY));
        this.drawCustomTexts(info, rect);
        this.drawDescriptionTexts(info, rect);
    };
};

Window_SavefileList.prototype.drawPartyCharacters = function(info, rect) {
    if (info.characters) {
        for (var i = 0; i < info.characters.length; i++) {
        	if (i >= PORParams.saveCoreMin.partyMembers) break;
            var data = info.characters[i];
            if (PORParams.saveCoreMin.partyHorz) {
                var x = this.padding + eval(PORParams.saveCoreMin.partyX) + (PORParams.saveCoreMin.partySpread * i);
                var y = rect.y + 48 + eval(PORParams.saveCoreMin.partyY);
            }else {
                var x = this.padding + eval(PORParams.saveCoreMin.partyX);
                var y = rect.y + 48 + eval(PORParams.saveCoreMin.partyY) + (PORParams.saveCoreMin.partySpread * i);
            }
            this.drawCharacter(data[0], data[1], x, y);
        }
    }
};

Window_SavefileList.prototype.drawPartyFaces = function(info, rect, index) {
    if (!this._faceSprites) {
        this._faceSprites = [];
        for (var i = 0; i < PORParams.saveCoreMin.swRows; i++) {
            this._faceSprites[i] = [];
            for (var j = 0; j < PORParams.saveCoreMin.partyMembers; j++) {
                var spr = new Sprite ();
                if (PORParams.saveCoreMin.partyHorz) {
                    spr.x = this.padding + eval(PORParams.saveCoreMin.partyX) + (PORParams.saveCoreMin.partySpread * j);
                    spr.y = this.padding + eval(PORParams.saveCoreMin.partyY) + rect.height * i;
                }else{
                    spr.x = this.padding + eval(PORParams.saveCoreMin.partyX)
                    spr.y = this.padding + eval(PORParams.saveCoreMin.partyY) + (PORParams.saveCoreMin.partySpread * j) + rect.height * i ;
                }
                spr.scale.set(PORParams.saveCoreMin.partyScale);
                this._faceSprites[i].push (spr);
                this.addChild(spr);
            }
        }
    };
    if (!info) {
        this.clearFaces(index);
    }else if (info.faces) {
        for (var i = 0; i < info.faces.length; i++) {
        	if (i >= PORParams.saveCoreMin.partyMembers) break;
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
		//Necessary to handle it like this due to MV encryption and messed up loading
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
                var ix = x + (Math.floor(j / PORParams.saveCoreMin.peRows) * 32 + PORParams.saveCoreMin.pePadding);
                var iy = y + (Math.floor(j % PORParams.saveCoreMin.peRows) * 32 + PORParams.saveCoreMin.pePadding);
                if (PORParams.saveCoreMin.partyHorz) ix += PORParams.saveCoreMin.partySpread * i;
                else iy += PORParams.saveCoreMin.partySpread * i;
                this.drawIcon(info.partyEquips[i][j], ix, iy);
            };
        };
    };
};

Window_SavefileList.prototype.drawCustomTexts = function (info, rect) {
    if (info.customSaveData) {
        var por = PORParams.saveCoreMin.customSaveData[1];
        for (var i in info.customSaveData[0]) if (info.customSaveData[1][i]) this.drawTextEx(info.customSaveData[0][i], rect.x + eval(por[i][1]), rect.y + eval(por[i][2]));
    };
};

Window_SavefileList.prototype.drawDescriptionTexts = function(info, rect) {
    this.drawTextEx(PORParams.saveCoreMin.lnDesc, rect.x + eval(PORParams.saveCoreMin.lnDescX), rect.y + eval(PORParams.saveCoreMin.lnDescY));
    this.drawTextEx(PORParams.saveCoreMin.peText, rect.x + eval(PORParams.saveCoreMin.peTextX), rect.y + eval(PORParams.saveCoreMin.peTextY));
    if (info.customSaveData) {
        var por = PORParams.saveCoreMin.customSaveData[0];
        for (var i in por) if (info.customSaveData[2][i]) this.drawTextEx(por[i][0], rect.x + eval(por[i][1]), rect.y + eval(por[i][2]));
    }
};

Window_SavefileList.prototype.ensureCursorVisible = function() {
    var row = this.row();
    if (row - PORParams.saveCoreMin.swTopRow < this.topRow()) {
        this.setTopRow(row - PORParams.saveCoreMin.swTopRow);
    } else if (row + PORParams.saveCoreMin.swBottomRow > this.bottomRow()) {
        this.setBottomRow(row + PORParams.saveCoreMin.swBottomRow);
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
	if (!PORParams.saveCoreMin.swBlinking) return false;
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
    this.opacity = PORParams.saveCoreMin.owAlpha;
};

Window_SavefileOptions.prototype.makeCommandList = function () {
    if (SceneManager._stack[0] == Scene_Map && PORParams.saveCoreMin.showSave) this.addCommand (PORParams.saveCoreMin.saveGameText, 'save', $gameSystem.isSaveEnabled());
    var id = SceneManager._scene.savefileId();
    var info = DataManager.loadSavefileInfo(id);
    if (!info.newGamePlus) this.addCommand (PORParams.saveCoreMin.loadGameText, 'load');
    else this.addCommand (PORParams.saveCoreMin.newGamePlusText, 'newGamePlus');
    this.addCommand (PORParams.saveCoreMin.deleteGameText, 'delete');
    if (PORParams.saveCoreMin.newGame == 2) this.addCommand (PORParams.saveCoreMin.newGameText, 'newGame');
    this.addCommand (PORParams.saveCoreMin.backText, 'back');
};

Window_SavefileOptions.prototype.isCursorVisible = function() {
	if (!PORParams.saveCoreMin.owBlinking) return false;
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
    this.opacity = PORParams.saveCoreMin.ngwAlpha
};

Window_NewgameOptions.prototype.makeCommandList = function () {
    if (SceneManager._stack[0] == Scene_Map && PORParams.saveCoreMin.showSave) this.addCommand (PORParams.saveCoreMin.saveGameText, 'save', $gameSystem.isSaveEnabled());
    this.addCommand (PORParams.saveCoreMin.newGameText, 'newGame');
    this.addCommand (PORParams.saveCoreMin.backText, 'back');
};

Window_NewgameOptions.prototype.isCursorVisible = function() {
	if (!PORParams.saveCoreMin.ngwBlinking) return false;
    var row = this.row();
    return row >= this.topRow() && row <= this.bottomRow();
};

Scene_Save.prototype = Object.create (Scene_File.prototype);
Scene_Save.prototype.constructor = Scene_Save;
Scene_Load.prototype = Object.create (Scene_File.prototype);
Scene_Load.prototype.constructor = Scene_Load;