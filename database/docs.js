// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: CC-BY-4.0
/*
This will be moved to github wiki and be a lot more user-friendly at some point, don't worry!

Also, don't rely on this too much, it will be changed drastically whenever it's needed since it isn't quite finished yet. The groundwork has been done however.

=== CHECKLIST ===
# Some notes:
	- "event" here often means "occurence"
	- some stuff here doesn't make sense for every game (like some games don't have items), those will be marked as such when work on those games has started
	- boards like Minigame-Stadium are included here (that's why MP1 lists 9 boards)

+---------------------------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
|                           | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10|Adv| DS| IT| SR|TT1|SMP|
+---------------------------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
|                      modes| X |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|              boards (list)| X |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|                       path|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|                     spaces|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
+---------------------------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
|              mode oddities| X |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|              game oddities| X |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|             board oddities|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
+---------------------------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
|                      items| - |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|                       dice| X |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|                bonus stars| X | X | X | X | X | X | X | X | X | X | - | X | - | X | X | X |
+---------------------------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
|generic events (shops, etc)| X |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|           happening spaces|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|   'eventCollection' events|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|      board-specific events|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
+---------------------------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
|        playable characters| X | X | X | X | X | X | X | X | X | X | X | X | X | X | X | X |
|       all other characters|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|          characters sorted|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
+---------------------------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
|             minigames list| X |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|minigame spelling & sorting|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
+---------------------------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
|                    board 1| X |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|                    board 2| X |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|                    board 3| X |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|                    board 4| X |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|                    board 5|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|                    board 6|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|                    board 7|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|                    board 8|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|                    board 9|   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
+---------------------------+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+

=== DOCS ===
# How _all works
	- this section should be rewritten (or deleted)

# notes on character names (only for the object item names in the database)
	- the characters full name has to be included
		- titles (like 'princess') however are not part of this
		- this doesn't apply to characters where the full name is A LOT more uncommon than their regular name (for example, some argue that Marios full name is "Mario Mario" and even putting the credibility aside, said name is never really used so it shouldn't be used here either)

	- so it'd be 'donkeyKong', not 'donkey' or 'dk'
	- and 'peach', not 'princessPeach'

# notes on plural vs singular
	- names should be written in plural if there are ALWAYS multiple of them
	- if there can be a single one then it should be singular

	- 'coin' should be singular because you can have only 1 coin (whether it's rare or not does not matter)
	- the 'bonusStars' object on the other hand should be plural because there's always gonna be more than one [may be changed]

	- note that this rule was only really created later on so not all names abide by this currently (though it should be fixed when spotted)

# Oddities vs Occurences vs Events
	- I feel like another thing that's worth mentioning is that in the end, whatever system works best for something should be used

	## Oddities
		- oddities are static, they can't update or change anything during the game, they are simply parsed at the beginning of the game and that's it
		- oddities are a core part of the database because they define how exactly each game works

	## Events
		- events is what's used to change things, whenever something has to be updated events are called
		- events are also used to start things, like start a minigame or open an item shop

	## Occurences
		- occurences are things that happen on the board, all of them more complex than what the event system can handle
		- but in the end, occurences simply call events to do all the work for it

# _info
	- '_info' is an object listed at the very beginning of the database
	- '_info' includes info about the database itself, not related to any Mario Party game

	## Variables inside _info
		- dbVersion [Number]
			- The database version as a single number. Each change to the database format itself has to increase the number by 1. Changes to the info that the database holds don't have to increase the number.
			- Note: this only really applies once the site is actually properly published

# Checkpoints
	- checkpoints are defined inside the 'checkpoints' oddity
	- checkpoints are tracked for each player seperately
	- checkpoints can (currently) only be increased by the 'checkpoints' event

# randomnessType
	- is usually used to determine how something is given out
	- this is currently listed everywhere in the docs, might have to replace some if this is ever changed
	- can be one of the following:
		- fixed: A fixed event where it's always the exact same.
		- roulette: A roulette spins and the user can stop it. Doesn't matter whether the user can time the press or not.
		- random: Pure randomness.
		- select: The player that started the event gets to pick what happens.
		- vote: The players vote for which one gets selected. What happens when this is tied is not defined yet.

# how shuffling works
	- if the player order is ever changed then the turn simply restarts with the new captain first

# metadata
	- metadata is an object commonly found throughout the database, it includes various info about it like name, description, image, etc.
	- sometimes some of these may not be needed but that's always noted whenever metadata can be used
	- a lot of things about metadata is still to be determined, mainly character limit and how images are gonna work (could support different types of images as well, like a small square one, a big background one, etc.)


	## Variables inside metadata
		- fullName [String]
			- The full name with special characters and all that.
		- unofficialName [Boolean] <false>
			- If true it's an unofficial name, the game never mentioned the name of a thing so we (either MPO contributors or taken from other sites on the internet) made a name for it so it's easier to list.
		- importantNotice [String] <none>
			- Important notices about the behaviour of something. Only needed in case the user has to be alerted of something that may not be the behaviour they expect. Not really used for the database, it's mainly for MPO.
		- description [String] <none>
			- A description.

		- icon [Object/Array] <none>
			- A quadratic icon. Size doesn't matter too much, though preferably somewhere around 120x120px since they're never gonna be too big.
			- Is an "Image-Object", see below for more info.
			- Can be an array of them in order to support more themes (see "iconThemes" in docs).
		- artwork [Array/Object] <none>
			- Official artwork. Size and dimensions should be the same as the original (the bigger the better, just don't upscale it). An "Image-Object" or an array of them, see below for more info.
		- screenshot [Array/Object] <none>
			- Screenshots of the subject, whether it's before use, during or similar. An "Image-Object" or an array of them, see below for more info.
		- videos [Array/Object] <none>
			- Videos of the subject, whether it's before use, during or similar. An "Image-Object" or an array of them, see below for more info.

# Image-Objects
	- Image objects contain the file-path and information related to the image itself.

	## Variables inside them
		- filePath [String]
			- The relative path to the image.
			- Note that the path starts at the default image folder (in MPOs case this would be 'img/marioparty', so 'img/marioparty/mp1/bluespace.png' would simply be 'mp1/bluespace.png').
			- It's also worth noting that images can be any file-format as long as all browsers can read them (this also includes older browsers to a reasonable level). Preferably it should be either .png or .jpg though.
		- isURL [Boolean] <false>
			- If true, 'path' is an URL to a file (or YT link).
			- URLs have to link to the file directly (they usually have a file extension at the end of the URL), simply linking to Google Drive or similar is not enough.
			- If a file is shared through an URL then it HAS to be hosted on a website that will host the file permanently (like imgur or YT).
			- Video URLs only support YT however, even if a file is linked directly.
				- YT videos should include the timestamp in the URL if only a specific part of it is needed.
		- iconTheme [String]
			- Only needed inside icons. Can be ignored for anything else.
			- Defines part of which theme it is. List of all themes are listed inside '_all' [documentation of that will follow].

# iconThemes
	- 'iconThemes' is found inside '_all' and is a object.
	- Has a '_index' array at the beginning that lists all other entries (as strings).
	- Lists all icon themes across the entire series.
		- Note: not the icon themes that the games themselves use but instead the icons that we made for the database (which are usually in-game icons but not limited to those).

	## Variables inside each entry
		- metadata [Object]
			- A metadata object. Needs 'fullName', 'description' and 'icon' (default icon so the user knows which theme they're selecting -- preferably simply Marios icon).
		- creator [String]
			- Who created it. Can be a full sentence explaining it (like "Official artwork, edited by [user]"). Including your name is optional though, can simply be "Anonymous" or "MPO contributor".
		- perGameSupport [Object]
			- An object that includes one entry for each game (and '_all').
			- Note that listing a game here means the icons are actually specified in that exact game.
			- Another note is that fan-art should be seperated. So if a fan continues a certain theme from a game in order to support more games then that should be it's own theme.
				- Obvious mention but never use fan-art without permission.
				- And don't ask artists if their work could be used here, fan-art icons should only be added if it was the artists full intention to be used here, not simply because someone asked if it was fine to use it here.
				- An additional reminder for people that do want to add their own icons, be aware that people will naturally think these are official icons and simply use them without asking even if it's not allowed to do so.
				- Last thing: Fan-art can be fully drawn or simply official artwork/screenshots edited together. Though slight abjustments can simply be included in the game itself without making it a seperate theme.
			- This would look like the following:
				- *game* [Array]
					- An array consisting of strings. Defines what icons are supported.
					- Currently there is no way to define if a theme supports more than one game (aside from listing it in '_all'), though it will whenever there's a case for it.
					- Can be one (or more) of the following:
						- playableCharacters: Has an icon for each playable character (incl. all unlockable ones and all that are only available in a certain mode -- exceptions are made for CPU-only characters that are only seen in minigames like Toad at the end of the MP1 Challenge Island).
						- bonusStars: Includes an icon for each bonus-star.
						- spaces: Includes an icon for each space.
						- items: Includes an icon for each space.
						- mainCollectibles: Includes an icon for each main collectible.
						- logo: Includes a logo for the game (will likely only be needed for '_all' themes).
				- _all [Array]
					- Same as above. Will apply to the entire series ('plus-' and 'seriesWide-' are not needed here).

# miscMetadata
	- 'miscMetadata' is found inside '_all' and inside each game.
	- It lists metadata objects for various things that aren't listed elsewhere.
	- Not all entries have to be used, only the ones that the game needs.
		- '_all' is an exception to this as it does have to list all of them (except 'game').
	- All entries have to to be metadata objects. See "metadata" in docs.

	## Possible entries
		- game
			- Lists info about the game itself. In case of '_all' it lists info about the series as a whole.
		- star
			- Lists info about stars (note, mini-stars have a different entry).
		- coin
			- Lists info about coins.
		- miniStar
			- Lists info about mini-stars.
		- p1
			- Player 1. Only the icon is actually needed but it's best to include a name and description (as dumb and obvious as they're gonna be).
		- p2
			- Same as 'p1' but player 2.
		- p3
			- Same as 'p1' but player 3.
		- p4
			- Same as 'p1' but player 4.

# _imageSources
	- '_imageSources' is found at the very beginning of the database.
	- It's an object that lists the source for every single image.
	- Each entry is a file or folder. Each folder is a new object.
		- If the file is 'bonusStars/old/happeningStar.png' then the object is gonna be at _imageSources['old']['happeningStar.png']
		- URLs are inside '_url' at the beginning of the object.
			- Each entry is simply the full URL (if the URL is 'https://www.youtube.com/watch?v=D8opi-6P3Sg' then that's gonna be the entry name).
	- All object entries are sorted the way they would inside the Windows Explorer. Folder > Files, both alphabetically.

	## Variables inside each entry
		- sameAs [String] <none>
			- In case a file has the exact same sources as another file in the same folder (it HAS to be in the same folder).
			- Is the name of the other file (note: only 'mario.png', not 'characters/mp4/mario.png').
			- If this is used, all other variables will be taken from the file specified.
		- emulator [Boolean/String] <false>
			- Whether it's from an emulator or not. If it is from an emulator it should be a string with the Emulator name and version inside it. Though if the emulator is unkown it can simply be true.
			- This can and should also be used when icons have been ripped by a texture dumping tool inside emulators.
		- captureQuality [String]
			- The quality of the capture, can be one of the following:
				- ripped: Only applies to images. Used when a image is directly ripped from either the games files or, in case of artwork, directly ripped from Nintendos website/Press releases. In case games split images into multiple files, it is fine to combine those to replicate the way it looked in-game.
				- rippedModified: Only applies to images. Same as 'ripped' but with small modifications made to it. This includes resizing the image, cutting it out (even just removing a white background) or anything of the sorts. This exists so 'ripped' is kept for images that are 1:1 the exact image the game itself uses while this one is used for when it's the same image but slightly worse quality (even if it's barely noticeable), when in doubt always pick this one over 'ripped'. Note that bigger modifications should use 'fanEdit'.
				- captureCard: Recorded using a capture card. This can also be used for emulators when it's directly recorded on the PC.
				- captureCardBad: Same as above but worse. Should only really be used when the video lags noticeably or when there's a watermark visible (like the infamous "Unregistered HyperCam 2"). This should also be used for emulators when the entire screen is captured or the entire emulator window instead of only gameplay.
				- consoleCapture: Recorded using the console itself (likely using the Capture button on the switch).
				- stream: Simply a screenshot or video highlight from someones Stream. In case of a video it will likely have them talking over it and the whole stream overlay being visible.
				- filmed: The video or screenshot is simply made from a phone or similar. Videos and especially images from this quality should be avoided as much as possible.
				- officialStream: Likely Nintendo Treehouse or something similar. Should be replaced whenever possible, though still better than 'stream' or 'filmed'.
				- officialTrailer: An official trailer.
				- fanEdit: Only applies to images. Used when official images are taken and edited to make something new. Whether it's combining multiple images into one or simply adding a background/border. This can also be used for other small fan-creations that don't really fit 'fanMade'.
				- fanMade: Only applies to images. Used when the image is completely fan-made, likely hand-drawn.
				- unknown: If the source of the image, or rather how it was captured, is unknown. Should be avoided whenever possible.
		- source [String] <none>
			- Where the image/video came from, can be a full sentence. Can include an URL in it (and should wherever possible) but doesn't have to be one. If it's from an MPO contributor it can be the name of them, preferably the github name if possible (or simply "MPO contributor"/"Anonymous" if they'd like to be anonymous).

# miscStats
	A property in '_all' that lists all stats that aren't bound to any space, item, bonus star, etc.
	Temporary, will be renamed and maybe even completely moved/replaced.

# Path incompatibility
	- This is a list of things that would block path support from being used in MPO. Mainly stuff like when a player has to select a space which currently isn't really possible.

	- 'defaultDirection' in a 'blockade' type occurence being random
	- 'cannon' occurence being used

# Oddities
	## About Oddities
		- Oddities can be specified inside games, modes and/or boards. Boards take priority over modes, modes take priority over games.
		- If an oddities object is not present at all it will simply use the defaults for each oddity.
		- If the default for an oddity is false and a mode sets it to true but a board sets it back to false then the result should be false. If the board does not specify anything then it should be true as the mode still set it as true.
		- Oddities specified in games will only be applied to modes that are not of the type 'bonus'.
		- Oddities can also be specified in modes with the type 'modeCollection', each additional layer will take priority of the previous one.
		- Oddities can always be set to null (NOT a string, has to be null) in which case it'll be set to the default. Should be avoided whenever possible though as defaults may change later on.
		- Oddities will always overwrite the one in the previous layer (unless they're empty of course), so an oddity in a board will overwrite the oddity of the mode. This even applies to oddities like 'items' that could technically join up with the previous ones.
			- The only exception to this is 'itemFineTuning' and 'occurenceFineTuning' that are applied to 'items' and 'occurences' respectively the moment they are parsed.
				- See the oddity descriptions on these two for more infos.

	## List of oddities
		### Database oddities (oddities related to listing all spaces/items/etc.)
			- excludeCharacters [Array] <none>
				- If a certain board/mode/whatever is only limited to certain characters. Has to be a list of strings of the characters that are excluded (character names have to be the same as the database). Note that if a character isn't playable in the game as a whole then they don't have to be exluded in this.
			- spaces [Object] <all>
				- Defines what spaces are used. If not present it's assumed all spaces defined in the game are used without any changes. Object has to consist of the following:
					- _spacesUsed [Array] <all>
						- An array consisting of the names of each space that's used. The names have to be defined inside _all.spaces.
					- *space name* [Object]
						- An object with the name of a space that's defined in _all.spaces. Used to overwrite what's written in _all.spaces.
			- enableItems [Boolean] <true>
				- If Items should be enabled. [currently unused]
			- items [Object] <all>
				- Defines what items are used. If not present it's assumed all items defined in the game are used without any changes. Object has to consist of the following:
					- _itemsUsed [Array] <all>
						- An array consisting of the names of each item that's used. The names have to be defined inside _all.items.
					- *item name* [Object]
						- An object with the name of a item that's defined in _all.items. Used to overwrite what's written in _all.items.
			- itemFineTuning [Object] <no changes>
				- Mainly used to fine-tune items a bit, usually simply using the 'items' oddity is enough. This is a special oddity in that it simply applies the rules in here to the 'items' oddity. Can include the following:
					- excludeItems [Array] <none>
						- List of items that aren't available. Has to be strings consisting of the item name used in the database.
					- includeItems [Object] <none>
						- Basically another 'items' oddity.
			- dice [Object] <all>
				- Defines what dice are used. If not present it's assumed all dice defined in the game are used without any changes. Object has to consist of the following:
					- _diceUsed [Array] <all>
						- An array consisting of the names of each dice that's used. The names have to be defined inside _all.dice.
					- *dice name* [Object]
						- An object with the name of a dice that's defined in _all.dice. Used to overwrite what's written in _all.dice.
			- occurences [Object] <all>
				- Defines what occurences are used. If not present it's assumed all occurences defined in the game are used without any changes. Object has to consist of the following:
					- _occurencesUsed [Array] <all>
						- An array consisting of the names of each occurence that's used. Can be empty in case no occurences are used.
					- *occurence name* [Object]
						- An object with the name of a occurence that's defined in the 'occurences' object of the game. Used to overwrite what's written in the 'occurences' object of the game.
			- occurenceFineTuning [Object] <no changes>
				- Mainly used to fine-tune occurences a bit. This is a special oddity in that it simply applies the rules in here to the 'occurences' oddity. Can include the following:
					- excludeOccurences [Array] <none>
						- List of occurences that aren't available. Has to be strings consisting of the occurence name used in the database.
					- includeOccurences [Object] <none>
						- Basically another 'occurences' oddity.

		### Core oddities (oddities that define how the game works as a whole)
			- gameplay [String] <regular>
				- What kind of gameplay should be used. Can be one of the following:
					- regular: Normal Mario Party gameplay, each player moves on their own, each player has their own turn.
					- car: Mario Party 9/10 style gameplay, all players are within the same car and move all at once but each player has their own turn.
					- carChase: MP10 Bowser Party style gameplay where 4 players are in a car and Bowser chases them.
					- scramble: Toad Scramble (MPSR)/Partner Party (SMP) style gameplay where each player moves on their own but all move at the same time. This does NOT assume that gameplay is also grid-based.
			- gameEnd [String/Array] <turns>
				- This defines when the game ends. Can be an array in case multiple are ok (note that only one has to be true in order for the game to end). Can be one of the following:
					- turns: Game ends after a set amount of turns.
					- reachGoalSingle: Game ends after a single player reached the end of a board. The end of the board is defined by a space with 'spaceType' set to 'end'.
					- reachGoalAll: Game ends after every player reached the end of a board. The end of the board is defined by a space with 'spaceType' set to 'end'. In case 'gameplay' is set to 'car' then this will be the same as 'rechGoalSingle'.
					- hearts: Game ends once player is out of hearts.
			- winCondition [Array] <stars->coins->tie>
				- This defines how the winner is determined and how ties are broken. This consists of an array consisting of Strings. The first item decides who wins, if that's tied then the second item is how the tie is broken, if it's still a tie then the third item is used and so on.
				- The array should always end with either 'tie' or 'dice'. If it doesn't then it will count as a tie (if it even gets that far).
				- Strings can be one of the following:
					- star: Player with the most stars wins.
					- miniStar: Player with the most mini-stars wins.
					- coin: Player with the most coins wins.
					- closestToEnd: Player that's the closest to the end wins.
						- This shouldn't be used on non-linear boards. Behaviour on this is not defined as no game does this.
						- Can't be used when 'gameplay' is set to 'car' or 'carChase' as all players are equally as far away. As a failsafe this will automatically count as a tie however.
					- furthestToEnd: Player that's furthest away from the end wins. See 'closestToEnd' above for more details, same applies here as well.
					- dice: Dicerolls are used to determine the winner. Same number can't be thrown twice. Use the 'tieBreakerDice' oddity to define the dice used.
					- tie: It's a full-on tie. Despite having the same place, the lower players will be listed first (so player 1 will be listed before player 2 despite being fully tied).
			- tieBreakerDice [String] <default>
				- The dice used to determine ties. Used for both minigames and at the end of a game (of course only if ties are broken with dice in the first place). Has to be the name of the database entry. Will default to the dice with the name 'default'.
			- mainCollectibles [Array] <star, coin>
				- This defines what the main collectibles are. Items are NOT part of this. Array can include one of the following:
					- star: Stars are collectable.
					- coin: Coins are collectable.
					- miniStar: Mini-Stars are collectable.
					- hearts: Hearts are collectable (mainly from MP3 Duel Mode and MP10).
			- maxTurnPossibilities [Array] <unkown>
				- What max turn options can be used. If only 10, 25 and 50 turns can be selected then those are in this array. Array consists of numbers.
			- star [Object] <see defaults inside this>
				- Defines how the star works on the board. Will be ignored if the 'mainCollectibles' oddity doesn't include stars (as stars don't exist then). Object includes the following:
					- starType [String] <moving>
						- What type of star it is. Can be one of the following:
							- moving: The star moves after each time it is bought.
							- still: The star is always at the same spot.
							- chests: There are 3 chests, one is a star, one gives coins and one is a fake. The star always moves after it is bought.
							- none: The board doesn't have a star. No other variables in here are needed if this is used.
					- movingType [String] <unknown>
						- Only needed if 'starType' is 'moving'. Defines where the star can move to. Can be one of the following:
							- fixed: Star can only move to certain spaces specified inside the path object.
							- blueSpaces: Star can move to any blue space available.
							- unknown: It's unknown how the star moves.
					- neutralChestEvent [Object]
						- An event object for the neutral chest. Can be ignored if 'starType' is not 'chests'.
					- fakeChestEvent [Object]
						- An event object for the fake chest. Can be ignored if 'starType' is not 'chests'.
					- enableMiniBowserStar [Boolean] <false>
						- If true the board has a "Mini-Bowser Star" which appears where the star was last bought. At the beginning of the game they appear at a random spot.
					- miniBowserStarEvent [Object]
						- Only needed if 'enableMiniBowserStar' is true. Is an event object that gets executed whenever a player passes by the mini-bowser star.
					- priceType [String] <stays>
						- If and how the star price changes. Star price changes through the final 5 and similar non-happening events are not included in this. Can be one of the following:
							- stays: The star price stays the same at all times.
							- loop: There's a couple different star prices and it simply loops around.
							- random: There's a couple different star prices and it simply picks a random one.
					- price [Number] <20>
						- The amount of coins a star costs.
					- alternativePrices [Array]
						- Array consists of numbers. List of alternative prices (this includes the original price). Only needed if priceType is 'loop' or 'random'.
					- buyAmount [Number] <1>
						- How many stars can be bought at once. Use 0 in case an infinite amount of stars can be bought (or rather, is only limited by the max amount of coins the players can hold).

		### Other important oddities (oddities that affect the code side of things a lot)
			- periodicEvents [Array/Object] <none>
				- Defines periodic events that should happen every x turns. Can be an array of objects in case there are multiple periodic events. Object consists of the following:
					- how [String]
						- How the periodic event gets activated. Can be one of the following:
							- turn: Event gets activated every x turns (defined in 'when').
					- when [Number]
						- When the event should be activated (meaning changes based on what 'activation' is).
					- skipFirstTime [Boolean] <true>
						- If true the first time (turn 0) is skipped. Useful when an event runs every 3 turns but not on the very first turn of the game.
					- events [Object/Array]
						- The event that gets executed.
			- bowserTurn [Object] <no bowser turn>
				- If and how a "bowser turn" is activated. A "Bowser Turn" takes place after all other players have moved (before the minigame though) and is usually activated if a player has a "Bowser Bomb" item (that's how it works in MP2 anyway). Object consists of the following:
					- activation [Array]
						- An array consisting of objects that consist of the following:
							- activationType [String]
								- How it's activated, can be one of the following:
									- item: It's activated if any player has a certain item. Include the item name inside 'activationValue'.
							- activationValue [String]
								- Dependant on 'activationType'.
					- appearanceLocation [String]
						- Where Bowser appears. Can be one of the following:
							- miniBowserStar: Appears where the mini-bowser star is. As a failsafe, appears at start if no mini-bowser stars exist.
					- dice [String]
						- The name of the dice that bowser uses.
					- diceAmount [Number] <1>
						- The amount of dice bowser uses.
					- events [Object/Array]
						- An event object that gets executed when bowser hits a player.
			- checkpoints [Object] <none>
				- Defines how checkpoints work. If not present it assumes checkpoints aren't used. Object consists of the following:
					- amount [Number]
						- Amount of checkpoints that are used. Has to be present.
					- dragLastPlayer [Boolean] <true>
						- If true the last player will be dragged to the checkpoint. The player that gets dragged does not lose their turn.
					- rewards [Array/Object/String] <none>
						- List of rewards that are gotten when reaching the checkpoint. Each array entry has to consist of another array which then consists of either an event object or a string name (see 'rewardLookup' below).
						- The goal here is that the first array has one array for each checkpoint. Each checkpoint array then consists of an item for each player.
						- Once a player reaches a checkpoint it checks the array corresponding to that checkpoint and then executes the first event object and finally removes the item of the executed event object (same applies to string names, see 'rewardLookup' below). The removal of the executed item is important as each reward can only be gotten once.
						- Alternatively, if the same reward should be given to all players then a event object/string name can be used directly instead of a second array.
						- Similarly, if the same reward should be used for all checkpoints *and* all players then an event object/string name may be used directly without using any arrays whatsoever. Do note that if each checkpoint has the same reward but each player should get a different reward then both set of arrays have to be used.
					- rewardLookup [Object] <none>
						- This serves as a lookup in case string names were used in 'rewards'. This means, instead of using an event object a string consisting of a name can be used, that string will then be used on this object to find an event object here. So, if the string 'flutter' is used instead of an event object then this object needs an item called 'flutter' that consists of an event object.
						- This is only really needed to make things more user-friendly as the Star-Crossed Skyway board in MPIT uses different characters to give out different amounts of Mini-Stars. By using this lookup those characters can also be displayed on the site.
						- This object is only required if string names were used in 'rewards', otherwise it's not needed.
			- finalCheckpointOddities [Object] <none>
				- An object consisting of oddities. All oddities in this object will be activated in the final area (after reaching the second-last checkpoint -- final checkpoint being the end of the board). Note that this only activates once a player starts their turn in the final area, NOT once the first player reached it.
				- This will always take priority over regular oddities. If this is specified in the oddity object of a game then oddities inside this will, once activated, take priority over oddities specified inside a mode. This will not merge with other 'finalCheckpointOddities' so another 'finalCheckpointOddities' will take complete priority over this, this can be used to clear 'finalCheckpointOddities' in case a mode or board doesn't need it but the rest of the game does.
				- 'final5Oddities' will take priority over this.
			- final5 [Object] <Final 5>
				- Defines if the final 5 exist and how to handle them. Object consists of the following:
					- metadata [String] <?>
						- What the final 5 are called.
					- turnsLeft [Number] <5>
						- How many turns are left.
			- final5Oddities [Object] <none>
				- An object consisting of oddities. All oddities in this object will be activated in the final 5 (when the final 5 start is defined in 'final5').
				- This will always take priority over regular oddities. If this is specified in the oddity object of a game then oddities inside this will, once activated, take priority over oddities specified inside a mode. This will not merge with other 'final5Oddities' so another 'final5Oddities' will take complete priority over this, this can be used to clear 'final5Oddities' in case a mode or board doesn't need it but the rest of the game does.
				- This will take priority over 'finalCheckpointOddities'.

		### All other oddities
			- useAllies [Boolean] <false>
				- If true the Ally system from SMP will be enabled
			- usePartners [Boolean] <false>
				- If true the Partner system from the MP3 Duel Mode will be enabled.
			- useBonusStars [Boolean] <true>
				- If Bonus Stars should be used.
			- enableDayNightMechanic [Boolean] <false>
				- If true the day/night mechanic is enabled.
			- dayNightDuration [Number]
				- Only needed if 'enableDayNightMechanic' is true. Defines how many turns each day/night lasts.
			- playerOrder [String] <diceRoll>
				- Defines which player's turn is first. Can be one of the following:
					- diceRoll: At the beginning of the game each player throws a dice, highest one begins, lowest one is last. Ties can not happen as numbers are mutually exclusive meaning if the first player throws a 5 then all other players can no longer throw a 5 anymore.
					- minigameWin: Winner of the minigame is first, loser is last. A random minigame will be played immediately after starting the game. This assumes no ties can happen but as a failsafe it uses the player order in case of ties (if player 1 and 3 are tied then player 1 comes before player 3).
					- minigameLose: Loser of the minigame is first, winner is last. A random minigame will be played immediately after starting the game. This assumes no ties can happen but has the same failsafe as 'minigameWin' (p1 would come before p3).
			- playerOrderDice [String] <default>
				- Defines which dice is used when 'playerOrder' is set to 'diceRoll'. Has to be the name of the dice as it's listed in the database. Defaults to a dice named 'default'. Not needed if 'playerOrder' isn't set to 'diceRoll'.
			- startBonus [Object] <none>
				- Defines what's given out at the very beginning of a game. Consists of the following:
					- type [String]
						- What type it is. Can be one of the following:
							- coins: Coins are given out.
							- cards: Random cards are given out.
					- amount [Number]
						- How many are given out.
			- allowMultipleSpacesInOneTurn [Boolean] <true>
				- Whether multiple space visits on one turn should be allowed. Like when a characters lands on a space and then gets sent to another space, whether that space counts or not.
			- diceMatches [Object] <none>
				- If dice matches should be enabled (meaning if someone throws two 5 they get 10 coins). The syntax works by starting with the amount of matches it should have, followed by 'x' and then the number thrown last. '*' can be used in case anything is valid.
					- Remember to put a " before and afterwards since otherwise Javascript will complain.
				- When the player has thrown a 7 a total of 2 times then the following variables are checked in that exact order: '2x7', '2x_', '_x7', '_x_' (if any match is found then only that one will be executed).
				- Note that all of this will only be applied if all numbers thrown are a match. If a player uses 3 dice and only matches two of them then none of this will apply.
				- Object consists of the following (examples included):
					- "*amount*x*number*": Number of coins gotten for this combination.
					- "2x7": Number of coins gotten when a 7 has been thrown 2 times.
					- "2x_": Number of coins gotten when any number has been thrown 2 times.
					- "3x4": Number of coins gotten when a 4 has been thrown 3 times
					- "_x7": Number of coins gotten when a 7 has been thrown any number of times.
			- endTurnWithMinigame [Boolean] <true>
				- If a minigame should be played once all players are done moving.
			- minigameTieBreaker [String] <none>
				- How ties should be decided. Can be one of the following:
					- none: Don't break ties.
					- dice: Break ties by diceroll. If 1st + 2nd are tied and 3rd + 4th are tied as well then both are evaluated seperately, so even though everyone rolls a dice, 3rd and 4th can't get 1st even if both 1st and 2nd rolled lower than them. This assumes a tie with dicerolls can't be achieved so if 3rd & 4th are tied and 3rd rolls a 5 then 4th can't roll another 5.
			- minigameRankingType [String] <ranking>
				- Defines how players are ranked after a minigame. Can be one of the following:
					- ranking: Players are ranked from 1st to 4th.
					- winLose: Players can only win, lose or be neutral (win usually gets coins, lose usually loses coins and neutral is usually +/- 0 coins).
			- minigameReward [Array] <none>
				- What rewards should be used in minigames. First one that applies to a player will be used. Defaults to no rewards at all. Array consists of objects that include the following:
					- place [Number/String]
						- The placement of the player. Can be 1, 2, 3, 4, 'win', 'lose', 'neutral' or 'any'. 'any' means placement doesn't matter. Note that 'win' corresponds to 1, 'neutral' to 2 and 'lose' to 4. 'win' should be used over 1 however if 'minigameRankingType' is 'winLose' to make things clearer. Note that if two or more people are tied for last then 'lose' still applies.
					- tiedAmount [Number/String]
						- The amount of people tied. Can be 'any' in case number of people tied doesn't matter.
					- onlyExecuteOnce [Boolean] <false>
						- If true, the event will only be executed once. It will not be executed for each player seperately, instead only once. The player variable will simply use 'current' as 'context'. Do note that any subsequent array items will still be executed if they apply.
						- See "events" in docs.
					- overwriteCoinMinigame [String] <no>
						- If coin minigame rewards should be overwritten. Can be one of the following:
							- no: Players simply get what they got in the coin minigame.
							- yes: Players ONLY get the reward specified in the 'events' object below. Players don't get anything they collected inside the coin minigame.
							- addOnTop: Players will get what they collected in the coin minigame AND what's specified in the 'events' object below.
					- events [Object/Array]
						- See "events" in docs.
			- coinMinigameReward [String] <cumulative>
				- Defines how coin minigames give out coins. Specifically in 2v2 or 1v3 coin minigames. Can be one of the following:
					- cumulative: Coins are added together and everyone in the team receives the same amount of coins. If player 1 and 2 are in the same team and p1 collects 3 coins and p2 collects 6 coins then both receive 9 coins.
					- seperate: Everyone only receives the coins they collected.
			- battleMinigame [Object] <false>
				- Object consisting of details on how battle minigames should be handled. If false it's assumed the game doesn't have battle minigames.
				- Currently a simple copy-paste of the 'battle' event type. Should be edited to include information like when battle minigames happen.
					- wager [String/Array]
						- What the wager is about. Can be either 'stars', 'miniStars' or 'coins'. In case it can be multiple an Array can be used including all potential options (['stars', 'coins'] in case in can be either coins or stars).
					- randomnessType [String] <fixed>
						- Only needed if 'wager' is an array. This defines how the wager is selected. Can be one of the following:
							- fixed: A fixed event where it's always the exact same.
							- roulette: A roulette spins and the user can stop it. Doesn't matter whether the user can time the press or not.
							- random: Pure randomness.
					- leftoverCoinDistribution [String] <random>
						- How the leftover coins should be distributed. Can be one of the following:
							- random: Gives coins to a random player. User has to select which one it is.
							- none: No one gets the coin.
							- noLeftover: There's never any leftover coins because the winner takes all. As a failsafe no one gets the coin if there's a leftover one afterall.
					- returnCoinsIfAllTied [Boolean] <true>
						- If true everyone gets their coins back when everyone is tied. Otherwise they're given out the way 'resultDistribution' defines it.
					- resultDistribution [Object]
						- [note: should be rewritten since this currently couldn't even get parsed in JS]
						- How the results are given out.
						- See 'minigameReward' on how this works. The only difference is that the items here include a number instead of an event object.
						- Object consists of the following (examples included):
							- _*placement*x*number of people tied* [Number]
								- Specifies the percentage of coins that are given out.
							- _1x1: Used for when a single person is 1st.
							- _1x2: Used for when two people are tied for 1st.
							- _3x2: Used for when two people are tied for 3rd.
							- _2x*: Used for when any amount of players are 2nd.
							- _*x3: Used for when 3 people are tied for any position.
							- _wx*: Used for when any amount of people won (only used if 'minigameRankingType' is 'winLose').

# Events
	## About Events
		- Events are objects that can do various things ranging from increasing a counter to decreasing a counter (there's gonna be more, just trust me here).
		- In case multiple things should happen, an array of event objects can be used as well. The events will then be parsed one after another in order.
		- Each event has a type, a player, an action, a flavour and a value
			- type is the most important because it says what the event should do (see below for list of types)
			- player is which player it should target (if any)
			- action is how it should do it, usually used for things like whether it should add or subtract
			- flavour is used to differentiate things or when slight adjustments have to be made
			- value is what the event uses, this is entirely dependant on what type of event is used
		- In case an action is not not needed it can simply be 'pass'. This will likely never be parsed anyway but it's still best practise to include it to make it easier to read and also make it easier to notice that it is an actual event object.
		- If an invalid action or value is used it will simply do nothing at all (aside from complaining about it in logs).
		- Value can be anything. Can be an object, an array or a number. Depends entirely on the event type and action.
		- (unsure if this should actually be a thing?) The value object can always include another object called '_metadata'. In case value has to be a string or a number it can still be an object as long as the variable called 'value' inside it has the actual value.

	## Player
		- The player variable defines which player is targeted.
		- May be unused for some event types.
		- In case of events with the type 'selectEvent' the player variable simply gets passed through.
		- Using 'current' inside effects will default to the player that gets the effect, NOT the player that created the effect.
		- If player isn't specified the current one is picked automatically.
		- Can be one of the following (has to be string or a number):
			- context: This one changes based on context, it's usually the current player but for something like minigame rewards another player will be targeted instead.
			- current: The current player.
			- pick: Let's the player pick whos targeted.
			- spaceOwner: The player that owns the space that another player just landed on (only needed if the space type is 'ownership' which is only used in MP3 Duel Mode).
			- bowserCard: Picks the player with the Bowser Card.
		- If there's no current player (like during a minigame) then 'current' will behave like 'pick'.
		- Events automatically receive a list of certain info like who's the current player, who has the bowser card etc. and the Player variable will always be filled in automatically.
		- Certain events may also treat another variable like 'Value' as a secondary Player variable in case a second player is needed (like when coins are stolen from someone).
		- The "player" can also simply be Bowser (not as a playable character but as in the game itself) in some cases. [not relevant to the typical user, only really important for the implementation]
		- A specific player can currently not be targeted. Mainly because it's not needed and because I don't know whether it should respect the order the players move in (decided at the start of the game) or the actual player order (who holds which controller).
			- There are of course solutions to this problem but there's no need to solve it because a feature like this isn't needed currently. If there's ever a reason to use something like this it will be added.

	## Effects
		- Effects is a "sub-system" of sorts for events. They can be added through the 'effect' event.
		- Do note that there are two main types of effects, 'executeOnce' and 'executeForEachSpace' which are controlled through the flavour of the event object that creates the effect.
		- Effects are usually gained through items, likely items that target other players.
		- The difference between events and effects is that events are executed immediately, effects on the other hand are executed at a later date. An example would be mushrooms: A regular mushroom that adds 3 to the dice roll is executed immediately and as such would use an event; a poison mushroom targeting another player on the other hand reduces 2 from the dice roll and is executed at a later date (whenever it's that players turn), as such a poison mushroom would use an effect instead of an event (though effects are created through events but you get what I mean).
			- It is worth noting that effects can very much be executed immediately as well like when a player targets themselves with a poison mushroom; an effect can still very much be used for that.
			- Another important note is that the example might be a rather bad example as effects might be used for regular mushrooms as well (see below, anything that modifies the player).
		- Another use of effects is effects that affect the player for each space they move like Zap Orbs from MP6 that take 5 coins from the player for each space once affected.
		- Effects may also be used for anything that modifies the player, mainly visually but also just in general. Best examples are Mini and Mega Mushrooms from MP4, though something like Dash Mushrooms may also use this.
			- There is an argument to be held about what classifies as an effect and what not, currently this is just gonna be case-by-case. Technically Dash Mushrooms shouldn't be included since it doesn't really modify the player like a Mega Mushroom but SMP handles Dash Mushrooms exactly like they do a Poison Mushroom which is definitely an effect so they are included.

	## Types
		### Special Events
			- pass
				- Does nothing. Useful if an event object has to be present but it shouldn't do anything. It is best practice to have an action variable with 'pass' in it and an empty value object.
			- special
				- For special cases that don't fit anywhere else and MPO doesn't need it either. Only really useful for the database. *Note: If possible in any way this should NOT be used when MPO needs this (should also be avoided for the database if possible but sometimes it just ain't worth it).*
				- Player variable is supported depending on which value is used, see list below. All that don't mention it ignore the player variable.
				- Action can be 'pass'.
				- Flavour can be 'pass'.
				- Value [String] can be one of the following:
					- firstCardPick: Used in "Kamek's Carpet Ride" from MPIT. The board gives out four cards after each minigame (one for each player), the winner can pick first, the loser last. This value is for the player that can pick first. Player variable supported.
					- secondCardPick: Same as 'firstCardPick' except for the second pick.
					- thirdCardPick: Same as 'firstCardPick' except for the third pick.
					- fourthCardPick: Same as 'firstCardPick' except for the fourth pick.
					- takeAllCards: Takes all cards. Used in "Shy Guy's Shuffle City" in MPIT.
					- give3Cards: Gives out 3 cards to all players. Used in "Shy Guy's Shuffle City" in MPIT.
					- bowserParade: The Bowser Parade from the MP2 bowser board.
			- selectEvent
				- [note: this is deprecated and shouldn't be used! Use "Occurences" instead]
				- Lets the user select an event. This includes random events like Bowser events and fixed events like Happening spaces. Flavour is only needed for the database.
				- Player variable is supported and will be passed down onto each event listed. Can be overwritten of course.
				- Action can be 'pass'.
				- Flavour [String] is randomnessType and can be one of the following:
					- fixed: A fixed event, like landing on a Happening space where it's always the exact same event.
					- roulette: A roulette spins and the user can stop it. Doesn't matter whether the user can time the press or not.
					- random: Pure randomness like most Bowser spaces.
				- Value [Array] is an array consisting of objects. The objects have to consist of the following:
					- metadata [Object]
						- See "Metadata" above. Likely displayed in a roulette. In case they don't have names, the title it should be as descriptive as possible (since the user has to know which one they're selecting).
					- limitTo [Object/Array] <none>
						- If this event should be limited to certain modes/boards/etc. Can be an array of objects in case something is restricted to Mode A & Board A together and also to Mode B & Board B together. Can include one or more of the following:
							- exclude [Boolean] <false>
								- If true it's available to all modes/boards except the ones listed here.
							- modes [String/Array] <none>
								- The name of the mode it should be restricted to. Can be an array of strings in case it's restricted to multiple modes. If not present it assumes it's available to all modes regardless of 'exclude'.
							- boards [String/Array] <none>
								- The name of the board it should be restricted to. Can be an array of strings in case it's restricted to multiple boards. If not present it assumes it's available to all boards regardless of 'exclude'.
					- events [Object/Array]
						- An event object or an array consisting of them.
			- effect
				- Modifies effects (see "Effects" above).
				- Player can be specified.
				- Action [String] can be one of the following:
					- add: Adds an effect
				- Flavour can be 'pass'
				- Value [Object] has to consist of the following:
					- metadata [Object]
						- See "metadata" above.
					- effectName [String]
						- A short name, the same way database entries are usually named.
					- executeWhen [String] <executeOnce>
						- executeOnce: Event gets executed a single time once the targeted players turn starts.
						- executeForEachSpace: Event gets executed for each space walked.
						- executeWhenPlayerHit: Event gets executed once when walking past a player.
					- events [Object/Array]
						- The event that should be executed or an Array of them.

		### Events that simply modify a thing
			- modifyMainCollectibles
				- Modifies a base collectible, whether that's coins, stars or other similar stuff.
				- Player can be specified.
				- Action [String] can be one of the following:
					- add: Adds a certain amount.
					- sub: Takes away/subtracts a certain amount.
					- set: Sets it to a certain amount.
					- steal: Steals from others. If the player doesn't have as much as specified here then it will simply steal as much as possible (or nothing if they don't have anything). Value has to be an object if this is used.
					- even: Evens out the collectible between all players. If there's leftovers then no one gets them, everyone will always have the same amount at the end.
					- toBowser: Bowser takes away a certain amount. Should be used instead of 'sub' wherever possible for statistics.
				- Flavour [String] is the collectible to be modified. Can be one of the following:
					- star: Modifies stars.
					- ztar: Modifies ztars. Note that if 'add' is used with this then a star will be removed. It's worth noting that this should be used instead of simply subtracting a star, mainly for statistics and database accuracy.
					- coin: Modifies coins.
					- miniStar: Modifies mini-stars.
					- miniZtar: Modifies mini-ztars. See 'ztar' above, same applies here.
				- Value [Number/Object/'pass'] is the amount to increase/decrease. In case action is 'set' it's the value it should be set to. In case action is set to 'even' then this can be set to 'pass'.
					- Can also be a object with more options. Object would include the following:
						- amountType [String]
							- Defines how the numbers are added. Can be one of the following:
								- fix: Simply adds/subtracts/sets a single number.
								- range: Can add a random number between two points.
								- options: Can add a random number out of a set of options.
						- randomnessType [String]
							- Only required if 'amountType' is either 'range' or 'options'. See "randomnessType" in docs.
						- stolenFrom [String]
							- The player that is stolen from. Only required if action is 'steal'.
						- amount [Number/Array]
							- In case 'amountType' is 'regular' then this is the amount of add/subtract/set.
							- In case 'amountType' is 'range' it's an array consisting of 2 items. [10, 50] would create a range between 10 and 50.
							- In case 'amountType' is 'options' it's an array consisting of all possibilities.
			- item
				- Adds (and removes) items.
				- Player can be specified.
				- Action [String] can be one of the following:
					- add: Adds an item.
				- Flavour can be 'pass'.
				- Value [Object] has to be an object consisting of the following:
					- item [String/Array]
						- The name of the item, used to lookup the item inside the items object. In case a random item is given it can be an array consisting of possible items, can also be '_all' in case it's a random item out of all items.
					- randomnessType [String] <fixed>
						- How the item is obtained. Can be one of the following:
							- fixed: A fixed item is given.
							- roulette: A random item is given through a roulette that the player can stop (doesn't matter if it can be timed or not).
							- random: A completely random item is given out.
					- amount [Number] <1>
						- Amount of items that should be given out.
			- stealItem
				- Steals an item from another player.
				- Player is the player that receives the item.
				- Action can be 'pass'.
				- Flavour [String] is 'randomnessType' and defines how the item is selected.
				- Value [String] is another "Player" variable and defines who is targeted.
			- ally:
				- Modifies allies of a player.
				- Player can be specified.
				- Action [String] can be one of the following:
					- add: Adds an ally.
				- Flavour [String] is randomnessType and can be one of the following:
					- fixed: A fixed event where it's always the exact same.
					- roulette: A roulette spins and the user can stop it. Doesn't matter whether the user can time the press or not.
					- random: Pure randomness.
				- Value [String/'pass'] is the name of the ally to be added, will only be used if flavour is 'fixed'.
			- changeDayNight:
				- Changes the time from day to night or night to day.
				- Player can be ignored.
				- Action can be 'pass'.
				- Flavour [String] can be one of the following:
					- switch: Simply changes day to night and night to day.
					- toDay: Only switches it to day (also resets the counter).
					- toNight: Only switches it to night (also resets the counter).
				- Value can be 'pass'.
			- changeParadeDirection:
				- Changes the direction of the parade for a junction.
				- Player can be ignored.
				- Action can be 'pass'.
				- Flavour [Number] is the space ID of the junction.
				- Value [String] is the name of the direction as specified inside 'paradeDirections'.

		### Events that modify dice
			- modifyDice
				- Modifies the base dice in itself.
				- Player can be specified.
				- Action [String] can be one of the following:
					- addToMultiplier: Adds a certain amount to the multiplier. Default multiplier is always one, however if 2 is added through this then the multiplier would be 3.
				- Flavour can be 'pass'.
				- Value [Number] is the amount.
			- modifyDiceTotal
				- Modifies the dice roll total. Only modifies the finished dice roll, this does not affect the amount of rolls or the dice itself.
				- Player can be specified.
				- Action [String] can be one of the following:
					- add: Adds the number specified in value to the finished dice roll.
					- sub: Subtracts the number specified in value to the finished dice roll.
				- Flavour can be 'pass'.
				- Value [Number] is the amount.
			- multipleDiceRolls
				- Modifies the amount of dice rolls. Only modifies the base dice, other modifications like bonus dice are added after this so they are not affected.
				- Player can be specified.
				- Action [String] can be one of the following:
					- add: Adds multiple rolls (note, this with a value of 1 means there's one dice roll added to create a total of 2)
				- Flavour can be 'pass'.
				- Value [Number] is the amount.
			- bonusDice:
				- Adds bonus dice. Bonus dice are added after 'multipleDiceRolls' which means modifications there do no affect this.
				- Player can be specified.
				- Action [String] can be one of the following:
					- add: Adds a specific dice named in 'value'.
				- Flavour can be 'pass'.
				- Value [String] is a string consisting of the name for the dice to be added (has to be identical to how the variable was named inside the 'dice' object).

		### Events that start something (like a minigame)
			- occurence
				- Starts an occurence.
				- Player can be specified, though may be ignored depending on the occurence.
				- Action can be 'pass'.
				- Flavour [String] is the occurence name as listed in the database.
				- Value [Object] is an activation object, see "Occurences" > *occurence* > "Activation variables" in the docs.
			- minigame
				- Starts a minigame. Does not end the turn or anything of the sorts.
				- Player can be specified (mainly in case of one-player minigames).
				- Action can be 'pass'.
				- Flavour [String] can be one of the following:
					- regular: A regular minigame.
					- battle: A battle minigame.
				- Value [Object] includes the following:
					- minigameType [String/Array] <random>
						- The minigame type can be '4player', '2v2' and so on. See the "minigames" section of the docs for more info.
						- Can be an array consisting of all possibilities in case it's random.
						- Not needed if 'minigameName' is used.
					- randomnessType [String]
						- See "randomnessType" for more info.
					- minigameName [String] <random>
						- The name of the minigame as it's listed in the database. Only needed in case the minigame is fixed.
					- minigameRewardOverwrite [Object] <none>
						- Overwrites the 'minigameReward' oddity. The object uses the exact same format as the 'minigameReward'. Takes priority over the 'minigameReward' object inside minigames.
					- secondPlayer [String]
						- Who the second player is. [This variable hasn't been planned out yet.]

		### Events that move the player around on the board
			- movePlayer:
				- Moves the player by a certain amount of spaces. [this event is a WIP and will likely be changed quite a bit when paths are released]
				- Player can be specified.
				- Action [String] can be one of the following:
					- forward: Moves the player forward.
					- backward: Moves the player back.
				- Flavour can be 'pass'.
				- Value [Number] is the amount of spaces the player should be move.
			- warpPlayer:
				- Warps the player to a random space or to another player. [this event is a WIP and will likely be changed quite a bit when paths are released]
				- Player can be specified.
				- Action can be 'pass'.
				- Flavour [String] can be one of the following:
					- player: Warps the player to a different player.
					- star: Warps the player to the star.
					- pathway: Warps the player to a specific pathway.
				- Value [String/Number] is dependent on Flavour, see the following chart:
					- For 'player' [String]:
						- last: Warps to the last player (based on ranking). As a failsafe it works like 'pick' in case the last place is tied.
						- pick: The user has to pick the player.
					- For 'star' [String]:
						- 'pass'
					- For 'pathway' [Number]:
						- *simply use the ID of the pathway as specified in the paths object*

# Characters
	- Inside each game this object is found. It lists all characters and their default behaviour.
		- In case a certain mode excludes some playable characters then the 'excludeCharacters' oddity can be used.
	- In addition to each game, '_all' also has this object to list all characters in the entire series.
		- Generally, the behaviour that's present in most games should be used. Though this isn't a fixed rule.
	- This object always has a '_index' array at the beginning that lists all entries as strings.

	- Characters may be mentioned by other parts of the database (like who hosts a occurence) but they don't have to be listed anywhere else.
		- Well, they should but when parsing characters it's important to know that a character, despite being mentioned somewhere, doesn't have an entry. This is mainly for when a game is still being added in.

	## Variables inside characters
		- metadata [Object]
			- See "metadata" above.
		- role [Array/String]
			- The role the character has. Can be an array of strings in case multiple fit (do note that some should be mutually exclusive, though both will be listed if both are used). List of options will be extended as more characters are added to the database. Can be one of the following:
				- fullyPlayable: The character is fully playable.
				- minorPlayable: The character is only playable in certain ways, whether that's only in a minigame or only in a mode. Allies are not included here.
				- partyHost: The character hosts the party.
				- commonGimmick: The character is used as a common gimmick, they can be found on multiple, if not all, boards.
				- oneOffGimmick: The character is a one-off gimmick only used on a single board or similar.
				- commonBystander: The character is simply a bystander visible in the backgrounds but somewhat common at least.
				- oneOffBystander: The character is simply a bystander only visible once, maybe twice.
		- playable [Boolean] <false>
			- If true the character is playable.
		- availableAsAlly [Boolean] <false>
			- If true the character is available as an ally.
		- availableAsPartner [Boolean] <false>
			- If true the character is available as a partner. Difference between ally (originated in SMP) and partner (originated in MP3) is that partners have stats like HP, ATK, salary while allies don't have any of that.
		- partnerStats [Object]
			- The stats of the partner. Not needed if 'availableAsPartner' is false. Includes the following variables (most of them exactly how they are displayed in the game):
				- attack [Number]
				- stamina [Number]
				- salary [Number]
				- ability [String] <none>
					- If the partner has a special ability. Can be one of the following:
						- none: No special abilities.
						- preventBasicSpaces: No coins are lost if the player lands on a basic space.
						- bomb: Jumps over the enemies' partner and attacks them directly but they're gone after a single attack.
						- counter: Deals equal damage to the enemy if attacked. Note that this only counts when the partner is attacked directly [not 100% certain on this].
						- freeCoins: Gives two to four coins at the beginning of a turn.
						- bonusDice1To3: Gives a bonus dice that can throw 1-3.
						- attackAll: Attacks the enemy and all their partners simultaneously.
						- onlyAttackPartners: Only attacks partners but awlays defeats them in one hit.
						- onlyAttackfurthest: Only attacks the enemy that's the furthest away.
						- bowserTransform: Has a 40% chance to transform into Bowser and deal x3 damage.
		- favoritePartner [String] <none>
			- The characters favorite partner for MP3 Duel Mode. The partner is given to the player at the very start.
		- favoriteItem [String] <none>
			- The characters' favorite item. Can be skipped in case a character doesn't have one. Only needed in very few Mario Parties.

# Modes
	- Lists all modes in the game, no matter if they could be used in MPO or not.
	- Has a '_index' array at the beginning that lists all of the mode names as strings (the name of the mode objects, not the full name).

	## Variables inside mode
		- metadata [Object]
			- See "metadata" above.
		- modeType [String]
			- What type of mode it is. Can be one of the following:
				- regular: A regular mode that can be played on and should be used in MPO.
				- modeCollection: A collection of other modes (usually used to differentiate a regular 4 player match and a team match -- see MPDS)
				- minigame: A mode dedicated to playing minigames. Behaviour is the same as 'bonus' though (oddities are ignored and it's not relevant to MPO in any way).
				- bonus: A bonus mode that is an actual mode but not revelant to MPO. It's also assumed these don't have any spaces, items & dice.
		- subModes [Object]
			- List of sub-modes. Each sub-mode is treated like an actual mode which means it requires the same variables. Sub-modes can also simply be another modeCollection. Only used if modeType is 'modeCollection'.
		- playerAmount [Number/Array] <4>
			- Amount of players allowed in said mode. Can be an array consisting of 2 numbers in case it's a range (an Array of [2, 4] would mean 2-4 players are allowed). Players means amount of characters on the board which means CPUs count as well.
			- Defaults to 4 but it's still best practise to always write this down if there's another mode in the same object that allows a non-4 amount of players.
		- teams [String] <none>
			- If teams are an option. Only needed in case 'modeType' is 'regular'. Can be one of the following:
				- none: No teams.
				- optional: Teams are optional.
				- forced: Teams are always on.
		- storyMode [Boolean] <false>
			- If true all boards will be played in order one after another.
		- storyBoardOrder [Array]
			- The order in which boards are played, has to consist of strings of the database names. Only needed if 'storyMode' is true.
		- boardsUsed [Array] <all>
			- Which boards can be used in a mode. If not present it simply assumes all boards can be used. Only needed if modeType is 'regular'.
		- charactersUsed [Array] <all>
			- Which characters can be used in a mode. If not present it simply assumes all characters can be used.
		- oddities [Object] <?>
			- See "oddities" for reference. If not present it will simply take the default of each oddity (see list of oddities).

# Boards
	- Lists all boards in the game.
	- Has a '_index' array at the beginning that lists all of the board names as strings (the name of the board objects, not the full name).

	## Variables inside boards
		- metadata [Object]
			- See "metadata" above.
		- boardSplit [Boolean] <false>
			- If true it assumes the board is split in several pieces that can be interchanged like Amiibo Party from MP10. It's assumed pieces can't be interchanged during regular gameplay, only before the game starts.
		- boardSplitAmount [Number]
			- In how many pieces the board is split. Only required if 'boardSplit' is true. Do note that it is possible to split a board into 1 piece since that piece could then still be interchanged.
		- boardPieces [Array]
			- List of pieces. Only required if 'boardSplit' is true. This array has to be the exact length for each 'boardSplitAmount' segment. Then each item is another array consisting of objects (see "Board Pieces").
		- path [Object] <none>
			- The path of a board. See "path" in the docs.
		- reusedFrom [String] <none>
			- The name of the board it's reused from (has to be the name of the database object), if empty it's assumed the board is new and not reused. Use 'reusedFromGame' to specify the game it's reused from (if it is from another game).
			- Additionally, if this is used then all variables from the original will be used here as well. Although variables specified here will take priority.
		- reusedFromGame [String] <same game>
			- Only required if 'reusedFrom' is used. This defines from which game the board is originally from. If not present it assumes the original board is from the same game.
		- oddities [Object] <?>
			- See "oddities" for reference. If not present it will simply take the default of each oddity (see list of oddities). Takes priority over the oddities object from modes.

# Board Pieces
	- Only needed inside 'boardPieces' in case a board is split (like Amiibo Party from MP10).

	## Variables inside board pieces
		- metadata [Object]
			- See "metadata" above.

# Path
	## About Paths
		- Paths are a variable inside boards and board pieces.
		- Paths define the full path on a board including every single space on it.
		- Paths don't have to be defined, they can simply be left empty.
		- Each space has a unique ID, they're listed starting at 1.
			- This uses an object instead of an array mainly because it's easier to edit since this way the ID is always displayed right next to the item. Another reason is that it's more flexible in case non-number IDs are ever needed.
		- The order of spaces is not important in any way whatsoever. The space 1 can link to the space 4 which links to 2, etc. and it's perfectly fine.
			- It is suggested to plan an entire board out first so the order makes at least some sense, though it doesn't matter too much.
				- One recommended way is to use an image-editing software, take a screenshot of the entire board and then simply draw numbers on each space/junction/etc.
			- One important thing though, DON'T RETROACTIVELY CHANGE SPACE IDS. If a mistake was made and a missed space has to be inserted, then simply add it with an ID of 137 or whatever, just don't change all space IDs retroactively so it makes more sense because that's a surefire way to make an even bigger mistake.
		- The only exception to the above rule is the pathway with the ID 1, 1 is always the starting space. [to be changed]
		- Whenever a Space ID has to be referenced it can always use 0 which stands for 'undefined', basically whenever a Space ID is required but not all spaces have been mapped out yet (or whoever adds it is simply too lazy to look it up).
		- Spaces can be one-way by linking a space to 'forward' but the linked space not linking it inside 'backward'.
		- Spaces linking to themselves, linking to 0, linking to a negative number or not linking to another space at all will be treated like it's the final stop and players will always stop on it.
			- Best practise is to link to -1 if it ever has to be used.
			- In case it's a junction or another similar space then the players will simply land on the last space they walked on.

	## Variables inside paths
		- *pathway ID* [Object]
			- pathwayType [String]
				- What type of space it is. Can be one of the following:
					- space: A simple space of any kind whatsoever.
					- spot: A simple spot without a space attached to it. Doesn't take away from the dice total, though a player can 'land' on it (usually either because it's the starting point or through an event). Can have an occurence associated to it. Can also simply be a junction. Do note that junctions and occurences should be seperated into two different pathways wherever possible.
					- boardPiece: A special type only used to connect board pieces. [will be planned out more once we get there]
			- forward [Number/Array] <*one ID higher*>
				- The ID of the next space. Links to the space with one ID higher on default. In case of a junction in can be an array consisting of objects that contain the following:
					- pathwayID [Number]
						- The pathwayID it links to.
					- direction [Number]
						- A direction from 0 to 360. 0 and 360 are both at the very top, 180 is the very bottom. It doesn't have to be pixel-accurate or anything, a rough direction is fine. The site will dynamically create strings for them (like "Top left" or "South"). Preferably one of the following (though they don't have to be):
							-   0 = top
							-  45 = top right
							-  90 = right
							- 135 = bottom right
							- 180 = bottom
							- 225 = bottom left
							- 270 = left
							- 315 = top left
					- oneWay [Number/Array] <none>
						- If present it means that this path can only be chosen if the player last walked over the specified space listed here. Has to be a pathway ID. Can be an array of possibilities.
			- backward [Number/Array] <*one ID lower*>
				- The ID of the last space. Links to the space with one ID lower on default. In case it links to multiple pathways then it can be an array consisting of objects that consist of the following:
					- pathwayID [Number]
						- The pathwayID it links to.
					- direction [Number]
						- A direction from 0 to 360. Has to be the direction from this space to the previous. Check 'forward' above for more details.
					- oneWay [Number/Array] <none>
						- If present it means that this path can only be chosen if the player last walked over the specified space listed here. Has to be a pathway ID. Can be an array of possibilities.
			- details [Object]
				- More details on the space, what the object consists of depends on 'pathwayType'. Can be skipped in case no variables inside it are needed.
			- occurence [Object] <none>
				- If the spot has an occurence associated to it and what it is.
				- Can be skipped if there's no occurence associated to it.
				- The behaviour of an occurence depends on the 'pathwayType':
					- space: Will be executed after the player landed on the space and the default space event was executed.
					- spot: Will be executed when a player walks past it. Note that for junctions (when there's more than one 'forward' pathway) the execution changes based on which occurence it is, they work as described here:
						- barricade: Some paths are blocked (no limit on how many).
						- blockade: One path is blocked, all others are open.
					- boardPiece: Will be ignored completely. Occurences should be their own pathway.
				- Consists of the following:
					- name [String]
						- The name of the occurence, needs to be the same name that's used in the database.
					- instance [Object] <no new instance is made>
						- Additional variables for occurence. If present it's assumed this is a seperate instance from all the others. Depends on the occurence type. See "Occurences" in the docs for more info.
					- activation [Object] <the occurence will not be activated>
						- Additional variables for occurences. Depends on the occurence type. See "Occurences" in the docs for more info.

		### 'space' details
			- space [String]
				- The name of the space, needs to be the same name that's used in the database.
			- starSpawn [Boolean] <false>
				- If true a star can spawn on this space. Only needed if 'movingType' (inside boards > 'star') is set to 'fixed'. Will be ignored if 'starType' is set to 'still'.
			- events [Object] <none>
				- See "events" in the docs. This should only be used when events are executed when landing on this particular space, if an event is always executed on every single blue space then it should be specified globally. This is executed after the global space event.
			- dayNightAvailability [String] <always>
				- Whether a space is only available during day or night (or always). Used alongside 'dayNightConvert' for spaces that convert from one to another when the day changes to night or the reverse. Only use this for individual spaces, if it's already specified inside the spaces oddity then it doesn't have to be specified here again. Can be one of the following:
					- always: The space is available during night and day.
					- day: The space is only available during day.
					- night: The space is only available during night.
			- dayNightConvert [String] <none>
				- Only needed if 'dayNightAvailability' is either 'day' or 'night'. Used to define spaces that convert from one to another when the day changes to night or the reverse. Has to be the name of the space it got converted from/gets converted to.
			- final5Availability [String] <always>
				- Whether a space is only available before or after the final 5. Used alongside 'final5Convert' for spaces that convert from one to another after the final 5. Only use this for individual spaces, if it's already specified inside the spaces oddity then it doesn't have to be specified here again. Can be one of the following:
					- always: The space is always available regardless of final 5.
					- pre: Space is only available before the final 5.
					- post: Space is only available after the final 5.
			- final5Convert [String] <none>
				- Only needed if 'final5Availablity' is either 'pre' or 'post'. Used to define spaces that convert from one space to another after the final 5. Has to be the name of the space it got converted from/gets converted to.

		### 'spot' details
			- *no additional variables needed. 'details' can simply be an empty object.*

		### 'boardPiece' details
			- connectTo [String]
				- To which piece it should connect to. Can be one of the following:
					- next: Switches to the beginning of the next piece.
					- previous: Switches to the end of the previous piece.

# Occurences
	## About occurences
		- Each game has a 'occurences' object that lists all occurences in the game.
		- The 'occurences' oddity can be used to define which board/mode has which occurences.
		- Has a '_index' array at the beginning that lists all of the occurence names as strings (the name of the occurence entry, not the full name).
		- Each occurence can be called through two ways, both of which have unique variables depending on which 'occurenceType' it is. Following ways exist:
			- instance: By calling it through this method a new instance of the occurence will be created. There can technically be an infinite amount of instances and they all have nothing to do with each other aside from being the same type of occurence. This is often used for occurences that block a players path on the board since those blockades are usually used multiple times on a board and each of those times requires a new instance.
			- activation: By calling it through this method it simply activates the occurence. This is often used for something like a duel, it simply starts a duel instead of creating a new version of it.
		- For each mention inside the 'occurences' oddity a new instance will be made. Those instances are 'anonymous' in the way that they aren't linked to any pathway and don't have instance variables. Those will however not be used if path support is enabled.
		- Activations can target a specific instance but don't have to. An Activation that targets a specific instance can still change something in all instances together (see 'cannon').

		- Sidenote: Occurences were initially called "On-Board Events" so if you see that mentioned anywhere then it's talking about occurences (please do report it if you see it though).
			- For those curious: It was renamed because it'd be confusing having "On-Board Events" and regular "Events" so this was renamed. Just be happy I didn't call it "On-Board Incidents" and called the two methods of calling them "instance" and "incitement". We're in the good timeline here, just trust me on this! I'm from the internet, I would never lie.

	## Variables inside occurences
		- metadata [Object]
			- See "metadata" above.
		- occurenceType [String]
			- The type of occurence, see the list below for all types and what they do.
		- activation [String/Array]
			- How the occurence is activated. Can be an array consisting of strings in case it can be activated through multiple ways. Can be one of the following:
				- spaceAlways: It's always activated by landing on a type of space (like how chance time always happens when landing on a chance time space).
				- spaceSpecific: It's activated by landing on a specific space (like how certain happening events only happen on one specific happening space).
				- spaceException: This is a rare case where it's activated by landing on a specific space but a type of space that usually doesn't do anything special. Like how you can use Sushi on Pirate Land (MP2) when landing on a specific blue space. Something like happening spaces should not be included here however because, while they do something unique depending on the space, something special always happens (that's their whole thing).
				- indirect: This is indirectly activated through other things. Like how the bowser space in MP1 activates a roulette which can select something random, incl. a Bowser Chance Time (and Bowser Chance Time would use 'indirect' since it's indirectly activated through something else).
				- walkPast: It's activated by walking past a certain spot on the board, like how shops are opened by walking past them.
				- blockedPath: It simply blocks a path and can't be interacted with directly (unlike 'paywall' which can be interacted with).
				- unspecified: Use this if none of the others apply (though it's better to create a new type then).
		- host [String/Array] <none>
			- The name of the character that hosts the occurence. Can be an array in case there's multiple. Can be skipped in case there is no host.
		- price [Number/Object/Array] <none>
			- How much has to be paid in order for the occurence to activate.
			- Can also be a simple number in case it's just a simple price in coins.
			- Only supported if 'occurenceType' is 'event', 'bank' (how much is payed when walking past it), 'pickAPath' (if the player doesn't have enough all will be taken), 'blockade', 'minecart', 'train', 'piranhaSeed'.
			- Can be an array of objects in case the price changes during day/night. First one that applies will be used.
			- Object consists of the following:
				- collectible [String] <coin>
					- What's used to pay. Can be one of the following:
						- coin: Coins are used.
				- amount [Number]
					- How much is needed to pay.
				- dayNightAvailability [String] <always>
					- Whether this price is used during the day or the night (or both). Can be one of the following:
						- always: The price is available during day and night.
						- day: The price is only available during day.
						- night: The price is only available during night.
		- dayNightAvailability [String] <always>
			- Whether the occurence is only available during the day, night or both. Can be one of the following:
				- always: The occurence is available during day and night.
				- day: The occurence is only available during day.
				- night: The occurence is only available during night.
		- details [Object]
			- An object containing more details about the occurence. Depends entirely on the 'occurenceType'. What this object contains is listed inside each type below. Can be an empty object in case no details are needed.

	## Occurence types
		### 'event'
			- Simply executes an event. Usually used for when an event needs to have a price.

			#### Variables inside 'details'
				- events [Object/Array]
					- Event or an array of them to be executed. See "events" for more details.

			#### Instance Variables
				- overwriteEvents [Object/Array]
					- Overwrites the 'events' variable from 'details'. Should only be really used for stuff like occurences that move a player to the opposite site of the map so each instance moves the player to a different space but they're still the same occurence in the end.

			#### Activation Variables
				- *no additional variables are needed. An empty object is enough.*

		### 'eventCollection'
			- It's a collection of events, used for something like happening spaces, bowser spaces or similar.

			#### Variables inside 'details'
				- randomnessType [String]
					- How the event gets selected. See "randomnessType" in the docs for details.
				- list [Object]
					- Object that lists all events. Consists of the following:
						- _index [Array]
							- List of all object names.
						- *event name* [Object]
							- One event, consists of the following:
								- metadata [Object]
									- See "metadata" in the docs for details.
								- events [Array/Object]
									- The event object that gets executed. See "events" in the docs for more details.

			#### Instance Variables
				- eventName [String] <random>
					- Which event should be executed. Has to be the name of an event that's listed inside the occurence. Defaults to random (which means the user has to pick which one).

			#### Activation Variables
				- eventName [String] <random>
					- Same as the instance version of it. Not needed if the related instance already specifies it, though it would be overwritten if used.

		### 'occurenceCollection'
			- A collection of occurences. Usually used for something like happening spaces. Can not link to another 'occurenceCollection' (execution of the occurence will simply stop in that case).

			#### Variables inside 'details'
				- randomnessType [String]
					- How the occurence gets selected. See "randomnessType" in the docs for details.
				- list [Array]
					- The name of each occurence.

			#### Instance Variables
				- *no additional variables are needed. An empty object is enough.*

			#### Activation Variables
				- *no additional variables are needed. An empty object is enough.*

		### 'itemShop'
			- It's an Item Shop where items can be bought.

			#### Variables inside 'details'
				- forceBuy [Boolean] <false>
					- If true the player has to buy something when passing by.
				- oneOfEachItem [Boolean] <false>
					- If true the shop only has one of each item, once it's sold it can't be bought again.
				- restockOnceEmpty [Boolean] <true>
					- Only needed if 'oneOfEachItem' is true. If true the shop will restock all items once it's empty, if false each item can't be sold again for the rest of the game.
				- items [Object]
					- List of items and their prices. Object consists of the following:
						- _index [Array]
							- A list of all item names.
						- *item name* [Number]
							- The name of the item (database name) and the value is the price it's sold.

			#### Instance Variables
				- *no additional variables are needed. An empty object is enough.*

			#### Activation Variables
				- *no additional variables are needed. An empty object is enough.*

		### 'steal'
			- Coins, stars or other stuff can be stolen here.

			#### Variables inside 'details'
				- choices [Array]
					- What can be stolen. Consists of strings which can be one of the following:
						- coin: Coins are stolen.
						- star: Stars are stolen.
				- specifics [Object]
					- Defines stuff like price and how much can be stolen. Has to have one entry per 'choices' item. Consists of the following:
						- *star/coin* [Object]
							- price [Number/Object/Array]
								- See "price" above.
							- amount [Number/Array] <random>
								- How much can be stolen. Can be an array consisting of two items in case it's a range ([10, 30] would mean it can be anything from 10 to 30). Defaults to being completely random.

			#### Instance Variables
				- *no additional variables are needed. An empty object is enough.*

			#### Activation Variables
				- *no additional variables are needed. An empty object is enough.*

		### 'bank'
			- It's the bank as it works in MP 2 & 3.

			#### Variables inside 'details'
				- invert [Boolean] <false>
					- If true the bank is inverted so it works the way it does on Bowser Land from MP2.

			#### Instance Variables
				- *no additional variables are needed. An empty object is enough.*

			#### Activation Variables
				- OBEAction [String]
					- What action should be done. Can be one of the following (note, these apply to the regular bank, if the bank is inverted so will these):
						- pay: The player pays the bank.
						- clear: The player clears the bank.
				- player [String] <context>
					- For which player this should be applied to.

		### 'pickAPath'
			- Placed on a junction.
			- Players have to pick one of 4 (or however many) options, some of them are good, some of them bad.
			- Choices will be reset once all choices have been picked once.

			#### Variables inside 'details'
				- choiceAmount [Number]
					- How many choices there are.
				- goodChoices [Number]
					- How many good choices there are. It's assumed all others are bad.

			#### Instance Variables
				- goodPath [Number]
					- Pathway ID of the path that will be taken automatically if a good choice was made.
				- badPath [Number]
					- Pathway ID of the path that will be taken automatically if a bad choice was made.

			#### Activation Variables
				- *no additional variables are needed. An empty object is enough.*

		### 'switchPathways'
			- Switches out pathways.

			#### Variables inside 'details'
				- pathwayIDs [Array]
					- An array consisting of all pathway IDs that are switched out.
				- switchType [String]
					- How the pathways should be switched out. Can be one of the following:
						- loopAll: Switches out all pathways specified and replaces every one with a set pathway.
						- switchOut: Simply switches out each pathway with the previous one specified.
				- loop [Array]
					- Only needed if 'switchType' is set to 'switchOut'.
					- All pathways specified will be replaced with these. The first item should be what's used at the beginning of the game.
					- Consists of objects that consist of the following:
						- pathwayType [String]
							- See "Path" docs.
						- occurence [Object]
							- See "Path" docs.
						- details [Object]
							- See "Path" docs.

			#### Instance Variables
				- *no additional variables are needed. An empty object is enough.*

			#### Activation Variables
				- OBEAction [String]
					- What should be done. Can be one of the following:
						- switch: Switches out the pathways as specified.

		### 'switchDoor'
			- Usually found on a junction.
			- Blocks the players path.
			- Are usually in two colors.
			- One color is open, the other ones closed.

			#### Variables inside 'details'
				- colors [Object]
					- The colors of the doors. Consists of the following:
						- _index [Array]
							- Array consisting of all the color names.
						- *color name* [Object]
							- The name of the color. Consists of the following:
								- defaultState [String]
									- What the default state of the color is. Can be one of the following:
										- open: The doors open.
										- closed: The doors closed.

			#### Instance variables
				- color
				- blockedPathways [Number/Array]
					- The Pathway ID of the pathway that's blocked or an array of them.

			#### Activation variables
				- OBEAction [String]
					- switchStates: Switches the state of all colors (open doors close, closed doors open).

		### 'barricade'
			- Usually found on a junction.
			- Blocks the players path.
			- Players can only pass through if they have enough coins (though no coins have to be paid, simply owning enough coins is already enough).

			#### Variables inside 'details'
				- requirementType [String] <coin>
					- What should be required. Can be one of the following:
						- coin: A certain amount of coins is required.
				- requirement [Number]
					- How much has to be required, depends on 'requirementType'. Note that nothing is payed here, even if 20 coins are required they are not taken away after passing through.

			#### Instance variables
				- pathwayID [Number/Array]
					- The pathway ID of the pathways that are blocked off. Can be an array in case it's multiple.

			#### Activation Variables
				- *no activation variables are needed*

		### 'paywall'
			- The player has to pay a certain amount to pass through, the next player has to pay more than the previous player did so the price goes higher with each time.

			#### Variables inside 'details'
				- initialAmount [Number]
					- The initial price in coins to pass through.
				- minIncrease [Number] <1>
					- The next player has to pay this many coins more than the previous player did. If a player pays 10 coins to go through and this is set to 2, then the next player has to pay 12 coins.
				- maxAmount [Number] <none>
					- The max amount of coins that can be paid. Price will not increase after that. Defaults to no limit.

			#### Instance Variables
				- *no additional variables are needed. An empty object is enough.*

			#### Activation Variables
				- *no additional variables are needed. An empty object is enough.*

		### 'blockade'
			- Blockades are usually found on a junction.
			- Blockades are likely a character like a Whomp.
			- The player has to pay a certain amount to pass through.
			- If the player declines they simply go down the other path.
			- The blockade always blocks the path that the last player took. The default direction at the start of a game can be specified.

			#### Variables inside 'details'
				- *no additional variables are needed. An empty object is enough.*

			#### Instance Variables
				- defaultPathwayID [Number] <random>
					- The default direction that gets blocked at the beginning of the game. Has to be the pathway ID of the pathway that gets blocked. Defaults to random.

			#### Activation Variables
				- *no additional variables are needed. An empty object is enough.*

		### 'minecart'
			- A minecart that goes along a track and pushes all players away.

			#### Variables inside 'details'
				- includePlayer [Boolean/String] <false>
					- If true the player that started the occurence is moved as well. Can be true/false or one of the following strings:
						- optional: The player has the option on whether they want to be moved as well.
				- canAvoid [boolean] <false>
					- If true the minecart can be avoided (likely through a timed event). If avoided the player won't be moved.
				- lockMultiDestination [Boolean] <false>
					- If true players will only be pushed to the first destination. When calling this occurence a value of 'unlock' can be used to unlock the next destination (one call unlocks one more destination).

			#### Instance Variables
				- destination [Number/Array]
					- The space ID of the space the players land on afterwards. This can also be an array consisting of possible destinations in case there's multiple.
				- railway [Array]
					- An array consisting of all the space IDs the minecart drives over. In case there's multiple destinations then this can be an array consisting of arrays (one array per destination).

			#### Activation Variables
				- OBEAction [String] <start>
					- What action should be taken. Can be one of the following:
						- start: The occurence starts.
						- unlock: One more destination is unlocked.

		### 'train'
			- A train goes along the track and pushes all players away, stops on each station and can go backwards as well.

			#### Variables inside 'details'
				- allowBackwards [Boolean] <false>
					- If true the train is allowed to drive backwards.

			#### Instance Variables
				- stations [Array] <none>
					- Should only be used in case the railway is split into several pieces and the train stops on each train station. Is an array consisting of objects, those objects include the following:
						- destination [Number]
							- The space ID of the space the players land on afterwards (incl. the player that executed the occurence).
						- railway [Array]
							- An array consisting of all the space IDs the train drives over.

			#### Activation Variables
				- *no additional variables are needed. An empty object is enough.*

		### 'parade'
			- A parade goes through the entire stage and pushes all players away. The path the parade takes can be changed. Players can lose coins or similar things for each space they get pushed away.

			#### Variables inside 'details'
				- destination [Number]
					- The space ID of the space the players land on afterwards.
				- startingRailway [Array]
					- An array consisting of all the space IDs the parade walks over until the first junction (junction included).
				- alternativeRailways [Object]
					- Is an object that lists all alternative railways. Object consists of the following:
						- *name* [Array]
							- An array consisting of all the space IDs the parade walks over until the first junction (junction included). Has to be the same name that one 'paradeDirections' already uses inside the path object.
				- perSpaceEvent [Object/Array] <none>
					- See "events" in the docs. Gets executed for each space the players caught walk over.

			#### Instance Variables
				- *no additional variables are needed. An empty object is enough.*

			#### Activation Variables
				- *no additional variables are needed. An empty object is enough.*

		### 'paradeJunction'
			- Changes the path of the parade. Should be used together with a 'parade' type occurence.

			#### Variables inside 'details'
				- paradeDirections [Object]
					- Defines the alternate paths the parade can take. Object consists of the following:
						- _index [Array of Strings]
							- Includes the names for all other items in this object.
						- *name* [Object]
							- Is one alternative path the parade can take. Object consists of the following:
								- fullName [String]
									- The full name of the alternative path (needed so the user can select which path it should take).
								- direction [String]
									- A direction from 0 to 360. 0 and 360 are both at the very top, 180 is the very bottom. It doesn't have to be pixel-accurate or anything, a rough direction is fine. The site will dynamically create strings for them (like "Top left" or "South"). Preferably one of the following (though they don't have to be):
										-   0 = top
										-  45 = top right
										-  90 = right
										- 135 = bottom right
										- 180 = bottom
										- 225 = bottom left
										- 270 = left
										- 315 = top left

			#### Instance Variables
				- defaultParadeDirection [String]
					- Is the name of the default direction that's used at the start of the game (see 'paradeDirections').

			#### Activation Variables
				- *no additional variables are needed. An empty object is enough.*

		### 'piranhaSeed'
			- Players can plant a piranha seed on a space.
			- If another player lands on it the piranha planter can steal something (usually a star)
			- If there's nothing to steal then nothing is done.
			- If the plant steals something then it will disappear afterwards and a new seed can be planted in it's place.

			#### Variables inside 'details'
				- events [Object]
					- See "events" in docs. Targets the player that planted the seed.
				- selfEvents [Object]
					- See "events" in docs. Gets executed if the player that planted the seed land on their own space.

			#### Instance Variables
				- *no additional variables are needed. An empty object is enough.*

			#### Activation Variables
				- *no additional variables are needed. An empty object is enough.*

		### 'cannon'
			- A player will be launched to a random part of the map.
			- Usually used on maps that have several island and each cannon only fires the player to a specific island (though a random space on each island).

			#### Variables inside 'details'
				- landingSpots [Object]
					- A list of possible landing spots. Consists of the following:
						- _index [Array]
							- Array consists of all names in string form.
						- *landing spot name* [Array]
							- An array consisting of all pathway IDs that are possible spots.

			#### Instance Variables
				- targetedIsland [String/Array]
					- The name of a 'landingSpots' variable. Can be an array in case the target can change. First array item is default.

			#### Activation Variables
				- OBEAction [String]
					- What should be done. Can be one of the following:
						- fire: The player will be fired.
						- rotateTarget: The targeted island will be switched. 'targetedIsland' has to be an array in this case and it will simply switch to the target next in-line.

		### 'chanceTime'
			- It's the friendship destroying Chance Time. One player can move stars and coins of any amount between two players.

			#### Variables inside 'details'
				- toBowser [Boolean] <false>
					- If true all coins/stars go to Bowser. 'direction' inside the possibilities can be skipped if this is true.
				- possibilities [Array]
					- Lists all possible outcomes. Array consists of objects that include the following:
						- direction [String]
							- The direction it's going in. Can be skipped in case it goes to Bowser. Can be one of the following:
								- rightToLeft: Coins/Stars go from the right player to the left.
								- leftToRight: Coins/Stars go from the left player to the right.
								- swap: Coins/Stars are swapped.
						- collectible [String]
							- The collectible that's to be swapped. Can be one of the following:
								- star: Stars are swapped.
								- coin: Coins are swapped.
						- amount [Number]
							- Amount of stars/coins.

			#### Instance Variables
				- *no additional variables are needed. An empty object is enough.*

			#### Activation Variables
				- *no additional variables are needed. An empty object is enough.*

		### 'duel'
			- It's a duel that's played on the board, similar to a battle minigame in that players involved will have to wager coins and winner takes it all (or most at least).

			#### Variables inside 'details'
				- playersInvolved [Number] <2>
					- How many players are involved in the duel.
				- playerSelection [String] <select>
					- How the players are selected. Is a simple "randomnessType" string. Not needed in case 'playersInvolved' is set to all players.
				- wager [String/Array]
					- What the wager is about. Can be either 'stars', 'miniStars' or 'coins'. In case it can be multiple an Array can be used including all potential options (['stars', 'coins'] in case in can be either coins or stars).
				- wagerAmount [Number/Array/String]
					- How much the wager is. Can be an array consisting of all possibilities in case it's random. Can also be one of the following strings if they apply:
						- custom: The player that started the occurence can pick how much is wagered. Can not be more than what the other players have.
				- leftoverCoinDistribution [String] <random>
					- How the leftover coins should be distributed. Can be one of the following:
						- random: Gives coins to a random player. User has to select which one it is.
						- none: No one gets the coin.
						- noLeftover: There's never any leftover coins because the winner takes all. As a failsafe no one gets the coin if there's a leftover one afterall.
				- returnCoinsIfAllTied [Boolean] <true>
					- If true everyone gets their coins back when everyone is tied. Otherwise they're given out the way 'resultDistribution' defines it.
				- resultDistribution [Object]
					- How the results are given out.
					- See 'minigameReward' on how this works. The only difference is that the items here include a number instead of an event object.
					- Object consists of the following (examples included):
						- _*placement*x*number of people tied* [Number]
							- Specifies the percentage of coins that are given out.
						- _1x1: Used for when a single person is 1st.
						- _1x2: Used for when two people are tied for 1st.
						- _3x2: Used for when two people are tied for 3rd.
						- _2x*: Used for when any amount of players are 2nd.
						- _*x3: Used for when 3 people are tied for any position.
						- _wx*: Used for when any amount of people won (only used if 'minigameRankingType' is 'winLose').

			#### Instance Variables
				- *no additional variables are needed. An empty object is enough.*

			#### Activation Variables
				- *no additional variables are needed. An empty object is enough.*

# Spaces
	- Inside each game this object is found. It lists all spaces and their default behaviour.
		- In case some modes or boards have spaces that work differently then the 'spaces' oddity can be used to overwrite them.
			- Note that this shouldn't be used to exclude spaces that aren't present on some boards (unless it's a specific feature of the board).
	- In addition to each game, '_all' also has this object to list all spaces in the entire series.
		- Generally, the behaviour that's present in most games should be used. Though this isn't a fixed rule.
	- This object always has a '_index' array at the beginning that lists all entries as strings.

	## Variables inside spaces
		- metadata [Object]
			- See "metadata" above.
		- spaceType [String] <regular>
			- Defines what type of space it is. Can be one of the following:
				- regular: A regular space.
				- star: A star space used by the star. Does not take anything from the dice throw away despite walking over it. Players can not land on it.
				- ownership: The space starts of as neutral but when the first player lands on it they own that space.
				- checkpoint: A checkpoint space that increases the checkpoint counter. Depends on the 'checkpoints' oddity. The final checkpoint acts like 'goal'. If no checkpoints are used then it acts like a regular space.
				- goal: The final space which ends the game. Can only be used when the 'gameEnd' oddity is set to 'reachGoalSingle' or 'reachGoalAll', otherwise it functions as a regular space.
				- bowserGoal: The final space where Bowser is at. Bowser starts to attack, throw a 4 or higher and the game ends, otherwise it continues. If the player just reached the space then bonus dice won't be used, if the player starts their turn on this space then bonus dice will be used. Can only be used when the 'gameEnd' oddity is set to 'reachGoalSingle' or 'reachGoalAll', otherwise it functions as a regular space.
		- dayNightAvailability [String] <always>
			- Whether a space is only available during day or night (or always). Used alongside 'dayNightConvert' for spaces that convert from one to another when the day changes to night or the reverse. Only use this for spaces that always get converted, some boards have individual spaces that convert (like some more happening spaces during the night), those should not be included here. Can be one of the following:
				- always: The space is available during night and day.
				- day: The space is only available during day.
				- night: The space is only available during night.
		- dayNightConvert [String] <none>
			- Only needed if 'dayNightAvailability' is either 'day' or 'night'. Used to define spaces that convert from one to another when the day changes to night or the reverse. Has to be the name of the space it got converted from/gets converted to.
		- final5Availability [String] <always>
			- Whether a space is only available before or after the final 5. Used alongside 'final5Convert' for spaces that convert from one to another after the final 5. Can be one of the following:
				- always: The space is always available regardless of final 5.
				- pre: Space is only available before the final 5.
				- post: Space is only available after the final 5.
		- final5Convert [String] <none>
			- Only needed if 'final5Availablity' is either 'pre' or 'post'. Used to define spaces that convert from one space to another after the final 5. Has to be the name of the space it got converted from/gets converted to.
		- stopPlayer [Boolean] <false>
			- If true it stops the player on it regardless of how far they could go. Will ask the player for the remaining dice total which will be subtracted from the running bonus star. Will be ignored if 'spaceType' is 'star'.
		- differentEventPerSpace [Boolean] <false>
			- If true the space will always do something different each time. If true the 'events' variable below should be used to include all possibilities while the pathways should be specific to each space.
		- events [Object/Array] <pass>
			- See "events" for reference. If not present it will do nothing. Not used when 'spaceType' is 'ownership'.
		- ownershipEvents [Object]
			- Only needed if 'spaceType' is 'ownership'. Object contains the following:
				- neutral [Object]
					- An event object. Gets executed when the space is still neutral (basically when the first player lands on it).
				- self [Object]
					- An event object. Gets executed when the space belongs to the player that lands on it.
				- rival [Object]
					- An event object. Gets executed when the space belongs to someone else.

# Items
	- Inside each game this object is found. It lists all items and their default behaviour.
		- In case some modes or boards have items that work differently then the 'items' oddity can be used to overwrite them.
	- In addition to each game, '_all' also has this object to list all items in the entire series.
		- Generally, the behaviour that's present in most games should be used. Though this isn't a fixed rule.
	- This object always has a '_index' array at the beginning that lists all entries as strings.

	- Has a '_inGameCategoryMetadata' object that includes the following:
		- '_index', an array consisting of strings. Includes all names of the in-game categories (needs to be the same name used inside the 'inGameCategory' variables).
		- *category name, a metadata object. Again, has to be the name used inside the 'inGameCategory' variables.
	- In addition, the 'items' object inside '_all' also has a '_dbCategoryMetadata' that consists of the same items as the '_inGameCategoryMetadata' except for 'dbCategory' instead of 'inGameCategory'.

	## Variables inside items
		- metadata [Object]
			- See "metadata" above.
		- cantUseWhenEffectActive [String/Array] <none>
			- Used if a item can't be used while a certain effect is active. Has to be the short name (defined in 'effectName') or an array of them. In case of an array the item can't be used when any of the effects is active.
		- multipleInOneSlot [Boolean] <false>
			- If true it can hold multiple items in one slot (see Boosters from MPIT). This also allows multiple items from the same type to be used in one turn.
		- maxAmount [Number] <1>
			- Only needed if 'multipleInOneSlot' is true. Max amount of items that can be stored in one slot. Also defines the max amount of items of the same type that can be used in one turn.
		- inGameCategory [String] <none>
			- The category of the item based on how it's listed in-game. Not all games need this. Items without a category will be listed last with the name "Uncategorized items".
		- dbCategory [String]
			- The category of the item but not how it's listed in-game. Items without a category will be listed last with the name "Uncategorized items". Can be one of the following:
				- self, items used on the player themselves like mushrooms
				- thrown, affects players that land on it like hexes in MPDS or some orbs
				- roadblock, affects players that simply pass it like some orbs
				- protect, protects the player from attacks like stopping boo from stealing coins/stars
		- event [Object/Array] <pass>
			- See "events" for reference. If not present it will do nothing.

# Dice
	- Inside each game this object is found. It lists all dice and their default behaviour.
		- In case some modes or boards have dice that work differently then the 'dice' oddity can be used to overwrite them.
	- In addition to each game, '_all' also has this object to list all dice in the entire series.
		- Generally, the behaviour that's present in most games should be used. Though this isn't a fixed rule.
	- This object always has a '_index' array at the beginning that lists all entries as strings.

	## Variables inside dice
		- metadata [Object]
			- See "metadata" above.
		- numbers [Number/Array]
			- Array consisting of numbers. Has to include each number that's possible to roll. Repeats should be included in case the amount of sides is consistent, like in SMP where each dice has 6 sides so this array should also always consist of 6 numbers.
			- In case a 'number' does different things like add coins or move everyone else then a string can be used in one of the following ways:
				- For coins use a string that starts with 'c' and has the number behind it. 'c-2' removes two coins, 'c5' would add 5 coins.
				- For dice that moves the player forward and everyone else backwards a string starting with 'm' can be used. 'm2' would move the player 2 forward and everyone else 2 backwards.
				- For the Banzai Bill launch on "Banzai Bill's Mad Mountain" a simple 'z' can be used.
				- For the Bowser Card a simple 'b' can be used.
				- Alternatively, regular dice throws can also be specified by using a string starting with 'd', so 'd6' would be a regular 6 without any special features added to it.
			- In case the type is 'card' a single number can also be used. Cards that can throw multiple numbers should still use arrays though.
		- design [Object] <none>
			- Defines what the dice looks like, not in super great detail but just enough to display the numbers accordingly on the site.
			- Object consists of the numbers in string form (so a regular 6 would be written as a 'd6', while 'c-2' would still be 'c-2'). Those objects contain the following:
				- image [String] <none>
					- The path to the image that should be displayed. Skip this variable if no image should be displayed. For 'numbers' that have numbers involved (like 'c-2') the number is still displayed on top of the image. For 'numbers' that don't have a number (like a plain 'b') then the image is displayed and nothing else.
				- fontColor [String] <black>
					- The color of the dice number in HTML format (#ffffff being white). Only use if the color is significantly different from other numbers. If the entire dice has a different color on all sides then this shouldn't be used.
				- backgroundColor [String] <blank>
					- The color of the background in HTML format (#ffffff being white). Same rules as 'fontColor', only use if significantly different from other numbers.
		- numberRepeats [Number] <1>
			- How often each number has to be repeated. This will repeat EVERY number so only use this if every number is repeated like the ally dice from SMP which only have a 1 and 2, there 'numbers' above only consists of those two with a repeat value of 3 which produces a dice of [1, 1, 1, 2, 2, 2].
		- limitToCharacters [Array/String] <all>
			- All characters that can use the dice. Note that others can use it anyway as long as the required character is an ally (if Luigi has Mario as an ally then Luigi can still use a dice that only Mario can use). Can be a single string in case it's only one character. If not present it's assumed all characters are allowed to use the dice.
		- onlyAsItem [Boolean] <false>
			- If true the dice can only be used through an item. The dice will also be handled like an item. Dice are automatically given the 'self' category for 'dbCategory'.
		- inGameCategory [String] <none>
			- Only needed if 'onlyAsItem' is true. See 'inGameCategory' for items, it's the exact same thing.
		- diceType [String]
			- What type of dice this is. Can be one of the following:
				- regular: A regular dice that can be used at any time.
				- ally: An ally dice that allies use in the background alongside a regular dice.
				- bonus: A bonus dice. Works like a regular dice except they get used on top of the original dice so a player can roll 2 (or more) dice all at once.
				- card: Not a dice but a card instead. Player owns ~3 cards and can pick one (exact amount of cards owned can vary). If one card is listed then all regular dice get handled like cards as well (note: only dice with type 'regular', 'bonus' dice are NOT included in this).

# Minigames
	- Each game has a 'minigames' object that lists all minigames in the game.
	- Has a '_index' array at the beginning that lists all of the minigame names as strings (the name of the minigame objects, not the full name).

	## Variables inside minigames
		- metadata [Object]
			- See "metadata" above.
		- minigameType [String]
			- The type of minigame it is. Can be one of the following: [more to be added]
				- 4player: 4 player free for all.
				- 2v2: two against two
				- 1v3: one against three
				- 1player: single-player minigame
		- minigameCategory [String] <*same as minigameType*>
			- What category the minigame is in. Uses each games own category system.
		- coinMinigame [Boolean] <false>
			- If true it's a coin minigame where the players gain the amount of coins they collected in the minigame. For 2v2 coin minigames both players get the amount of coins collected, it's NOT split up (if a MP handles it differently it'll likely be controlled through an oddity).
		- allowAdditionalCoins [Boolean/String] <false>
			- If additional coins can be obtained. This is only needed if 'coinMinigame' is set to false. Only really useful for Bowl Over in MP1. Can be a string in the following cases:
				- only1Player: In case only the 1 player can get additional coins in a 1v3 minigame.
				- only3Players: In case only the 3 players can get additional coins in a 1v3 minigame.
		- allowCoinLoss [Boolean/String] <false>
			- If true coins can be lost during the minigame. Note that this only applies if coins are lost by actions during the minigame, if coins are lost after the minigame simply because the player lost then that doesn't count. Can be a string in the following cases:
				- only1Player: In case only the 1 player can get additional coins in a 1v3 minigame.
				- only3Players: In case only the 3 players can get additional coins in a 1v3 minigame.
		- allyMinigame [Boolean] <false>
			- If true allies are involved in the minigame and they can win for the player as well.
		- minigameRewardOverwrite [Object] <none>
			- Overwrites the 'minigameReward' oddity. Uses the exact same format as the 'minigameReward' oddity.
		- reusedFrom [String] <none>
			- The name of the minigame it's reused from (has to be the name of the database object), if empty it's assumed the minigame is new and not reused. Use 'reusedFromGame' to specify the game it's reused from (if it is from another game).
			- Additionally, if this is used then all variables from the original will be used here as well. Although variables specified here will take priority.
		- reusedFromGame [String] <none>
			- The name of the game, see 'reusedFrom'.

# Bonus Stars
	- Inside each game this object is found. It lists all bonus stars and their default behaviour.
		- In case some modes or boards have bonus stars that work differently than the 'bonusStars' oddity can be used to overwrite them.
	- In addition to each game, '_all' also has this object to list all bonus stars in the entire series.
		- Generally, the behaviour that's present in most games should be used. Though this isn't a fixed rule.
	- This object always has a '_index' array at the beginning that lists all entries as strings.

	## Variables inside bonus stars
		- metadata [Object]
			- See "metadata" in the docs.
		- bonusStarType [String]
			- What type of bonus star it is. Can be one of the following:
				- space: Whoever landed on the most spaces wins this.
				- coin: Whoever gained the most coins wins this.
				- minigame: Whoever won the most minigames wins this.
				- distance: Whoever walked over the most spaces wins this.
				- shop: Whoever spent the most coins in a shop wins this.
				- item: Whoever used the most items wins this.
				- collect: Whoever collected the most stuff wins this. [will be changed]
				- ally: Ally-related bonus stars.
				- stomp: Whoever stomps the most or gets stomped on the most wins this.
		- invert [Boolean] <false>
			- If true the player with the lowest score wins instead.
		- cantBeTracked [Boolean] <false>
			- If true the bonus star can't be tracked due to being either random or because no one knows how it works.
		- details [Object]
			- Contains details about the bonus star. Depends entirely on what 'bonusStarType' is.

		### 'space' details
			- spacesAllowed [Array/String] <all>
				- If it's just a single space then it can be a string instead of an array.
				- List of all space names that should count. Defaults to allowing all spaces.
				- A "Happening Star" would only list the ?-Space in here so only those are counted.

		### 'coin' details
			- coinStarType [String]
				- How the coin star should be counted. Can be one of the following:
					- highest: The player that had the highest coin total wins.
					- total: The player that collected the most coins in total wins.

		### 'minigame' details
			- minigameStarType [String]
				- How the minigame wins should be counted. Can be one of the following:
					- win: The player that won the most minigames wins.
					- coin: The player that earned the most coins in minigames wins.
			- whatCounts [String]
				- What should count. Will be changed in an update to make it better. Can be one of the following:
					- onlyRegularMinigames: Only regular minigames count.
					- allMinigames: All minigames count (this includes duels, battles, game guy, etc).
					- duelOnly: Only duels count.

		### 'distance' details
			- *no additional variables are needed. 'details' can be an empty object.*

		### 'shop' details
			- *no additional variables are needed. 'details' can be an empty object.*

		### 'item' details
			- itemsAllowed [Array] <all>
				- List of all item names that should count. Defaults to allowing all items.

		### 'collect' details
			- collectWhat [String]
				- What should be collected. Will be changed in an update to make it better. Can be one of the following:
					- miniZtar
					- balloon
					- starBalloon

		### 'ally' details
			- allyStarType [String]
				- How the bonus star should work. Can be one of the following:
					- most: Whoever has the most allies at the end wins this.
					- time: Whoever spent the most time with allies, fuck knows whether thats turns or actual time or whatever.
					- buddy: Fuck knows how you get it, you just do (or rather, you don't).

		### 'stomp' details
			- stompStarType [String]
				- How the bonus star should work. Can be one of the following:
					- stompOthers: The player that stomps other players the most wins this.
					- getStompedOn: The player that gets stomped on the most wins this.

*/