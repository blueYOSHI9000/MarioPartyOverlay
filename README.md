# What's Mario Party Overlay?
Mario Party Overlay is a (offline-)website to display which character gets the bonus stars in the Mario Party games 1-8 and DS. 9 and 10 support is coming soon(tm). It's also possible to include this in a Stream through OBS or other streaming software. It's also possible to change everything, change graphics/font, add counters etc.

**[Website](https://blueyoshi9000.github.io/MarioPartyOverlay/)**

## Download
You can download this through Github, however, then you still require internet since some files aren't included here and instead load them from a different website.
[Mediafire download](http://www.mediafire.com/file/phz4t7pyqqbqxou/Mario+Party+Overlay.zip)

# Mario Party Overlay Tutorial:
I won't explain how you need to change some stuff, I mean, just try the buttons out! It's not like there's a self-destruction button or something... **Basics:** Change everything at the top and record everything at the bottom. *If something isn't obvious, please contact me so I can add it to the Tutorial!!*

**- Coin Star:** You can choose the character there, the "???" are there for the first round when everyone got the same amount of coins.

**- Bonus Star List:** All Counters are based on Bonus Stars, there's a full list avaible at the [Super Mario Wiki.](https://www.mariowiki.com/Bonus_Star#Introduced_in_Mario_Party)

**- On/Off Buttons:** With these you can hide or show certain Counters if you don't need them. You'll also see in which Mario Parties you can get that Bonus Star.

**- Restrictions:** There are some restrictions, however, none of them should be annoying, rather the opposite! Example: You can't set the "Current Turn" higher than the "Max. Turn". If there are restrictions that shouldn't be there, please contact me so I can remove them.

**- Drag 'n' Drop:** There's a button at the very top that can enable and disable drag 'n' drop, with that you can place all the counters wherever you want! Sadly, sometimes the hitboxes are too big for it, I have no idea how to fix that, i'm sorry!! Also, to reset positions you need to reload which also resets all the counters.

## Replace or change Stuff:
Everything is super easy to change! You do need to download this tho'! Link is at the top. You can add new stuff without even knowing how to code! It is way easier if you know the basics tho'.

**Graphics & Font:** Replace the file you want to replace. Nothing more, it's that easy! However, it is recommended to choose square graphics (both sides got the same length) so it looks better. In case you changed a Font, maybe it's too big or too small, in that case: Open "CSS.css" with a editor (preferably a code editor but not required!), there you already see a bit of text in between some ===, that tells you what to do.

**- Add new Characters:** Pretty easy, code editor highly recommened tho'! Anyway, open "index.html" and scroll down, at some point you should see some character names popping up, if you can'st see them, look for a "<option>" tag at the left side. Then just add a new row below the last character and before the "</select>" tag. Insert "<option value="[yourcharacter]">[Your Character]</option>" (note that the first charcter name needs to be lowercase and the same name as your image (without .png at the end)), then scroll down a bit more and do the same. You need to do that 5 times, the last one is almost at the very end. After that, put the character image inside the "img" folder and a COM version inside the "com" folder and everything should work.

**- Add new counters:** Tutorial coming soon(tm), it's a pretty long tutorial and currently just don't have motivation to write that... however, if there aren't too many requests (probably not), just contact me and I can do it for you if I *kinda* like the idea. Also, keep in mind you can just replace the graphics of another counter if you don't need that one!

## OBS Tutorial:
It is recommended to download the site and run it offline to change graphics and other stuff, link is at the top
Run the website on Firefox (or Chrome but OBS doesn't detect that for me). Add a "Window Capture" of the Firefox window. Rightclick > Filters and add "Color Key" (NOT "Chroma Key"!).

Now, there are multiple possibilities, you might try some out for yourself or use one of these: "Similarity" on 1 and "Smoothness" on 1000; "Similarity" on 384 and "Smoothness" on 195. (in case your using a different language of OBS: "Similarity" is the first option and "smoothness" the second, the rest should be obvious)

When selecting the Windows Capture, there are 8 dots at the side, hold "ALT" on your keyboard and cut it to your desire. You might as well copy the Windows Capture to display each character at a different place.
You might as well change the background color: Open "index.html" with a editor, at the very top you can see a small explanation.
Change Font or Images: Just replace the file with the same name, simple as that! In case the font is too small, open "CSS.css" and there are two numbers you need to change, there's a explanation too!

# Planned Features:
If something isn't here and you feel like it could be useful, just contact me and I may add it some day!
- MP 9 & 10: These just work completely different and so need to rewrite a lot.
  
# Credits
Created by [blueYOSHI9000](https://www.twitter.com/blueyoshi9000yt) | Version 1.1 (Changelog at the bottom)
Character Sprites ripped by [Random Talking Bush](https://www.vg-resource.com/user-7.html) and edited by [RicoDexter](https://twitter.com/Der_RicoDexter) & [blueYOSHI9000](https://www.twitter.com/blueyoshi9000yt)

[Font](http://www.mediafire.com/file/phz4t7pyqqbqxou/Mario+Party+Overlay.zip)

[Interact.js (the thing that enables drag 'n' drop)](http://interactjs.io/)

# Changelog
v1.1
     Added: Drag 'n' Drop

v1.0
     Changed: Literally everything

- Added: Red Spaces, Running, Shopping, Orb and Candy counter
- Added: On/Off buttons to hide and show counters
- Changed: Reduced A LOT of wasted space in the JS.js file, also made it easier to add new stuff
- Changed: Even better Layout!
- Changed: Better Tutorial
- Bugfix: Fixed the background, it got a better mirror effect now

v0.2
- Added: Minigame Counter
- Added: Max. Coins Counter
- Added: Background
- Added: Changelog
- Changed: Tutorial is now hidden by default (would be something that v1.0 shouldve had...)
- Changed: WAY better Layout
- Bugfix (already): Fixed so the Turn counter can count from 3-9, how did I even miss that...


v0.1 (Inital Release)
- Added: Character Select (incl. COM)
- Added: Happening Counter
- Added: Turn Counter
- Added: Blue-screen
- Added: Terrible Layout
