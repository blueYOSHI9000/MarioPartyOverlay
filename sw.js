self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('mpo-cache').then(function(cache) {
      return cache.addAll([
        '/','assist-core.js',
        'assist-minigame.js',
        'assist-misc.js',
        'assist-spaces.js',
        'assist-turn.js',
        'characters.js',
        'core.js',
        'font.ttf',
        'index.html',
        'main.js',
        'manifest.json',
        'README.md',
        'boot.js',
        'slots.js',
        'saving.js',
        'navbar.js',
        'sortable.min.js',
        'style.css',
        'sw.js',
        'textoutput.js',
        'img/1st.png', //images start here
        'img/2nd.png',
        'img/3rd.png',
        'img/4th.png',
        'img/ally.png',
        'img/almost.png',
        'img/balloon.png',
        'img/banana.png',
        'img/buddy.png',
        'img/candy.png',
        'img/coins.png',
        'img/com.png',
        'img/doormat.png',
        'img/duel.png',
        'img/friendspace.png',
        'img/happening.png',
        'img/hex.png',
        'img/item.png',
        'img/loner.png',
        'img/minigame.png',
        'img/ministar.png',
        'img/minus.png',
        'img/mp1.png',
        'img/mp10.png',
        'img/mp2.png',
        'img/mp3.png',
        'img/mp4.png',
        'img/mp5.png',
        'img/mp6.png',
        'img/mp7.png',
        'img/mp8.png',
        'img/mp9.png',
        'img/mpa.png',
        'img/mpds.png',
        'img/mpit.png',
        'img/mpsr.png',
        'img/mptt100.png',
        'img/orb.png',
        'img/question.png',
        'img/redspace.png',
        'img/running.png',
        'img/settingsbg-light.png',
        'img/shopping.png',
        'img/smp.png',
        'img/spinspace.png',
        'img/stars.png',
        'img/stompy.png',
        'img/tie.png',
        'img/wanderer.png',
        'img/bgs/castle.jpg',
        'img/bgs/default.jpg',
        'img/bgs/nsmbw.jpg',
        'img/bgs/toadroad.jpg',
        'img/favicon/android-chrome-144x144.png',
        'img/favicon/apple-touch-icon.png',
        'img/favicon/favicon-16x16.png',
        'img/favicon/favicon-32x32.png',
        'img/favicon/favicon.ico',
        'img/favicon/icon-120x120.png',
        'img/favicon/icon-128x128.png',
        'img/favicon/icon-144x144.png',
        'img/favicon/icon-152x152.png',
        'img/favicon/icon-180x180.png',
        'img/favicon/icon-192x192.png',
        'img/favicon/icon-384x384.png',
        'img/favicon/icon-512x512.png',
        'img/favicon/icon-72x72.png',
        'img/favicon/icon-96x96.png',
        'img/favicon/mstile-150x150.png',
        'img/favicon/safari-pinned-tab.svg',
        'img/mk8Icons/birdo.png',
        'img/mk8Icons/blooper.png',
        'img/mk8Icons/boo.png',
        'img/mk8Icons/bowser.png',
        'img/mk8Icons/bowserjr.png',
        'img/mk8Icons/daisy.png',
        'img/mk8Icons/diddy.png',
        'img/mk8Icons/dk.png',
        'img/mk8Icons/drybones.png',
        'img/mk8Icons/goomba.png',
        'img/mk8Icons/hammerbro.png',
        'img/mk8Icons/kamek.png',
        'img/mk8Icons/koopa.png',
        'img/mk8Icons/koopakid.png',
        'img/mk8Icons/luigi.png',
        'img/mk8Icons/mario.png',
        'img/mk8Icons/monty.png',
        'img/mk8Icons/peach.png',
        'img/mk8Icons/pompom.png',
        'img/mk8Icons/rosalina.png',
        'img/mk8Icons/shyguy.png',
        'img/mk8Icons/spike.png',
        'img/mk8Icons/toad.png',
        'img/mk8Icons/toadette.png',
        'img/mk8Icons/waluigi.png',
        'img/mk8Icons/wario.png',
        'img/mk8Icons/yoshi.png',
        'img/mp1/coins.png',
        'img/mp1/com.png',
        'img/mp1/dk.png',
        'img/mp1/happening.png',
        'img/mp1/item.png',
        'img/mp1/luigi.png',
        'img/mp1/mario.png',
        'img/mp1/minigame.png',
        'img/mp1/peach.png',
        'img/mp1/redspace.png',
        'img/mp1/stars.png',
        'img/mp1/wario.png',
        'img/mp1/yoshi.png',
        'img/mp10/daisy.png',
        'img/mp10/dk.png',
        'img/mp10/luigi.png',
        'img/mp10/mario.png',
        'img/mp10/peach.png',
        'img/mp10/rosalina.png',
        'img/mp10/spike.png',
        'img/mp10/toad.png',
        'img/mp10/toadette.png',
        'img/mp10/waluigi.png',
        'img/mp10/wario.png',
        'img/mp10/yoshi.png',
        'img/mp2/coins.png',
        'img/mp2/com.png',
        'img/mp2/dk.png',
        'img/mp2/happening.png',
        'img/mp2/item.png',
        'img/mp2/luigi.png',
        'img/mp2/mario.png',
        'img/mp2/minigame.png',
        'img/mp2/peach.png',
        'img/mp2/redspace.png',
        'img/mp2/stars.png',
        'img/mp2/wario.png',
        'img/mp2/yoshi.png',
        'img/mp3/coins.png',
        'img/mp3/com.png',
        'img/mp3/daisy.png',
        'img/mp3/dk.png',
        'img/mp3/happening.png',
        'img/mp3/item.png',
        'img/mp3/luigi.png',
        'img/mp3/mario.png',
        'img/mp3/minigame.png',
        'img/mp3/peach.png',
        'img/mp3/redspace.png',
        'img/mp3/stars.png',
        'img/mp3/waluigi.png',
        'img/mp3/wario.png',
        'img/mp3/yoshi.png',
        'img/mp4/coins.png',
        'img/mp4/daisy.png',
        'img/mp4/dk.png',
        'img/mp4/happening.png',
        'img/mp4/item.png',
        'img/mp4/luigi.png',
        'img/mp4/mario.png',
        'img/mp4/minigame.png',
        'img/mp4/peach.png',
        'img/mp4/redspace.png',
        'img/mp4/stars.png',
        'img/mp4/waluigi.png',
        'img/mp4/wario.png',
        'img/mp4/yoshi.png',
        'img/mp5/boo.png',
        'img/mp5/coins.png',
        'img/mp5/daisy.png',
        'img/mp5/happening.png',
        'img/mp5/koopakid.png',
        'img/mp5/luigi.png',
        'img/mp5/mario.png',
        'img/mp5/minigame.png',
        'img/mp5/peach.png',
        'img/mp5/redSpace.png',
        'img/mp5/shopping.png',
        'img/mp5/stars.png',
        'img/mp5/toad.png',
        'img/mp5/waluigi.png',
        'img/mp5/wario.png',
        'img/mp5/yoshi.png',
        'img/mp6/boo.png',
        'img/mp6/coins.png',
        'img/mp6/daisy.png',
        'img/mp6/happening.png',
        'img/mp6/item.png',
        'img/mp6/koopakid.png',
        'img/mp6/luigi.png',
        'img/mp6/mario.png',
        'img/mp6/minigame.png',
        'img/mp6/peach.png',
        'img/mp6/redspace.png',
        'img/mp6/stars.png',
        'img/mp6/toad.png',
        'img/mp6/toadette.png',
        'img/mp6/waluigi.png',
        'img/mp6/wario.png',
        'img/mp6/yoshi.png',
        'img/mp7/birdo.png',
        'img/mp7/boo.png',
        'img/mp7/coins.png',
        'img/mp7/daisy.png',
        'img/mp7/drybones.png',
        'img/mp7/happening.png',
        'img/mp7/item.png',
        'img/mp7/luigi.png',
        'img/mp7/mario.png',
        'img/mp7/minigame.png',
        'img/mp7/peach.png',
        'img/mp7/redspace.png',
        'img/mp7/running.png',
        'img/mp7/shopping.png',
        'img/mp7/stars.png',
        'img/mp7/toad.png',
        'img/mp7/toadette.png',
        'img/mp7/waluigi.png',
        'img/mp7/wario.png',
        'img/mp7/yoshi.png',
        'img/mp8/birdo.png',
        'img/mp8/blooper.png',
        'img/mp8/boo.png',
        'img/mp8/coins.png',
        'img/mp8/daisy.png',
        'img/mp8/drybones.png',
        'img/mp8/hammerbro.png',
        'img/mp8/happening.png',
        'img/mp8/item.png',
        'img/mp8/luigi.png',
        'img/mp8/mario.png',
        'img/mp8/minigame.png',
        'img/mp8/peach.png',
        'img/mp8/redspace.png',
        'img/mp8/running.png',
        'img/mp8/shopping.png',
        'img/mp8/stars.png',
        'img/mp8/toad.png',
        'img/mp8/toadette.png',
        'img/mp8/waluigi.png',
        'img/mp8/wario.png',
        'img/mp8/yoshi.png',
        'img/mp9/birdo.png',
        'img/mp9/daisy.png',
        'img/mp9/item.png',
        'img/mp9/kamek.png',
        'img/mp9/koopa.png',
        'img/mp9/luigi.png',
        'img/mp9/mario.png',
        'img/mp9/minigame.png',
        'img/mp9/peach.png',
        'img/mp9/shyguy.png',
        'img/mp9/toad.png',
        'img/mp9/waluigi.png',
        'img/mp9/wario.png',
        'img/mp9/yoshi.png',
        'img/mpa/luigi.png',
        'img/mpa/mario.png',
        'img/mpa/peach.png',
        'img/mpa/yoshi.png',
        'img/mpds/bowser.png',
        'img/mpds/coins.png',
        'img/mpds/com.png',
        'img/mpds/daisy.png',
        'img/mpds/drybones.png',
        'img/mpds/friendspace.png',
        'img/mpds/hammerbro.png',
        'img/mpds/happening.png',
        'img/mpds/hex.png',
        'img/mpds/item.png',
        'img/mpds/kamek.png',
        'img/mpds/luigi.png',
        'img/mpds/mario.png',
        'img/mpds/minigame.png',
        'img/mpds/peach.png',
        'img/mpds/redspace.png',
        'img/mpds/running.png',
        'img/mpds/stars.png',
        'img/mpds/toad.png',
        'img/mpds/waluigi.png',
        'img/mpds/wario.png',
        'img/mpds/yoshi.png',
        'img/mpit/boo.png',
        'img/mpit/bowserjr.png',
        'img/mpit/daisy.png',
        'img/mpit/luigi.png',
        'img/mpit/mario.png',
        'img/mpit/peach.png',
        'img/mpit/toad.png',
        'img/mpit/waluigi.png',
        'img/mpit/wario.png',
        'img/mpit/yoshi.png',
        'img/mpsr/boo.png',
        'img/mpsr/bowser.png',
        'img/mpsr/bowserjr.png',
        'img/mpsr/coins.png',
        'img/mpsr/daisy.png',
        'img/mpsr/diddy.png',
        'img/mpsr/dk.png',
        'img/mpsr/luigi.png',
        'img/mpsr/mario.png',
        'img/mpsr/peach.png',
        'img/mpsr/rosalina.png',
        'img/mpsr/stars.png',
        'img/mpsr/toad.png',
        'img/mpsr/toadette.png',
        'img/mpsr/waluigi.png',
        'img/mpsr/wario.png',
        'img/mpsr/yoshi.png',
        'img/mpsrIcons/birdo.png',
        'img/mpsrIcons/blooper.png',
        'img/mpsrIcons/boo.png',
        'img/mpsrIcons/bowser.png',
        'img/mpsrIcons/bowserjr.png',
        'img/mpsrIcons/daisy.png',
        'img/mpsrIcons/diddy.png',
        'img/mpsrIcons/dk.png',
        'img/mpsrIcons/drybones.png',
        'img/mpsrIcons/goomba.png',
        'img/mpsrIcons/hammerbro.png',
        'img/mpsrIcons/kamek.png',
        'img/mpsrIcons/koopa.png',
        'img/mpsrIcons/koopakid.png',
        'img/mpsrIcons/luigi.png',
        'img/mpsrIcons/mario.png',
        'img/mpsrIcons/monty.png',
        'img/mpsrIcons/peach.png',
        'img/mpsrIcons/pompom.png',
        'img/mpsrIcons/rosalina.png',
        'img/mpsrIcons/shyguy.png',
        'img/mpsrIcons/spike.png',
        'img/mpsrIcons/toad.png',
        'img/mpsrIcons/toadette.png',
        'img/mpsrIcons/waluigi.png',
        'img/mpsrIcons/wario.png',
        'img/mpsrIcons/yoshi.png',
        'img/mptt100/almost.png',
        'img/mptt100/balloon.png',
        'img/mptt100/bowser.png',
        'img/mptt100/coins.png',
        'img/mptt100/daisy.png',
        'img/mptt100/dk.png',
        'img/mptt100/item.png',
        'img/mptt100/luigi.png',
        'img/mptt100/mario.png',
        'img/mptt100/minigame.png',
        'img/mptt100/peach.png',
        'img/mptt100/rosalina.png',
        'img/mptt100/running.png',
        'img/mptt100/slow.png',
        'img/mptt100/stars.png',
        'img/mptt100/toad.png',
        'img/mptt100/unused.png',
        'img/mptt100/waluigi.png',
        'img/mptt100/wario.png',
        'img/mptt100/yoshi.png',
        'img/shortcut/mpds/bluenote.png',
        'img/shortcut/mpds/bluespace.png',
        'img/shortcut/mpds/bowserspace.png',
        'img/shortcut/mpds/coinblock.png',
        'img/shortcut/mpds/coinsm10.png',
        'img/shortcut/mpds/coinsm20.png',
        'img/shortcut/mpds/coinswap.png',
        'img/shortcut/mpds/diceblock.png',
        'img/shortcut/mpds/double.png',
        'img/shortcut/mpds/duelspace.png',
        'img/shortcut/mpds/friendspace.png',
        'img/shortcut/mpds/grab.png',
        'img/shortcut/mpds/greennote.png',
        'img/shortcut/mpds/half.png',
        'img/shortcut/mpds/happeningspace.png',
        'img/shortcut/mpds/magicjarcoins.png',
        'img/shortcut/mpds/magicjarfail.png',
        'img/shortcut/mpds/magicjarstars.png',
        'img/shortcut/mpds/orangenote.png',
        'img/shortcut/mpds/rednote.png',
        'img/shortcut/mpds/redspace.png',
        'img/shortcut/mpds/sensor.png',
        'img/shortcut/mpds/snag.png',
        'img/shortcut/mpds/spaceswap.png',
        'img/shortcut/mpds/starblock.png',
        'img/shortcut/mpds/starm1.png',
        'img/shortcut/mpds/starm2.png',
        'img/shortcut/mpds/starpipe.png',
        'img/shortcut/mpds/triple.png',
        'img/shortcut/mpds/warp.png',
        'img/shortcut/mpds/yellownote.png',
        'img/shortcut/smp/allyphone.png',
        'img/shortcut/smp/allyspace.png',
        'img/shortcut/smp/badluckspace.png',
        'img/shortcut/smp/bluespace.png',
        'img/shortcut/smp/coinado.png',
        'img/shortcut/smp/coins.png',
        'img/shortcut/smp/customdice.png',
        'img/shortcut/smp/defaultdice.png',
        'img/shortcut/smp/duelglove.png',
        'img/shortcut/smp/extrabadluckspace.png',
        'img/shortcut/smp/golddrink.png',
        'img/shortcut/smp/goldmushroom.png',
        'img/shortcut/smp/happeningspace.png',
        'img/shortcut/smp/itemspace.png',
        'img/shortcut/smp/kamek10.png',
        'img/shortcut/smp/kamek15.png',
        'img/shortcut/smp/kamek5.png',
        'img/shortcut/smp/lakitu.png',
        'img/shortcut/smp/luckyspace.png',
        'img/shortcut/smp/mushroom.png',
        'img/shortcut/smp/peepabell.png',
        'img/shortcut/smp/poisonmushroom.png',
        'img/shortcut/smp/redspace.png',
        'img/shortcut/smp/stars.png',
        'img/shortcut/smp/vsspace.png',
        'img/smp/ally.png',
        'img/smp/bobomb.png',
        'img/smp/boo.png',
        'img/smp/bowser.png',
        'img/smp/bowserjr.png',
        'img/smp/coins.png',
        'img/smp/daisy.png',
        'img/smp/diddy.png',
        'img/smp/dk.png',
        'img/smp/drybones.png',
        'img/smp/goomba.png',
        'img/smp/hammerbro.png',
        'img/smp/happening.png',
        'img/smp/item.png',
        'img/smp/koopa.png',
        'img/smp/luigi.png',
        'img/smp/mario.png',
        'img/smp/minigame.png',
        'img/smp/monty.png',
        'img/smp/peach.png',
        'img/smp/pompom.png',
        'img/smp/redspace.png',
        'img/smp/rosalina.png',
        'img/smp/running.png',
        'img/smp/shyguy.png',
        'img/smp/stars.png',
        'img/smp/waluigi.png',
        'img/smp/wario.png',
        'img/smp/yoshi.png'
      ]);
    })
  );
});