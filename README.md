# Mario Party Overlay
## What's Mario Party Overlay?
Mario Party Overlay is a highly customizable and easy to use 'Bonus Star' tracker for the Mario Party series, supporting every game in it (incl. the upcoming Mario Party Superstars once it's released -- that said, it will likely take a week or so until all the bonus stars are found and implemented). It also includes a greenscreen so it can be used in a livestream!

**[Website](https://blueyoshi9000.github.io/MarioPartyOverlay/)**   

## How to use?
Click on the numbers to increase the counters, by holding Ctrl you can decrease them instead. The amount can be changed at the top (1, 5 or 10).  
It's possible to switch between 1 and 5/10 by holding Shift.  
To give/take the coin-star you just click on the character.

Characters and counters can both be changed at the top.

Settings can be found by clicking on the gear and then "Open Settings" (or by clicking on the gear while holding Ctrl).

A more extensive (and likely up-to-date) introduction can by found by clicking on the gear and then "Credits".

## The new Mario Party hasn't been added yet, what do?
Scream at me somewhere I see it, whether it's on [Mastodon](https://wetdry.world/@blueYOSHMIN), [Bluesky](https://bsky.app/profile/yoshmin.com), by creating a Github issue or anywhere else you find me. I'm infinitely more likely to support a newly released game by knowing someone's actually still using this lmao.

## Rewrite
There is "currently" a rewrite of this in progress. I said "currently" because I'm not exactly working on it much lmao, so don't expect it anytime soon. Doesn't mean the current version is unusable though, because the biggest reason for it is that the codebase is trash, the site itself does still work fine. You can check out the rewrite progress on the rewrite branch here.

## Credits
**All characters, products and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them. Mario Party is a registered trademark of Nintendo.**

Created by [blueYOSHI](https://wetdry.world/@blueYOSHMIN) with contributions from [others](https://github.com/blueYOSHI9000/MarioPartyOverlay/graphs/contributors)

Icons, libraries and other things are done by various people, visit the website to view the full list ([direct link to credits](https://blueyoshi9000.github.io/MarioPartyOverlay/?credits=1))

Mario Party Overlay is licensed under the MIT License.

## How to add a new game
Mostly notes for myself in the future, or to someone who's dedicated enough to touch this mess of a code lmao.

### Bonus Star Site ###
- Add Game Logo to `/img`, has to be 100px height.
- Add Bonus Star icons to `/img` (40x40px) and to `/img/bonus` (ideally 100x100px)
- Add game to 'gameSelector' at the top of `bonus.html`
- Add game to `bonus.css`, with a fitting width
- Update `bonus.html` by adding new Bonus Stars & adding the game to every single previous bonus star, don't forget the `sub-mp3` classes and on-hover `title` on the alternatives names!
- Add the game to the switch statement inside `bonus.js`
- Possibly update the "Bonus Star Explanations" text at the top of `bonus.html`

### Actual Tracker (Games & Characters) ###
- Add character icons to `img/mpsrIcons` & `img/mk8Icons`
- Add games to settings header
- Add game to list of games in `style.css` (don't forget the @media section immediately below that)
- Add characters to list of characters in `style.css`
- Add characters to 'charList' at the top of `boot.js`
- Update the 'updateNvChar()' function in `characters.js` to reflect the in-game order
- Add Game to 'counterNameList' at the top of `boot.js`

### Actual Tracker (Bonus Stars)
- Add counter icons to `img` and optionally in a subfolder for the game like `img/mp8`
- Add Counters to the setting panel in `index.html`, don't forget the `mp6C` classes or whatever game it is
- Add Counters to list of counters in `style.css`
- Add Game & Bonus Stars to 'counterNameList' at the top of `boot.js`
- Add Counters to 'counterNameList' at the top of `boot.js`
- Add Counters to the 'counters' array at the top of `boot.js`
- Add Game & Bonus Stars to 'changeGame' in `characters.js`

### Credit
- Remember to credit everyone whose sprites were used