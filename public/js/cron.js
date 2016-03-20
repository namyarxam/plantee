var CronJob = require('cron').
//message is sent every 15 mintutes, mon-sun, between 9am and 3pm
var quartr = new CronJob({

  //there has to be a way to use a for loop with the cronTime constructor
  cronTime: '00 00 09 * * 1-7'
  cronTime: '00 15 09 * * 1-7'
  cronTime: '00 30 09 * * 1-7'
  cronTime: '00 45 09 * * 1-7'
  cronTime: '00 00 10 * * 1-7'
  cronTime: '00 15 10 * * 1-7'
  cronTime: '00 30 10 * * 1-7'
  cronTime: '00 45 10 * * 1-7'
  cronTime: '00 00 11 * * 1-7'
  cronTime: '00 15 11 * * 1-7'
  cronTime: '00 30 11 * * 1-7'
  cronTime: '00 45 11 * * 1-7'
  cronTime: '00 00 12 * * 1-7'
  cronTime: '00 15 12 * * 1-7'
  cronTime: '00 30 12 * * 1-7'
  cronTime: '00 45 12 * * 1-7'
  cronTime: '00 00 13 * * 1-7'
  cronTime: '00 15 13 * * 1-7'
  cronTime: '00 30 13 * * 1-7'
  cronTime: '00 45 13 * * 1-7'
  cronTime: '00 00 14 * * 1-7'
  cronTime: '00 15 14 * * 1-7'
  cronTime: '00 30 14 * * 1-7'
  cronTime: '00 45 14 * * 1-7'
  cronTime: '00 00 15 * * 1-7'


  onTick: function(){
    },
    start: false,
    timeZone: 'America/New_York'
});
quartr.start();
-----------------------------------
//every 20 min, mon thru sun between 9am and 4pm
var every_20 = new CronJob({
  cronTime: '00 00 09 * * 1-7'
  cronTime: '00 20 09 * * 1-7'
  cronTime: '00 40 09 * * 1-7'
  cronTime: '00 00 10 * * 1-7'
  cronTime: '00 20 10 * * 1-7'
  cronTime: '00 40 10 * * 1-7'
  cronTime: '00 3 11 * * 1-7'
  cronTime: '00 45 11 * * 1-7'
  cronTime: '00 00 11 * * 1-7'
  cronTime: '00 15 12 * * 1-7'
  cronTime: '00 30 12 * * 1-7'
  cronTime: '00 45 12 * * 1-7'
  cronTime: '00 00 13 * * 1-7'
  cronTime: '00 15 14 * * 1-7'
  cronTime: '00 30 14 * * 1-7'
  cronTime: '00 45 14 * * 1-7'
  cronTime: '00 00 14 * * 1-7'
  cronTime: '00 15 15 * * 1-7'
  cronTime: '00 30 15 * * 1-7'
  cronTime: '00 45 15 * * 1-7'
  cronTime: '00 00 15 * * 1-7'
  cronTime: '00 15 16 * * 1-7'
  cronTime: '00 30 16 * * 1-7'
  cronTime: '00 45 16 * * 1-7'
  cronTime: '00 00 16 * * 1-7'

  onTick: function(){
    },
    start: false,
    timeZone: 'America/New_York'
});
every_20.start();
-----------------------------------
//

var half = new CronJob({
  cronTime: '00 00 09 * * 1-7'
  cronTime: '00 30 09 * * 1-7'
  cronTime: '00 00 10 * * 1-7'
  cronTime: '00 30 10 * * 1-7'
  cronTime: '00 00 11 * * 1-7'
  cronTime: '00 30 11 * * 1-7'
  cronTime: '00 00 12 * * 1-7'
  cronTime: '00 30 12 * * 1-7'
  cronTime: '00 00 13 * * 1-7'
  cronTime: '00 30 13 * * 1-7'
  cronTime: '00 00 14 * * 1-7'
  cronTime: '00 30 14 * * 1-7'
  cronTime: '00 00 15 * * 1-7'
  cronTime: '00 30 15 * * 1-7'
  cronTime: '00 00 16 * * 1-7'
  cronTime: '00 30 16 * * 1-7'
  cronTime: '00 00 17 * * 1-7'
  cronTime: '00 30 17 * * 1-7'
  cronTime: '00 00 18 * * 1-7'
  cronTime: '00 30 18 * * 1-7'
  cronTime: '00 00 19 * * 1-7'
  cronTime: '00 30 19 * * 1-7'
  cronTime: '00 00 20 * * 1-7'
  cronTime: '00 30 20 * * 1-7'



  onTick: function(){
    },
    start: false,
    timeZone: 'America/New_York'
});
half.start();
------------------------------------
//message is sent on the 1's mon-sun, between 9am and 3pm
var on_the_1s = new CronJob({
  cronTime: '00 01 09 * * 1-7'
  cronTime: '00 11 09 * * 1-7'
  cronTime: '00 21 09 * * 1-7'
  cronTime: '00 31 09 * * 1-7'
  cronTime: '00 41 10 * * 1-7'
  cronTime: '00 51 10 * * 1-7'
  cronTime: '00 01 11 * * 1-7'
  cronTime: '00 11 11 * * 1-7'
  cronTime: '00 21 11 * * 1-7'
  cronTime: '00 31 11 * * 1-7'
  cronTime: '00 41 11 * * 1-7'
  cronTime: '00 51 11 * * 1-7'
  cronTime: '00 01 12 * * 1-7'
  cronTime: '00 11 12 * * 1-7'
  cronTime: '00 21 12 * * 1-7'
  cronTime: '00 31 12 * * 1-7'
  cronTime: '00 41 13 * * 1-7'
  cronTime: '00 51 13 * * 1-7'
  cronTime: '00 01 14 * * 1-7'
  cronTime: '00 21 14 * * 1-7'
  cronTime: '00 31 14 * * 1-7'
  cronTime: '00 41 14 * * 1-7'
  cronTime: '00 51 14 * * 1-7'
  cronTime: '00 01 15 * * 1-7'

  onTick: function(){
    },
    start: false,
    timeZone: 'America/New_York'
});
on_the_1s.start();
--------------------------------------
//good morning cron
var good_morning = new CronJob({
  cronTime: '00 59 08 * * 1-7'

  onTick: function(){
    },
    start: false,
    timeZone: 'America/New_York'
});
good_morning.start();
---------------------------------------
//good afternoon cron
var good_afternoon = new CronJob({
  cronTime: '00 30 12 * * 1-7'

  onTick: function(){
    },
    start: false,
    timeZone: 'America/New_York'
});
good_afternoon.start();
--------------------------------------
//good night cron
var good_night = new CronJob({
  cronTime: '00 17 00 * * 1-7'

  onTick: function(){
    },
    start: false,
    timeZone: 'America/New_York'
});
good_night.start();
--------------------------------------
//feed me
var feed_me = new CronJob({
  cronTime: '00 09 00 * * 1-7'
  cronTime: '00 12 00 * * 1-7'
  cronTime: '00 15 00 * * 1-7'

  onTick: function(){
    },
    start: false,
    timeZone: 'America/New_York'
});
feed_me.start();
--------------------------------------
//feed me
var sun_me = new CronJob({
  cronTime: '00 00 10 * * 1-7'
  cronTime: '00 15 10 * * 1-7'
  cronTime: '00 30 10 * * 1-7'
  cronTime: '00 45 10 * * 1-7'
  cronTime: '00 00 11 * * 1-7'
  cronTime: '00 15 11 * * 1-7'
  cronTime: '00 30 11 * * 1-7'
  cronTime: '00 45 11 * * 1-7'
  cronTime: '00 00 12 * * 1-7'
  cronTime: '00 15 12 * * 1-7'
  cronTime: '00 30 12 * * 1-7'
  cronTime: '00 45 12 * * 1-7'
  cronTime: '00 00 13 * * 1-7'
  cronTime: '00 15 13 * * 1-7'
  cronTime: '00 30 13 * * 1-7'
  cronTime: '00 45 13 * * 1-7'
  cronTime: '00 00 14 * * 1-7'

  onTick: function(){
    },
    start: false,
    timeZone: 'America/New_York'
});
sun_me.start();
