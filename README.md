# What's Mario Party Overlay?
Mario Party Overlay is a website to display which player gets the bonus stars in the Mario Party games 1-10 and DS. It's also possible to include this in a Stream through OBS or other streaming software thanks to the greenscreen effect.  

**[Website (Desktop)](https://blueyoshi9000.github.io/MarioPartyOverlay/)**  
**[Website (Mobile)](https://blueyoshi9000.github.io/MarioPartyOverlay/mobile.html)** (should be on Landscape mode)  
[Tutorial](https://github.com/blueYOSHI9000/MarioPartyOverlay/wiki)

# Credits
Created by [blueYOSHI9000](https://www.twitter.com/blueyoshi9000)  
Character Sprites ripped by [Random Talking Bush](https://twitter.com/RandomTBush) and edited by [RicoDexter](https://twitter.com/Der_RicoDexter) & [blueYOSHI9000](https://www.twitter.com/blueyoshi9000)

[Font](https://www.freepremiumfonts.com/free-font/new-super-mario-font-mario-party-9.aspx)  
[Interact.js](http://interactjs.io/) (enables drag 'n' drop)  
[tapic.js](https://github.com/Skhmt/tapic) (enables everything Twitch related)

# Changelog

v1.5.0
- Added: Text output, outputing all counters as text

v1.4.1
- Fixed: Not being able to scroll in settings

v1.4
- Added: Mobile version, smaller and easier to add stuff while playing
- Fixed: That the coin star display didn't update if it wouldve been below 0

v1.3.1
- Changed: Hide Counters System, saved some space in the JS file

v1.3
- Added: Backup system: Allow to backup all counters and restore them
- Added: Coin star tie system: Show multiple characters at the same time when theres a coin star tie
- Added: Reset: Reset all counters with a button press, no more reloading!
- Changed: Settings: All settings are moved to a seperate settings "window" on the site itself
- Changed: Wiki Tutorial: The tutorial was moved to the Github wiki and isn't on the site anymore
- Fixed: Minor glitches I already forgot about because they were so minor

v1.2
- Added: Twitch chat interaction, change everything through chat commands
- Added: Twitch permission system so only accepted users can change stuff
- Added: Option to use MPO in OBS' Browser Source (requires Twitch to do so tho')
- Fixed: Wrong font link in this file

v1.1.3
- Added: Option to change the counter highlighting color
- Fixed: Explanation text being displayed at the wrong spot

v1.1.2
- Added: Option to replace the Explanation Text with the Bonus Star names
- Changed: Counters now update immediately and should have less lag overall on slower PCs

v1.1.1 
- Added: MP10 Characters
- Added: Ability to hide anything MP9&10 related (because why not?)

v1.1.0
- Added: Mario Party 9 Support
- Added: Ability to reset the Highlight feature
- Changed: Tutorial, now able to show and hide each tutorial

v1.0.2  
- Added: Counter Highlights
- Bugfix: Firefox now resets the Computer Display when reloading

v1.0.1  
- Added: Drag 'n' Drop

v1.0.0  
- Changed: Literally everything
- Added: Red Spaces, Running, Shopping, Orb and Candy counter
- Added: On/Off buttons to hide and show counters
- Changed: Reduced A LOT of wasted space in the JS.js file, also made it easier to add new stuff
- Changed: Even better Layout!
- Changed: Better Tutorial
- Bugfix: Fixed the background, it got a better mirror effect now

v0.2.0  
- Added: Minigame Counter
- Added: Max. Coins Counter
- Added: Background
- Added: Changelog
- Changed: Tutorial is now hidden by default (would be something that v1.0 shouldve had...)
- Changed: WAY better Layout
- Bugfix (already): Fixed so the Turn counter can count from 3-9, how did I even miss that...


v0.1.0 (Inital Release)  
- Added: Character Select (incl. COM)
- Added: Happening Counter
- Added: Turn Counter
- Added: Blue-screen
- Added: Terrible Layout
