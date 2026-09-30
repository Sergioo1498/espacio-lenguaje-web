import assert from 'node:assert/strict';
import {madridMidnightEpoch} from './_madrid-time.mjs';
for(const [date,expected] of [['2026-09-23','2026-09-22T22:00:00Z'],['2026-10-25','2026-10-24T22:00:00Z'],['2026-10-26','2026-10-25T23:00:00Z'],['2026-03-29','2026-03-28T23:00:00Z'],['2026-03-30','2026-03-29T22:00:00Z']])assert.equal(madridMidnightEpoch(date),Date.parse(expected)/1000);
console.log('PASS: medianoche Madrid, ambos cambios de hora y día ordinario');
