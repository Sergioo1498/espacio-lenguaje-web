export function madridMidnightEpoch(date) {
  // Madrid changes clocks after midnight. At 00:00 UTC the offset still
  // matches local midnight, unlike noon on transition days.
  const instant = new Date(date + 'T00:00:00Z');
  const offset = new Intl.DateTimeFormat('en-US', {timeZone:'Europe/Madrid', timeZoneName:'shortOffset'})
    .formatToParts(instant).find(part => part.type === 'timeZoneName').value;
  const hours = Number(offset.match(/GMT\+(\d+)/)?.[1]);
  if (![1,2].includes(hours)) throw new Error('Desfase Madrid no reconocido');
  return Date.parse(date + 'T00:00:00Z')/1000 - hours*3600;
}
