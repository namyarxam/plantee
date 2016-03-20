'use strict';
const CronJob = require('cron').CronJob;

// let planteePing = (ref) => {
//   var job = new CronJob('0 9-17 * * * 1-5', ref, function () {
//       console.log('planteePing stopped.');
//     },
//     true, /* Start the job right now */
//     'America/Los_Angeles' /* Time zone of this job. */
//   );
// }

let planteePing = (ref) => {
  var job = new CronJob('*/15 * * * * *', ref, function () {
      console.log('planteePing stopped.');
    },
    true, /* Start the job right now */
    'America/Los_Angeles' /* Time zone of this job. */
  );
}

module.exports.planteePing = planteePing;