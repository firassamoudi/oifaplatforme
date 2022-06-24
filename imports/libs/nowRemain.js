/**
 * Petit Remaing time displayer
 */

const humanizeDuration = require("humanize-duration");

export default function (date) {
  const stamp = new Date(date) - Date.now();
  return humanizeDuration(stamp, {
    units: ["w", "d", "h"],
    conjunction: " and ",
    round: true,
  });
}
