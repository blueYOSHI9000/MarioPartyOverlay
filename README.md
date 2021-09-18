# Mario Party Overlay (MPO) Rewrite
This is a in-progress rewrite of the entirety of MPO, starting from complete scratch. You can see the progress of it [here](https://github.com/blueYOSHI9000/MarioPartyOverlay/projects/7)

## What even is this? What does it do?
MPO is a stat tracker for the entire Mario Party series. It tracks all kinds of stats ranging from "who stepped on the most blue spaces" to "who used the most mushrooms". That said, it's most useful and major feature is tracking Bonus Stars, the ones awarded to the players who won the most minigames or stepped on the most happening spaces.

## Why rewrite it?
Because the code of the old website is trash and I don't wanna work with it anymore. It's worth adding that I learned how to code through MPO, so you can imagine the quality of a programmers first program. Even if the website itself ended up looking relatively good, the code itself is still absolute trash and a pain to work with.

## What's gonna be so much better about it?
This time I actually planned things out in advance in order to make it as future-proof as possible. Of course, with a series as vast and filled with gimmicks it's gonna be quite difficult but I'm confident I can make it work.

The website will now work entirely through a single "database" file that specifies absolutely everything about the entire Mario Party series which ranges from "a blue space gives 3 coins" to "this game uses a battle minigame every time the total of all dice rolls is dividable through 10" (which would be MPDS btw). The database structure is already mostly planned out, though it still has to be filled in (which is a lot more work than it might seem at first).

This would mean if a new Mario Party game releases then all that has to be done is to edit the database file and nothing else. Of course, that'd be a bit much to be actually true but it's likely not too far off either. I'm sure some changes would have to be made here and there to make it work (especially if the game uses a completely new gameplay style) but overall it'd be much easier to maintain than having to rewrite half the site just to support a new game...

## Where can I find that database file?
The file can be found inside [database/mp-db.js](https://github.com/blueYOSHI9000/MarioPartyOverlay/blob/rewrite/database/mp-db.js). Do note that it's barely filled out, it currently only really lists MP1 related stuff. That said, the most basic things to make the tracker function are there for all games (mainly the bonus stars and characters).

The documentation for it can be found inside [database/docs.js](https://github.com/blueYOSHI9000/MarioPartyOverlay/blob/rewrite/database/docs.js), though it isn't too user-friendly yet and kind of a mess but I'll get there at some point.

## Legal stuff & credits
Legal stuff & credits is found on the website (index.html) itself inside settings which can be accessed at the top.